-- Add token expiration and security audit fields to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS access_token_expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '48 hours');
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS access_attempts INTEGER DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS last_access_at TIMESTAMP WITH TIME ZONE;

-- Update existing orders to have expiration dates
UPDATE public.orders 
SET access_token_expires_at = (created_at + INTERVAL '48 hours')
WHERE access_token_expires_at IS NULL;

-- Create enhanced audit table for order access attempts
CREATE TABLE IF NOT EXISTS public.order_access_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID,
  access_token_provided TEXT,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  failure_reason TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit table
ALTER TABLE public.order_access_attempts ENABLE ROW LEVEL SECURITY;

-- Only service role can access audit logs
CREATE POLICY "Service role only access to order access attempts" 
ON public.order_access_attempts 
FOR ALL 
USING (current_setting('role', true) = 'service_role');

-- Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_order_access_rate_limit(
  p_order_id UUID,
  p_access_token TEXT,
  p_ip_address INET DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  recent_attempts INTEGER;
  token_valid BOOLEAN := false;
  order_exists BOOLEAN := false;
  token_expired BOOLEAN := true;
  result JSONB;
BEGIN
  -- Check if order exists and token is valid
  SELECT 
    EXISTS(SELECT 1 FROM public.orders WHERE id = p_order_id),
    EXISTS(SELECT 1 FROM public.orders WHERE id = p_order_id AND access_token = p_access_token),
    EXISTS(SELECT 1 FROM public.orders WHERE id = p_order_id AND access_token = p_access_token AND access_token_expires_at > now())
  INTO order_exists, token_valid, token_expired;
  
  -- Count recent failed attempts from this IP (last 15 minutes)
  SELECT COUNT(*)
  INTO recent_attempts
  FROM public.order_access_attempts
  WHERE 
    (p_ip_address IS NULL OR ip_address = p_ip_address)
    AND success = false
    AND attempted_at > (now() - INTERVAL '15 minutes');
  
  -- Rate limit: max 10 failed attempts per 15 minutes per IP
  IF recent_attempts >= 10 THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limit_exceeded',
      'message', 'Too many failed attempts. Please try again later.'
    );
  ELSIF NOT order_exists THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'order_not_found',
      'message', 'Order not found.'
    );
  ELSIF NOT token_valid THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'invalid_token',
      'message', 'Invalid access token.'
    );
  ELSIF NOT token_expired THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'token_expired',
      'message', 'Access token has expired. Please contact support with your order number.'
    );
  ELSE
    result := jsonb_build_object(
      'allowed', true,
      'reason', 'success',
      'message', 'Access granted.'
    );
  END IF;
  
  -- Log the attempt
  INSERT INTO public.order_access_attempts (
    order_id,
    access_token_provided,
    ip_address,
    success,
    failure_reason
  ) VALUES (
    p_order_id,
    LEFT(p_access_token, 8) || '...',  -- Only log first 8 chars for security
    p_ip_address,
    (result->>'allowed')::boolean,
    CASE WHEN (result->>'allowed')::boolean THEN NULL ELSE result->>'reason' END
  );
  
  -- Update order access tracking if successful
  IF (result->>'allowed')::boolean THEN
    UPDATE public.orders 
    SET 
      access_attempts = COALESCE(access_attempts, 0) + 1,
      last_access_at = now()
    WHERE id = p_order_id;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
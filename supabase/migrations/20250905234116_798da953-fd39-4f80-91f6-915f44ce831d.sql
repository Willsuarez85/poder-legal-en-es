-- Add additional security fields to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS created_ip_address INET;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email_hash TEXT;

-- Reduce token expiration to 24 hours for tighter security
ALTER TABLE public.orders ALTER COLUMN access_token_expires_at SET DEFAULT (now() + INTERVAL '24 hours');

-- Update existing orders to have shorter expiration (only for future orders, don't break existing ones)
UPDATE public.orders 
SET access_token_expires_at = LEAST(access_token_expires_at, now() + INTERVAL '24 hours')
WHERE access_token_expires_at > (now() + INTERVAL '24 hours');

-- Create enhanced security validation function
CREATE OR REPLACE FUNCTION public.validate_customer_access(
  p_order_id UUID,
  p_access_token TEXT,
  p_customer_email TEXT DEFAULT NULL,
  p_client_ip INET DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  order_record RECORD;
  recent_attempts INTEGER;
  result JSONB;
  email_matches BOOLEAN := false;
  ip_suspicious BOOLEAN := false;
BEGIN
  -- Count recent failed attempts from this IP (last 15 minutes)
  SELECT COUNT(*)
  INTO recent_attempts
  FROM public.order_access_attempts
  WHERE 
    (p_client_ip IS NULL OR ip_address = p_client_ip)
    AND success = false
    AND attempted_at > (now() - INTERVAL '15 minutes');
  
  -- Rate limit check
  IF recent_attempts >= 5 THEN -- Reduced from 10 to 5 for tighter security
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limit_exceeded',
      'message', 'Too many failed attempts. Please try again in 15 minutes.'
    );
    
    -- Log the attempt
    INSERT INTO public.order_access_attempts (
      order_id, access_token_provided, ip_address, success, failure_reason
    ) VALUES (
      p_order_id, LEFT(p_access_token, 8) || '...', p_client_ip, false, 'rate_limit_exceeded'
    );
    
    RETURN result;
  END IF;
  
  -- Get order details with security validation
  SELECT 
    o.*,
    CASE 
      WHEN p_customer_email IS NOT NULL THEN 
        LOWER(o.customer_email) = LOWER(p_customer_email)
      ELSE true 
    END as email_match,
    CASE 
      WHEN o.created_ip_address IS NOT NULL AND p_client_ip IS NOT NULL THEN
        o.created_ip_address != p_client_ip
      ELSE false
    END as ip_different
  INTO order_record
  FROM public.orders o
  WHERE o.id = p_order_id;
  
  -- Determine access result
  IF order_record.id IS NULL THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'order_not_found',
      'message', 'Order not found.'
    );
  ELSIF order_record.access_token != p_access_token THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'invalid_token',
      'message', 'Invalid access token.'
    );
  ELSIF order_record.access_token_expires_at <= now() THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'token_expired',
      'message', 'Access token has expired. Please contact support with your order number.'
    );
  ELSIF p_customer_email IS NOT NULL AND NOT order_record.email_match THEN
    result := jsonb_build_object(
      'allowed', false,
      'reason', 'email_mismatch',
      'message', 'Email address does not match our records. Please verify your email address.'
    );
  ELSE
    -- Access granted, but check for suspicious activity
    ip_suspicious := order_record.ip_different;
    
    result := jsonb_build_object(
      'allowed', true,
      'reason', 'success',
      'message', 'Access granted.',
      'suspicious_ip', ip_suspicious,
      'customer_email_masked', 
        CASE 
          WHEN order_record.customer_email IS NOT NULL THEN 
            LEFT(order_record.customer_email, 2) || '***@' || 
            SPLIT_PART(order_record.customer_email, '@', 2)
          ELSE NULL 
        END
    );
  END IF;
  
  -- Log the attempt
  INSERT INTO public.order_access_attempts (
    order_id,
    access_token_provided,
    ip_address,
    success,
    failure_reason,
    user_agent
  ) VALUES (
    p_order_id,
    LEFT(p_access_token, 8) || '...',
    p_client_ip,
    (result->>'allowed')::boolean,
    CASE WHEN (result->>'allowed')::boolean THEN NULL ELSE result->>'reason' END,
    CASE WHEN ip_suspicious THEN 'IP_SUSPICIOUS' ELSE NULL END
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
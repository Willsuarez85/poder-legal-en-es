-- Enhanced RLS security policies for customer data protection

-- Add enhanced customer data anonymization function
CREATE OR REPLACE FUNCTION public.enhanced_anonymize_customer_data()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  affected_count integer;
BEGIN
  -- Only allow this function to run by service role
  IF current_setting('role', true) != 'service_role' THEN
    RAISE EXCEPTION 'Unauthorized access to anonymization function';
  END IF;
  
  -- Anonymize customer data older than 90 days with completed payments
  UPDATE public.orders 
  SET 
    customer_email = 'anonymized' || substr(md5(random()::text), 1, 8) || '@privacy.local',
    customer_name = 'Anonymized User ' || substr(md5(random()::text), 1, 4),
    customer_phone = '+1555' || substr(md5(random()::text), 1, 7)
  WHERE 
    created_at < NOW() - INTERVAL '90 days'
    AND stripe_session_id IS NOT NULL;
    
  GET DIAGNOSTICS affected_count = ROW_COUNT;
  
  -- Log the anonymization activity
  INSERT INTO public.orders_access_log (
    user_id, 
    action, 
    success
  ) VALUES (
    NULL,
    'DATA_ANONYMIZATION',
    true
  );
  
  RETURN affected_count;
END;
$function$;

-- Add rate limiting table for security monitoring
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- IP address or session identifier
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on rate limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can access rate limits
CREATE POLICY "Service role only access to rate limits" 
ON public.rate_limits 
FOR ALL 
USING (current_setting('role', true) = 'service_role')
WITH CHECK (current_setting('role', true) = 'service_role');

-- Add index for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_endpoint 
ON public.rate_limits (identifier, endpoint, window_start);

-- Add enhanced audit logging for customer data access
CREATE OR REPLACE FUNCTION public.enhanced_log_customer_access()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Enhanced logging with more security details
  INSERT INTO public.orders_access_log (
    user_id, 
    action, 
    success,
    ip_address,
    user_agent
  ) VALUES (
    COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid),
    TG_OP || '_CUSTOMER_DATA',
    true,
    inet_client_addr(),
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  -- Return appropriate record based on operation
  IF TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- Log failed attempt but don't block the operation
    INSERT INTO public.orders_access_log (
      user_id, 
      action, 
      success
    ) VALUES (
      COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid),
      TG_OP || '_CUSTOMER_DATA_FAILED',
      false
    );
    
    IF TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN
      RETURN OLD;
    ELSE
      RETURN NEW;
    END IF;
END;
$function$;

-- Create trigger for enhanced customer data access logging
DROP TRIGGER IF EXISTS enhanced_customer_data_access_log ON public.orders;
CREATE TRIGGER enhanced_customer_data_access_log
  AFTER INSERT OR UPDATE OR DELETE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.enhanced_log_customer_access();
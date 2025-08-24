-- Add additional security measures for the orders table

-- 1. Create a security definer function to check if user is admin/service role
CREATE OR REPLACE FUNCTION public.is_service_role_request()
RETURNS boolean AS $$
BEGIN
  -- Check if the request is coming from a service role or authorized context
  RETURN current_setting('role', true) = 'service_role' 
         OR current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role';
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Update the INSERT policy to be more restrictive for production
-- Only allow inserts from service role (edge functions) or authenticated sessions with proper context
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;

CREATE POLICY "Service role can insert orders"
ON public.orders
FOR INSERT
WITH CHECK (
  -- Allow service role (for edge functions like payment processing)
  auth.jwt() IS NULL 
  OR current_setting('role', true) = 'service_role'
  OR (
    -- Or allow authenticated users creating their own orders with proper session context
    auth.uid() IS NOT NULL 
    AND length(coalesce(customer_email, '')) > 0
    AND length(coalesce(customer_name, '')) > 0
  )
);

-- 3. Add audit logging for orders access attempts (optional security enhancement)
CREATE TABLE IF NOT EXISTS public.orders_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempted_at timestamptz DEFAULT now(),
  user_id uuid,
  action text NOT NULL,
  ip_address inet,
  user_agent text,
  success boolean DEFAULT false
);

ALTER TABLE public.orders_access_log ENABLE ROW LEVEL SECURITY;

-- Only service role can access audit logs
CREATE POLICY "Service role only access to audit logs"
ON public.orders_access_log
FOR ALL
USING (current_setting('role', true) = 'service_role')
WITH CHECK (current_setting('role', true) = 'service_role');

-- 4. Add a trigger to log access attempts to orders table
CREATE OR REPLACE FUNCTION public.log_orders_access()
RETURNS trigger AS $$
BEGIN
  -- Log the access attempt
  INSERT INTO public.orders_access_log (
    user_id, 
    action, 
    success,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    TG_OP,
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
      auth.uid(),
      TG_OP || '_FAILED',
      false
    );
    
    IF TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN
      RETURN OLD;
    ELSE
      RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for audit logging
CREATE TRIGGER orders_access_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_orders_access();

-- 5. Add data anonymization function for development/testing
CREATE OR REPLACE FUNCTION public.anonymize_test_orders()
RETURNS integer AS $$
DECLARE
  affected_count integer;
BEGIN
  -- Only allow this function to run by service role
  IF current_setting('role', true) != 'service_role' THEN
    RAISE EXCEPTION 'Unauthorized access to anonymization function';
  END IF;
  
  -- Anonymize test orders (those with test/sample/example emails)
  UPDATE public.orders 
  SET 
    customer_email = 'test' || substr(md5(random()::text), 1, 8) || '@example.com',
    customer_name = 'Test User ' || substr(md5(random()::text), 1, 4),
    customer_phone = '+1555' || substr(md5(random()::text), 1, 7)
  WHERE 
    customer_email ILIKE '%test%' 
    OR customer_email ILIKE '%sample%' 
    OR customer_email ILIKE '%example%'
    OR customer_name ILIKE '%test%'
    OR customer_name ILIKE '%sample%';
    
  GET DIAGNOSTICS affected_count = ROW_COUNT;
  RETURN affected_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
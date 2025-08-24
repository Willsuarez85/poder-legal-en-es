-- Fix security warnings by setting proper search_path for functions

-- Fix the is_service_role_request function
CREATE OR REPLACE FUNCTION public.is_service_role_request()
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER 
STABLE
SET search_path = public
AS $$
BEGIN
  -- Check if the request is coming from a service role or authorized context
  RETURN current_setting('role', true) = 'service_role' 
         OR current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role';
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;

-- Fix the log_orders_access function  
CREATE OR REPLACE FUNCTION public.log_orders_access()
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Fix the anonymize_test_orders function
CREATE OR REPLACE FUNCTION public.anonymize_test_orders()
RETURNS integer 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;
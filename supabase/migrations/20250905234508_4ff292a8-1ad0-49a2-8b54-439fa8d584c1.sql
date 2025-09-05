-- Drop all existing policies and recreate with enhanced security
DROP POLICY IF EXISTS "Service role and functions only access to orders" ON public.orders;
DROP POLICY IF EXISTS "Orders cannot be deleted" ON public.orders;
DROP POLICY IF EXISTS "Orders cannot be updated" ON public.orders;

-- Create the most restrictive policy possible
CREATE POLICY "Enhanced security orders access" 
ON public.orders 
FOR ALL 
USING (
  current_setting('role', true) = 'service_role' OR 
  (current_setting('request.jwt.claims', true)::jsonb->>'role') = 'service_role' OR
  -- Only allow access through our validated security context
  current_setting('app.context', true) = 'validated_access'
);

-- Prevent any direct customer data access
CREATE POLICY "Block direct customer data access" 
ON public.orders 
FOR SELECT 
USING (
  -- Only service role and validated functions can see customer data
  current_setting('role', true) = 'service_role' OR
  current_setting('app.context', true) = 'validated_access'
);

-- Create secure function to get order products with data masking
CREATE OR REPLACE FUNCTION public.get_order_products_secure(
  p_order_id UUID,
  p_access_token TEXT,
  p_customer_email TEXT DEFAULT NULL,
  p_client_ip INET DEFAULT NULL
) RETURNS TABLE(
  product_id UUID,
  product_name JSONB,
  product_label TEXT,
  product_state TEXT,
  product_price NUMERIC,
  customer_email_masked TEXT,
  suspicious_access BOOLEAN,
  access_granted BOOLEAN,
  error_message TEXT
) AS $$
DECLARE
  access_result JSONB;
  order_record RECORD;
BEGIN
  -- Validate access using enhanced security
  SELECT public.validate_customer_access(
    p_order_id, 
    p_access_token, 
    p_customer_email, 
    p_client_ip
  ) INTO access_result;
  
  -- Return error if access denied
  IF NOT (access_result->>'allowed')::boolean THEN
    RETURN QUERY SELECT 
      NULL::UUID, NULL::JSONB, NULL::TEXT, NULL::TEXT, NULL::NUMERIC,
      NULL::TEXT, false, false, access_result->>'message';
    RETURN;
  END IF;
  
  -- Set security context for database access
  PERFORM set_config('app.context', 'validated_access', true);
  
  -- Get order details (access already validated)
  SELECT o.* INTO order_record
  FROM public.orders o
  WHERE o.id = p_order_id;
  
  -- Return products with masked customer info
  RETURN QUERY 
  SELECT 
    p.id,
    p.name,
    p.label,
    p.state,
    p.price,
    access_result->>'customer_email_masked',
    COALESCE((access_result->>'suspicious_ip')::boolean, false),
    true,
    'Access granted'::TEXT
  FROM public.products p
  WHERE p.id = ANY(order_record.product_ids);
  
  -- Reset security context
  PERFORM set_config('app.context', '', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
-- Create enhanced RLS policies that prevent direct customer data access
DROP POLICY IF EXISTS "Token-based access to orders" ON public.orders;
DROP POLICY IF EXISTS "Service role can insert orders" ON public.orders;

-- Create much more restrictive policies
CREATE POLICY "Service role and functions only access to orders" 
ON public.orders 
FOR ALL 
USING (
  current_setting('role', true) = 'service_role' OR 
  (current_setting('request.jwt.claims', true)::jsonb->>'role') = 'service_role' OR
  -- Only allow access through our security functions
  current_setting('app.context', true) = 'validated_access'
);

-- Create a secure function to get order products that masks customer data
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
  -- Set security context
  PERFORM set_config('app.context', 'validated_access', true);
  
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

-- Create secure function for PDF URL generation
CREATE OR REPLACE FUNCTION public.generate_pdf_url_secure(
  p_order_id UUID,
  p_product_id UUID,
  p_access_token TEXT,
  p_customer_email TEXT DEFAULT NULL,
  p_client_ip INET DEFAULT NULL
) RETURNS TABLE(
  download_url TEXT,
  expires_at TIMESTAMPTZ,
  access_granted BOOLEAN,
  error_message TEXT
) AS $$
DECLARE
  access_result JSONB;
  order_record RECORD;
  product_record RECORD;
  file_path TEXT;
  signed_url_data RECORD;
BEGIN
  -- Set security context
  PERFORM set_config('app.context', 'validated_access', true);
  
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
      NULL::TEXT, NULL::TIMESTAMPTZ, false, access_result->>'message';
    RETURN;
  END IF;
  
  -- Get order and verify product
  SELECT o.* INTO order_record
  FROM public.orders o
  WHERE o.id = p_order_id;
  
  -- Verify product is in order
  IF NOT (p_product_id = ANY(order_record.product_ids)) THEN
    RETURN QUERY SELECT 
      NULL::TEXT, NULL::TIMESTAMPTZ, false, 'Product not found in order'::TEXT;
    RETURN;
  END IF;
  
  -- Get product details for file path
  SELECT p.* INTO product_record
  FROM public.products p
  WHERE p.id = p_product_id;
  
  -- Construct file path
  file_path := product_record.state || '/' || product_record.state || '-' || product_record.label || '.pdf';
  
  -- Return success with file info (actual URL generation will be handled by edge function)
  RETURN QUERY SELECT 
    file_path::TEXT,
    (now() + INTERVAL '1 hour')::TIMESTAMPTZ,
    true,
    'File path validated'::TEXT;
  
  -- Reset security context
  PERFORM set_config('app.context', '', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Remove direct customer data from any functions that might expose it
CREATE OR REPLACE FUNCTION public.get_masked_order_info(p_order_id UUID)
RETURNS TABLE(
  order_id UUID,
  customer_email_masked TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    CASE 
      WHEN o.customer_email IS NOT NULL THEN 
        LEFT(o.customer_email, 2) || '***@' || 
        SPLIT_PART(o.customer_email, '@', 2)
      ELSE 'N/A' 
    END,
    o.created_at
  FROM public.orders o
  WHERE o.id = p_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
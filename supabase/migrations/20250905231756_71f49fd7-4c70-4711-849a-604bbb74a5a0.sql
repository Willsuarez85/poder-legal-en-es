-- Add secure access token to orders table for customer-specific access
ALTER TABLE public.orders 
ADD COLUMN access_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex');

-- Create unique index on access_token for performance and uniqueness
CREATE UNIQUE INDEX orders_access_token_idx ON public.orders(access_token);

-- Update RLS policies to allow token-based access for customers
DROP POLICY IF EXISTS "Service role only access to orders" ON public.orders;

-- New policy: Allow access with valid access token (for customers accessing their own orders)
CREATE POLICY "Token-based access to orders" 
ON public.orders 
FOR SELECT 
USING (
  -- Service role still has full access (for admin functions)
  (current_setting('role', true) = 'service_role' 
   OR ((current_setting('request.jwt.claims', true))::jsonb ->> 'role') = 'service_role')
  OR 
  -- Allow access if the request includes the correct access token in headers
  (access_token = current_setting('request.headers', true)::json->>'x-access-token')
);

-- Update insert policy to ensure access_token is generated
DROP POLICY IF EXISTS "Service role can insert orders" ON public.orders;

CREATE POLICY "Service role can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  (current_setting('role', true) = 'service_role' 
   OR ((current_setting('request.jwt.claims', true))::jsonb ->> 'role') = 'service_role')
  AND access_token IS NOT NULL
  AND length(access_token) >= 32
);
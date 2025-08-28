-- Fix critical security vulnerability: Remove public access to orders table
-- This prevents anyone from reading customer personal information

-- Drop the overly permissive policy that allows anyone to read all orders
DROP POLICY IF EXISTS "Allow reading orders with valid ID" ON public.orders;

-- Create a restrictive policy that only allows service role access
-- This ensures only backend functions can access order data
CREATE POLICY "Service role only access to orders" 
ON public.orders 
FOR SELECT 
USING (
  -- Only allow access from service role (backend functions)
  current_setting('role', true) = 'service_role' 
  OR 
  -- Allow access from edge functions context
  (current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role')
);

-- Ensure orders can only be created by service role or authenticated context
-- (This policy already exists but making sure it's secure)
DROP POLICY IF EXISTS "Service role can insert orders" ON public.orders;
CREATE POLICY "Service role can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  current_setting('role', true) = 'service_role' 
  OR 
  (current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role')
);
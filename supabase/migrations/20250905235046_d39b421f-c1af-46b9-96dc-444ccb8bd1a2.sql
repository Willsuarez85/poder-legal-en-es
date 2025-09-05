-- Fix critical security vulnerability in audit log tables
-- Replace PERMISSIVE policies with RESTRICTIVE policies for absolute security

-- Fix orders_access_log table
DROP POLICY IF EXISTS "Service role only access to audit logs" ON public.orders_access_log;

CREATE POLICY "RESTRICTIVE: Service role only access to audit logs" 
ON public.orders_access_log 
AS RESTRICTIVE
FOR ALL 
USING (current_setting('role', true) = 'service_role')
WITH CHECK (current_setting('role', true) = 'service_role');

-- Fix order_access_attempts table  
DROP POLICY IF EXISTS "Service role only access to order access attempts" ON public.order_access_attempts;

CREATE POLICY "RESTRICTIVE: Service role only access to order access attempts" 
ON public.order_access_attempts 
AS RESTRICTIVE
FOR ALL 
USING (current_setting('role', true) = 'service_role')
WITH CHECK (current_setting('role', true) = 'service_role');

-- Add additional security: Create default DENY policies
CREATE POLICY "DENY ALL public access to audit logs" 
ON public.orders_access_log 
AS RESTRICTIVE
FOR ALL 
USING (false)
WITH CHECK (false);

CREATE POLICY "DENY ALL public access to order attempts" 
ON public.order_access_attempts 
AS RESTRICTIVE
FOR ALL 
USING (false)
WITH CHECK (false);
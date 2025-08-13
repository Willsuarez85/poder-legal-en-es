-- Fix critical security vulnerability: Restrict access to customer personal information
-- Currently anyone can read all customer emails, phone numbers, and names from orders table

-- Add SELECT policy to completely restrict access to orders table
-- This prevents unauthorized access to customer personal information
CREATE POLICY "Orders are private - no public access" 
ON public.orders 
FOR SELECT 
USING (false);

-- Add UPDATE policy to prevent unauthorized modifications
CREATE POLICY "Orders cannot be updated" 
ON public.orders 
FOR UPDATE 
USING (false);

-- Add DELETE policy to prevent unauthorized deletions
CREATE POLICY "Orders cannot be deleted" 
ON public.orders 
FOR DELETE 
USING (false);

-- The existing INSERT policy remains to allow order creation during checkout
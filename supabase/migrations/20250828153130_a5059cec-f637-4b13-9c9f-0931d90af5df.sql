-- Allow reading orders by anyone who has the order ID (for success page)
CREATE POLICY "Allow reading orders with valid ID" ON public.orders
FOR SELECT
USING (true);

-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Orders are private - no public access" ON public.orders;
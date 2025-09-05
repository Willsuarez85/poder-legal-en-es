-- Update all product prices to $19.99
UPDATE public.products 
SET price = 19.99 
WHERE price IS NOT NULL;
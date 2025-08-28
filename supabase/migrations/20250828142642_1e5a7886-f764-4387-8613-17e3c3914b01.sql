-- Update all state values to lowercase
UPDATE products 
SET state = LOWER(state);
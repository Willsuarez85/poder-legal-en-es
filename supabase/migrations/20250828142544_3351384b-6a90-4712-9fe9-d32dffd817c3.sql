-- Update state values to use acronyms instead of full names
UPDATE products 
SET state = CASE 
  WHEN state = 'california' THEN 'CA'
  WHEN state = 'florida' THEN 'FL'
  WHEN state = 'texas' THEN 'TX'
  ELSE state -- Keep ALL and other values unchanged
END
WHERE state IN ('california', 'florida', 'texas');
-- Remove template_file_url column as we'll use Supabase Storage
ALTER TABLE products DROP COLUMN template_file_url;

-- Update existing products with appropriate labels based on their names
-- This assumes the products exist and we're setting labels based on document types
UPDATE products SET label = 'custodia-menores' WHERE name::text ILIKE '%custodia%';
UPDATE products SET label = 'poder-financiero' WHERE name::text ILIKE '%financiero%' OR name::text ILIKE '%poder%';
UPDATE products SET label = 'testamento' WHERE name::text ILIKE '%testamento%';
UPDATE products SET label = 'fideicomiso' WHERE name::text ILIKE '%fideicomiso%';
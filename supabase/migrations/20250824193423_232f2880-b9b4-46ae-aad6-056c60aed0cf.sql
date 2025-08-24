-- Update products table to support Quiz 2025 products
-- Add new product types for the 4 carta de poder templates

-- Insert the 4 new product types for California
INSERT INTO products (name, description, price, state, recommendation_criteria, template_file_url) VALUES 
-- Carta de poder médica
(
  '{"es": "Carta de Poder Médica", "en": "Medical Power of Attorney"}',
  '{"es": "Tu salud, tus reglas. Siempre.", "en": "Your health, your rules. Always."}',
  29.99,
  'california',
  '{"type": "medical", "usage": "emergency_medical_decisions", "scope": "healthcare_only"}',
  'https://example.com/medical-poa-ca.pdf'
),
-- Carta de poder financiera  
(
  '{"es": "Carta de Poder Financiera", "en": "Financial Power of Attorney"}',
  '{"es": "Mantén cuentas y pagos al día si tú no estás", "en": "Keep accounts and payments up to date when you are not available"}',
  34.99,
  'california', 
  '{"type": "financial", "usage": "banking_payments", "scope": "financial_only"}',
  'https://example.com/financial-poa-ca.pdf'
),
-- Carta de poder custodia de niños
(
  '{"es": "Carta de Poder Custodia de Niños (Temporal)", "en": "Child Custody Power of Attorney (Temporary)"}',
  '{"es": "Autoridad legal para que un adulto cuide a tus hijos", "en": "Legal authority for an adult to care for your children"}',
  39.99,
  'california',
  '{"type": "child_custody", "usage": "temporary_custody", "scope": "minors_only"}', 
  'https://example.com/custody-poa-ca.pdf'
),
-- Carta de poder específica
(
  '{"es": "Carta de Poder Específica (Limitada)", "en": "Specific Power of Attorney (Limited)"}',
  '{"es": "Delegas un trámite puntual sin estar presente", "en": "Delegate a specific procedure without being present"}',
  24.99,
  'california',
  '{"type": "specific", "usage": "limited_scope", "scope": "specific_tasks"}',
  'https://example.com/specific-poa-ca.pdf'
),

-- Insert same products for Texas
(
  '{"es": "Carta de Poder Médica", "en": "Medical Power of Attorney"}',
  '{"es": "Tu salud, tus reglas. Siempre.", "en": "Your health, your rules. Always."}',
  29.99,
  'texas',
  '{"type": "medical", "usage": "emergency_medical_decisions", "scope": "healthcare_only"}',
  'https://example.com/medical-poa-tx.pdf'
),
(
  '{"es": "Carta de Poder Financiera", "en": "Financial Power of Attorney"}',
  '{"es": "Mantén cuentas y pagos al día si tú no estás", "en": "Keep accounts and payments up to date when you are not available"}',
  34.99,
  'texas', 
  '{"type": "financial", "usage": "banking_payments", "scope": "financial_only"}',
  'https://example.com/financial-poa-tx.pdf'
),
(
  '{"es": "Carta de Poder Custodia de Niños (Temporal)", "en": "Child Custody Power of Attorney (Temporary)"}',
  '{"es": "Autoridad legal para que un adulto cuide a tus hijos", "en": "Legal authority for an adult to care for your children"}',
  39.99,
  'texas',
  '{"type": "child_custody", "usage": "temporary_custody", "scope": "minors_only"}', 
  'https://example.com/custody-poa-tx.pdf'
),
(
  '{"es": "Carta de Poder Específica (Limitada)", "en": "Specific Power of Attorney (Limited)"}',
  '{"es": "Delegas un trámite puntual sin estar presente", "en": "Delegate a specific procedure without being present"}',
  24.99,
  'texas',
  '{"type": "specific", "usage": "limited_scope", "scope": "specific_tasks"}',
  'https://example.com/specific-poa-tx.pdf'
),

-- Insert same products for Florida
(
  '{"es": "Carta de Poder Médica", "en": "Medical Power of Attorney"}',
  '{"es": "Tu salud, tus reglas. Siempre.", "en": "Your health, your rules. Always."}',
  29.99,
  'florida',
  '{"type": "medical", "usage": "emergency_medical_decisions", "scope": "healthcare_only"}',
  'https://example.com/medical-poa-fl.pdf'
),
(
  '{"es": "Carta de Poder Financiera", "en": "Financial Power of Attorney"}',
  '{"es": "Mantén cuentas y pagos al día si tú no estás", "en": "Keep accounts and payments up to date when you are not available"}',
  34.99,
  'florida', 
  '{"type": "financial", "usage": "banking_payments", "scope": "financial_only"}',
  'https://example.com/financial-poa-fl.pdf'
),
(
  '{"es": "Carta de Poder Custodia de Niños (Temporal)", "en": "Child Custody Power of Attorney (Temporary)"}',
  '{"es": "Autoridad legal para que un adulto cuide a tus hijos", "en": "Legal authority for an adult to care for your children"}',
  39.99,
  'florida',
  '{"type": "child_custody", "usage": "temporary_custody", "scope": "minors_only"}', 
  'https://example.com/custody-poa-fl.pdf'
),
(
  '{"es": "Carta de Poder Específica (Limitada)", "en": "Specific Power of Attorney (Limited)"}',
  '{"es": "Delegas un trámite puntual sin estar presente", "en": "Delegate a specific procedure without being present"}',
  24.99,
  'florida',
  '{"type": "specific", "usage": "limited_scope", "scope": "specific_tasks"}',
  'https://example.com/specific-poa-fl.pdf'
);
-- Insert quiz questions with bilingual support
INSERT INTO public.questions (question_text, question_type, options, order_number) VALUES
(
  '{"es": "¿En qué estado de USA necesitas usar el documento?", "en": "In which US state do you need to use the document?"}',
  'dropdown',
  '{"es": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"], "en": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]}',
  1
),
(
  '{"es": "¿Qué necesitas proteger si tú no pudieras actuar?", "en": "What do you need to protect if you couldn\'t act?"}',
  'multiple',
  '{"es": ["Mi casa o propiedades", "Mi negocio o cuentas bancarias", "Mis decisiones médicas", "El cuidado legal de mis hijos"], "en": ["My house or properties", "My business or bank accounts", "My medical decisions", "Legal care of my children"]}',
  2
),
(
  '{"es": "¿Quieres que tu persona de confianza pueda ayudarte con todo o solo en cosas específicas?", "en": "Do you want your trusted person to help you with everything or only specific things?"}',
  'single',
  '{"es": ["Que me ayude en TODO si yo no puedo", "Solo en temas específicos (por ejemplo, solo salud o finanzas)"], "en": ["Help me with EVERYTHING if I can\'t", "Only specific topics (for example, only health or finances)"]}',
  3
),
(
  '{"es": "¿Cuándo debería empezar a usarse esta Carta de Poder?", "en": "When should this Power of Attorney start being used?"}',
  'single',
  '{"es": ["Desde el momento en que la firmo", "Solo si hay una emergencia médica y yo no puedo decidir"], "en": ["From the moment I sign it", "Only if there\'s a medical emergency and I can\'t decide"]}',
  4
);

-- Insert sample products for testing
INSERT INTO public.products (name, state, description, price, recommendation_criteria) VALUES
(
  '{"es": "Poder Financiero", "en": "Financial Power of Attorney"}',
  'ALL',
  '{"es": {"purpose": "Para manejar tus cuentas, propiedades o negocio", "not_for": "No incluye decisiones médicas"}, "en": {"purpose": "To manage your accounts, properties or business", "not_for": "Does not include medical decisions"}}',
  19.99,
  '{"protections": ["Mi casa o propiedades", "Mi negocio o cuentas bancarias"]}'
),
(
  '{"es": "Poder Médico", "en": "Medical Power of Attorney"}',
  'ALL',
  '{"es": {"purpose": "Para que alguien decida por ti en temas de salud", "not_for": "No incluye manejo de dinero o propiedades"}, "en": {"purpose": "For someone to make health decisions for you", "not_for": "Does not include money or property management"}}',
  19.99,
  '{"protections": ["Mis decisiones médicas"]}'
),
(
  '{"es": "Poder para Cuidado de Niños", "en": "Power of Attorney for Child Care"}',
  'ALL',
  '{"es": {"purpose": "Para nombrar un tutor si tú no estás disponible", "not_for": "No reemplaza adopción legal"}, "en": {"purpose": "To name a guardian if you are not available", "not_for": "Does not replace legal adoption"}}',
  19.99,
  '{"protections": ["El cuidado legal de mis hijos"]}'
);
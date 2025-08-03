-- Create questions table with bilingual support
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text JSONB NOT NULL,
  question_type TEXT NOT NULL,
  options JSONB,
  order_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table with bilingual support  
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name JSONB NOT NULL,
  state TEXT NOT NULL,
  description JSONB,
  price DECIMAL,
  template_file_url TEXT,
  recommendation_criteria JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz responses table
CREATE TABLE public.quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID,
  question_id UUID REFERENCES public.questions(id),
  answer JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  product_ids UUID[],
  total_amount DECIMAL,
  stripe_session_id TEXT,
  ghl_webhook_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for questions (public read)
CREATE POLICY "Questions are viewable by everyone" 
ON public.questions FOR SELECT USING (true);

-- Create policies for products (public read)
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

-- Create policies for quiz responses (public insert, no read for privacy)
CREATE POLICY "Anyone can insert quiz responses" 
ON public.quiz_responses FOR INSERT WITH CHECK (true);

-- Create policies for orders (public insert for checkout)
CREATE POLICY "Anyone can insert orders" 
ON public.orders FOR INSERT WITH CHECK (true);
-- Create tables for campaign management
CREATE TABLE IF NOT EXISTS public.campaigns_purchased (
  id BIGSERIAL PRIMARY KEY,
  package_name TEXT NOT NULL,
  package_price TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  instagram_handle TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new',
  notes TEXT
);

CREATE TABLE IF NOT EXISTS public.payments (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT REFERENCES public.campaigns_purchased(id) ON DELETE CASCADE,
  amount TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.uploaded_files (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT REFERENCES public.campaigns_purchased(id) ON DELETE CASCADE,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_campaigns_package_status ON public.campaigns_purchased(package_name, status);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON public.campaigns_purchased(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_campaign_id ON public.payments(campaign_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_campaign_id ON public.uploaded_files(campaign_id);

-- Enable Row Level Security
ALTER TABLE public.campaigns_purchased ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating them to avoid conflicts
DROP POLICY IF EXISTS "Allow all operations on campaigns_purchased" ON public.campaigns_purchased;
DROP POLICY IF EXISTS "Allow all operations on payments" ON public.payments;
DROP POLICY IF EXISTS "Allow all operations on uploaded_files" ON public.uploaded_files;

-- Create policies for public access (you can restrict these later)
CREATE POLICY "Allow all operations on campaigns_purchased" ON public.campaigns_purchased FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on payments" ON public.payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on uploaded_files" ON public.uploaded_files FOR ALL USING (true) WITH CHECK (true);

-- Create storage bucket for campaign files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'campaign-files',
  'campaign-files',
  true,
  52428800, -- 50MB limit
  ARRAY['audio/mpeg', 'audio/wav', 'audio/mp3', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies before recreating them
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- Create storage policies for public access
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'campaign-files');
CREATE POLICY "Allow public downloads" ON storage.objects FOR SELECT USING (bucket_id = 'campaign-files');
CREATE POLICY "Allow public deletes" ON storage.objects FOR DELETE USING (bucket_id = 'campaign-files');

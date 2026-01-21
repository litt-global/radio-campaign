-- Create referral_users table
CREATE TABLE IF NOT EXISTS public.referral_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL CHECK (country IN ('AU', 'US', 'CA')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create referral_banking_details table
CREATE TABLE IF NOT EXISTS public.referral_banking_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_user_id UUID NOT NULL REFERENCES public.referral_users(id) ON DELETE CASCADE,
  account_holder_name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  routing_number TEXT, -- for US
  bsb_number TEXT, -- for AU
  institution_number TEXT, -- for CA
  transit_number TEXT, -- for CA
  country TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create referral_conversions table
-- Fixed foreign key to reference campaigns_purchased(id) instead of campaigns(id)
CREATE TABLE IF NOT EXISTS public.referral_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_user_id UUID NOT NULL REFERENCES public.referral_users(id) ON DELETE CASCADE,
  campaign_id BIGINT NOT NULL REFERENCES public.campaigns_purchased(id) ON DELETE CASCADE,
  order_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  conversion_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_date TIMESTAMPTZ,
  payment_notes TEXT
);

-- Create referral_payments table
CREATE TABLE IF NOT EXISTS public.referral_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_user_id UUID NOT NULL REFERENCES public.referral_users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payment_method TEXT NOT NULL,
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_referral_users_email ON public.referral_users(email);
CREATE INDEX IF NOT EXISTS idx_referral_users_referral_code ON public.referral_users(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_banking_referral_user ON public.referral_banking_details(referral_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_referral_user ON public.referral_conversions(referral_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_status ON public.referral_conversions(status);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_campaign ON public.referral_conversions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_referral_payments_referral_user ON public.referral_payments(referral_user_id);

-- Enable Row Level Security
ALTER TABLE public.referral_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_banking_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referral_users
CREATE POLICY "Users can view their own data" ON public.referral_users
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own data" ON public.referral_users
  FOR INSERT WITH CHECK (true);

-- RLS Policies for referral_banking_details
CREATE POLICY "Users can view their own banking details" ON public.referral_banking_details
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own banking details" ON public.referral_banking_details
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own banking details" ON public.referral_banking_details
  FOR UPDATE USING (true);

-- RLS Policies for referral_conversions
CREATE POLICY "Users can view conversions" ON public.referral_conversions
  FOR SELECT USING (true);

CREATE POLICY "System can create conversions" ON public.referral_conversions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update conversions" ON public.referral_conversions
  FOR UPDATE USING (true);

-- RLS Policies for referral_payments
CREATE POLICY "Users can view their payments" ON public.referral_payments
  FOR SELECT USING (true);

CREATE POLICY "System can create payments" ON public.referral_payments
  FOR INSERT WITH CHECK (true);

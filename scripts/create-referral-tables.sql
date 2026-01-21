-- Referral Users Table
CREATE TABLE IF NOT EXISTS referral_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL CHECK (country IN ('AU', 'US', 'CA')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referral Banking Details Table
CREATE TABLE IF NOT EXISTS referral_banking_details (
  id BIGSERIAL PRIMARY KEY,
  referral_user_id BIGINT NOT NULL REFERENCES referral_users(id) ON DELETE CASCADE,
  account_holder_name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  routing_number TEXT, -- For US
  bsb_number TEXT, -- For Australia
  institution_number TEXT, -- For Canada
  transit_number TEXT, -- For Canada
  country TEXT NOT NULL CHECK (country IN ('AU', 'US', 'CA')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referral Conversions Table
CREATE TABLE IF NOT EXISTS referral_conversions (
  id BIGSERIAL PRIMARY KEY,
  referral_user_id BIGINT NOT NULL REFERENCES referral_users(id) ON DELETE CASCADE,
  campaign_id BIGINT NOT NULL REFERENCES campaigns_purchased(id) ON DELETE CASCADE,
  order_amount NUMERIC(10, 2) NOT NULL,
  commission_amount NUMERIC(10, 2) NOT NULL, -- 20% of order_amount
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  conversion_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_date TIMESTAMP WITH TIME ZONE
);

-- Referral Payments Table
CREATE TABLE IF NOT EXISTS referral_payments (
  id BIGSERIAL PRIMARY KEY,
  referral_user_id BIGINT NOT NULL REFERENCES referral_users(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_method TEXT,
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_referral_users_email ON referral_users(email);
CREATE INDEX IF NOT EXISTS idx_referral_users_code ON referral_users(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_user ON referral_conversions(referral_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_status ON referral_conversions(status);
CREATE INDEX IF NOT EXISTS idx_referral_banking_user ON referral_banking_details(referral_user_id);

-- Enable Row Level Security
ALTER TABLE referral_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_banking_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referral_users (partners can only see their own data)
CREATE POLICY "Users can view their own data" ON referral_users
  FOR SELECT USING (true);

CREATE POLICY "Allow insert for signup" ON referral_users
  FOR INSERT WITH CHECK (true);

-- RLS Policies for referral_banking_details
CREATE POLICY "Users can manage their own banking details" ON referral_banking_details
  FOR ALL USING (true);

-- RLS Policies for referral_conversions
CREATE POLICY "Users can view their own conversions" ON referral_conversions
  FOR SELECT USING (true);

CREATE POLICY "Allow insert for tracking" ON referral_conversions
  FOR INSERT WITH CHECK (true);

-- RLS Policies for referral_payments
CREATE POLICY "Users can view their own payments" ON referral_payments
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to insert payments" ON referral_payments
  FOR INSERT WITH CHECK (true);

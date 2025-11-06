-- Create campaigns_purchased table to track purchased campaigns
CREATE TABLE IF NOT EXISTS campaigns_purchased (
  id SERIAL PRIMARY KEY,
  package_name VARCHAR(255) NOT NULL,
  package_price VARCHAR(50) NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  instagram_handle VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table to store payment details
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns_purchased(id) ON DELETE CASCADE,
  cardholder_name VARCHAR(255) NOT NULL,
  card_last_four VARCHAR(4) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'completed',
  amount VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create uploaded_files table to track uploaded music files
CREATE TABLE IF NOT EXISTS uploaded_files (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns_purchased(id) ON DELETE CASCADE,
  file_type VARCHAR(50) NOT NULL, -- 'song', 'cover', 'intro', 'pronunciation'
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_campaigns_email ON campaigns_purchased(email);
CREATE INDEX IF NOT EXISTS idx_payments_campaign ON payments(campaign_id);
CREATE INDEX IF NOT EXISTS idx_files_campaign ON uploaded_files(campaign_id);

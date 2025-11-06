-- Add status and notes columns to campaigns_purchased table
ALTER TABLE campaigns_purchased 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new',
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create an index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns_purchased(status);

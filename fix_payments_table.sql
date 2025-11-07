-- Add missing columns to payments table
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'completed';

ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS cardholder_name TEXT;

ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS card_last_four TEXT;

-- Verify columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'payments' 
ORDER BY ordinal_position;

-- Add missing columns to the payments table
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS cardholder_name TEXT,
ADD COLUMN IF NOT EXISTS card_last_four TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'payments' 
ORDER BY ordinal_position;

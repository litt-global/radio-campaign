-- Check if payment_method column exists and either add it or remove the constraint
DO $$
BEGIN
    -- Try to add the column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'payments' 
        AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE payments ADD COLUMN payment_method VARCHAR DEFAULT 'card';
        RAISE NOTICE 'Added payment_method column with default value';
    ELSE
        -- If it exists but has NOT NULL constraint, remove it or set a default
        ALTER TABLE payments ALTER COLUMN payment_method DROP NOT NULL;
        ALTER TABLE payments ALTER COLUMN payment_method SET DEFAULT 'card';
        RAISE NOTICE 'Removed NOT NULL constraint from payment_method';
    END IF;
END $$;

-- Show current table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'payments'
ORDER BY ordinal_position;

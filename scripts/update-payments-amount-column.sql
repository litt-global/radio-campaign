-- Update the amount column in payments table to be numeric instead of text
-- First, create a temporary numeric column
ALTER TABLE payments ADD COLUMN amount_numeric NUMERIC(10, 2);

-- Convert existing text amounts to numeric (removing $ and , characters)
UPDATE payments 
SET amount_numeric = CAST(REPLACE(REPLACE(amount, '$', ''), ',', '') AS NUMERIC(10, 2))
WHERE amount IS NOT NULL;

-- Drop the old text column
ALTER TABLE payments DROP COLUMN amount;

-- Rename the new column to amount
ALTER TABLE payments RENAME COLUMN amount_numeric TO amount;

-- Also update package_price in campaigns_purchased to be numeric
ALTER TABLE campaigns_purchased ADD COLUMN package_price_numeric NUMERIC(10, 2);

UPDATE campaigns_purchased 
SET package_price_numeric = CAST(REPLACE(REPLACE(package_price, '$', ''), ',', '') AS NUMERIC(10, 2))
WHERE package_price IS NOT NULL;

ALTER TABLE campaigns_purchased DROP COLUMN package_price;

ALTER TABLE campaigns_purchased RENAME COLUMN package_price_numeric TO package_price;

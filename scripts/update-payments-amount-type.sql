-- Update the amount column to be numeric instead of text
ALTER TABLE payments ALTER COLUMN amount TYPE DECIMAL(10, 2) USING amount::numeric;

-- Also update package_price in campaigns_purchased to be numeric
ALTER TABLE campaigns_purchased ALTER COLUMN package_price TYPE DECIMAL(10, 2) USING package_price::numeric;

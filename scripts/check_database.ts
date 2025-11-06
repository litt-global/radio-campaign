import { neon } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const sql = neon(databaseUrl)

async function checkDatabase() {
  console.log("Checking database state...\n")

  // Check if tables exist
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `

  console.log("Existing tables:")
  console.log(tables)
  console.log("\n")

  // If campaigns_purchased table exists, check its data
  if (tables.some((t) => t.table_name === "campaigns_purchased")) {
    const campaigns = await sql`SELECT * FROM campaigns_purchased;`
    console.log("Campaigns in database:")
    console.log(campaigns)
    console.log(`Total campaigns: ${campaigns.length}\n`)

    const payments = await sql`SELECT * FROM payments;`
    console.log("Payments in database:")
    console.log(payments)
    console.log(`Total payments: ${payments.length}\n`)

    const files = await sql`SELECT * FROM uploaded_files;`
    console.log("Uploaded files in database:")
    console.log(files)
    console.log(`Total files: ${files.length}\n`)
  } else {
    console.log("⚠️  campaigns_purchased table does not exist!")
    console.log("You need to run the migration scripts first.")
  }
}

checkDatabase().catch(console.error)

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || "")

async function checkCompleteSubmission() {
  try {
    console.log("Checking complete submission data...\n")

    // Get the campaign
    const campaigns = await sql`
      SELECT * FROM campaigns_purchased WHERE id = 1
    `
    console.log("Campaign:", campaigns[0])

    // Get associated files
    const files = await sql`
      SELECT * FROM uploaded_files WHERE campaign_id = 1
    `
    console.log("\nUploaded Files:", files)

    // Get payment info
    const payments = await sql`
      SELECT * FROM payments WHERE campaign_id = 1
    `
    console.log("\nPayment Info:", payments)
  } catch (error) {
    console.error("Error:", error)
  }
}

checkCompleteSubmission()

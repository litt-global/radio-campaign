import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifySetup() {
  console.log("Verifying Supabase setup...\n")

  // Check tables
  console.log("Checking tables...")
  const { data: campaigns, error: campaignsError } = await supabase.from("campaigns_purchased").select("*").limit(1)

  if (campaignsError) {
    console.error("❌ campaigns_purchased table:", campaignsError.message)
  } else {
    console.log("✅ campaigns_purchased table exists")
  }

  const { data: payments, error: paymentsError } = await supabase.from("payments").select("*").limit(1)

  if (paymentsError) {
    console.error("❌ payments table:", paymentsError.message)
  } else {
    console.log("✅ payments table exists")
  }

  const { data: files, error: filesError } = await supabase.from("uploaded_files").select("*").limit(1)

  if (filesError) {
    console.error("❌ uploaded_files table:", filesError.message)
  } else {
    console.log("✅ uploaded_files table exists")
  }

  // Check storage bucket
  console.log("\nChecking storage bucket...")
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

  if (bucketsError) {
    console.error("❌ Error listing buckets:", bucketsError.message)
  } else {
    const campaignBucket = buckets.find((b) => b.id === "campaign-files")
    if (campaignBucket) {
      console.log("✅ campaign-files bucket exists")
      console.log("   Public:", campaignBucket.public)
      console.log("   File size limit:", campaignBucket.file_size_limit || "No limit")
    } else {
      console.error("❌ campaign-files bucket not found")
    }
  }

  console.log("\nSetup verification complete!")
}

verifySetup()

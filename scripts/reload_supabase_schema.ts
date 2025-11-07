import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function reloadSchema() {
  console.log("Attempting to reload Supabase schema cache...\n")

  // Method 1: Make a simple query to each table to trigger cache refresh
  console.log("Method 1: Querying tables to trigger cache refresh...")
  try {
    await supabase.from("campaigns_purchased").select("id").limit(1)
    console.log("✓ campaigns_purchased queried")

    await supabase.from("payments").select("id").limit(1)
    console.log("✓ payments queried")

    await supabase.from("uploaded_files").select("id").limit(1)
    console.log("✓ uploaded_files queried")
  } catch (error) {
    console.error("Query error:", error)
  }

  console.log("\n📋 Manual Steps to Reload Schema Cache:")
  console.log("1. Go to: https://supabase.com/dashboard/project/lvwsipqqjfgtanjfgpmj/api")
  console.log('2. Scroll down to find "Schema Cache" or "API Reload" section')
  console.log('3. Click "Reload schema" or "Refresh schema cache" button')
  console.log("4. Wait 10-15 seconds")
  console.log("5. Try submitting a campaign again\n")

  console.log("Alternative: Wait 2-3 minutes - the cache refreshes automatically")
}

reloadSchema()

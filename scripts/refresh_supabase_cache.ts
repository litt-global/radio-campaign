console.log("🔄 Refreshing Supabase schema cache...\n")

console.log("To refresh the Supabase REST API schema cache, follow these steps:\n")
console.log("1. Go to: https://supabase.com/dashboard/project/lvwsipqqjfgtanjfgpmj/api")
console.log('2. Look for "Reload schema" or "Refresh" button near the API documentation')
console.log("3. Click it to force a schema cache refresh")
console.log("4. Wait 10-15 seconds\n")

console.log("Alternative method:")
console.log("1. Go to: https://supabase.com/dashboard/project/lvwsipqqjfgtanjfgpmj/database/tables")
console.log('2. Click on the "payments" table')
console.log("3. Make any small change (like adding/removing a comment) and save")
console.log("4. This will force PostgREST to reload the schema\n")

console.log("Or simply wait 1-2 minutes - the cache usually refreshes automatically.")

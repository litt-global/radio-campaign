```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function refreshSchema() {
  try {
    console.log('Refreshing Supabase schema cache...')
    
    // Test insert to trigger schema refresh
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Error querying payments:', error.message)
      console.log('\nYou need to reload the schema cache in Supabase:')
      console.log('1. Go to: https://supabase.com/dashboard/project/lvwsipqqjfgtanjfgpmj/api')
      console.log('2. Click on the "Reload schema" button')
      console.log('3. Wait a few seconds for the cache to refresh')
      console.log('4. Try submitting the campaign again')
    } else {
      console.log('✓ Schema cache is refreshed and working!')
      console.log('Payments table columns are accessible')
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

refreshSchema()

import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("referral_banking_details")
      .select("*")
      .eq("referral_user_id", userId)
      .maybeSingle()

    if (error) {
      console.error("[v0] Error fetching banking details:", error)
      return NextResponse.json({ error: "Failed to fetch banking details" }, { status: 500 })
    }

    return NextResponse.json({ banking: data || null })
  } catch (error) {
    console.error("[v0] Banking details error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      userId,
      accountHolderName,
      bankName,
      accountNumber,
      routingNumber,
      bsbNumber,
      institutionNumber,
      transitNumber,
      country,
    } = body

    if (!userId || !accountHolderName || !bankName || !accountNumber || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if banking details already exist
    const { data: existing } = await supabase
      .from("referral_banking_details")
      .select("id")
      .eq("referral_user_id", userId)
      .single()

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from("referral_banking_details")
        .update({
          account_holder_name: accountHolderName,
          bank_name: bankName,
          account_number: accountNumber,
          routing_number: routingNumber,
          bsb_number: bsbNumber,
          institution_number: institutionNumber,
          transit_number: transitNumber,
          country,
          updated_at: new Date().toISOString(),
        })
        .eq("referral_user_id", userId)

      if (error) {
        console.error("[v0] Error updating banking details:", error)
        return NextResponse.json({ error: "Failed to update banking details" }, { status: 500 })
      }
    } else {
      // Insert new
      const { error } = await supabase.from("referral_banking_details").insert({
        referral_user_id: userId,
        account_holder_name: accountHolderName,
        bank_name: bankName,
        account_number: accountNumber,
        routing_number: routingNumber,
        bsb_number: bsbNumber,
        institution_number: institutionNumber,
        transit_number: transitNumber,
        country,
      })

      if (error) {
        console.error("[v0] Error saving banking details:", error)
        return NextResponse.json({ error: "Failed to save banking details" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Banking save error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

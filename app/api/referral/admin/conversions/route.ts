import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const partnerId = searchParams.get("partnerId")

    const supabase = await createClient()

    let query = supabase.from("referral_conversions").select(
      `
        *,
        referral_users (
          email,
          referral_code
        ),
        campaigns_purchased (
          artist_name,
          package_name
        )
      `,
    )

    if (partnerId) {
      query = query.eq("referral_user_id", partnerId)
    }

    const { data: conversions, error } = await query.order("conversion_date", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching conversions:", error)
      return NextResponse.json({ error: "Failed to fetch conversions" }, { status: 500 })
    }

    return NextResponse.json({ conversions })
  } catch (error) {
    console.error("[v0] Admin conversions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

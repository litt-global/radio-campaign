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

    // Get total conversions and earnings
    const { data: conversions, error: conversionsError } = await supabase
      .from("referral_conversions")
      .select("*")
      .eq("referral_user_id", userId)

    if (conversionsError) {
      console.error("[v0] Error fetching conversions:", conversionsError)
      return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }

    // Calculate totals
    const totalConversions = conversions?.length || 0
    const totalEarnings = conversions?.reduce((sum, conv) => sum + Number(conv.commission_amount || 0), 0) || 0
    const pendingEarnings =
      conversions
        ?.filter((conv) => conv.status === "pending")
        .reduce((sum, conv) => sum + Number(conv.commission_amount || 0), 0) || 0
    const paidEarnings =
      conversions
        ?.filter((conv) => conv.status === "paid")
        .reduce((sum, conv) => sum + Number(conv.commission_amount || 0), 0) || 0

    // Get recent conversions with campaign details
    const { data: recentConversions, error: recentError } = await supabase
      .from("referral_conversions")
      .select(
        `
        *,
        campaigns_purchased (
          artist_name,
          package_name,
          created_at
        )
      `,
      )
      .eq("referral_user_id", userId)
      .order("conversion_date", { ascending: false })
      .limit(10)

    if (recentError) {
      console.error("[v0] Error fetching recent conversions:", recentError)
    }

    return NextResponse.json({
      stats: {
        totalConversions,
        totalEarnings: totalEarnings.toFixed(2),
        pendingEarnings: pendingEarnings.toFixed(2),
        paidEarnings: paidEarnings.toFixed(2),
      },
      recentConversions: recentConversions || [],
    })
  } catch (error) {
    console.error("[v0] Stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

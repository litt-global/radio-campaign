import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get all referral users with their stats
    const { data: partners, error } = await supabase
      .from("referral_users")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching partners:", error)
      return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
    }

    // Get stats for each partner
    const partnersWithStats = await Promise.all(
      partners.map(async (partner) => {
        const { data: conversions } = await supabase
          .from("referral_conversions")
          .select("*")
          .eq("referral_user_id", partner.id)

        const totalEarnings = conversions?.reduce((sum, conv) => sum + Number(conv.commission_amount || 0), 0) || 0
        const pendingEarnings =
          conversions
            ?.filter((conv) => conv.status === "pending")
            .reduce((sum, conv) => sum + Number(conv.commission_amount || 0), 0) || 0
        const paidEarnings =
          conversions
            ?.filter((conv) => conv.status === "paid")
            .reduce((sum, conv) => sum + Number(conv.commission_amount || 0), 0) || 0

        return {
          ...partner,
          stats: {
            totalConversions: conversions?.length || 0,
            totalEarnings: totalEarnings.toFixed(2),
            pendingEarnings: pendingEarnings.toFixed(2),
            paidEarnings: paidEarnings.toFixed(2),
          },
        }
      }),
    )

    return NextResponse.json({ partners: partnersWithStats })
  } catch (error) {
    console.error("[v0] Admin partners error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

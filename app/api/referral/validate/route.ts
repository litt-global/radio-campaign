import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ valid: false, error: "No code provided" }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if referral code exists and user is active
    const { data: user, error } = await supabase
      .from("referral_users")
      .select("id, email, referral_code, status")
      .eq("referral_code", code)
      .eq("status", "active")
      .single()

    if (error || !user) {
      return NextResponse.json({ valid: false, error: "Invalid or inactive referral code" })
    }

    return NextResponse.json({
      valid: true,
      referralUserId: user.id,
    })
  } catch (error) {
    console.error("[v0] Validate referral error:", error)
    return NextResponse.json({ valid: false, error: "Internal server error" }, { status: 500 })
  }
}

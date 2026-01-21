import { createClient } from "@/lib/supabase/server"
import { verifyPassword } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get user by email
    const { data: user, error } = await supabase.from("referral_users").select("*").eq("email", email).single()

    if (error || !user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if account is active
    if (user.status !== "active") {
      return NextResponse.json({ error: "Account is inactive" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        referral_code: user.referral_code,
        country: user.country,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

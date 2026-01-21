import { createClient } from "@/lib/supabase/server"
import { hashPassword, generateReferralCode } from "@/lib/auth-helpers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, country } = await request.json()

    // Validate inputs
    if (!email || !password || !country) {
      return NextResponse.json({ error: "Email, password, and country are required" }, { status: 400 })
    }

    if (!["AU", "US", "CA"].includes(country)) {
      return NextResponse.json({ error: "Invalid country. Only AU, US, and CA are supported" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: existingUser } = await supabase
      .from("referral_users")
      .select("email")
      .eq("email", email)
      .maybeSingle()

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Generate unique referral code
    let referralCode = generateReferralCode()
    let codeExists = true

    // Ensure referral code is unique
    while (codeExists) {
      const { data } = await supabase
        .from("referral_users")
        .select("referral_code")
        .eq("referral_code", referralCode)
        .maybeSingle()

      if (!data) {
        codeExists = false
      } else {
        referralCode = generateReferralCode()
      }
    }

    // Create referral user
    const { data: newUser, error } = await supabase
      .from("referral_users")
      .insert({
        email,
        password_hash: passwordHash,
        referral_code: referralCode,
        country,
        status: "active",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Signup error:", error)
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        referral_code: newUser.referral_code,
        country: newUser.country,
      },
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

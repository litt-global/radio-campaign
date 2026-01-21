import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { referralCode, campaignId, orderAmount } = await request.json()

    if (!referralCode || !campaignId || !orderAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get referral user by code
    const { data: referralUser, error: userError } = await supabase
      .from("referral_users")
      .select("id, status")
      .eq("referral_code", referralCode)
      .eq("status", "active")
      .single()

    if (userError || !referralUser) {
      console.error("[v0] Invalid referral code:", referralCode)
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 })
    }

    // Calculate 20% commission
    const commissionAmount = (Number(orderAmount) * 0.2).toFixed(2)

    // Create conversion record
    const { data: conversion, error: conversionError } = await supabase
      .from("referral_conversions")
      .insert({
        referral_user_id: referralUser.id,
        campaign_id: campaignId,
        order_amount: orderAmount,
        commission_amount: commissionAmount,
        status: "pending",
      })
      .select()
      .single()

    if (conversionError) {
      console.error("[v0] Error creating conversion:", conversionError)
      return NextResponse.json({ error: "Failed to track conversion" }, { status: 500 })
    }

    console.log("[v0] Conversion tracked:", conversion)

    return NextResponse.json({
      success: true,
      conversion: {
        id: conversion.id,
        commission: commissionAmount,
      },
    })
  } catch (error) {
    console.error("[v0] Track conversion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

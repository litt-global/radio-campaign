import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { partnerId, amount, paymentMethod, notes } = await request.json()

    if (!partnerId || !amount) {
      return NextResponse.json({ error: "Partner ID and amount are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get all pending conversions for this partner
    const { data: pendingConversions, error: fetchError } = await supabase
      .from("referral_conversions")
      .select("id")
      .eq("referral_user_id", partnerId)
      .eq("status", "pending")

    if (fetchError) {
      console.error("[v0] Error fetching pending conversions:", fetchError)
      return NextResponse.json({ error: "Failed to fetch conversions" }, { status: 500 })
    }

    // Mark all pending conversions as paid
    const { error: updateError } = await supabase
      .from("referral_conversions")
      .update({
        status: "paid",
        paid_date: new Date().toISOString(),
      })
      .eq("referral_user_id", partnerId)
      .eq("status", "pending")

    if (updateError) {
      console.error("[v0] Error updating conversions:", updateError)
      return NextResponse.json({ error: "Failed to update conversions" }, { status: 500 })
    }

    // Create payment record
    const { error: paymentError } = await supabase.from("referral_payments").insert({
      referral_user_id: partnerId,
      amount: amount,
      payment_method: paymentMethod || "Manual",
      notes: notes || "",
    })

    if (paymentError) {
      console.error("[v0] Error creating payment record:", paymentError)
      return NextResponse.json({ error: "Failed to create payment record" }, { status: 500 })
    }

    return NextResponse.json({ success: true, conversionsUpdated: pendingConversions?.length || 0 })
  } catch (error) {
    console.error("[v0] Mark paid error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

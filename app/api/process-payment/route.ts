import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: NextRequest) {
  try {
    const { paymentMethodId, packageName, packagePrice, email } = await req.json()

    console.log("[v0] Processing payment:", { packageName, packagePrice, email, paymentMethodId })

    if (!paymentMethodId || !packagePrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Parse price (remove $ and convert to cents)
    const priceString = packagePrice.replace(/[$,]/g, "")
    const amount = Math.round(Number.parseFloat(priceString) * 100)

    console.log("[v0] Parsed amount:", { priceString, amount })

    // Create and confirm payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      description: `LITT Live ${packageName} Campaign`,
      receipt_email: email || undefined,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    })

    console.log("[v0] Payment intent created:", {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    })

    if (paymentIntent.status !== "succeeded") {
      console.error("[v0] Payment intent status:", paymentIntent.status)
      console.error("[v0] Payment intent details:", JSON.stringify(paymentIntent, null, 2))

      // Provide more detailed error message based on status
      let errorMessage = "Payment failed"
      if (paymentIntent.status === "requires_action") {
        errorMessage = "Payment requires additional authentication"
      } else if (paymentIntent.status === "requires_payment_method") {
        errorMessage = "Payment method was declined"
      } else if (paymentIntent.last_payment_error) {
        errorMessage = paymentIntent.last_payment_error.message || "Payment failed"
      }

      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
    const cardLast4 = paymentMethod.card?.last4 || "0000"

    console.log("[v0] Payment successful, card last 4:", cardLast4)

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      cardLast4,
    })
  } catch (error: any) {
    console.error("[v0] Payment processing error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      type: error.type,
      code: error.code,
      decline_code: error.decline_code,
    })

    let errorMessage = "Payment processing failed"
    if (error.type === "StripeCardError") {
      errorMessage = error.message || "Card was declined"
    } else if (error.code) {
      errorMessage = `Payment error: ${error.code}`
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

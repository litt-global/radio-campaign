import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: NextRequest) {
  try {
    const { paymentMethodId, packageName, packagePrice } = await req.json()

    if (!paymentMethodId || !packagePrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Parse price (remove $ and convert to cents)
    const priceString = packagePrice.replace(/[$,]/g, "")
    const amount = Math.round(Number.parseFloat(priceString) * 100)

    // Create and confirm payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      description: `LITT Live ${packageName} Campaign`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    })

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 })
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
    const cardLast4 = paymentMethod.card?.last4 || "0000"

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      cardLast4,
    })
  } catch (error: any) {
    console.error("[v0] Payment processing error:", error)
    return NextResponse.json({ error: error.message || "Payment processing failed" }, { status: 500 })
  }
}

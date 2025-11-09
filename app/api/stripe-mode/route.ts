import { NextResponse } from "next/server"

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY || ""
  const mode = stripeKey.startsWith("sk_test_") ? "test" : stripeKey.startsWith("sk_live_") ? "live" : "unknown"

  return NextResponse.json({ mode })
}

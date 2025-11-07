"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function createPaymentIntent(productId: string) {
  const product = PRODUCTS.find((p) => p.id.toLowerCase() === productId.toLowerCase())

  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "usd",
    payment_method_types: ["card"], // Only allow card payments
    metadata: {
      productId: product.id,
      productName: product.name,
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
    amount: product.priceInCents,
  }
}

"use server"

export async function getStripeMode(): Promise<{
  isTestMode: boolean
  isLiveMode: boolean
  mode: "test" | "live" | "unknown"
}> {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return {
      isTestMode: false,
      isLiveMode: false,
      mode: "unknown",
    }
  }

  const isTestMode = secretKey.startsWith("sk_test_")
  const isLiveMode = secretKey.startsWith("sk_live_")

  return {
    isTestMode,
    isLiveMode,
    mode: isTestMode ? "test" : isLiveMode ? "live" : "unknown",
  }
}

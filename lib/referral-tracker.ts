// Referral tracking utilities

const REFERRAL_CODE_KEY = "referral_code"
const REFERRAL_EXPIRY_KEY = "referral_expiry"
const EXPIRY_DAYS = 30

export function captureReferralCode(): string | null {
  if (typeof window === "undefined") return null

  // Check URL for ref parameter
  const params = new URLSearchParams(window.location.search)
  const refCode = params.get("ref")

  if (refCode) {
    // Store in localStorage with expiry
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS)

    localStorage.setItem(REFERRAL_CODE_KEY, refCode)
    localStorage.setItem(REFERRAL_EXPIRY_KEY, expiryDate.toISOString())

    return refCode
  }

  // Check if we have a stored referral code that hasn't expired
  const storedCode = localStorage.getItem(REFERRAL_CODE_KEY)
  const storedExpiry = localStorage.getItem(REFERRAL_EXPIRY_KEY)

  if (storedCode && storedExpiry) {
    const expiryDate = new Date(storedExpiry)
    if (expiryDate > new Date()) {
      return storedCode
    } else {
      // Clear expired referral
      clearReferralCode()
    }
  }

  return null
}

export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null

  const storedCode = localStorage.getItem(REFERRAL_CODE_KEY)
  const storedExpiry = localStorage.getItem(REFERRAL_EXPIRY_KEY)

  if (storedCode && storedExpiry) {
    const expiryDate = new Date(storedExpiry)
    if (expiryDate > new Date()) {
      return storedCode
    } else {
      clearReferralCode()
    }
  }

  return null
}

export function clearReferralCode(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem(REFERRAL_CODE_KEY)
  localStorage.removeItem(REFERRAL_EXPIRY_KEY)
}

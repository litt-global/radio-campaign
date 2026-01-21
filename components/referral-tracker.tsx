"use client"

import { useEffect } from "react"
import { captureReferralCode } from "@/lib/referral-tracker"

export function ReferralTracker() {
  useEffect(() => {
    const captured = captureReferralCode()
    if (captured) {
      console.log("[v0] Referral code captured:", captured)
    }
  }, [])

  return null
}

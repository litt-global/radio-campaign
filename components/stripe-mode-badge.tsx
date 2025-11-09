"use client"

import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function StripeModeIndicator() {
  const [mode, setMode] = useState<"test" | "live" | "loading">("loading")

  useEffect(() => {
    async function fetchMode() {
      try {
        const response = await fetch("/api/stripe-mode")
        const data = await response.json()
        setMode(data.mode)
      } catch (error) {
        console.error("[v0] Failed to fetch Stripe mode:", error)
        setMode("test")
      }
    }
    fetchMode()
  }, [])

  // Don't show anything while loading or in live mode
  if (mode === "loading" || mode === "live") {
    return null
  }

  // Only show badge when in test mode
  if (mode === "test") {
    return (
      <Badge variant="outline" className="border-yellow-500 bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
        <AlertCircle className="w-3 h-3 mr-1" />
        Test Mode
      </Badge>
    )
  }

  return null
}

export function CheckoutStripeModeIndicator() {
  const [isTestMode, setIsTestMode] = useState<boolean | null>(null)

  useEffect(() => {
    async function fetchMode() {
      try {
        const response = await fetch("/api/stripe-mode")
        const data = await response.json()
        setIsTestMode(data.mode === "test")
      } catch (error) {
        console.error("[v0] Failed to fetch Stripe mode:", error)
        setIsTestMode(false)
      }
    }
    fetchMode()
  }, [])

  if (!isTestMode) {
    return null
  }

  return (
    <Badge variant="outline" className="border-yellow-500 bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
      <AlertCircle className="w-3 h-3 mr-1" />
      Test Mode
    </Badge>
  )
}

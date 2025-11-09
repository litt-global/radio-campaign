"use client"

import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2 } from "lucide-react"
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

  if (mode === "loading") {
    return null
  }

  if (mode === "test") {
    return (
      <Badge variant="outline" className="border-yellow-500 bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
        <AlertCircle className="w-3 h-3 mr-1" />
        Test Mode
      </Badge>
    )
  }

  if (mode === "live") {
    return (
      <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-500 text-xs font-semibold">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Live Mode
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

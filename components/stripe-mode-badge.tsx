import { Badge } from "@/components/ui/badge"
import { getStripeMode } from "@/lib/stripe-mode"
import { AlertCircle } from "lucide-react"

export async function StripeModeIndicator() {
  const { mode } = await getStripeMode()

  if (mode === "test") {
    return (
      <Badge variant="outline" className="border-yellow-500 bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
        <AlertCircle className="w-3 h-3 mr-1" />
        Test Mode
      </Badge>
    )
  }

  // Return null for live mode and unknown mode
  return null
}

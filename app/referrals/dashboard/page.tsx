"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, Users, Clock, CheckCircle2, Copy, Check, LogOut, CreditCard } from "lucide-react"
import Link from "next/link"

interface ReferralUser {
  id: number
  email: string
  referral_code: string
  country: string
}

interface Stats {
  totalConversions: number
  totalEarnings: string
  pendingEarnings: string
  paidEarnings: string
}

interface Conversion {
  id: number
  order_amount: string
  commission_amount: string
  status: string
  conversion_date: string
  campaigns_purchased: {
    artist_name: string
    package_name: string
  }
}

interface BankingDetails {
  account_holder_name: string
  bank_name: string
  account_number: string
  routing_number: string
  bsb_number: string
  institution_number: string
  transit_number: string
  country: string
}

export default function ReferralDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<ReferralUser | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [conversions, setConversions] = useState<Conversion[]>([])
  const [banking, setBanking] = useState<BankingDetails>({
    account_holder_name: "",
    bank_name: "",
    account_number: "",
    routing_number: "",
    bsb_number: "",
    institution_number: "",
    transit_number: "",
    country: "",
  })
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showBanking, setShowBanking] = useState(false)
  const [savingBanking, setSavingBanking] = useState(false)
  const [bankingSuccess, setBankingSuccess] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem("referral_user")
    if (!userStr) {
      router.push("/referrals")
      return
    }

    const userData = JSON.parse(userStr)
    setUser(userData)

    fetchDashboardData(userData.id)
    fetchBankingDetails(userData.id)
  }, [router])

  const fetchDashboardData = async (userId: number) => {
    try {
      const response = await fetch(`/api/referral/stats?userId=${userId}`)
      const data = await response.json()

      if (response.ok) {
        setStats(data.stats)
        setConversions(data.recentConversions || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBankingDetails = async (userId: number) => {
    try {
      const response = await fetch(`/api/referral/banking?userId=${userId}`)
      const data = await response.json()

      if (response.ok && data.banking) {
        setBanking(data.banking)
      }
    } catch (error) {
      console.error("[v0] Error fetching banking details:", error)
    }
  }

  const handleCopyLink = () => {
    if (user) {
      const referralLink = `${window.location.origin}/?ref=${user.referral_code}`
      navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSaveBanking = async () => {
    if (!user) return

    setSavingBanking(true)
    setBankingSuccess(false)

    try {
      const response = await fetch("/api/referral/banking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...banking,
        }),
      })

      if (response.ok) {
        setBankingSuccess(true)
        setTimeout(() => setBankingSuccess(false), 3000)
      }
    } catch (error) {
      console.error("[v0] Error saving banking details:", error)
    } finally {
      setSavingBanking(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("referral_user")
    router.push("/referrals")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src="/images/logo.png" alt="LITT Live" className="h-12 w-auto" />
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Referral Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.email}</h2>
          <p className="text-gray-400">Track your referrals and earnings</p>
        </div>

        {/* Referral Link */}
        <Card className="mb-8 bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Your Referral Link
            </CardTitle>
            <CardDescription>Share this link to earn 20% commission on all campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                readOnly
                value={user ? `${window.location.origin}/?ref=${user.referral_code}` : ""}
                className="bg-zinc-900 border-zinc-800 text-white font-mono"
              />
              <Button
                onClick={handleCopyLink}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
              <DollarSign className="w-4 h-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats?.totalEarnings || "0.00"}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Pending</CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats?.pendingEarnings || "0.00"}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Paid</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats?.paidEarnings || "0.00"}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Referrals</CardTitle>
              <Users className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats?.totalConversions || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Banking Details */}
        <Card className="mb-8 bg-zinc-950 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-pink-500" />
                  Banking Details
                </CardTitle>
                <CardDescription>Add your banking information for monthly payouts</CardDescription>
              </div>
              <Button
                onClick={() => setShowBanking(!showBanking)}
                variant="outline"
                className="border-zinc-700 text-gray-300 hover:bg-zinc-800"
              >
                {showBanking ? "Hide" : "Manage"}
              </Button>
            </div>
          </CardHeader>
          {showBanking && (
            <CardContent className="space-y-4">
              {bankingSuccess && (
                <Alert className="bg-green-950 border-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <AlertDescription className="text-green-300">Banking details saved successfully!</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Account Holder Name</Label>
                  <Input
                    value={banking.account_holder_name}
                    onChange={(e) => setBanking({ ...banking, account_holder_name: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div>
                  <Label>Bank Name</Label>
                  <Input
                    value={banking.bank_name}
                    onChange={(e) => setBanking({ ...banking, bank_name: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
              </div>

              <div>
                <Label>Account Number</Label>
                <Input
                  value={banking.account_number}
                  onChange={(e) => setBanking({ ...banking, account_number: e.target.value })}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>

              {user?.country === "US" && (
                <div>
                  <Label>Routing Number</Label>
                  <Input
                    value={banking.routing_number}
                    onChange={(e) => setBanking({ ...banking, routing_number: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
              )}

              {user?.country === "AU" && (
                <div>
                  <Label>BSB Number</Label>
                  <Input
                    value={banking.bsb_number}
                    onChange={(e) => setBanking({ ...banking, bsb_number: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
              )}

              {user?.country === "CA" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Institution Number</Label>
                    <Input
                      value={banking.institution_number}
                      onChange={(e) => setBanking({ ...banking, institution_number: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <Label>Transit Number</Label>
                    <Input
                      value={banking.transit_number}
                      onChange={(e) => setBanking({ ...banking, transit_number: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-white"
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleSaveBanking}
                disabled={savingBanking}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                {savingBanking ? "Saving..." : "Save Banking Details"}
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Recent Conversions */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle>Recent Conversions</CardTitle>
            <CardDescription>Your latest referral earnings</CardDescription>
          </CardHeader>
          <CardContent>
            {conversions.length > 0 ? (
              <div className="space-y-4">
                {conversions.map((conversion) => (
                  <div key={conversion.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{conversion.campaigns_purchased?.artist_name}</p>
                      <p className="text-sm text-gray-400">{conversion.campaigns_purchased?.package_name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(conversion.conversion_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${Number(conversion.commission_amount).toFixed(2)}</p>
                      <p className={`text-xs ${conversion.status === "paid" ? "text-green-500" : "text-yellow-500"}`}>
                        {conversion.status === "paid" ? "Paid" : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No conversions yet. Start sharing your referral link!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

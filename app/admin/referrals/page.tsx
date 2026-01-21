"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, Users, Clock, CheckCircle2, ArrowLeft, Search, Filter, CreditCard, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"

interface Partner {
  id: number
  email: string
  referral_code: string
  country: string
  status: string
  created_at: string
  stats: {
    totalConversions: number
    totalEarnings: string
    pendingEarnings: string
    paidEarnings: string
  }
}

interface Conversion {
  id: number
  order_amount: string
  commission_amount: string
  status: string
  conversion_date: string
  paid_date: string | null
  referral_users: {
    email: string
    referral_code: string
  }
  campaigns_purchased: {
    artist_name: string
    package_name: string
  }
}

export default function AdminReferralsPage() {
  const router = useRouter()
  const [partners, setPartners] = useState<Partner[]>([])
  const [conversions, setConversions] = useState<Conversion[]>([])
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "Bank Transfer",
    notes: "",
  })
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    fetchPartners()
    fetchConversions()
  }, [])

  useEffect(() => {
    filterPartners()
  }, [searchTerm, statusFilter, partners])

  const fetchPartners = async () => {
    try {
      const response = await fetch("/api/referral/admin/partners")
      const data = await response.json()

      if (response.ok) {
        setPartners(data.partners || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching partners:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchConversions = async () => {
    try {
      const response = await fetch("/api/referral/admin/conversions")
      const data = await response.json()

      if (response.ok) {
        setConversions(data.conversions || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching conversions:", error)
    }
  }

  const filterPartners = () => {
    let filtered = partners

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.referral_code.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter)
    }

    setFilteredPartners(filtered)
  }

  const handleMarkPaid = (partner: Partner) => {
    setSelectedPartner(partner)
    setShowPaymentModal(true)
    setPaymentSuccess(false)
  }

  const handleConfirmPayment = async () => {
    if (!selectedPartner) return

    setPaymentLoading(true)

    try {
      const response = await fetch("/api/referral/admin/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: selectedPartner.id,
          amount: selectedPartner.stats.pendingEarnings,
          paymentMethod: paymentData.paymentMethod,
          notes: paymentData.notes,
        }),
      })

      if (response.ok) {
        setPaymentSuccess(true)
        setTimeout(() => {
          setShowPaymentModal(false)
          setSelectedPartner(null)
          setPaymentData({ paymentMethod: "Bank Transfer", notes: "" })
          fetchPartners()
          fetchConversions()
        }, 2000)
      }
    } catch (error) {
      console.error("[v0] Error marking payment:", error)
    } finally {
      setPaymentLoading(false)
    }
  }

  const totalStats = {
    totalPartners: partners.length,
    activePartners: partners.filter((p) => p.status === "active").length,
    totalPending: partners.reduce((sum, p) => sum + Number(p.stats.pendingEarnings), 0).toFixed(2),
    totalPaid: partners.reduce((sum, p) => sum + Number(p.stats.paidEarnings), 0).toFixed(2),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center">
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
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Image src="/images/logo.png" alt="LITT Live" width={150} height={75} className="h-12 w-auto" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Referral Management
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Partners</CardTitle>
              <Users className="w-4 h-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalStats.totalPartners}</div>
              <p className="text-xs text-gray-500">{totalStats.activePartners} active</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Conversions</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{conversions.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Pending Payments</CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalStats.totalPending}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Paid</CardTitle>
              <DollarSign className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalStats.totalPaid}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle>Filter Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by email or referral code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Partners Table */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle>Referral Partners</CardTitle>
            <CardDescription>Manage partner payouts and view performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Partner</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Code</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Country</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Conversions</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Pending</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Paid</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.map((partner) => (
                    <tr key={partner.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-white text-sm">{partner.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <code className="text-pink-500 text-sm bg-pink-500/10 px-2 py-1 rounded">
                          {partner.referral_code}
                        </code>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{partner.country}</td>
                      <td className="py-4 px-4 text-right text-white text-sm">{partner.stats.totalConversions}</td>
                      <td className="py-4 px-4 text-right text-yellow-500 text-sm font-semibold">
                        ${partner.stats.pendingEarnings}
                      </td>
                      <td className="py-4 px-4 text-right text-green-500 text-sm">${partner.stats.paidEarnings}</td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs ${
                            partner.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-gray-500/10 text-gray-500"
                          }`}
                        >
                          {partner.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {Number(partner.stats.pendingEarnings) > 0 && (
                          <Button
                            onClick={() => handleMarkPaid(partner)}
                            size="sm"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                          >
                            <CreditCard className="w-3 h-3 mr-1" />
                            Mark Paid
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPartners.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400">No partners found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedPartner && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Confirm Payment
              </CardTitle>
              <CardDescription>Mark pending earnings as paid for {selectedPartner.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentSuccess ? (
                <Alert className="bg-green-950 border-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <AlertDescription className="text-green-300">Payment marked as paid successfully!</AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="p-4 bg-zinc-900 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Partner:</span>
                      <span className="text-white font-semibold">{selectedPartner.email}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Referral Code:</span>
                      <code className="text-pink-500 bg-pink-500/10 px-2 py-1 rounded">
                        {selectedPartner.referral_code}
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Amount to Pay:</span>
                      <span className="text-2xl font-bold text-green-500">
                        ${selectedPartner.stats.pendingEarnings}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label>Payment Method</Label>
                    <Select
                      value={paymentData.paymentMethod}
                      onValueChange={(value) => setPaymentData({ ...paymentData, paymentMethod: value })}
                    >
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="PayPal">PayPal</SelectItem>
                        <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Notes (Optional)</Label>
                    <Input
                      placeholder="Transaction ID, reference number, etc."
                      value={paymentData.notes}
                      onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-white"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setShowPaymentModal(false)
                        setSelectedPartner(null)
                        setPaymentData({ paymentMethod: "Bank Transfer", notes: "" })
                      }}
                      variant="outline"
                      className="flex-1 border-zinc-700 text-gray-300 hover:bg-zinc-800"
                      disabled={paymentLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirmPayment}
                      disabled={paymentLoading}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      {paymentLoading ? "Processing..." : "Confirm Payment"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

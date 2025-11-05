"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Simple authentication check
    if (email === "admin@littlive.com" && password === "1") {
      // Successful login - redirect to dashboard
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/60 backdrop-blur-xl border-2 border-pink-500/50 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="text-gray-400 text-sm">LITT Live Administration</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@littlive.com"
                className="bg-black/50 border-pink-500/30 text-white placeholder:text-gray-500 focus:border-pink-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-black/50 border-pink-500/30 text-white placeholder:text-gray-500 focus:border-pink-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 font-semibold py-6"
            >
              Login
            </Button>
          </form>

          {/* Back to Home */}
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-pink-500 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

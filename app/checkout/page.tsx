"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, ImageIcon, Mic, Loader2, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const packageName = searchParams.get("package") || "Package"
  const packagePrice = searchParams.get("price") || "0"

  const [songFile, setSongFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [introLiner, setIntroLiner] = useState<File | null>(null)
  const [pronunciationFile, setPronunciationFile] = useState<File | null>(null)

  const [songPreviewUrl, setSongPreviewUrl] = useState<string | null>(null)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
  const [introPreviewUrl, setIntroPreviewUrl] = useState<string | null>(null)
  const [pronunciationPreviewUrl, setPronunciationPreviewUrl] = useState<string | null>(null)

  const [introError, setIntroError] = useState<string | null>(null)

  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")

  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    return () => {
      if (songPreviewUrl) URL.revokeObjectURL(songPreviewUrl)
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl)
      if (introPreviewUrl) URL.revokeObjectURL(introPreviewUrl)
      if (pronunciationPreviewUrl) URL.revokeObjectURL(pronunciationPreviewUrl)
    }
  }, [songPreviewUrl, coverPreviewUrl, introPreviewUrl, pronunciationPreviewUrl])

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void,
    previewSetter: (url: string | null) => void,
    oldPreviewUrl: string | null,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (oldPreviewUrl) {
        URL.revokeObjectURL(oldPreviewUrl)
      }
      previewSetter(null)
      setter(file)
      const newPreviewUrl = URL.createObjectURL(file)
      setTimeout(() => {
        previewSetter(newPreviewUrl)
      }, 0)
    }
  }

  const handleIntroLinerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (introPreviewUrl) {
        URL.revokeObjectURL(introPreviewUrl)
      }
      setIntroPreviewUrl(null)
      setIntroError(null)
      setIntroLiner(file)
      const newPreviewUrl = URL.createObjectURL(file)
      setTimeout(() => {
        setIntroPreviewUrl(newPreviewUrl)
      }, 0)
    }
  }

  const handlePronunciationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (pronunciationPreviewUrl) {
        URL.revokeObjectURL(pronunciationPreviewUrl)
      }
      setPronunciationPreviewUrl(null)
      setPronunciationFile(file)
      const newPreviewUrl = URL.createObjectURL(file)
      setTimeout(() => {
        setPronunciationPreviewUrl(newPreviewUrl)
      }, 0)
    }
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const limitedDigits = digits.slice(0, 16)
    const formatted = limitedDigits.match(/.{1,4}/g)?.join(" ") || limitedDigits
    return formatted
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const limitedDigits = digits.slice(0, 4)
    if (limitedDigits.length >= 2) {
      return `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(2)}`
    }
    return limitedDigits
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setExpiry(formatted)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const cardNumber = formData.get("cardNumber") as string

    const cleanCardNumber = cardNumber.replace(/\s/g, "")

    if (cleanCardNumber === "4242424242424242") {
      setIsProcessing(true)

      setTimeout(() => {
        setIsProcessing(false)
        setShowConfirmation(true)
      }, 4000)
    } else {
      alert("Please use test card: 4242 4242 4242 4242")
    }
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-pink-500/30 rounded-full animate-ping" />
            </div>
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-32 h-32 text-[#E93CAC] animate-spin" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent">
              Processing Your Payment
            </h2>
            <p className="text-xl text-gray-300">Please wait while we secure your campaign...</p>
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-3 h-3 bg-[#E93CAC] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 bg-[#E93CAC] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 bg-[#E93CAC] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-2 border-green-500/30 bg-black/60 backdrop-blur-xl p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                <CheckCircle2 className="relative w-24 h-24 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            <div className="space-y-4 text-lg text-gray-300">
              <p className="text-xl font-semibold text-white">Your {packageName} campaign has been confirmed.</p>
              <p>Please check your email for confirmation details and next steps.</p>
              <div className="pt-6 pb-4">
                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-6">
                  <p className="text-base text-gray-200">If you have any questions or issues, please contact us at:</p>
                  <a
                    href="mailto:support@littlive.com"
                    className="text-[#E93CAC] hover:text-[#E93CAC]/80 font-semibold text-xl mt-2 inline-block transition-colors"
                  >
                    support@littlive.com
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <Link href="/">
                <Button size="lg" className="bg-[#E93CAC] text-white hover:bg-[#E93CAC]/90 font-bold text-lg px-8">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="text-[#E93CAC] hover:text-[#E93CAC]/80 transition-colors">
            ← Back to Packages
          </Link>
        </div>

        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-4xl font-bold text-center">Complete Your {packageName} Campaign</h1>
          <p className="mb-12 text-center text-gray-400">Upload your content and complete your purchase</p>

          <Card className="relative border-2 border-pink-500/30 bg-black/60 backdrop-blur-xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none" />
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#E93CAC]">Upload Your Content</h2>

                <div className="space-y-2">
                  <Label htmlFor="song" className="text-white text-base">
                    Song File (MP3) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="song"
                      type="file"
                      accept="audio/mp3,audio/mpeg"
                      onChange={(e) => handleFileChange(e, setSongFile, setSongPreviewUrl, songPreviewUrl)}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="song"
                      className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-pink-500/50 bg-black/30 p-6 cursor-pointer transition-all hover:border-pink-500 hover:bg-black/50"
                    >
                      <Music className="h-8 w-8 text-[#E93CAC]" />
                      <div className="text-center">
                        {songFile ? (
                          <p className="text-white font-medium">{songFile.name}</p>
                        ) : (
                          <>
                            <p className="text-white font-medium">Click to upload your song</p>
                            <p className="text-sm text-gray-400">MP3 format only</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {songPreviewUrl && (
                    <div className="mt-4 p-4 bg-black/40 rounded-lg border border-pink-500/30">
                      <p className="text-sm text-gray-300 mb-2">Preview your song:</p>
                      <audio key={songPreviewUrl} controls className="w-full" style={{ height: "40px" }}>
                        <source src={songPreviewUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover" className="text-white text-base">
                    Cover Image *
                  </Label>
                  <div className="relative">
                    <Input
                      id="cover"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setCoverImage, setCoverPreviewUrl, coverPreviewUrl)}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="cover"
                      className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-purple-500/50 bg-black/30 p-6 cursor-pointer transition-all hover:border-purple-500 hover:bg-black/50"
                    >
                      <ImageIcon className="h-8 w-8 text-[#A74AC7]" />
                      <div className="text-center">
                        {coverImage ? (
                          <p className="text-white font-medium">{coverImage.name}</p>
                        ) : (
                          <>
                            <p className="text-white font-medium">Click to upload cover art</p>
                            <p className="text-sm text-gray-400">JPG, PNG, or GIF</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {coverPreviewUrl && (
                    <div className="mt-4 p-4 bg-black/40 rounded-lg border border-purple-500/30">
                      <p className="text-sm text-gray-300 mb-2">Preview your cover art:</p>
                      <div className="flex justify-center">
                        <Image
                          key={coverPreviewUrl}
                          src={coverPreviewUrl || "/placeholder.svg"}
                          alt="Cover art preview"
                          width={200}
                          height={200}
                          className="rounded-lg object-cover border-2 border-purple-500/50"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intro" className="text-white text-base">
                    Artist Intro Liner (Audio) - Max 15 seconds *
                  </Label>
                  <div className="relative">
                    <Input
                      id="intro"
                      type="file"
                      accept="audio/mp3,audio/mpeg"
                      onChange={handleIntroLinerChange}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="intro"
                      className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-pink-500/50 bg-black/30 p-6 cursor-pointer transition-all hover:border-pink-500 hover:bg-black/50"
                    >
                      <Mic className="h-8 w-8 text-[#E93CAC]" />
                      <div className="text-center">
                        {introLiner ? (
                          <p className="text-white font-medium">{introLiner.name}</p>
                        ) : (
                          <>
                            <p className="text-white font-medium">Click to upload your intro</p>
                            <p className="text-sm text-gray-400">MP3 format, 15 seconds max</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {introPreviewUrl && (
                    <div className="mt-4 p-4 bg-black/40 rounded-lg border border-pink-500/30">
                      <p className="text-sm text-gray-300 mb-2">Preview your intro liner:</p>
                      <audio key={introPreviewUrl} controls className="w-full" style={{ height: "40px" }}>
                        <source src={introPreviewUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#E93CAC]">Contact Information</h2>

                <div className="space-y-2">
                  <Label htmlFor="artistName" className="text-white text-base">
                    Artist Name *
                  </Label>
                  <Input
                    id="artistName"
                    name="artistName"
                    type="text"
                    placeholder="Your artist name"
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pronunciation" className="text-white text-base">
                    Artist Name Pronunciation (Optional)
                  </Label>
                  <div className="relative">
                    <Input
                      id="pronunciation"
                      type="file"
                      accept="audio/mp3,audio/mpeg"
                      onChange={handlePronunciationChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="pronunciation"
                      className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-purple-500/50 bg-black/30 p-6 cursor-pointer transition-all hover:border-purple-500 hover:bg-black/50"
                    >
                      <Mic className="h-8 w-8 text-[#A74AC7]" />
                      <div className="text-center">
                        {pronunciationFile ? (
                          <p className="text-white font-medium">{pronunciationFile.name}</p>
                        ) : (
                          <>
                            <p className="text-white font-medium">Click to upload pronunciation</p>
                            <p className="text-sm text-gray-400">MP3 format - Help us say your name right!</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {pronunciationPreviewUrl && (
                    <div className="mt-4 p-4 bg-black/40 rounded-lg border border-purple-500/30">
                      <p className="text-sm text-gray-300 mb-2">Preview your pronunciation:</p>
                      <audio key={pronunciationPreviewUrl} controls className="w-full" style={{ height: "40px" }}>
                        <source src={pronunciationPreviewUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-white text-base">
                    Instagram Handle *
                  </Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    type="text"
                    placeholder="@yourusername"
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-base">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white text-base">
                    Contact Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#E93CAC]">Payment Information</h2>

                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-white text-base">
                    Cardholder Name *
                  </Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    type="text"
                    placeholder="Name"
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-white text-base">
                    Card Number *
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-white text-base">
                      Expiry Date *
                    </Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-white text-base">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      className="bg-black/30 border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#E93CAC] text-white hover:bg-[#E93CAC]/90 font-bold text-lg py-6"
              >
                Purchase {packageName} - {packagePrice}
              </Button>

              <p className="text-center text-sm text-gray-400">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

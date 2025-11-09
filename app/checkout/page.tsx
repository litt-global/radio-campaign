"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, ImageIcon, Mic, CheckCircle2, CreditCard, Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { saveCampaignPurchase } from "@/app/actions/campaign"
import { StripeModeIndicator } from "@/components/stripe-mode-badge"
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: "inherit",
      fontSize: "16px",
      "::placeholder": {
        color: "#6b7280",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
}

function CheckoutForm() {
  const searchParams = useSearchParams()
  const packageName = searchParams.get("package") || "Package"
  const packagePrice = searchParams.get("price") || "0"

  const stripe = useStripe()
  const elements = useElements()

  const [songFile, setSongFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [introLiner, setIntroLiner] = useState<File | null>(null)
  const [pronunciationFile, setPronunciationFile] = useState<File | null>(null)

  const [songPreviewUrl, setSongPreviewUrl] = useState<string | null>(null)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
  const [introPreviewUrl, setIntroPreviewUrl] = useState<string | null>(null)
  const [pronunciationPreviewUrl, setPronunciationPreviewUrl] = useState<string | null>(null)

  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [cardLast4, setCardLast4] = useState<string | null>("0000")
  const [cardElementComplete, setCardElementComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  })
  const [cardElementErrors, setCardElementErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })
  const [fileErrors, setFileErrors] = useState({
    song: false,
    cover: false,
    intro: false,
  })
  const [fieldErrors, setFieldErrors] = useState({
    artistName: false,
    instagram: false,
    phone: false,
    cardName: false,
  })

  const songRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const artistNameRef = useRef<HTMLDivElement>(null)
  const instagramRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const cardNameRef = useRef<HTMLDivElement>(null)

  const [emailError, setEmailError] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email)

    const textFieldErrors = {
      artistName: !formData.get("artistName"),
      instagram: !formData.get("instagram"),
      phone: !formData.get("phone"),
      cardName: !formData.get("cardName"),
    }

    const errors = {
      song: !songFile,
      cover: !coverImage,
      intro: !introLiner,
    }

    setFileErrors(errors)
    setEmailError(!isEmailValid)
    setFieldErrors(textFieldErrors)

    const cardErrors = {
      cardNumber:
        !cardElementComplete.cardNumber && !cardElementErrors.cardNumber
          ? "Card number is required"
          : cardElementErrors.cardNumber,
      cardExpiry:
        !cardElementComplete.cardExpiry && !cardElementErrors.cardExpiry
          ? "Expiry date is required"
          : cardElementErrors.cardExpiry,
      cardCvc:
        !cardElementComplete.cardCvc && !cardElementErrors.cardCvc ? "CVC is required" : cardElementErrors.cardCvc,
    }

    setCardElementErrors(cardErrors)

    const hasCardErrors = cardErrors.cardNumber || cardErrors.cardExpiry || cardErrors.cardCvc
    const hasFieldErrors = Object.values(textFieldErrors).some((error) => error)

    if (errors.song || errors.cover || errors.intro || !isEmailValid || hasCardErrors || hasFieldErrors) {
      if (errors.song && songRef.current) {
        songRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } else if (errors.cover && coverRef.current) {
        coverRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } else if (errors.intro && introRef.current) {
        introRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } else if (textFieldErrors.artistName && artistNameRef.current) {
        artistNameRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } else if (textFieldErrors.instagram && instagramRef.current) {
        instagramRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } else if (!isEmailValid && emailRef.current) {
        emailRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } else if (textFieldErrors.phone && phoneRef.current) {
        phoneRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } else if (textFieldErrors.cardName && cardNameRef.current) {
        cardNameRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setProcessingStep("Validating card details...")

    try {
      const cardNumberElement = elements.getElement(CardNumberElement)

      if (!cardNumberElement) {
        throw new Error("Card element not found")
      }

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: formData.get("cardName") as string,
        },
      })

      if (pmError) {
        throw new Error(pmError.message || "Failed to process card details")
      }

      setProcessingStep("Processing payment...")

      const paymentResponse = await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          packageName,
          packagePrice,
          email,
        }),
      })

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json()
        throw new Error(errorData.error || "Payment failed")
      }

      const { paymentIntentId: piId, cardLast4 } = await paymentResponse.json()
      setPaymentIntentId(piId)
      setCardLast4(cardLast4)

      setProcessingStep("Uploading your files...")

      const uploadFile = async (file: File, fileType: string) => {
        const metadataForm = new FormData()
        metadataForm.append("fileName", file.name)
        metadataForm.append("fileType", fileType)
        metadataForm.append("contentType", file.type)

        const urlResponse = await fetch("/api/upload", {
          method: "POST",
          body: metadataForm,
        })

        if (!urlResponse.ok) {
          throw new Error(`Failed to get upload URL for ${fileType}`)
        }

        const { signedUrl, path } = await urlResponse.json()

        const uploadResponse = await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
            "x-upsert": "false",
          },
        })

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${fileType}`)
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        return `${supabaseUrl}/storage/v1/object/public/campaign-files/${path}`
      }

      const [songUrl, coverUrl, introUrl, pronunciationUrl] = await Promise.all([
        songFile ? uploadFile(songFile, "song") : Promise.resolve(""),
        coverImage ? uploadFile(coverImage, "cover") : Promise.resolve(""),
        introLiner ? uploadFile(introLiner, "intro") : Promise.resolve(""),
        pronunciationFile ? uploadFile(pronunciationFile, "pronunciation") : Promise.resolve(undefined),
      ])

      setProcessingStep("Finalizing your campaign...")

      const result = await saveCampaignPurchase({
        packageName,
        packagePrice,
        artistName: formData.get("artistName") as string,
        instagramHandle: formData.get("instagram") as string,
        email,
        phone: formData.get("phone") as string,
        songUrl,
        coverImageUrl: coverUrl,
        introLinerUrl: introUrl,
        pronunciationUrl,
        cardName: formData.get("cardName") as string,
        cardLast4: cardLast4 || "0000",
        paymentIntentId: piId,
      })

      if (!result.success) {
        throw new Error(result.error || "Failed to save campaign")
      }

      setTimeout(() => {
        setIsProcessing(false)
        setProcessingStep("")
        setShowConfirmation(true)
      }, 1000)
    } catch (error) {
      console.error("[v0] Error submitting campaign:", error)
      setIsProcessing(false)
      setProcessingStep("")
      alert(error instanceof Error ? error.message : "There was an error processing your purchase. Please try again.")
    }
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
              {paymentIntentId && <p className="text-sm text-gray-400">Payment ID: {paymentIntentId}</p>}
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

        <div className="mx-auto max-w-3xl mb-6">
          {/* StripeModeIndicator is now inline with Payment Information heading */}
        </div>

        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-4xl font-bold text-center">Complete Your {packageName} Campaign</h1>
          <p className="mb-12 text-center text-gray-400">Upload your content and complete your purchase</p>

          <Card className="relative border-2 border-pink-500/30 bg-black/60 backdrop-blur-xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none" />
            <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#E93CAC]">Upload Your Content</h2>

                <div className="space-y-2" ref={songRef}>
                  <Label htmlFor="song" className="text-white text-base">
                    Song File (MP3) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="song"
                      type="file"
                      accept="audio/mp3,audio/mpeg"
                      onChange={(e) => {
                        handleFileChange(e, setSongFile, setSongPreviewUrl, songPreviewUrl)
                        setFileErrors((prev) => ({ ...prev, song: false }))
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="song"
                      className={`flex items-center justify-center gap-3 rounded-lg border-2 border-dashed ${
                        fileErrors.song ? "border-red-500" : "border-pink-500/50"
                      } bg-black/30 p-6 cursor-pointer transition-all hover:border-pink-500 hover:bg-black/50`}
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
                  {fileErrors.song && <p className="text-red-500 text-sm mt-1">Please upload your song file</p>}
                </div>

                <div className="space-y-2" ref={coverRef}>
                  <Label htmlFor="cover" className="text-white text-base">
                    Cover Image *
                  </Label>
                  <div className="relative">
                    <Input
                      id="cover"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFileChange(e, setCoverImage, setCoverPreviewUrl, coverPreviewUrl)
                        setFileErrors((prev) => ({ ...prev, cover: false }))
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="cover"
                      className={`flex items-center justify-center gap-3 rounded-lg border-2 border-dashed ${
                        fileErrors.cover ? "border-red-500" : "border-purple-500/50"
                      } bg-black/30 p-6 cursor-pointer transition-all hover:border-purple-500 hover:bg-black/50`}
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
                  {fileErrors.cover && <p className="text-red-500 text-sm mt-1">Please upload your cover image</p>}
                </div>

                <div className="space-y-2" ref={introRef}>
                  <Label htmlFor="intro" className="text-white text-base">
                    Artist Intro Liner (Audio) - Max 15 seconds *
                  </Label>
                  <div className="relative">
                    <Input
                      id="intro"
                      type="file"
                      accept="audio/mp3,audio/mpeg"
                      onChange={(e) => {
                        handleIntroLinerChange(e)
                        setFileErrors((prev) => ({ ...prev, intro: false }))
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="intro"
                      className={`flex items-center justify-center gap-3 rounded-lg border-2 border-dashed ${
                        fileErrors.intro ? "border-red-500" : "border-pink-500/50"
                      } bg-black/30 p-6 cursor-pointer transition-all hover:border-pink-500 hover:bg-black/50`}
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
                  {fileErrors.intro && (
                    <p className="text-red-500 text-sm mt-1">Please upload your artist intro liner</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#E93CAC]">Contact Information</h2>

                <div className="space-y-2" ref={artistNameRef}>
                  <Label htmlFor="artistName" className="text-white text-base">
                    Artist Name *
                  </Label>
                  <Input
                    id="artistName"
                    name="artistName"
                    type="text"
                    placeholder="Your artist name"
                    required
                    onChange={() => setFieldErrors((prev) => ({ ...prev, artistName: false }))}
                    className={`bg-black/30 text-white placeholder:text-gray-500 focus:border-pink-500 ${
                      fieldErrors.artistName ? "border-red-500 border-2" : "border-white/20"
                    }`}
                  />
                  {fieldErrors.artistName && <p className="text-red-500 text-sm mt-1">Artist name is required</p>}
                </div>

                <div className="space-y-2" ref={instagramRef}>
                  <Label htmlFor="instagram" className="text-white text-base">
                    Instagram Handle *
                  </Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    type="text"
                    placeholder="@yourusername"
                    required
                    onChange={() => setFieldErrors((prev) => ({ ...prev, instagram: false }))}
                    className={`bg-black/30 text-white placeholder:text-gray-500 focus:border-pink-500 ${
                      fieldErrors.instagram ? "border-red-500 border-2" : "border-white/20"
                    }`}
                  />
                  {fieldErrors.instagram && <p className="text-red-500 text-sm mt-1">Instagram handle is required</p>}
                </div>

                <div className="space-y-2" ref={phoneRef}>
                  <Label htmlFor="phone" className="text-white text-base">
                    Contact Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    onChange={() => setFieldErrors((prev) => ({ ...prev, phone: false }))}
                    className={`bg-black/30 text-white placeholder:text-gray-500 focus:border-pink-500 ${
                      fieldErrors.phone ? "border-red-500 border-2" : "border-white/20"
                    }`}
                  />
                  {fieldErrors.phone && <p className="text-red-500 text-sm mt-1">Contact number is required</p>}
                </div>

                <div className="space-y-2" ref={emailRef}>
                  <Label htmlFor="email" className="text-white text-base">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    onChange={() => setEmailError(false)}
                    className={`bg-black/30 text-white placeholder:text-gray-500 focus:border-pink-500 transition-colors ${
                      emailError ? "border-red-500 border-2" : "border-white/20"
                    }`}
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>}
                </div>
              </div>

              <div className="space-y-6">
                {/* Flex container with StripeModeIndicator positioned to the right of heading */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#E93CAC]">Payment Information</h2>
                  <StripeModeIndicator />
                </div>

                <div className="space-y-2" ref={cardNameRef}>
                  <Label htmlFor="cardName" className="text-white text-base">
                    Cardholder Name *
                  </Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={() => setFieldErrors((prev) => ({ ...prev, cardName: false }))}
                    className={`bg-black/30 text-white placeholder:text-gray-500 focus:border-pink-500 transition-colors ${
                      fieldErrors.cardName ? "border-red-500 border-2" : "border-white/20"
                    }`}
                  />
                  {fieldErrors.cardName && <p className="text-red-500 text-sm mt-1">Cardholder name is required</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-base">Card Number *</Label>
                  <div className="relative">
                    <div
                      className={`bg-black/30 border rounded-md p-3 pl-12 focus-within:border-pink-500 transition-colors pt-3.5 pb-3.5 ${
                        cardElementErrors.cardNumber ? "border-red-500 border-2" : "border-white/20"
                      }`}
                    >
                      <CardNumberElement
                        options={CARD_ELEMENT_OPTIONS}
                        onChange={(e) => {
                          setCardElementComplete((prev) => ({ ...prev, cardNumber: e.complete }))
                          setCardElementErrors((prev) => ({
                            ...prev,
                            cardNumber: e.error?.message || "",
                          }))
                        }}
                      />
                    </div>
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                  {cardElementErrors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{cardElementErrors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white text-base">Expiry Date *</Label>
                    <div
                      className={`bg-black/30 border rounded-md p-3 focus-within:border-pink-500 transition-colors ${
                        cardElementErrors.cardExpiry ? "border-red-500 border-2" : "border-white/20"
                      }`}
                    >
                      <CardExpiryElement
                        options={CARD_ELEMENT_OPTIONS}
                        onChange={(e) => {
                          setCardElementComplete((prev) => ({ ...prev, cardExpiry: e.complete }))
                          setCardElementErrors((prev) => ({
                            ...prev,
                            cardExpiry: e.error?.message || "",
                          }))
                        }}
                      />
                    </div>
                    {cardElementErrors.cardExpiry && (
                      <p className="text-red-500 text-sm mt-1">{cardElementErrors.cardExpiry}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-base">CVC *</Label>
                    <div
                      className={`bg-black/30 border rounded-md p-3 focus-within:border-pink-500 transition-colors ${
                        cardElementErrors.cardCvc ? "border-red-500 border-2" : "border-white/20"
                      }`}
                    >
                      <CardCvcElement
                        options={CARD_ELEMENT_OPTIONS}
                        onChange={(e) => {
                          setCardElementComplete((prev) => ({ ...prev, cardCvc: e.complete }))
                          setCardElementErrors((prev) => ({
                            ...prev,
                            cardCvc: e.error?.message || "",
                          }))
                        }}
                      />
                    </div>
                    {cardElementErrors.cardCvc && (
                      <p className="text-red-500 text-sm mt-1">{cardElementErrors.cardCvc}</p>
                    )}
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-white mb-1">Secure Payment</p>
                    <p>Your payment information is encrypted and processed securely through Stripe.</p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#E93CAC] text-white hover:bg-[#E93CAC]/90 font-bold text-lg py-6"
                disabled={isProcessing || !stripe}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {processingStep}
                  </span>
                ) : (
                  `Purchase ${packageName} - ${packagePrice}`
                )}
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

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { useState } from "react"
import { AkonModal } from "@/components/akon-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const packages = [
    {
      name: "SPARK",
      price: "$499",
      period: "30 day campaign",
      quote: "Your first spins. Your voice on air.",
      color: "from-pink-500/20 to-purple-500/20",
      borderColor: "border-pink-500/50",
      features: [
        "Airplay on 1 genre-matched station",
        "3 plays per day × 30 days = 90 plays",
        "Self recorded intro liner before your song plays",
        "Featured in LITT Spotlight station",
        "1× IG Reel feature on @LITTXLIVE 30 days",
      ],
    },
    {
      name: "WAVE",
      price: "$999",
      period: "30 day campaign",
      quote: "Your voice. Your song. Your wave.",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/50",
      features: [
        "Airplay on 2 genre-matched stations",
        "6 plays/day x 30 days = 180 plays",
        "Self recorded intro liner before your song plays",
        "Featured in LITT Spotlight station",
        "2 x IG Reel features on @LITTXLIVE 30 days",
        "Feature in LITT Live News drop to email base of 400,000+ emails",
      ],
    },
    {
      name: "PRIME",
      price: "$1,999",
      period: "30 day campaign",
      quote: "Prime time presence.",
      color: "from-pink-500/30 to-purple-600/30",
      borderColor: "border-pink-500/60",
      features: [
        "Airplay on 3 genre-matched stations",
        "8 plays/day × 30 days = 240 plays",
        "Self recorded intro liner before your song plays",
        "Featured in LITT Spotlight station",
        "Homepage carousel feature - 7 days (web + app)",
        "3 x IG Reel features on @LITTXLIVE 30 days",
      ],
    },
    {
      name: "EXEC",
      price: "$2,999",
      period: "30 day campaign",
      quote: "Sound like a star. Move like an exec.",
      color: "from-purple-600/30 to-pink-600/30",
      borderColor: "border-purple-500/60",
      features: [
        "Airplay on 4 genre-matched stations",
        "12 plays / day x 30 days = 360 plays",
        "Self recorded intro liner before your song plays",
        "Featured in LITT Spotlight station",
        "Homepage carousel feature - 14 days (web + app)",
        "4 x IG Reel features on @LITTXLIVE 30 days",
        "Feature in LITT Live News drop to email base of 400,000+ emails",
      ],
    },
    {
      name: "ICON",
      price: "$4,999",
      period: "30 day campaign",
      quote: "Icon energy – your voice across the network.",
      color: "from-pink-600/40 to-purple-700/40",
      borderColor: "border-pink-500/70",
      features: [
        "Airplay on 5 genre-matched stations",
        "24 plays / day x 30 days = 720 plays",
        "Self recorded intro liner before your song plays",
        "Featured in LITT Spotlight station",
        "Homepage carousel feature - 30 days (web + app)",
        "5 x IG Reel features on @LITTXLIVE 30 days",
        "IG Collab Post 30 Days Minimum",
        "Feature in LITT Live News drop to email base of 400,000+ emails",
        "30 second Akon recorded promo of your song programmed 1 time per day for the 30 day campaign",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#2B0F45] to-black text-white">
      {/* Hero Content */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://player.vimeo.com/video/1137944257?background=1&autoplay=1&loop=1&muted=1"
            title="Hero Background Video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              border: "none",
            }}
          />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-12 md:py-0 text-center h-full min-h-screen flex flex-col justify-center items-center">
          <div className="mx-auto max-w-4xl space-y-4">
            <div className="flex justify-center">
              <Image
                src="/images/design-mode/LITT%20Live%20logo%20new.png"
                alt="LITT Live"
                width={300}
                height={150}
                className="h-18 md:h-30 w-auto"
                priority
              />
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-balance md:text-7xl">
              Promote Your Music on{" "}
              <span className="bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] bg-clip-text text-transparent">
                LITT Live
              </span>
            </h1>
            <div className="space-y-2">
              <p className="text-xl text-gray-300 md:text-2xl text-balance">
                Air your track across 40 global radio stations and tap into over 2 million listening hours. This is your
                chance to get heard and seen by millions of online listeners.
              </p>
              <p className="text-lg text-[#E93CAC] md:text-xl text-balance font-semibold italic">
                From 1 spin to heavy rotation. Your road to super Stardom begins here!
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#campaigns">
                <Button
                  size="lg"
                  className="bg-[#E93CAC] text-white hover:bg-[#E93CAC]/90 px-8 py-6 text-lg font-semibold"
                >
                  Buy a Campaign
                </Button>
              </Link>
            </div>

            {/* Animated wave decoration */}
            <div className="relative mt-16 opacity-30">
              <svg className="mx-auto w-full max-w-3xl" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 Q300,50 600,100 T1200,100" fill="none" stroke="url(#gradient)" strokeWidth="3">
                  <animate
                    attributeName="d"
                    dur="5s"
                    repeatCount="indefinite"
                    values="M0,100 Q300,50 600,100 T1200,100;
                            M0,100 Q300,150 600,100 T1200,100;
                            M0,100 Q300,50 600,100 T1200,100"
                  />
                </path>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E93CAC" />
                    <stop offset="100%" stopColor="#A74AC7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="campaigns" className="container mx-auto px-4 py-20">
        <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">Choose Your Campaign</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-2 ${pkg.borderColor} bg-black/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} pointer-events-none`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col h-full space-y-6 p-6">
                {/* Package Name */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#E93CAC]">{pkg.price}</span>
                    <span className="text-gray-400 text-xs">{pkg.period}</span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm italic text-gray-300 border-l-2 border-[#E93CAC] pl-3">{pkg.quote}</p>

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 shrink-0 text-[#E93CAC] mt-0.5" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Buy Button */}
                <Link href={`/checkout?package=${encodeURIComponent(pkg.name)}&price=${encodeURIComponent(pkg.price)}`}>
                  <Button className="w-full bg-[#E93CAC] text-white hover:bg-[#E93CAC]/90 font-semibold py-6">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Akon & Konvict Kulture Section */}
      <section className="relative w-full min-h-screen md:min-h-[600px] md:aspect-video overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://player.vimeo.com/video/1131971529?background=1&autoplay=1&loop=1&muted=1"
            title="Akon Background Video"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              border: "none",
            }}
          />
        </div>

        {/* Dark overlay for readability - stronger on mobile */}
        <div className="absolute inset-0 bg-black/80 md:bg-black/70" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E93CAC]/10 to-transparent animate-pulse" />

        {/* Content */}
        <div className="relative container mx-auto max-w-5xl h-full min-h-screen md:min-h-full flex flex-col justify-center items-center text-center space-y-4 sm:space-y-6 px-4 sm:px-6 py-12 sm:py-16">
          {/* Headline with glow effect */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white animate-fade-in leading-tight">
            <span className="inline-block animate-glow">
              Use the same system used by Akon and the Konvict Kulture label
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-1 px-2">
            Akon and his label, Konvict Kulture, use LITT Live as one of their key platforms to break new artists. When they release a record, they run it through our network because it gets real listeners, real exposure, and real momentum.
          </p>

          {/* Supporting tagline */}
          <p className="text-xs sm:text-sm md:text-base text-[#E93CAC] uppercase tracking-wider font-semibold italic animate-fade-in-delay-2 px-2">
            You don't need to be signed to a label to use the exact same tools they do.
          </p>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4 animate-fade-in-delay-3">
            <Link href="#campaigns">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] text-white hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-7 text-sm sm:text-base md:text-lg font-bold rounded-full"
              >
                Submit Your Song Now
              </Button>
            </Link>
          </div>

          {/* Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12 pt-6 sm:pt-8 animate-fade-in-delay-4">
            {/* LITT Live Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/design-mode/LITT%20Live%20logo%20new.png"
                alt="LITT Live"
                width={120}
                height={120}
                className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>

            {/* Partnership indicator */}
            <div className="text-lg sm:text-xl md:text-2xl text-[#E93CAC] font-bold">×</div>

            {/* Konvict Kulture Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/design-mode/Konvict_Kulture_Logo%20%281%29.png"
                alt="Konvict Kulture"
                width={120}
                height={120}
                className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            {/* App Store Badges */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-400">Available Everywhere</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://apps.apple.com/au/app/litt-live-radio/id907383542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/images/design-mode/App%20store%20badge.webp"
                    alt="Download on the App Store"
                    width={160}
                    height={53}
                    className="h-12 w-auto"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.dashradio.dash&hl=en_AU&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/images/design-mode/Google%20playstore%20badge.webp"
                    alt="Get it on Google Play"
                    width={180}
                    height={53}
                    className="h-12 w-auto"
                  />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © 2025 LITT Live. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Akon Modal */}
      <AkonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
    </div>
  )
}

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Music, ImageIcon, Mic } from "lucide-react"
import { useState } from "react"

interface AkonModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AkonModal({ isOpen, onClose }: AkonModalProps) {
  const [songFile, setSongFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [introFile, setIntroFile] = useState<File | null>(null)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("[v0] Form submitted")

    onClose()

    // Wait for modal to close, then scroll to campaigns
    setTimeout(() => {
      const campaignsSection = document.getElementById("campaigns")
      if (campaignsSection) {
        campaignsSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black/60 backdrop-blur-xl border-2 border-pink-500/50">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 pointer-events-none" />

        <div className="relative p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Submit Your Song</h2>
              <p className="text-gray-300 mt-2">Get reviewed by Akon & Konvict Kulture</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Song File Upload */}
            <div className="space-y-2">
              <Label htmlFor="song" className="text-white font-semibold">
                Song File (MP3) *
              </Label>
              <div className="relative">
                <input
                  type="file"
                  id="song"
                  accept=".mp3,audio/mpeg"
                  onChange={(e) => setSongFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="song"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-pink-500/50 rounded-lg bg-black/40 hover:bg-black/60 cursor-pointer transition-colors"
                >
                  <Music className="h-6 w-6 text-pink-500" />
                  <div className="text-center">
                    <p className="text-white font-medium">{songFile ? songFile.name : "Click to upload your song"}</p>
                    <p className="text-sm text-gray-400">MP3 format only</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="cover" className="text-white font-semibold">
                Cover Image *
              </Label>
              <div className="relative">
                <input
                  type="file"
                  id="cover"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="cover"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-purple-500/50 rounded-lg bg-black/40 hover:bg-black/60 cursor-pointer transition-colors"
                >
                  <ImageIcon className="h-6 w-6 text-purple-500" />
                  <div className="text-center">
                    <p className="text-white font-medium">
                      {coverImage ? coverImage.name : "Click to upload cover art"}
                    </p>
                    <p className="text-sm text-gray-400">JPG, PNG, or GIF</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Artist Intro Liner Upload */}
            <div className="space-y-2">
              <Label htmlFor="intro" className="text-white font-semibold">
                Artist Intro Liner (Audio) *
              </Label>
              <div className="relative">
                <input
                  type="file"
                  id="intro"
                  accept=".mp3,.wav,.m4a,audio/*"
                  onChange={(e) => setIntroFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label
                  htmlFor="intro"
                  className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-pink-500/50 rounded-lg bg-black/40 hover:bg-black/60 cursor-pointer transition-colors"
                >
                  <Mic className="h-6 w-6 text-pink-500" />
                  <div className="text-center">
                    <p className="text-white font-medium">
                      {introFile ? introFile.name : "Click to upload your intro"}
                    </p>
                    <p className="text-sm text-gray-400">MP3, WAV, or M4A</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#E93CAC]">Contact Information</h3>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-white">
                  Instagram Handle *
                </Label>
                <Input
                  id="instagram"
                  placeholder="@yourusername"
                  required
                  className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Contact Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                  className="bg-black/40 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E93CAC] to-[#A74AC7] text-white hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 py-6 text-lg font-bold"
            >
              Submit for Review
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const artistImages = ["/images/akon.jpg", "/images/shaq1.jpg", "/images/ice-cube.jpg", "/images/snoop1.jpg"]

export function TrustedByLegendsBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % artistImages.length)
    }, 2000) // Rotate every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0">
      {artistImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`Artist ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
    </div>
  )
}

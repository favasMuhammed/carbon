"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const environmentalTerms = [
  { text: "OCEAN", color: "text-[#4ea4d1]" },
  { text: "LANDFILLS", color: "text-[#4ea4d1]" },
  { text: "RIVERS", color: "text-[#4ea4d1]" },
  { text: "BEACHES", color: "text-[#4ea4d1]" },
  { text: "CITIES", color: "text-[#4ea4d1]" },
]

export default function AnimatedBanner() {
  const [currentTermIndex, setCurrentTermIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentTermIndex((prevIndex) => (prevIndex + 1) % environmentalTerms.length)
        setIsAnimating(false)
      }, 500) // Wait for animation to complete before changing text
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const currentTerm = environmentalTerms[currentTermIndex]

  return (
    <>
      {/* Banner Content */}
      <div className="flex flex-col  items-center py-8">
        {/* Top Banner Image */}
        <div className="w-full max-w-5xl">
          <Image
            src="/images/banner top.png"
            alt="Decorative waste banner"
            width={1000}
            height={200}
            className="w-full h-auto"
          />
        </div>

        {/* Animated Text */}
        <div className="text-center md:my-4 h-30 md:h-50 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-[400] text-gray-800 md:leading-[45px] mb-4">Here to Declutter</h2>
          <div className="h-45 flex items-center justify-center overflow-hidden">
            <h1
              className={`text-7xl md:text-9xl font-bold ${currentTerm.color} transition-transform duration-75 ease-in ${
                isAnimating ? "transform translate-y-full opacity-0" : "transform translate-y-0 opacity-100"
              }`}
            >
              {currentTerm.text}
            </h1>
          </div>
        </div>

        {/* Bottom Banner Image */}
        <div className="w-full max-w-5xl">
          <Image
            src="/images/banner bottom.png"
            alt="Decorative waste banner"
            width={1000}
            height={200}
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  )
}

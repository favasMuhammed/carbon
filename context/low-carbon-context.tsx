"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type LowCarbonContextType = {
  isLowCarbon: boolean
  setIsLowCarbon: React.Dispatch<React.SetStateAction<boolean>>
  toggleLowCarbon: () => void
}

const LowCarbonContext = createContext<LowCarbonContextType | undefined>(undefined)

export function LowCarbonProvider({ children }: { children: React.ReactNode }) {
  // Try to get the initial state from localStorage if available (client-side only)
  const [isLowCarbon, setIsLowCarbon] = useState<boolean>(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem("isLowCarbon")
    if (storedValue) {
      setIsLowCarbon(storedValue === "true")
    }
  }, [])

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("isLowCarbon", isLowCarbon.toString())

    // Also dispatch the custom event for backward compatibility
    window.dispatchEvent(new CustomEvent("lowCarbonModeChange", { detail: isLowCarbon }))
  }, [isLowCarbon])

  const toggleLowCarbon = () => {
    setIsLowCarbon((prev) => !prev)
  }

  return (
    <LowCarbonContext.Provider value={{ isLowCarbon, setIsLowCarbon, toggleLowCarbon }}>
      {children}
    </LowCarbonContext.Provider>
  )
}

export function useLowCarbon() {
  const context = useContext(LowCarbonContext)
  if (context === undefined) {
    throw new Error("useLowCarbon must be used within a LowCarbonProvider")
  }
  return context
}

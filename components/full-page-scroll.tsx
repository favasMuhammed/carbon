"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface FullPageScrollProps {
  children: React.ReactNode
  className?: string
}

export function FullPageScroll({ children, className }: FullPageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const sections = React.Children.toArray(children)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const scrollToSection = useCallback(
    (index: number) => {
      if (isScrolling.current) return

      const newIndex = Math.max(0, Math.min(index, sections.length - 1))
      if (newIndex === activeSection) return

      isScrolling.current = true
      const container = containerRef.current
      if (container) {
        const sectionElement = container.children[newIndex] as HTMLElement
        sectionElement.scrollIntoView({ behavior: "smooth" })
        setActiveSection(newIndex)

        // Reset scrolling flag after animation
        clearTimeout(scrollTimeout.current)
        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false
        }, 1000) // Adjust based on your transition duration
      }
    },
    [activeSection, sections],
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling.current) return

      const direction = e.deltaY > 0 ? 1 : -1
      scrollToSection(activeSection + direction)
    },
    [activeSection, scrollToSection],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isScrolling.current) return

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault()
          scrollToSection(activeSection + 1)
          break
        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          scrollToSection(activeSection - 1)
          break
      }
    },
    [activeSection, scrollToSection],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      container.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      clearTimeout(scrollTimeout.current)
    }
  }, [handleKeyDown, handleWheel])

  return (
    <div ref={containerRef} className={cn("h-screen overflow-hidden", className)}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="h-screen w-full flex items-center justify-center snap-start">
          {child}
        </div>
      ))}
    </div>
  )
}


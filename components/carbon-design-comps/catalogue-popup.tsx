"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CarbonPopup } from "../carbon-popup"

interface CataloguePopupProps {
  onClose: () => void
  onUserInteract: () => void
}

export default function CataloguePopup({ onClose }: CataloguePopupProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleDownloadClick = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    onClose() // closes the popup in the parent
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-xs w-full mx-4 animate-fade-in">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="pr-4 text-center">
            <p className="text-sm mb-3">
              Download our catalogue & join us in reducing carbon emissions from browsing!
            </p>
            <Button
              className="bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-8 py-6 rounded-lg transition-colors hover:opacity-90"
              onClick={handleDownloadClick}
            >
              Download
            </Button>
          </div>
        </div>
      </div>

      <CarbonPopup isOpen={isPopupOpen} onClose={handleClosePopup} type="designs" />
    </>
  )
}

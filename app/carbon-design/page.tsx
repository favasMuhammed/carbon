"use client"

import { useEffect, useState } from "react"

import BannerCarousel from "@/components/carbon-design-comps/banner-carousel"
import ProductCategories from "@/components/carbon-design-comps/product-categories"
import ClientFavorites from "@/components/carbon-design-comps/client-favorites"
import ClientTestimonial from "@/components/carbon-design-comps/client-testimonial"
import CataloguePopup from "@/components/carbon-design-comps/catalogue-popup"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    setShowPopup(true)
  }, [])

  const handleUserInteraction = () => {
    setShowPopup(false)
  }

  return (
    <main className="min-h-screen">
      <div className="relative">
        <BannerCarousel />
        {showPopup && (
          <CataloguePopup
            onClose={handleUserInteraction}
            onUserInteract={handleUserInteraction}
          />
        )}
      </div>

      <div className="container mx-auto px-4 md:py-12">
        <ProductCategories />
        <ClientFavorites />
        <ClientTestimonial />
      </div>
      <Footer />
    </main>
  )
}

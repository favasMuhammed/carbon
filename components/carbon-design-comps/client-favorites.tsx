/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Define proper types for our data
type ColorOption = {
  name: string
  value: string
  image: string
}

type Product = {
  id: number
  name: string
  link: string
  price: string
  colors: ColorOption[]
  defaultColor: string
}

export default function ClientFavorites() {
  // Restructured data with direct color-to-image mapping
  const products: Product[] = [
    {
      id: 1,
      name: "Terris Dining set",
      price: "Rs: 32,600",
      link: "/carbon-design/product/1",
      defaultColor: "green",
      colors: [
        { name: "Green", value: "green", image: "/images/client-fav-1.png" },
        { name: "Orange", value: "orange", image: "/images/terris-orange.png" },
        { name: "Yellow", value: "yellow", image: "/images/terris-parrot-green.png" },
        { name: "Blue", value: "blue", image: "/images/terris-blue.png" },
        { name: "Black", value: "black", image: "/images/terris-black.png" },
      ],
    },
    {
      id: 2,
      name: "Picnic Table",
      price: "Rs: 12,000",
      link: "/carbon-design/product/7",
      defaultColor: "green",
      colors: [
        { name: "Green", value: "green", image: "/images/client-fav-2.png" },
        { name: "Orange", value: "orange", image: "/images/picnik-table-orange.png" },
        { name: "Black", value: "black", image: "/images/picnik-table-black.png" },
      ],
    },
    {
      id: 3,
      name: "Aera Table",
      price: "Rs: 5,800",
      link: "/carbon-design/product/8",
      defaultColor: "green",
      colors: [
        { name: "Green", value: "green", image: "/images/area-table-green.png" },
        { name: "Orange", value: "orange", image: "/images/area-table-orange.png" },
        { name: "Yellow", value: "yellow", image: "/images/area-table-parrot-green.png" },
        { name: "Blue", value: "blue", image: "/images/area-table-blue.png" },
        { name: "Black", value: "black", image: "/images/area-table-black.png" },
      ],
    },
    {
      id: 4,
      name: "Beach Bench",
      link: "/carbon-design/product/9",
      price: "Rs: 10,800",
      defaultColor: "green",
      colors: [
        { name: "Green", value: "green", image: "/images/client-fav-4.png" },
        { name: "Orange", value: "orange", image: "/images/beach-bench-orange.png" },
        { name: "Yellow", value: "yellow", image: "/images/beach-bench-parrot-green.png" },
        { name: "Blue", value: "blue", image: "/images/beach-bench-blue.png" },
        { name: "Black", value: "black", image: "/images/beach-bench-black.png" },
      ],
    },
    // {
    //   id: 5,
    //   name: "Garden Chair",
    //   price: "Rs: 8,500",
    //   defaultColor: "green",
    //   colors: [
    //     { name: "Green", value: "green", image: "/images/client-fav-1.png" }, // Using placeholder images
    //     { name: "Orange", value: "orange", image: "/images/terris-orange.png" },
    //     { name: "Yellow", value: "yellow", image: "/images/terris-parrot-green.png" },
    //     { name: "Blue", value: "blue", image: "/images/terris-blue.png" },
    //     { name: "Black", value: "black", image: "/images/terris-black.png" },
    //   ],
    // },
  ]

  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({})
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedColors((prev) => {
        const updated: Record<number, string> = { ...prev }
  
        products.forEach((product) => {
          const currentColorIndex = product.colors.findIndex(
            (c) => c.value === prev[product.id]
          )
          const nextIndex = (currentColorIndex + 1) % product.colors.length
          updated[product.id] = product.colors[nextIndex].value
        })
  
        return updated
      })
    }, 5000)
  
    return () => clearInterval(intervalId)
  }, [products])
  
  // Initialize selected colors with default values
  useEffect(() => {
    const initialSelectedColors: Record<number, string> = {}
    products.forEach((product) => {
      initialSelectedColors[product.id] = product.defaultColor
    })
    setSelectedColors(initialSelectedColors)
  }, [])

  // Preload images for all products
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    const imagesToPreload = new Set<string>()

    products.forEach((product) => {
      product.colors.forEach((color) => {
        imagesToPreload.add(color.image)
      })
    })

    // Only preload images we haven't already preloaded
    imagesToPreload.forEach((imageUrl) => {
      if (!preloadedImages.has(imageUrl)) {
        const img = new window.Image()
        img.src = imageUrl
        setPreloadedImages((prev) => {
          const newSet = new Set(prev)
          newSet.add(imageUrl)
          return newSet
        })
      }
    })
  }, [products, preloadedImages])

  const getColorClass = (color: string): string => {
    switch (color) {
      case "green":
        return "bg-green-500"
      case "orange":
        return "bg-orange-500"
      case "yellow":
        return "bg-[#80D928]"
      case "blue":
        return "bg-blue-500"
      case "black":
        return "bg-black"
      default:
        return "bg-gray-500"
    }
  }

  const handleColorClick = (productId: number, colorValue: string): void => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorValue }))
  }

  // Get current image for a product based on selected color
  const getCurrentImage = (product: Product): string => {
    const selectedColor = selectedColors[product.id] || product.defaultColor
    const colorOption = product.colors.find((c) => c.value === selectedColor)
    return colorOption?.image || product.colors[0]?.image
  }

  return (
    <section className="max-w-8xl mx-auto py-12">
      <h2 className="md:text-4xl text-3xl mb-8">Client favorites</h2>

      <div className="relative px-4">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => {
              const selectedColor = selectedColors[product.id] || product.defaultColor
              const currentImage = getCurrentImage(product)

              return (
                <CarouselItem key={product.id} className="md:basis-1/4 lg:basis-1/4">
                  <div className="rounded-lg p-2">
                    <div className="relative w-full h-[370px] mb-4 overflow-hidden rounded-xl shadow-md">
                      <Link href={product.link}>
                      <Image
                        src={currentImage || "/placeholder.svg"}
                        alt={`${product.name} in ${selectedColor}`}
                        fill
                        unoptimized
                        className="object-cover rounded-xl transition-all duration-300 ease-in-out"
                        priority={product.id <= 4} // Prioritize loading first visible set
                      />
                      </Link>
                    </div>

                    <div className="flex justify-between">
                      <h3 className="font-medium">{product.name}</h3>

                      {/* Show color options (up to 3) */}
                      <div className="flex gap-1 mb-1">
                        {product.colors.slice(0, 3).map((color) => (
                          <button
                            key={color.value}
                            className={`${getColorClass(color.value)} h-4 w-4 rounded-full cursor-pointer ${
                              selectedColor === color.value ? "ring-1 ring-offset-2 ring-gray-800" : ""
                            } transition-all duration-200`}
                            onClick={() => handleColorClick(product.id, color.value)}
                            aria-label={`Select ${color.name} color`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Price and remaining colors */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">From <span className="text-gray-900 font-semibold">{product.price}</span></p>
                      <div className="flex gap-1">
                        {product.colors.slice(3).map((color) => (
                          <button
                            key={color.value}
                            className={`${getColorClass(color.value)} h-4 w-4 rounded-full cursor-pointer ${
                              selectedColor === color.value ? "ring-1 ring-offset-2 ring-gray-800" : ""
                            } transition-all duration-200`}
                            onClick={() => handleColorClick(product.id, color.value)}
                            aria-label={`Select ${color.name} color`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </div>
    </section>
  )
}

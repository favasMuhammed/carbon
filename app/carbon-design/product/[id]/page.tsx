"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Clock, Globe, Wrench, Star } from "lucide-react"
import { Footer } from "@/components/footer"
import {
  dining_products,
  kiosk_bus_dustin,
  public_benches,
  PRODUCT_DESCRIPTIONS,
  PLASTIC_WASTE_RECYCLED,
  PRODUCT_DIMENSIONS,
  CATEGORY_URLS,
  WHATSAPP_NUMBER,
} from "@/lib/constants"

// Define dimension types
type DiningDimensions = {
  table: string
  bench: string
}

type StandardDimensions = {
  dimensions: string
}

type ProductDimensions = DiningDimensions | StandardDimensions

// Product type definition with proper typing
interface Product {
  id: number
  name: string
  price: string
  image: string
  type: string
  colors: string[]
  colorImages: Record<string, string>
}

// Combine all products for easier lookup
const allProducts = [...dining_products, ...kiosk_bus_dustin, ...public_benches] as unknown as Product[]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [, setThumbnailImages] = useState<string[]>([])


  useEffect(() => {
    if (params.id) {
      const productId = Number(params.id)
      const foundProduct = allProducts.find((p) => p.id === productId)

      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedColor(foundProduct.colors[0])

        // Get thumbnail images - ensure no undefined values
        const thumbnails = Object.keys(foundProduct.colorImages)
          .map((color) => foundProduct.colorImages[color])
          .filter((url): url is string => url !== undefined)

        setThumbnailImages(thumbnails.slice(0, 3))

        setLoading(false)
      } else {
        // Product not found, redirect to home
        router.push("/carbon-design")
      }
    }
  }, [params.id, router])

  if (loading || !product) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse">Loading product details...</div>
      </div>
    )
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500"
      case "orange":
        return "bg-orange-500"
      case "yellow":
        return "bg-yellow-500"
      case "blue":
        return "bg-blue-500"
      case "black":
        return "bg-black"
      case "white":
        return "bg-white border border-gray-300"
      default:
        return "bg-gray-500"
    }
  }

  const imageUrl = product.colorImages[selectedColor] || product.image

  // Get description based on product type
  const description =
    PRODUCT_DESCRIPTIONS[product.type as keyof typeof PRODUCT_DESCRIPTIONS] ||
    "A high-quality product made from recycled plastic, designed for durability and sustainability."

  // Get plastic waste recycled
  const wasteRecycled = PLASTIC_WASTE_RECYCLED[product.type as keyof typeof PLASTIC_WASTE_RECYCLED] || "120 Kg"

  // Get dimensions with proper type checking
  const dimensions = (PRODUCT_DIMENSIONS[product.type as keyof typeof PRODUCT_DIMENSIONS] as ProductDimensions) || {
    dimensions: "Standard size",
  }

  // Check if dimensions has table and bench properties (for dining type)
  const isDiningDimensions = (dim: ProductDimensions): dim is DiningDimensions => "table" in dim && "bench" in dim

  // Get category URL for back button
  const categoryUrl = CATEGORY_URLS[product.type as keyof typeof CATEGORY_URLS] || CATEGORY_URLS.default

  return (
    <>
      <div className="container max-w-7xl mt-20 mx-auto px-4 py-8">
        <Link href={categoryUrl} className="inline-flex items-center mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-md bg-gray-100 border border-gray-200">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`${product.name} in ${selectedColor}`}
                fill
                className="object-cover transition-all duration-300 ease-in-out"
                unoptimized
                priority
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {Object.entries(product.colorImages)
                .slice(0, 3)
                .map(([color, url]) => (
                  <div
                    key={color}
                    className={`relative w-full aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                      selectedColor === color ? "border-black" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`${product.name} in ${color}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="text-sm text-[#5AAAD4] font-semibold mb-2">{wasteRecycled} of Plastic Waste Recycled</div>
            <h1 className="text-4xl mt-4 mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-8">{description}</p>

            <div className="grid grid-cols-4 gap-6 mb-10">
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Clock className="w-7 h-7" />
                </div>
                <div className="text-xs text-gray-600">5 year warranty</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Globe className="w-7 h-7" />
                </div>
                <div className="text-xs text-gray-600">Made in India</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Wrench className="w-7 h-7" />
                </div>
                <div className="text-xs text-gray-600">Low Maintenance</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Star className="w-7 h-7" />
                </div>
                <div className="text-xs text-gray-600">Weather Resistance</div>
              </div>
            </div>

            <div className="flex justify-between border-t border-b py-5 mb-6">
              <h3 className="mb-3">Color Options:</h3>
              <div className="flex gap-3">
                {product.colors.map((color: string) => (
                  <div
                    key={color}
                    className={`${getColorClass(color)} h-6 w-6 rounded-full cursor-pointer ${
                      selectedColor === color ? "ring-2 ring-offset-1 ring-gray-800" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8 flex justify-between items-center">
              <h3 className="mb-3">Dimensions:</h3>
              <div>
                {isDiningDimensions(dimensions) ? (
                  <>
                    <div className="text-sm">Table: {dimensions.table}</div>
                    <div className="text-sm">Bench: {dimensions.bench}</div>
                  </>
                ) : (
                  <div className="text-sm">{dimensions.dimensions}</div>
                )}
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in ${product.name} in ${selectedColor} color`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-48 flex items-center justify-center gap-2 bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-4 py-4 rounded-lg transition-colors hover:opacity-90"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.4539 3.54639C18.2223 1.31482 15.2584 0.0666504 12.1249 0.0666504C5.49768 0.0666504 0.124935 5.4394 0.124935 12.0666C0.124935 14.2146 0.684935 16.3146 1.74993 18.1834L0 24.0666L6.02493 22.3521C7.82493 23.3187 9.95768 23.8334 12.1249 23.8334C18.7521 23.8334 24.1249 18.4606 24.1249 11.8334C24.1249 8.69993 22.8749 5.77796 20.4539 3.54639ZM12.1249 21.8334C10.1999 21.8334 8.32493 21.3417 6.69993 20.4209L6.34993 20.2084L2.74993 21.2209L3.77493 17.7084L3.53743 17.3459C2.52493 15.6667 1.99993 13.7084 1.99993 11.7084C1.99993 6.45843 6.49993 2.06668 12.1249 2.06668C14.6999 2.06668 17.1249 3.10843 18.9749 4.95843C20.8249 6.80843 21.9999 9.23343 21.9999 11.8084C21.9999 17.2834 17.7499 21.8334 12.1249 21.8334ZM17.5749 14.4584C17.2749 14.3084 15.7999 13.5834 15.5249 13.4834C15.2499 13.3834 15.0499 13.3334 14.8499 13.6334C14.6499 13.9334 14.0749 14.6084 13.8999 14.8084C13.7249 15.0084 13.5499 15.0334 13.2499 14.8834C11.4999 14.0084 10.3499 13.3334 9.19993 11.3334C8.89993 10.8084 9.52493 10.8584 10.0999 9.90843C10.1999 9.70843 10.1499 9.53343 10.0749 9.38343C9.99993 9.23343 9.39993 7.75843 9.14993 7.15843C8.89993 6.58343 8.64993 6.65843 8.47493 6.65843C8.29993 6.65843 8.09993 6.65843 7.89993 6.65843C7.69993 6.65843 7.37493 6.73343 7.09993 7.03343C6.82493 7.33343 6.04993 8.05843 6.04993 9.53343C6.04993 11.0084 7.12493 12.4334 7.27493 12.6334C7.42493 12.8334 9.37493 15.8334 12.3499 17.1334C14.3499 18.0084 15.1499 18.0834 16.1499 17.9334C16.7499 17.8334 17.9499 17.1834 18.1999 16.4834C18.4499 15.7834 18.4499 15.1834 18.3749 15.0584C18.2999 14.9334 18.0999 14.8584 17.7999 14.7084L17.5749 14.4584Z"
                />
              </svg>
              For Enquiry
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

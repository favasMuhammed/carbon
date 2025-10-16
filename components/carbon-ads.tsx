// "use client"

// import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
// import { CarbonPopup } from "./carbon-popup"

const data = [
  {
    title: "Carbon Designs",
    description: "Reimagining waste. Redefining design. Explore our collection of eco-conscious furniture and tiles.",
    buttonText: "Know More",
    imageSrc: "/images/carbon-ads-one.png",
    link: "/carbon-design",
  },
  {
    title: "Carbon Ads",
    description: "Rest Easy, Advertise Smart. Sustainable Advertising that leaves a positive footprint.",
    buttonText: "Know More",
    imageSrc: "/images/carbon-ads-two.png",
    link: "/carbon-ads",
  },
]

export function CarbonAds() {
  // const [activePopup, setActivePopup] = useState<"ads" | "designs" | null>(null)

  // const handleOpenPopup = (type: "ads" | "designs") => {
  //   setActivePopup(type)
  // }

  // const handleClosePopup = () => {
  //   setActivePopup(null)
  // }

  return (
    <section id="designs" className="md:py-20 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-center md:text-[42px] font-medium mb-12 md:pb-12">
          What we create from Plastic waste?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {data.map((item, i) => (
            <Card
              key={i}
              className="overflow-hidden shadow-xl transition-shadow hover:shadow-2xl h-[380px] w-[320px] mx-auto"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-32 h-32 relative">
                  <Image
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={item.title}
                    width={128}
                    height={128}
                    className="rounded-lg object-contain"
                  />
                </div>
                <CardTitle className="text-[18px]">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm sm:text-base md:text-md text-gray-600 mb-5">{item.description}</p>

                <Link
                  className="bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-6 py-2 rounded-lg transition-colors hover:opacity-90"
                  href={item.link}
                >
                  {item.buttonText}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Render the appropriate popup based on which button was clicked */}
      {/* {activePopup && <CarbonPopup isOpen={true} onClose={handleClosePopup} type={activePopup} />} */}
    </section>
  )
}


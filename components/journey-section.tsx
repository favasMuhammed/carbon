"use client"
import Image from "next/image"
import StackedCarousel from "./stacked-carousel"

// Images for each section that will rotate
const journeyImages = {
  started: [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
  ],
  now: [
    "/images/3.1.png",
    "/images/3.2.png",
    "/images/3.3.png",
  ],
  going: [
    "/images/2.1.png",
    "/images/2.2.png",
    "/images/2.3.png",
  ],
}

export default function JourneySections() {
  return (
    <div className="max-w-6xl container py-10 md:py-20 relative">
      {/* Where we started section */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-32 relative">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <span className="text-gray-900">Where we </span>
            <span className="text-[#4ea4d1]">started</span>
          </h2>
          <p className="text-gray-900 md:pr-[9rem]">
            We saw an opportunity in waste, to transform discarded plastic into something valuable. Our mission began
            with a commitment to eliminate 1 million kg of plastic waste in Kerala by creating sustainable, functional
            products.
          </p>
        </div>

        <div className="flex justify-center mb-5 md:justify-center">
          <StackedCarousel images={journeyImages.started} autoplayInterval={4000} />
        </div>

        {/* Arrow connecting to next section - Arrow 2 */}
        <div className="hidden md:block absolute right-1/4 -bottom-20 w-[150px] h-[100px]">
          <Image 
            src="/images/arrowtwo.png" 
            alt="Arrow to next section" 
            width={250} 
            height={200}
            className="object-cover mt-10"
          />
        </div>
      </section>

      {/* Where we're now section */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-32 relative md:mt-5">
        <div className="order-2 md:order-1 flex justify-center mb-5 md:justify-center">
          <StackedCarousel images={journeyImages.now} autoplayInterval={5000} />
        </div>

        <div className="order-1 md:order-2 md:ml-24 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <span className="text-gray-900">Where we&apos;re </span>
            <span className="text-[#4ea4d1]">now</span>
          </h2>
          <p className="text-gray-900 md:pr-[3rem]">
            Today, Carbon & Whale is a cleantech company producing recycled plastic furniture for businesses, public
            spaces, and government initiatives. Through Carbon Designs, we offer public benches, dustbins, kiosks,
            tables, and bus shelters, replacing waste with purpose.
          </p>
        </div>

        {/* Arrow connecting to next section - Arrow 1 */}
        <div className="hidden md:block absolute left-1/4 -bottom-20 w-[150px] h-[100px]">
          <Image 
            src="/images/arrowone.png" 
            alt="Arrow to next section" 
            width={250} 
            height={200}
            className="object-cover mt-10"
          />
        </div>
      </section>

      {/* Where we're going section */}
      <section className="grid md:grid-cols-2 gap-8 items-center md:mt-16">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <span className="text-gray-900">Where we&apos;re </span>
            <span className="text-[#4ea4d1]">going</span>
          </h2>
          <p className="text-gray-900 md:pr-[12rem]">
            We are scaling up to become the World&apos;s leading Post Consumer Plastic Waste Furniture Brand, expanding our
            impact while making sustainability accessible. Our goal is to preserve the environment by reducing
            deforestation and promoting a circular economy.
          </p>
        </div>

        <div className="flex justify-center md:justify-center">
          <StackedCarousel images={journeyImages.going} autoplayInterval={10000} />
        </div>
      </section>
    </div>
  )
}

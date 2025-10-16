"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CarbonPopup } from "./carbon-popup";
import { useState } from "react";

export function BrandBench() {
  const [activePopup, setActivePopup] = useState<"designs" | null>(null);

  const handleOpenPopup = (type: "designs") => {
    setActivePopup(type);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };
  return (
    <div className="max-w-6xl mx-auto">
      {/* Main bench image with text overlay */}
      <div className="relative flex justify-center">
        <Image
          src="/images/METRO.webp"
          alt="Your Brand Our Bench"
          width={800}
          height={500}
          className="w-auto h-auto mx-auto"
          priority
        />
      </div>

      {/* Bottom text sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:mt-[-80px]">
        {/* Left text */}
        <div className="col-span-1">
          <p className="text-base">
            At Carbon Ads, we offer a unique and eco-friendly advertising
            solution that benefits both your brand and the planet.
          </p>
        </div>

        {/* Center - empty space */}
        <div className="hidden md:block"></div>

        {/* Right text */}
        <div className="col-span-1">
          <p className="text-base">
            Our benches, made from 100% recycled plastic, not only serve as
            functional street furniture in high traffic areas like malls and
            metro stations but also act as prime advertising spaces for your
            brand.
          </p>
        </div>
      </div>

      {/* Download button */}
      <div className="flex justify-center mt-12">
        <Button
          className="bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-8 py-6 rounded-lg transition-colors hover:opacity-90"
          onClick={() => handleOpenPopup("designs")}
        >
          Download Brochure
        </Button>
      </div>
      {/* Render the appropriate popup based on which button was clicked */}
      {activePopup && (
        <CarbonPopup
          isOpen={true}
          onClose={handleClosePopup}
          type={"ads"}
        />
      )}
    </div>
  );
}

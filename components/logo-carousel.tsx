"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useEffect } from "react";

const logos = [
  { src: "/images/DECATHLON.png", name: "Decathlon" },
  { src: "/images/LULU.png", name: "LuLu" },
  { src: "/images/NIPPON.png", name: "Nippon Toyota" },
  { src: "/images/JOVKEY.png", name: "Jockey" },
  { src: "/images/DDRC.png", name: "DDRC" },
  { src: "/images/FREN.png", name: "French Toast" },
  { src: "/images/METRO.png", name: "Metro" },
];

export default function LogoCarousel() {
  const carouselRef = useRef(null);
  const autoplayRef = useRef(
    Autoplay({
      delay: 800,
      stopOnInteraction: false,
      stopOnMouseEnter: false, // Pause on hover for better UX
    })
  );

  // Ensure the carousel is properly initialized with loop
  useEffect(() => {
    // This ensures the carousel is properly initialized with loop functionality
    const handleWheel = (e: WheelEvent) => {
      // Prevent the wheel event from propagating to parent elements when cursor is over carousel
      if (
        e.target instanceof Element &&
        e.target.closest(".carousel-container")
      ) {
        e.stopPropagation();
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Duplicate logos to ensure smooth looping
  const extendedLogos = [...logos, ...logos];

  return (
    <div className="w-full py-1 bg-white carousel-container">
      <Carousel
        ref={carouselRef}
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
        }}
        plugins={[autoplayRef.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {extendedLogos.map((logo, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <div className="flex items-center justify-center h-16">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.name}
                  width={130}
                  height={50}
                  className="md:px-0 px-2 max-w-[130px] max-h-[50px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

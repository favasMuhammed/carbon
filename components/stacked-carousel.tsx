"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLowCarbon } from "@/context/low-carbon-context";

interface StackedCarouselProps {
  images: string[];
  autoplayInterval?: number;
  className?: string;
}

export default function StackedCarousel({
  images,
  autoplayInterval = 5000,
  className,
}: StackedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isLowCarbon } = useLowCarbon();

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplayInterval);

    return () => resetTimeout();
  }, [activeIndex, autoplayInterval, images.length]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetTimeout(); // Reset the timer when manually changing slides
  };

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    resetTimeout(); // Reset the timer when manually changing slides
  };

  return (
    <div
      className={cn(
        "relative h-[400px] w-[300px] flex flex-col items-center",
        className
      )}
    >
      {/* Carousel Images */}
      <div className="relative h-[370px] w-[300px]">
        {images.map((image, index) => {
          const isActive = index === activeIndex;
          const isPrev =
            index === activeIndex - 1 ||
            (activeIndex === 0 && index === images.length - 1);
          const isNext =
            index === activeIndex + 1 ||
            (activeIndex === images.length - 1 && index === 0);

          if (!isActive && !isPrev && !isNext) return null;

          return (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className={cn(
                "absolute transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-lg cursor-pointer",
                isActive
                  ? "z-30 opacity-100 scale-100 translate-y-0 translate-x-0"
                  : isPrev
                  ? "z-20 opacity-80 scale-90 -translate-y-4 -translate-x-4 rotate-[-4deg]"
                  : isNext
                  ? "z-10 opacity-60 scale-80 translate-y-8 translate-x-8 rotate-[8deg]"
                  : "opacity-0 scale-70 translate-y-12 translate-x-12 rotate-[12deg]"
              )}
            >
              <div className="relative w-[300px] h-[300px]">
                {!isLowCarbon ? (
                  <Image
                    src={image || "/placeholder.svg"}
                    alt="Carousel image"
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  index === 1 && (
                    <div className="w-[300px] h-[300px] bg-[#98CAE4]/50 md:bg-[#98CAE4]/50 mx-auto flex items-center justify-center text-center text-lg font-semibold text-gray-800 p-4">
                      🌱 Thanks for making a greener choice! By skipping
                      unnecessary images, you&apos;re reducing digital carbon
                      emissions. Every small step counts for our planet. 🌍
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot Navigation */}
      <div className="flex gap-2 mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "rounded-full cursor-pointer",
              activeIndex === index
                ? "bg-[#5AAAD4] w-3 h-3"
                : "bg-gray-300 w-2 h-2"
            )}
          />
        ))}
      </div>
    </div>
  );
}

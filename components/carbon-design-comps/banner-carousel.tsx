"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CheckCircle, Flag, Wrench, CloudSun } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-4 py-4 px-6 border-b border-gray-300">
    <div className="p-2 rounded-full bg-gray-100">
      <Icon className="h-5 w-5 text-black" />
    </div>
    <span className="text-base text-black md:text-white">{text}</span>
  </div>
);

export default function BannerCarousel() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const bannerData = [
    {
      image: "/images/furniture1.png",
      mobilebannerimage: "/images/mobile-bg-1.webp",
      downloadText:
        "Download our catalogue & join us in reducing carbon emissions from browsing!",
      buttonText: "Download",
    },
    {
      image: "/images/furniture2.png",
      mobilebannerimage: "/images/mobile-bg-2.webp",
      downloadText:
        "Download our catalogue & join us in reducing carbon emissions from browsing!",
      buttonText: "Download",
    },
    {
      image: "/images/furniture3.png",
      mobilebannerimage: "/images/mobile-bg-3.webp",
      downloadText:
        "Download our catalogue & join us in reducing carbon emissions from browsing!",
      buttonText: "Download",
    },
  ];

  return (
    <div className="relative">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {bannerData.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative md:h-[900px] h-[1000px] md:mt-0 mt-[-270px] w-full">
                {/* Desktop Image */}
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={`Furniture showcase ${index + 1}`}
                  fill
                  unoptimized
                  className="md:object-cover object-contain hidden md:block"
                />

                {/* Mobile Image */}
                <Image
                  src={banner.mobilebannerimage || "/placeholder.svg"}
                  alt={`Furniture showcase mobile ${index + 1}`}
                  fill
                  unoptimized
                  className="md:object-cover object-contain block md:hidden"
                />

                {/* Desktop Left Sidebar */}
                <div className="absolute top-0 left-0 h-full w-1/2 z-10 items-center hidden md:flex">
                  <div className="w-full max-w-[500px] bg-gradient-to-r from-black/70 to-black/80 h-full flex flex-col justify-center">
                    <div className="space-y-0 mx-auto">
                      <FeatureItem icon={CheckCircle} text="5 Year Warranty" />
                      <FeatureItem icon={Flag} text="Made in India" />
                      <FeatureItem icon={Wrench} text="Low Maintenance" />
                      <FeatureItem icon={CloudSun} text="Weather Resistance" />
                    </div>
                  </div>
                </div>

                {/* Mobile Features Block */}
                <div className="block md:hidden absolute bottom-0 left-0 w-full z-10">
                  <div className="bg-white/90 backdrop-blur-md rounded-t-lg p-6 space-y-4 shadow-md">
                    <FeatureItem icon={CheckCircle} text="5 Year Warranty" />
                    <FeatureItem icon={Flag} text="Made in India" />
                    <FeatureItem icon={Wrench} text="Low Maintenance" />
                    <FeatureItem icon={CloudSun} text="Weather Resistance" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

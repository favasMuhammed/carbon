"use client";

import { useLowCarbon } from "@/context/low-carbon-context";
import Link from "next/link";
import Image from "next/image";
import LogoCarousel from "./logo-carousel";

export function OurStory() {
  const { isLowCarbon } = useLowCarbon();

  return (
    <div className="py-10 md:mb-6 md:pb-6">
      <section id="about" className="pb-6 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-[130px]">
            <div>
              <h2 className="text-base text-lg md:text-lg font-semibold text-[#0091FF] mb-1">
                Our Story
              </h2>
              <h3 className="text-2xl md:text-4xl font-semibold mb-6">
                Carbon & Whale
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                &quot;At Carbon and Whale, we believe plastic can have a second life.
                We transform discarded plastic into beautiful and functional
                products . Our mission is to eliminate{" "}
                <span className="relative inline-block px-3 py-1 mx-1 text-white bg-[#3195C9] text-[#0091FF] clip-slant">
                  1 million kilograms
                </span>{" "}
                of plastic waste and be accountable for every single plastic
                waste in Kerala by 2025. We are not alone in this mission, we
                work closely with different communities through our{" "}
                <span className="relative inline-block px-3 py-1 mx-1 text-white bg-[#3195C9] text-[#0091FF] clip-slant">
                  #declutter
                </span>
                campaign, turning trash into treasure&quot;
              </p>
              <Link
                href="/about-us"
                className="bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-8 py-3 rounded-lg transition-colors"
              >
                Read More
              </Link>
            </div>
            {!isLowCarbon ? (
              <Image
                src="/images/our-story.png"
                alt="Our Story"
                width={444}
                height={433}
                className="object-cover"
              />
            ) : (
              <div className="w-[90%] max-w-[444px] h-[433px] bg-[#98CAE4]/50 md:bg-[#98CAE4]/50 mx-auto flex items-center justify-center text-center text-lg font-semibold text-gray-800 p-4">
                🌱 Thanks for making a greener choice! By skipping unnecessary
                images, you&apos;re reducing digital carbon emissions. Every
                small step counts for our planet. 🌍
              </div>
            )}
          </div>
        </div>
      </section>
      <LogoCarousel />
    </div>
  );
}

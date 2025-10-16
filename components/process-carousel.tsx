"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    id: 1,
    title: "Collecting Plastic Waste",
    description:
      "Today, Carbon & Whale is a cleantech company producing recycled plastic furniture for businesses, public spaces, and government initiatives. Through Carbon Designs, we offer public benches, dustbins, kiosks, tables, and bus shelters, replacing waste with purpose.",
    image: "/images/Icon 1.png",
  },
  {
    id: 2,
    title: "Granulation",
    description:
      "The plastic waste undergoes a meticulous shredding process. High-powered industrial shredders break down the plastic into small, manageable pieces. The shredded plastic pieces are then carefully processed into uniform granules.",
    image: "/images/Icon 2.png",
  },
  {
    id: 3,
    title: "Shaping Sustainability into Lumber",
    description:
      "The plastic granules are then fed into an extrusion machine. This process involves converting the granules and forcing them through a die, shaping them into durable, versatile lumber. Our extrusion process is optimized to create lumber with superior strength and weather resistance.",
    image: "/images/Icon 3.png",
  },
  {
    id: 4,
    title: "Design & Creation",
    description:
      "Our talented designers work tirelessly to create unique and functional furniture pieces. They blend aesthetics with sustainable principles, crafting designs that are both beautiful and eco-friendly. The final result is a collection of stunning furniture that tells a story of transformation. Each piece embodies our commitment to sustainability.",
    image: "/images/Icon 4.png",
  },
];

export default function ProcessCarousel() {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = processSteps.length;
  const offset = 5;
  const availableWidth = 100 - offset * 2;

  return (
    <section className="max-w-6xl container py-12 md:py-24">
      <div className="flex flex-col mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-left">
          <span className="text-gray-900">Trash to </span>
          <span className="text-[#4ea4d1]">Treasure Process</span>
        </h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4 items-center justify-center mb-20 min-h-[300px]">
        <div className="order-2 md:col-span-3">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-x-10"
          >
            <h2 className="md:text-2xl text-[20px] font-semibold md:mx-10">
              <span className="text-[#4ea4d1]">
                {processSteps[activeStep].id}.{" "}
              </span>
              {processSteps[activeStep].title}
            </h2>
            <p className="text-gray-900 md:text-[16px] md:pr-4">
              {processSteps[activeStep].description}
            </p>
          </motion.div>
        </div>

        <div className="order-1 md:col-span-1 flex justify-center items-center">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
          >
            <Image
              src={processSteps[activeStep].image || "/placeholder.svg"}
              alt={processSteps[activeStep].title}
              height={500}
              width={500}
              className="object-fill"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full md:max-w-4xl mx-auto my-12 relative z-0">
        <div className="relative w-full h-10 bg-gradient-to-r from-sky-100 via-sky-300 to-[#4ea4d1] rounded-full flex items-center justify-between">
          {processSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveStep(index);
              }}
              type="button"
              className={cn(
                "rounded-full flex items-center justify-center text-md font-semibold transition-all duration-300 focus:outline-none",
                activeStep === index
                  ? "bg-white text-sky-500 shadow-xl scale-125 z-10 w-12 h-12"
                  : "bg-white text-[#4ea4d1] w-8 h-8"
              )}
              style={{
                position: "absolute",
                left: `calc(${offset}% + ${(index / (totalSteps - 1)) * availableWidth}%)`,
                transform: "translate(-50%, -1%)",
              }}
            >
              {step.id}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { useLowCarbon } from "@/context/low-carbon-context";

const teamMembers = [
  {
    name: "Siddharth Ak",
    role: "Chief Eco Officer",
    image: "/images/Gifs/a.gif",
  },
  {
    name: "Alvin George",
    role: "Chief Zero Officer",
    image: "/images/Gifs/alvin.gif",
  },
  {
    name: "Suraj Varma",
    role: "Chief Trash Officer",
    image: "/images/Gifs/sur.gif",
  },
  {
    name: "Lithin Jacob Thomas",
    role: "Operations Manager",
    image: "/images/Gifs/lit.gif",
  },
  {
    name: "Mobinson Mathews",
    role: "Finance Manager",
    image: "/images/Gifs/Mobin.gif",
  },
  {
    name: "Shreya Bhagwat",
    role: "Product Designer",
    image: "/images/Gifs/shr.gif",
  },
  {
    name: "Mohammed Shaheen",
    role: "UI/UX, Graphic Designer",
    image: "/images/Gifs/sha.gif",
  },
  {
    name: "Anuja More Shewale",
    role: "Software Developer",
    image: "/images/Gifs/Anuja.gif",
  },
  {
    name: "Anju Mary Abraham",
    role: "Social Media Manager",
    image: "/images/Gifs/anju.gif",
  },
];

export default function TeamSection() {
  const { isLowCarbon } = useLowCarbon();

  return (
    <section className="max-w-6xl container py-16 md:pt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold">
          <span className="text-gray-900">Our </span>
          <span className="text-[#4ea4d1]">Team</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-lg">
              {!isLowCarbon ? (
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-contain rounded-[8px]"
                />
              ) : (
                <div className="w-48 h-48 bg-[#98CAE4]/50 md:bg-[#98CAE4]/50 mx-auto flex items-center justify-center text-center text-lg font-semibold text-gray-800 p-4">
                  🌱 Thanks for making a greener choice!
                </div>
              )}
            </div>
            <h3 className="text-[18px] text-gray-900">{member.name}</h3>
            <p className="text-gray-600 md:mb-3">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

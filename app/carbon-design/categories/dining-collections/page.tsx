"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { dining_products } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
export default function DiningCollectionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "View All" },
    { id: "dining", name: "View Dining Collection" },
    { id: "tables", name: "View Tables" },
    { id: "benches", name: "View Benches" },
    { id: "chairs", name: "View Chair" },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "orange":
        return "bg-orange-500";
      case "yellow":
        return "bg-yellow-500";
      case "blue":
        return "bg-blue-500";
      case "black":
        return "bg-black";
      case "white":
        return "bg-white border border-gray-300";
      default:
        return "bg-gray-500";
    }
  };

  const [selectedColors, setSelectedColors] = useState<Record<number, string>>(
    dining_products.reduce((acc, product) => {
      acc[product.id] = product.colors[0] || "green";
      return acc;
    }, {} as Record<number, string>)
  );

  // Auto rotate colors every 7000ms
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedColors((prev) => {
        const newColors = { ...prev };

        dining_products.forEach((product) => {
          const currentColorIndex = product.colors.indexOf(prev[product.id]);
          const nextColorIndex =
            (currentColorIndex + 1) % product.colors.length;
          newColors[product.id] = product.colors[nextColorIndex];
        });

        return newColors;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [dining_products]);

  const handleColorSelect = (productId: number, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  // Filter dining_products based on active filter
  const filtereddining_products =
    activeFilter === "all"
      ? dining_products
      : dining_products.filter((product) => product.type === activeFilter);

  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/carbon-design"
        className="inline-flex items-center mb-8 mt-20 text-gray-500 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-2 text-gray-500" />
        Back
      </Link>
      <h1 className="text-4xl mt-5 mb-4">Dining Collection</h1>
      <p className="mb-8 text-gray-800">
        Introducing our exquisite dining set collection, thoughtfully crafted in
        India with ultra-durable PP lumber and backed by a solid 5-year
        warranty, ensuring years of worry-free enjoyment.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-6 py-3 rounded-full ${
              activeFilter === filter.id
                ? "bg-black text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.name}
            {activeFilter === filter.id && (
              <span className="ml-2 inline-flex items-center justify-center"></span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtereddining_products.map((product) => {
          const selectedColor = selectedColors[product.id];
          const imageUrl =
            product.colorImages[
              selectedColor as keyof typeof product.colorImages
            ] || product.image;

          // Split colors into two groups: first 3 and the rest
          const firstThreeColors = product.colors.slice(0, 3);
          const remainingColors = product.colors.slice(3);

          return (
            <Link
              href={`/carbon-design/product/${product.id}`}
              key={product.id}
              className="rounded-lg p-5 hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-[370px] mb-4 overflow-hidden rounded-xl shadow-md">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`${product.name} in ${selectedColor}`}
                  fill
                  className="object-cover rounded-xl transition-all duration-300 ease-in-out"
                  unoptimized
                  priority={product.id <= 4} // Prioritize loading for first few dining_products
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex gap-1">
                    {firstThreeColors.map((color) => (
                      <div
                        key={`${product.id}-${color}`}
                        className={`${getColorClass(
                          color
                        )} h-4 w-4 rounded-full cursor-pointer ${
                          selectedColors[product.id] === color
                            ? "ring-1 ring-offset-2 ring-gray-800"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleColorSelect(product.id, color);
                        }}
                        title={color}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  {/* <p className="text-sm text-gray-500">
                    From <span className="text-gray-900 font-semibold">{product.price}</span>
                  </p> */}
                  <Link
                    href={`/carbon-design/product/${product.id}`}
                    className="w-36 my-4 flex items-center justify-center gap-2 bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-2 py-2 rounded-lg transition-colors hover:opacity-90"
                  >
                    Know More
                  </Link>
                  <div className="flex gap-1">
                    {remainingColors.map((color) => (
                      <div
                        key={`${product.id}-${color}`}
                        className={`${getColorClass(
                          color
                        )} h-4 w-4 rounded-full cursor-pointer ${
                          selectedColors[product.id] === color
                            ? "ring-1 ring-offset-2 ring-gray-800"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleColorSelect(product.id, color);
                        }}
                        title={color}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
                {/* <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in ${product.name} in ${selectedColor} color`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-36 my-4 flex items-center justify-center gap-2 bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-2 py-2 rounded-lg transition-colors hover:opacity-90"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.4539 3.54639C18.2223 1.31482 15.2584 0.0666504 12.1249 0.0666504C5.49768 0.0666504 0.124935 5.4394 0.124935 12.0666C0.124935 14.2146 0.684935 16.3146 1.74993 18.1834L0 24.0666L6.02493 22.3521C7.82493 23.3187 9.95768 23.8334 12.1249 23.8334C18.7521 23.8334 24.1249 18.4606 24.1249 11.8334C24.1249 8.69993 22.8749 5.77796 20.4539 3.54639ZM12.1249 21.8334C10.1999 21.8334 8.32493 21.3417 6.69993 20.4209L6.34993 20.2084L2.74993 21.2209L3.77493 17.7084L3.53743 17.3459C2.52493 15.6667 1.99993 13.7084 1.99993 11.7084C1.99993 6.45843 6.49993 2.06668 12.1249 2.06668C14.6999 2.06668 17.1249 3.10843 18.9749 4.95843C20.8249 6.80843 21.9999 9.23343 21.9999 11.8084C21.9999 17.2834 17.7499 21.8334 12.1249 21.8334ZM17.5749 14.4584C17.2749 14.3084 15.7999 13.5834 15.5249 13.4834C15.2499 13.3834 15.0499 13.3334 14.8499 13.6334C14.6499 13.9334 14.0749 14.6084 13.8999 14.8084C13.7249 15.0084 13.5499 15.0334 13.2499 14.8834C11.4999 14.0084 10.3499 13.3334 9.19993 11.3334C8.89993 10.8084 9.52493 10.8584 10.0999 9.90843C10.1999 9.70843 10.1499 9.53343 10.0749 9.38343C9.99993 9.23343 9.39993 7.75843 9.14993 7.15843C8.89993 6.58343 8.64993 6.65843 8.47493 6.65843C8.29993 6.65843 8.09993 6.65843 7.89993 6.65843C7.69993 6.65843 7.37493 6.73343 7.09993 7.03343C6.82493 7.33343 6.04993 8.05843 6.04993 9.53343C6.04993 11.0084 7.12493 12.4334 7.27493 12.6334C7.42493 12.8334 9.37493 15.8334 12.3499 17.1334C14.3499 18.0084 15.1499 18.0834 16.1499 17.9334C16.7499 17.8334 17.9499 17.1834 18.1999 16.4834C18.4499 15.7834 18.4499 15.1834 18.3749 15.0584C18.2999 14.9334 18.0999 14.8584 17.7999 14.7084L17.5749 14.4584Z"
                    />
                  </svg>
                  For Enquiry
                </a> */}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
    <Footer />
    </>
  );
}

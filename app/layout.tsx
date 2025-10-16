import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React
import { Toaster } from "@/components/ui/toaster";
// import GTagManager from "@/components/GTagManager";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "@/components/navbar";
import { LowCarbonProvider } from "@/context/low-carbon-context";

const gtm = process.env.NEXT_PUBLIC_APP_GTM;
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title:
    "Carbon & Whale | Sustainable Furniture & Interlocks from Recycled Plastic",
  description:
    "Transforming waste into value—Carbon & Whale creates eco-friendly furniture, interlocks, and sustainable advertising solutions using recycled plastic. Innovating for a greener future, one product at a time.",
  keywords: [
    "Carbon & Whale",
    "sustainable furniture",
    "recycled plastic furniture",
    "eco-friendly furniture",
    "plastic waste recycling",
    "green construction",
    "sustainable home decor",
    "circular economy",
    "upcycled products",
    "waste to value",
    "green technology",
    "sustainable living",
  ],
  authors: [{ name: "Carbon & Whale" }],
  openGraph: {
    title: "Carbon & Whale | Sustainable Furniture & Interlocks",
    description:
      "Transforming waste into value—Carbon & Whale creates eco-friendly furniture, interlocks, and sustainable advertising solutions using recycled plastic.",
    url: "http://carbonandwhale.com/",
    type: "website",
    images: [
      {
        url: "./images/our-story.png",
        width: 1200,
        height: 630,
        alt: "Carbon & Whale - Sustainable Furniture & Interlocks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carbon & Whale | Sustainable Furniture & Interlocks",
    description:
      "Transforming waste into value—Carbon & Whale creates eco-friendly furniture, interlocks, and sustainable advertising solutions using recycled plastic.",
    images: ["./images/our-story.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={poppins.className}>
      <LowCarbonProvider>
      <Navbar />
        {children}
        <Toaster />
        </LowCarbonProvider>
      </body>
      {/* <GTagManager /> */}
      {gtm && <GoogleAnalytics gaId={gtm} />}
    </html>
  );
}

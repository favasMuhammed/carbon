"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function HeroBanner() {
  const [isMobile, setIsMobile] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const bannerRef = useRef<HTMLElement>(null);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Start animation immediately when component mounts
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  // Handle number animation
  useEffect(() => {
    if (startAnimation) {
      const targetNumber = 10350;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = targetNumber / steps;
      let current = 0;

      const interval = setInterval(() => {
        if (current >= targetNumber) {
          clearInterval(interval);
          return;
        }
        current += increment;
        setCurrentNumber(Math.min(Math.round(current), targetNumber));
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [startAnimation]);

  const bottles = [
    {
      src: "/images/top-view-plastic-bottles-arrangement 5@3x.png",
      x: "-24vw",
      y: "-42vh",
    },
    {
      src: "/images/flat-lay-hydro-alcoholic-gel-with-bottle 4.png",
      x: "-48vw",
      y: "-39vh",
    },
    {
      src: "/images/top-view-plastic-bottles-arrangement 1.png",
      x: "-20vw",
      y: "40vh",
    },
    {
      src: "/images/transparent-glass-with-fresh-organic-milk-near-plastic-riffled-blank-bottle-with-blue-cap-isolated-side-white-table.png",
      x: "38vw",
      y: "-46vh",
    },
    { src: "/images/Layer sd 4.png", x: "-48vw", y: "19vh" },
    {
      src: "/images/arrangement-non-eco-friendly-plastic-bottle (1) 4.png",
      x: "35vw",
      y: "18vh",
    },
    {
      src: "/images/transparent-glass-with-fresh-organic-milk-near-plastic-riffled-blank-bottle-with-blue-cap-isolated-side-white-table.png",
      x: "38vw",
      y: "-1vh",
    },
    { src: "/images/Layer sd 4.png", x: "-3vw", y: "23vh", rotate: -20 },
    {
      src: "/images/flat-lay-hydro-alcoholic-gel-with-bottle 4.png",
      x: "0vw",
      y: "-37vh",
      rotate: 25,
    },
    {
      src: "/images/top-view-plastic-bottles-arrangement 5@3x.png",
      x: "16vw",
      y: "33vh",
      rotate: -15,
    },
    {
      src: "/images/arrangement-non-eco-friendly-plastic-bottle (1) 4.png",
      x: "-34vw",
      y: "30vh",
      rotate: 30,
    },
  ];

  const kgToGo = startAnimation ? 989650 : 1000000;
  const formattedKgToGo = new Intl.NumberFormat("en-IN").format(kgToGo);

  return (
    <section
      ref={bannerRef}
      id="hero"
      className="relative overflow-hidden bg-[url('/images/wall-card-black-decoration-carton.png')] bg-cover bg-center"
      style={{
        height: isMobile ? "60vh" : "100vh",
        paddingTop: isMobile ? "4rem" : "5rem",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span className="font-extrabold">{new Intl.NumberFormat("en-IN").format(currentNumber)}</motion.span>
          <span className="font-normal"> Kg Down | </span>
          <motion.span className="font-extrabold">
            {formattedKgToGo}
          </motion.span>
          <span className="font-normal"> Kg To Go</span>
        </motion.h1>
      </div>

      <AnimatePresence mode="wait">
        {isMobile ? null : (
          <div>
            {bottles.map((bottle, index) => (
              <motion.div
                key={index}
                className="absolute max-w-[80px] sm:max-w-[100px] md:max-w-[120px]"
                initial={{ x: bottle.x, y: bottle.y, opacity: 1 }}
                animate={{ x: 0, y: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  willChange: "transform",
                }}
              >
                <Image
                  src={bottle.src || "/placeholder.svg"}
                  alt="Bottle"
                  width={140}
                  height={150}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

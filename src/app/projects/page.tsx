"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/slider/1.jpg",
  "/images/slider/2.jpg",
  "/images/slider/3.jpg",
  "/images/slider/4.jpg",
  "/images/slider/5.jpg",
];

export default function ThreeDGallery() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY*2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col items-center h-[500vh] bg-black">
      <div className="sticky top-0 h-screen flex justify-center items-center">
        {images.map((src, index) => {
          // Increased spacing between images (from 400 to 800)
          const depth = index * 800;
          // Increased horizontal spread (from 150 to 300)
          const horizontal = (index % 2 === 0 ? -1 : 1) * 300;
          // Increased vertical stagger (from 80 to 150)
          const vertical = (index - 2) * 50;
          const scale = 1.4 + (scrollY - depth) / 1000;
          const opacity = Math.max(0, 1 - Math.abs(scrollY - depth) / 800);

          return (
            <motion.div
              key={index}
              className="absolute w-[300px] h-[200px] transition-all duration-300"
              style={{
                transform: `translate3d(${horizontal}px, ${vertical}px, ${depth}px) scale(${scale})`,
                opacity,
              }}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="rounded-xl shadow-lg object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
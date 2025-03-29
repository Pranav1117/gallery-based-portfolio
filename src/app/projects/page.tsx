"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/slider/1.jpg",
  "/images/slider/2.jpg",
  "/images/slider/3.jpg",
  "/images/slider/4.jpg",
  "/images/slider/5.jpg",
];

// Different starting x positions for each image (in pixels)
const xPositions = [-200, -100, 0, 100, 200];

export default function ScrollGallery() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="h-[500vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {images.map((src, index) => {
          const start = index / images.length;
          const end = (index + 1) / images.length;
          const midPoint = start + (end - start) * 0.5;
          const direction = index % 2 === 0 ? -1 : 1; // Alternating direction
          const startX = xPositions[index]; // Unique starting position

          // Scale animation
          const scale = useTransform(
            scrollYProgress,
            [start, midPoint, end],
            [0.3, 1.2, 0.7] // Scale up then down
          );

          // X movement (only after midpoint)
          const x = useTransform(
            scrollYProgress,
            [midPoint, end],
            [startX, startX + direction * 1000] // Slide from initial position
          );

          // Y movement
          const y = useTransform(scrollYProgress, [start, end], [0, -30]);

          // Opacity
          const opacity = useTransform(
            scrollYProgress,
            [start - 0.4, start - 0.2, start, end - 0.1, end, end + 0.2],
            [0, 0.4, 1, 1, 0, 0]
          );

          // Z-index management
          const zIndex = useTransform(
            scrollYProgress,
            [start - 0.1, start, end, end + 0.1],
            [0, 10, 10, 0]
          );

          return (
            <motion.div
              key={index}
              className="absolute w-[80vw] max-w-2xl h-[60vh]"
              style={{
                x: useTransform([scrollYProgress, x], ([progress, xVal]) =>
                  progress > midPoint ? xVal : startX
                ),
                y,
                scale,
                opacity,
                zIndex,
              }}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover rounded-xl shadow-2xl"
              />
              <motion.div
                className="absolute bottom-8 left-8 text-white"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [start, end - 0.3],
                    [1, 0]
                  ),
                  x: useTransform(
                    scrollYProgress,
                    [midPoint, end],
                    [0, direction * -100] // Text slides opposite direction
                  ),
                }}
              >
                <h2 className="text-3xl font-bold">Project {index + 1}</h2>
                <p className="text-lg">Scroll effect showcase</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

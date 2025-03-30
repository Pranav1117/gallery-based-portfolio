"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  // Row 1
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  // Row 2
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  // Row 3
  "/4.png",
  "/2.png",
  "/1.png",
  "/3.png",
  "/5.png",
];

const BackgroundSlider = () => {
  return (
    <div className="absolute inset-0 h-screen w-full overflow-hidden">
      {/* Row 1 */}
      <motion.div
        className="flex absolute top-0 left-0"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {images.slice(0, 5).map((image, index) => (
          <div key={index} className="relative w-[300px] h-[200px] mx-4 ">
            <Image
              src={image}
              alt={`Slider image ${index + 1}`}
              fill
              className="grayscale object-cover rounded-lg opacity-[10%] hover:opacity-20 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>

      {/* Row 2 - Moving in opposite direction */}
      <motion.div
        className="flex absolute top-[220px] left-0"
        animate={{
          x: [-1000, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {images.slice(5, 10).map((image, index) => (
          <div key={index} className="relative w-[300px] h-[200px] mx-4">
            <Image
              src={image}
              alt={`Slider image ${index + 6}`}
              fill
              className="grayscale opacity-[10%] object-cover rounded-lg hover:opacity-20 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>

      {/* Row 3 */}
      <motion.div
        className="flex absolute top-[440px] left-0"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {images.slice(10, 15).map((image, index) => (
          <div key={index} className="relative w-[300px] h-[200px] mx-4">
            <Image
              src={image}
              alt={`Slider image ${index + 11}`}
              fill
              className="grayscale opacity-[10%] object-cover rounded-lg hover:opacity-20 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BackgroundSlider;

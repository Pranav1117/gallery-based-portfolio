"use client";

import { easeIn, easeInOut, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import BackgroundSlider from "@/components/BackgroundSlider";
import {
  Dancing_Script,
  Big_Shoulders_Stencil_Display,
  Bebas_Neue,
} from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const bigShouldersStencil = Big_Shoulders_Stencil_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

// Animation Variant for Upward Reveal
const textReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0">
        <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/40 rounded-full blur-[150px]" />
      </div>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <BackgroundSlider />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div className="relative inline-block">
            <div className="text-white mb-6">
              <div className="overflow-hidden h-22">
                <motion.h3
                  initial={{ y: 200 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }} // Removed staggerChildren from here
                  className={`${bigShouldersStencil.className} font-[400] text-8xl leading-none`}
                >
                  {["W", "e", "i", " ", "D", "e", "v", "'", "s"].map(
                    (char, index) => (
                      <motion.span
                        key={index}
                        initial={{ y: 100 }} // Added initial state
                        animate={{ y: 0, opacity: 1 }} // Added animate prop
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: index * 0.1,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    )
                  )}
                </motion.h3>
              </div>
              <div className="overflow-hidden h-22 ">
                <motion.div
                  initial={{ y: 200 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className={`${bebasNeue.className} bg-clip-text text-[10rem] leading-none`}
                >
                  {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map(
                    (char, index) => (
                      <motion.span
                        key={index}
                        initial={{ y: 300 }} // Added initial state
                        animate={{ y: 0, opacity: 1 }} // Added animate prop
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: index * 0.1,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    )
                  )}
                </motion.div>
              </div>
            </div>

            <button
              className="border border-white py-2 px-4 rounded-full"
              onClick={() => router.push("/projects")}
            >
              See Projects
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

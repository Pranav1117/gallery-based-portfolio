"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Big_Shoulders_Stencil_Display } from "next/font/google";

const bigShouldersStencil = Big_Shoulders_Stencil_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className={`${bigShouldersStencil.className} text-white text-2xl font-bold tracking-tight`}
            >
              WeiDev
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {/* {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/50 backdrop-blur-md rounded-lg mt-2"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["Home", "About", "Projects"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>
    </motion.nav>
  );
};

export default Navbar;

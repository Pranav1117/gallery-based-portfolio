"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

const projects = [
  {
    image: "/3.png",
    background: "bg-gradient-to-b from-[#1f736f] via-[#3cffe0] to-[#1f736f]",
    title: "SONY",
    description: "Sony Controller Landing Page",
    link: "https://controller-landing-page.vercel.app/",
  },
  {
    image: "/1.png",
    background: "bg-gradient-to-b from-[#a6201b] via-[#fc5d5d] to-[#a6201b]",
    title: "Spider-Man",
    description: "Spider-Man",
    link: "https://spiderman-landing-page-one.vercel.app/",
  },
  {
    image: "/2.png",
    background: "bg-gradient-to-r from-[#377131] via-[#a1fea9] to-[#377131]",
    title: "Fruits Landing Page",
    description: "Greenade",
    link: "https://greenade-landing-page.vercel.app/",
  },
  {
    image: "/4.png",
    background: "bg-white",
    title: "KnowxT",
    description: "A blog page where user can upload blogs",
    link:"https://knowxt.vercel.app/"
  },
  {
    image: "/5.png",
    background: "bg-black",
    title: "Black Market",
    description: "Online Store where user can browse through various products",
    link:"https://e-commerce-frontend-qtvx.onrender.com/"
  },
];

// Generate random Y offsets (-30 to 30px)
const yOffsets = projects.map(() => Math.random() * 60 - 30);
const speed = 0.01;

export default function ScrollGallery() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null);
  const divRefs = useRef([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseXPos = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    // Update shadows based on mouse position
    divRefs.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref.querySelector(".image-shadow"), {
          x: mouseXPos * 20,
          y: mouseYPos * 20,
          boxShadow: `${mouseXPos * -100}px ${
            mouseYPos * -110
          }px 30px rgba(0, 0, 0, ${
            0.2 + Math.abs(mouseXPos + mouseYPos) * 0.3
          })`,
          duration: 0.01,
        });
      }
    });
  };

  return (
    <div
      className="h-[500vh]"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      {/* Background layers */}
      {projects.map((project, index) => {
        const start = index / projects.length;
        const end = (index + 1) / projects.length;

        return (
          <motion.div
            key={`bg-${index}`}
            className={`fixed inset-0 ${project.background} transition-colors duration-1000`}
            style={{
              opacity: useTransform(
                scrollYProgress,
                [start - 0.2, start, end - 0.1, end],
                [0, 1, 1, 0]
              ),
              zIndex: -1,
            }}
          />
        );
      })}

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {projects.map((project, index) => {
          const start = index / projects.length;
          const end = (index + 1) / projects.length;
          const midPoint = start + (end - start) * 0.5;

          // X positions (alternating sides)
          const startX = index % 2 === 0 ? -180 : 180;

          // Random Y starting position
          const startY = yOffsets[index];

          // Scale animation - front image appears larger than next
          const scale = useTransform(
            scrollYProgress,
            [start, midPoint, end],
            [0.7, 2.0 - index * 0.15, 3.5 - index * 0.2]
          );

          // Mouse-responsive 3D tilt
          const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);
          const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

          // X position remains fixed
          const x = useTransform(
            scrollYProgress,
            [start, end],
            [startX, startX]
          );

          // Y position with slight movement
          const y = useTransform(
            scrollYProgress,
            [start, end],
            [startY, startY * 0.5]
          );

          // Z movement for coming forward
          const z = useTransform(
            scrollYProgress,
            [start, midPoint, end],
            [-600, 0, 1000]
          );

          // Z-index for depth
          const zIndex = useTransform(
            scrollYProgress,
            [start - 0.1, start, end, end + 0.1],
            [0, 30 - index * 2, 30 - index * 2, 0]
          );

          return (
            <motion.div
              key={index}
              className="absolute w-[60vw] max-w-md h-[40vh] origin-center"
              style={{
                x,
                y,
                z,
                scale,
                rotateX,
                rotateY,
                opacity: useTransform(
                  scrollYProgress,
                  [start - 0.4, start - 0.2, start, end - 0.1, end, end + 0.2],
                  [0, 0.4, 1, 1, 0, 0]
                ),
                zIndex,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                ref={(el) => (divRefs.current[index] = el)}
                className="w-full h-full relative"
                style={{
                  scale: useTransform(
                    scrollYProgress,
                    [start, midPoint],
                    [1, 1.05]
                  ),
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-0 rounded-lg transition-all duration-500"
                  style={{
                    boxShadow: "13px 20px 30px rgba(0, 0, 0, 0.5)",
                    zIndex: -1,
                  }}
                />
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover cursor-pointer rounded-lg"
                    style={{
                      transform: "translateZ(0)",
                    }}
                  />
                </a>
              </motion.div>
              <motion.div
                className={`absolute bottom-4 ${
                  index % 2 === 0 ? "left-4" : "right-4"
                } text-white`}
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [start, end - 0.3],
                    [1, 0]
                  ),
                  transform: "translateZ(60px)",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  x: useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]),
                  y: useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]),
                }}
              >
                <h2 className="text-lg font-bold">{project.title}</h2>
                <p className="text-xs">{project.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

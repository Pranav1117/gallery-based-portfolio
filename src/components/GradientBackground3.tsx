// components/GradientBackground3.jsx
"use client";

import { useEffect, useRef } from "react";

export default function GradientBackground3() {
  const vantaRef = useRef(null);

  useEffect(() => {
    Promise.all([import("three"), import("vanta/dist/vanta.net.min")]).then(
      ([THREE, VANTA]) => {
        if (vantaRef.current) {
          const vantaEffect = VANTA.NET({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x105a72,
            backgroundColor: 0x1e1e2f,
          });
          return () => vantaEffect.destroy();
        }
      }
    );
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={vantaRef} className="w-full h-full" />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(16, 90, 114, 0.5), rgba(76, 29, 149, 0.3))",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
        3D Gradient 3
      </div>
    </div>
  );
}
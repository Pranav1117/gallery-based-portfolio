// components/GradientBackground2.jsx
export default function GradientBackground2() {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: "linear-gradient(45deg, #ff6e7f, #bfe9ff, #ff6e7f)",
            transform: "perspective(800px) rotateY(20deg)",
            animation: "moveGradient 8s infinite",
          }}
        />
        <style jsx>{`
          @keyframes moveGradient {
            0% { transform: perspective(800px) rotateY(20deg) translateZ(0); }
            50% { transform: perspective(800px) rotateY(-20deg) translateZ(50px); }
            100% { transform: perspective(800px) rotateY(20deg) translateZ(0); }
          }
        `}</style>
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
          3D Gradient 2
        </div>
      </div>
    );
  }
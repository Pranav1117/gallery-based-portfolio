// components/GradientBackground1.jsx
export default function GradientBackground1() {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #105a72, #1e3a8a, #4c1d95)",
            transform: "perspective(1000px) rotateX(30deg)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
          3D Gradient 1
        </div>
      </div>
    );
  }
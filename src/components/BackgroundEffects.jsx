"use client";

import { motion } from "framer-motion";

// Generate floating particles dynamically
const BackgroundParticles = () => {
  const numParticles = 30; 

  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: numParticles }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 1.5,
          }}
          animate={{
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight * -1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Main Background Component
const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 bg-animated overflow-hidden">
      {/* Animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-gradientMove"></div>

      {/* Neon Blur Effects */}
      <div className="absolute w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute w-80 h-80 bg-purple-500 opacity-20 blur-3xl rounded-full left-20 top-20"></div>

      {/* Floating Particles */}
      <BackgroundParticles />
    </div>
  );
};

export default BackgroundEffects;

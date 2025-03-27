"use client";

import { motion } from "framer-motion";

const BackgroundParticles = ({ darkMode }) => {
  const numParticles = 30; 

  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: numParticles }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${
            darkMode ? "bg-white opacity-30" : "bg-black opacity-20"
          }`}
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
const BackgroundEffects = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient (Changes based on mode) */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" // Dark mode
            : "bg-gradient-to-br from-gray-200 via-white to-gray-300" // Light mode
        } animate-gradientMove`}
      ></div>

      {/* Neon Blur Effects (Changes based on mode) */}
      <div
        className={`absolute w-72 h-72 blur-3xl rounded-full transition-all duration-500 ${
          darkMode ? "bg-blue-500 opacity-20" : "bg-yellow-300 opacity-30"
        }`}
      ></div>
      <div
        className={`absolute w-80 h-80 blur-3xl rounded-full left-20 top-20 transition-all duration-500 ${
          darkMode ? "bg-purple-500 opacity-20" : "bg-pink-400 opacity-30"
        }`}
      ></div>

      {/* Floating Particles */}
      <BackgroundParticles darkMode={darkMode} />
    </div>
  );
};

export default BackgroundEffects;

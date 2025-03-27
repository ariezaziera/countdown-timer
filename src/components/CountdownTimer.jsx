"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

const CountdownTimer = () => {
  const targetDate = new Date("March 28, 2025 18:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden px-4">
      {/* 🔥 Background Effects */}
      <BackgroundEffects />

      {/* 🏷 Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-light tracking-wide mb-8 text-gray-300 relative z-10 leading-tight">
        ⏳ <span className="font-semibold text-white">Internship Escape Countdown!</span> 🎓  
        <br /> <span className="text-xl sm:text-2xl md:text-3xl">March 28, 2025 — Almost There!</span>
      </h1>

      {/* ⏰ Countdown Timer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <FadeNumber number={value} />
            <p className="text-xs sm:text-sm md:text-lg uppercase mt-2 text-gray-400 tracking-widest">
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FadeNumber = ({ number }) => {
  return (
    <div style={{
      backgroundColor: "rgba(255, 255, 255, 0.08)", // Indigo with 30% opacity
      backdropFilter: "blur(5px)", // Blurs the background behind the card
    }}
    className="relative w-20 sm:w-30 md:w-50 h-20 sm:h-30 md:h-50 flex items-center justify-center text-4xl sm:text-7xl md:text-8xl font-bold rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.span
          key={number}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute"
        >
          {number}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default CountdownTimer;

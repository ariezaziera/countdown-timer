"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountdownTimer = () => {
  const targetDate = new Date("March 28, 2025 18:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(null); // Initial state is null

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

    setTimeLeft(calculateTimeLeft()); // Set initial time after mount

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null; // Prevents mismatch during hydration

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-10 text-gray-300">
        Countdown to <span className="font-semibold text-white">March 28, 2025</span>
      </h1>

      <div className="flex space-x-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <FadeNumber number={value} />
            <p className="text-lg md:text-xl uppercase mt-4 text-gray-400 tracking-widest">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FadeNumber = ({ number }) => {
  return (
    <div className="relative w-44 md:w-56 h-44 md:h-56 flex items-center justify-center bg-gray-800 text-6xl md:text-8xl font-bold rounded-lg shadow-xl">
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

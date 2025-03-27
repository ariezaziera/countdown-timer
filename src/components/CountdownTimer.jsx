"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

const CountdownTimer = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Define target date
  const targetDate = new Date("March 28, 2025 00:00:00").getTime();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

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
  }, [targetDate]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        darkMode ? "bg-indigo-950 text-white" : "bg-white text-indigo-950"
      }`}
    >
      {/* 🔥 Background Effects */}
      <BackgroundEffects darkMode={darkMode} />

      {/* 🌗 Theme Toggle Button with Animation */}
      <motion.button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full shadow-md 
        transition duration-500 bg-gray-800 text-white hover:bg-gray-700 
        dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        whileTap={{ scale: 0.8, rotate: 180 }} // Adds a rotation & scale effect on click
        animate={{ rotate: darkMode ? 180 : 0 }} // Smooth rotation animation
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {darkMode ? "☀️" : "🌙"}
      </motion.button>
      
      {/* 🏷 Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-light tracking-wide mb-8 relative z-10 leading-tight">
        ⏳ <span className="font-semibold">Internship Escape Countdown!</span> 🎓  
        <br /> <span className="text-xl sm:text-2xl md:text-3xl">March 28, 2025 — Almost There!</span>
      </h1>

      {/* ⏰ Countdown Timer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <FadeNumber number={value} darkMode={darkMode} />
            <p className="text-xs sm:text-sm md:text-lg uppercase mt-2 tracking-widest">
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FadeNumber = ({ number, darkMode }) => {
  return (
    <div
      style={{
        backgroundColor: darkMode
          ? "rgba(255, 255, 255, 0.08)" // Semi-transparent white in dark mode
          : "rgba(0, 0, 0, 0.1)", // Semi-transparent black in light mode
        backdropFilter: "blur(5px)", // Frosted glass effect
      }}
      className="relative w-20 sm:w-28 md:w-40 h-20 sm:h-28 md:h-40 flex items-center justify-center 
      text-4xl sm:text-6xl md:text-7xl font-bold rounded-lg shadow-lg"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute ${darkMode ? "text-white" : "text-indigo-900"}`}
        >
          {number}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default CountdownTimer;

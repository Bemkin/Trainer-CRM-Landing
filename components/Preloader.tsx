"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Preloader Component
 * Cinematic 0-100% loading sequence with scroll locking.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 1. Lock scroll on mount
    document.body.style.overflow = "hidden";

    // 2. Count-up logic (~1.5s - 2s)
    const duration = 1800; // Total duration in ms
    const intervalTime = 20;
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Wait brief moment at 100% before triggering exit
          setTimeout(() => {
            setIsComplete(true);
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      // Ensure scroll is unlocked if component unmounts unexpectedly
      document.body.style.overflow = "auto";
    };
  }, []);

  // Unlock scroll ONLY after the exit transition completes
  useEffect(() => {
    if (isComplete) {
      const unlockTimer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 800); // Matches exit duration
      return () => clearTimeout(unlockTimer);
    }
  }, [isComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] 
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          {/* Brand & Counter Container */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-[#00f3ff] text-xl font-bold tracking-[0.4em] uppercase mb-8 drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                FitEthio
              </h1>
              
              <div className="flex items-baseline gap-2">
                <span className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums">
                  {Math.round(progress)}
                </span>
                <span className="text-3xl md:text-4xl font-black text-[#00f3ff] opacity-80">%</span>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar (Fixed Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
              className="h-full bg-[#00f3ff] shadow-[0_0_20px_rgba(0,243,255,1)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

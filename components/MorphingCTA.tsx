"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MorphingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice(!window.matchMedia("(pointer: fine)").matches);
  }, []);
  
  // Magnetic Button Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isTouchDevice) return;
    
    // Get button position
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance from center
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Magnetic pull threshold (~150px)
    if (distance < 150) {
      // Pull button towards cursor (30% of vector)
      mouseX.set(dx * 0.3);
      mouseY.set(dy * 0.3);
      if (!isHovered) setIsHovered(true);
    } else {
      mouseX.set(0);
      mouseY.set(0);
      if (isHovered) setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section 
      className="relative w-full min-h-[85vh] bg-[#030303] flex flex-col items-center justify-center overflow-hidden border-t border-white/5 py-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blooming Ambient Glow */}
      <motion.div
        animate={{
          scale: isHovered ? (isTouchDevice ? 1.2 : 1.5) : 1,
          opacity: isHovered ? 0.4 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[300px] md:h-[300px] bg-[#00f3ff] rounded-full blur-[80px] md:blur-[100px] z-10 pointer-events-none"
      />

      {/* Headlines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-6"
      >
        <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-none max-w-4xl mx-auto">
          Ready to scale your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#0066ff]">
            fitness empire?
          </span>
        </h2>
        <p className="text-lg md:text-2xl text-white/50 mt-6 md:mt-8 font-medium">
          Stop managing spreadsheets. <span className="text-white">Start coaching.</span>
        </p>
      </motion.div>

      {/* Magnetic CTA Wrapper */}
      <div 
        ref={containerRef}
        className="relative mt-12 md:mt-16 z-20 flex items-center justify-center w-full max-w-lg min-h-[120px] md:min-h-[150px] px-6"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="cta-button"
              layoutId="cta-container"
              style={{ x: isTouchDevice ? 0 : x, y: isTouchDevice ? 0 : y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={() => setIsExpanded(true)}
                whileHover={isTouchDevice ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 md:px-12 py-5 md:py-6 rounded-full bg-white text-black font-black text-lg md:text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_80px_rgba(0,243,255,0.3)] transition-shadow duration-300 uppercase tracking-widest"
              >
                Get Early Access
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="cta-form"
              layoutId="cta-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Welcome to the 1%. Registration confirmed.");
                setIsExpanded(false);
              }}
              className="flex items-center w-full bg-white/[0.03] backdrop-blur-3xl border border-[#00f3ff50] p-1.5 md:p-2 rounded-full shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden"
            >
              <input 
                type="email" 
                placeholder="Enter your email..." 
                required 
                autoFocus
                className="flex-1 bg-transparent border-none text-white placeholder-white/20 px-4 md:px-8 focus:outline-none focus:ring-0 text-base md:text-lg font-medium min-w-0"
              />
              <button 
                type="submit"
                className="bg-[#00f3ff] text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-black hover:bg-white transition-all duration-300 uppercase tracking-tighter text-xs md:text-sm whitespace-nowrap"
              >
                Secure Spot
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Micro-Footer */}
      <div className="absolute bottom-8 md:bottom-10 left-0 w-full flex flex-col items-center justify-center gap-4 md:gap-6 px-10 z-20">
        <span className="text-[10px] md:text-xs font-bold text-white/20 uppercase tracking-[0.2em] text-center">
          © 2026 FitEthio — Built for the 1%
        </span>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {["Privacy", "Terms", "Support"].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-[10px] md:text-xs font-bold text-white/20 hover:text-[#00f3ff] transition-colors uppercase tracking-[0.2em]"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap, CreditCard, Activity, MessageCircle, Calendar } from "lucide-react";

const integrations = [
  { 
    name: "Stripe", 
    icon: CreditCard, 
    color: "#635BFF", 
    size: "w-20 h-20", 
    mobilePos: "top-[10%] left-[15%]", 
    desktopPos: "md:top-[15%] md:left-[20%]", 
    delay: 0 
  },
  { 
    name: "Apple Health", 
    icon: Activity, 
    color: "#ff3366", 
    size: "w-16 h-16", 
    mobilePos: "top-[25%] right-[15%]", 
    desktopPos: "md:top-[25%] md:right-[25%]", 
    delay: 0.2 
  },
  { 
    name: "WhatsApp", 
    icon: MessageCircle, 
    color: "#25D366", 
    size: "w-14 h-14", 
    mobilePos: "top-[42%] left-[20%]", 
    desktopPos: "md:top-auto md:bottom-[20%] md:left-[30%]", 
    delay: 0.4 
  },
  { 
    name: "MyFitnessPal", 
    icon: Zap, 
    color: "#0066EE", 
    size: "w-24 h-24", 
    mobilePos: "top-[58%] right-[15%]", 
    desktopPos: "md:top-auto md:bottom-[15%] md:right-[20%]", 
    delay: 0.6 
  },
  { 
    name: "Google Calendar", 
    icon: Calendar, 
    color: "#FABB05", 
    size: "w-12 h-12", 
    mobilePos: "top-[5%] right-[35%]", 
    desktopPos: "md:right-auto md:top-[40%] md:left-[10%]", 
    delay: 0.8 
  },
];

export default function IntegrationConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);
  const [coreCoord, setCoreCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateCoords = () => {
    if (!containerRef.current || !coreRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Core center
    const coreRect = coreRef.current.getBoundingClientRect();
    setCoreCoord({
      x: coreRect.left - containerRect.left + coreRect.width / 2,
      y: coreRect.top - containerRect.top + coreRect.height / 2
    });

    // Satellites centers
    const newCoords = satelliteRefs.current.map((ref, idx) => {
      if (!ref) return { x: 0, y: 0 };
      const rect = ref.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      };
    });
    setCoords(newCoords);
  };

  useEffect(() => {
    // Initial update with a small delay to ensure layout is stable
    const timer = setTimeout(updateCoords, 100);
    window.addEventListener("resize", updateCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCoords);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#030303] flex flex-col items-center justify-center overflow-hidden py-32 px-6">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-30 mb-16 md:mb-20 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
          Plays perfectly with <span className="text-[#00f3ff]">your stack.</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto px-4">
          FitEthio connects with the tools you already use to create a seamless, 
          unified coaching ecosystem.
        </p>
      </motion.div>

      <div 
        ref={containerRef}
        className="w-full h-[600px] max-w-[400px] mx-auto md:max-w-5xl md:w-full md:h-[600px] relative flex items-center justify-center"
      >
        {/* Neural Connections (SVG Layer) */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {coords.map((target, i) => (
            target.x !== 0 && (
              <g key={i}>
                {/* 1. Faint Base Line */}
                <line
                  x1={coreCoord.x}
                  y1={coreCoord.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="white"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
                
                {/* 2. Fiber-Optic Animated Line */}
                <motion.line
                  x1={coreCoord.x}
                  y1={coreCoord.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={integrations[i].color}
                  strokeOpacity="1"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -24 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                />
              </g>
            )
          ))}
        </svg>

        {/* Central Core: FitEthio */}
        <motion.div
          ref={coreRef}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute z-20 w-28 h-28 md:w-36 md:h-36 rounded-full backdrop-blur-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shadow-[0_0_80px_rgba(0,243,255,0.4)]
                     bottom-[10%] left-1/2 -translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 transition-all duration-700"
        >
          <Zap className="w-12 h-12 md:w-16 md:h-16 text-[#00f3ff] fill-[#00f3ff]/20" strokeWidth={1.5} />
          
          {/* Pulsing Ring */}
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-[#00f3ff]/30"
          />
        </motion.div>

        {/* Satellite Nodes */}
        {integrations.map((item, i) => (
          <motion.div
            key={i}
            ref={(el) => (satelliteRefs.current[i] = el) as any}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: item.delay, duration: 0.5 }}
            className={`absolute z-20 ${item.mobilePos} ${item.desktopPos} transition-all duration-700`}
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              whileHover={{ 
                scale: 1.15,
                boxShadow: `0 0 50px ${item.color}60`,
                borderColor: `${item.color}80`,
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" },
                scale: { duration: 0.2 },
                boxShadow: { duration: 0.2 },
                borderColor: { duration: 0.2 },
              }}
              style={{
                boxShadow: `0 0 30px ${item.color}20`,
                borderColor: `${item.color}30`,
              }}
              className={`${item.size.replace('w-','w-14 ').replace('h-','h-14 md:').replace('20','w-20').replace('16','w-16').replace('14','w-14').replace('24','w-24').replace('12','w-12')} md:${item.size} group rounded-full backdrop-blur-3xl bg-gradient-to-br from-white/15 to-white/5 border flex flex-col items-center justify-center cursor-pointer`}
            >
              <item.icon 
                size={item.size.includes('24') ? 48 : 36}
                strokeWidth={1.5}
                className="scale-75 md:scale-100 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_currentColor] group-hover:brightness-125" 
                style={{ color: item.color }}
              />
              <span 
                style={{ color: item.color }}
                className="text-[8px] md:text-[10px] font-black uppercase tracking-widest absolute -bottom-6 md:-bottom-8 opacity-0 group-hover:opacity-100 group-hover:-bottom-8 md:group-hover:-bottom-10 transition-all duration-300 pointer-events-none text-center" 
              >
                {item.name}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

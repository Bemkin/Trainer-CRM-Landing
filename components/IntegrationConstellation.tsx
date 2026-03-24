"use client";

import { motion } from "framer-motion";
import { Zap, CreditCard, Activity, MessageCircle, Calendar, Hash } from "lucide-react";

const integrations = [
  { name: "Stripe", icon: CreditCard, color: "#635BFF", size: "w-20 h-20", top: "15%", left: "20%", delay: 0 },
  { name: "Apple Health", icon: Activity, color: "#ff3366", size: "w-16 h-16", top: "25%", right: "25%", delay: 0.2 },
  { name: "WhatsApp", icon: MessageCircle, color: "#25D366", size: "w-14 h-14", bottom: "20%", left: "30%", delay: 0.4 },
  { name: "MyFitnessPal", icon: Zap, color: "#0066EE", size: "w-24 h-24", bottom: "15%", right: "20%", delay: 0.6 },
  { name: "Google Calendar", icon: Calendar, color: "#FABB05", size: "w-12 h-12", top: "40%", left: "10%", delay: 0.8 },
];

export default function IntegrationConstellation() {
  return (
    <section className="relative w-full min-h-screen bg-[#030303] flex flex-col items-center justify-center overflow-hidden py-32">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f3ff]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-30 mb-20 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
          Plays perfectly with <span className="text-[#00f3ff]">your stack.</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          FitEthio connects with the tools you already use to create a seamless, 
          unified coaching ecosystem.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center">
        {/* Neural Connections (SVG Layer) */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {integrations.map((item, i) => {
            const x2 = item.left ? item.left : `calc(100% - ${item.right})`;
            const y2 = item.top ? item.top : `calc(100% - ${item.bottom})`;
            
            return (
              <g key={i}>
                {/* 1. Faint Base Line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
                
                {/* 2. Fiber-Optic Animated Line */}
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2={x2}
                  y2={y2}
                  stroke={item.color}
                  strokeOpacity="1"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -24 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Core: FitEthio */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative z-20 w-32 h-32 rounded-full backdrop-blur-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shadow-[0_0_80px_rgba(0,243,255,0.4)]"
        >
          <Zap className="w-16 h-16 text-[#00f3ff] fill-[#00f3ff]/20" strokeWidth={1.5} />
          
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
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: item.delay, duration: 0.5 }}
            style={{ 
              position: "absolute",
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
            className="z-20"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
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
              className={`${item.size} group rounded-full backdrop-blur-3xl bg-gradient-to-br from-white/15 to-white/5 border flex flex-col items-center justify-center cursor-pointer`}
            >
              <item.icon 
                size={item.size.includes('24') ? 48 : 36}
                strokeWidth={1.5}
                className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_currentColor] group-hover:brightness-125" 
                style={{ color: item.color }}
              />
              <span 
                style={{ color: item.color }}
                className="text-[10px] font-black uppercase tracking-widest absolute -bottom-8 opacity-0 group-hover:opacity-100 group-hover:-bottom-10 transition-all duration-300 pointer-events-none" 
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

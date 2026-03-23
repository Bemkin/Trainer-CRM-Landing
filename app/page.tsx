"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Elite GlowCard Component with Mouse-Tracking
function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={`group relative overflow-hidden bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-10 hover:bg-white/[0.05] transition-all duration-500 hover:border-[#00f3ff50] shadow-xl ${className}`}
    >
      {/* Radial Glow Layer */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0, 243, 255, 0.1), transparent 40%)`
        }}
      />
      
      {/* Content Wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Elite Morphing CTA Component
function MorphingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-full">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="button"
            layoutId="cta-container"
            className="relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00f3ff] to-[#0066ff] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <button 
              onClick={() => setIsExpanded(true)}
              className="relative px-12 py-6 bg-[#00f3ff] text-black text-xl font-black rounded-full hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(0,243,255,0.4)] scale-100 hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Join the Exclusive Waitlist
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="input"
            layoutId="cta-container"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle submission logic here
              alert("Subscribed!");
              setIsExpanded(false);
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center w-full max-w-lg bg-black/40 border border-[#00f3ff] p-2 rounded-full shadow-[0_0_40px_rgba(0,243,255,0.2)] backdrop-blur-3xl overflow-hidden"
          >
            <input 
              type="email" 
              placeholder="Enter your best email..." 
              required 
              autoFocus
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 px-6 focus:outline-none focus:ring-0 text-lg"
            />
            <button 
              type="submit" 
              className="p-4 bg-[#00f3ff] text-black rounded-full hover:bg-white transition-all duration-300 group"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 192;
  
  // Helper to get image path
  const currentFrame = (index: number) => 
    `/sequence/frame_${index.toString().padStart(3, '0')}_delay-0.041s.jpg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(Math.round(frameState.frame));
    };

    const images: HTMLImageElement[] = [];
    const frameState = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Drawing function with "cover" logic
    function render(index: number) {
      const img = images[index];
      if (!img || !img.complete) return;

      const canvasRatio = canvas!.width / canvas!.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas!.width;
        drawHeight = canvas!.width / imgRatio;
      } else {
        drawWidth = canvas!.height * imgRatio;
        drawHeight = canvas!.height;
      }

      // 1.02x zoom and 1% downward shift to hide bottom-edge artifacts
      const zoom = 1.02;
      drawWidth *= zoom;
      drawHeight *= zoom;

      const offsetX = (canvas!.width - drawWidth) / 2;
      const offsetY = ((canvas!.height - drawHeight) / 2) + (drawHeight * 0.01);

      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Master GSAP Timeline with Pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-sequence",
        start: "top top",
        end: "bottom bottom", // Pin for the exact height of the 800vh container
        scrub: 1.5,
      }
    });

    // We'll use the timeline to pin the inner content manually or via pin: true on a specific div
    // But since we want to animate inside, pinning the inner div is best
    ScrollTrigger.create({
      trigger: "#hero-sequence",
      start: "top top",
      end: "bottom bottom",
      pin: ".sticky-wrapper",
      pinSpacing: false // Avoid extra gaps
    });

    // 1. Animate Frames (Spans entire timeline)
    tl.to(frameState, { 
      frame: frameCount - 1, 
      snap: "frame", 
      ease: "none", 
      duration: 1,
      onUpdate: () => render(Math.round(frameState.frame)) 
    }, 0);

    // 2. Animate Text 1 (Fade Out)
    tl.to("#text-1", { opacity: 0, y: -60, duration: 0.1 }, 0.1);

    // 3. Animate Text 2 (Fade In & Out)
    tl.to("#text-2", { opacity: 1, y: 0, duration: 0.1 }, 0.3)
      .to("#text-2", { opacity: 0, y: -60, duration: 0.1 }, 0.6);

    // 4. Animate Text 3 (Fade In)
    tl.to("#text-3", { opacity: 1, y: 0, duration: 0.15 }, 0.82);

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    
    // Initial draw once first image loads
    images[0].onload = () => render(0);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToCTA = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-8 pointer-events-none">
        {/* Logo Pill */}
        <div 
          className="flex items-center gap-2 cursor-pointer bg-[#030303]/60 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full pointer-events-auto hover:bg-[#030303]/80 transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-white font-bold text-xl tracking-tighter">FitEthio<span className="text-[#00f3ff]">.</span></span>
        </div>

        {/* Action Pill */}
        <div className="bg-[#030303]/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full pointer-events-auto hover:bg-[#030303]/80 transition-all duration-300">
          <button 
            onClick={scrollToCTA}
            className="px-6 py-2.5 text-sm font-bold text-white border border-white/10 rounded-full hover:border-[#00f3ff] hover:text-[#00f3ff] transition-all duration-300"
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      <main className="relative w-full overflow-x-hidden bg-[#030303] text-white">
      {/* Pinned Hero Sequence Container */}
      <section id="hero-sequence" className="relative w-full h-[600vh]">
        <div className="sticky-wrapper sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
          {/* Canvas Background */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" 
          />

          {/* Dynamic Text Overlays */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center">
            {/* Text 1: The Hook */}
            <h1 id="text-1" className="absolute text-5xl md:text-8xl font-black tracking-tighter text-white max-w-5xl leading-none">
              The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Elite Coaches.</span>
            </h1>

            {/* Text 2: The Logic */}
            <h2 id="text-2" className="absolute opacity-0 translate-y-20 text-4xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">
              Track every metric with <span className="text-[#00f3ff] drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">clinical precision.</span>
            </h2>

            {/* Text 3: The Welcome */}
            <h2 id="text-3" className="absolute opacity-0 translate-y-20 text-5xl md:text-8xl font-black tracking-tighter text-white">
              Welcome to your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#0066ff]">Command Center.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Foreground Content - Visible after unpinning */}
      <div className="relative w-full z-10 bg-[#030303] overflow-hidden">
        {/* Ambient Background Depth Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[120px] transform-gpu opacity-20 pointer-events-none z-0"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[150px] transform-gpu opacity-10 pointer-events-none z-0"
        />

        {/* Feature Matrix (Bento Grid) */}
        <section className="relative py-32 px-6 max-w-7xl mx-auto z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-24 tracking-tight">
            Everything you need to <span className="text-[#00f3ff]">scale your empire.</span>
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            {/* Card 1 */}
            <GlowCard>
              <div className="h-12 w-12 rounded-2xl bg-[#00f3ff10] border border-[#00f3ff30] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                 <div className="h-4 w-4 rounded-sm bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Hyper-Accurate Biometrics</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Track 1RM trajectory, volume load, and systemic fatigue with clinical precision. Data-driven coaching at its peak.
              </p>
            </GlowCard>

            {/* Card 2 */}
            <GlowCard>
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                 <div className="h-4 w-4 bg-white/40 rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Frictionless Payments</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Automated billing, tiered subscription management, and localized payment processing. Focus on coaching, not invoices.
              </p>
            </GlowCard>

            {/* Card 3 */}
            <GlowCard>
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                 <div className="h-1 w-6 bg-white/40 rounded-full" />
                 <div className="h-1 w-6 bg-white/40 rounded-full absolute translate-y-2 opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">White-Labeled Client App</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Deliver a premium mobile experience under your own brand. Custom workouts, nutrition logs, and 24/7 check-ins.
              </p>
            </GlowCard>
          </motion.div>
        </section>

        {/* Final Call-To-Action (The Close) */}
        <section id="cta-section" className="relative py-48 px-6 flex flex-col items-center justify-center text-center z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             viewport={{ once: true }}
             className="max-w-5xl"
          >
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-none">
              Stop guessing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#0066ff]">Start scaling.</span>
            </h2>
            
            <MorphingCTA />
            
            <p className="mt-10 text-gray-500 font-medium tracking-widest uppercase text-xs">
              Spots are strictly limited for the V1 rollout.
            </p>
          </motion.div>
        </section>
      </div>

      {/* Subtle background grain for premium feel */}
      <div className="pointer-events-none fixed inset-0 z-[100] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')] opacity-[0.03]" />
    </main>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClientAppScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneTrackRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !phoneTrackRef.current) return;

    // Fixed: Use standard timeline with scrubbed ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
      },
    });

    // 1. Sliding Track Animation
    tl.to(phoneTrackRef.current, { 
      xPercent: -66.666, 
      ease: "none", 
      duration: 1 
    }, 0);

    // 2. Sequential Text Transitions
    // Feature 1
    tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.0)
      .to(text1Ref.current, { opacity: 0, y: -40, duration: 0.1 }, 0.25);

    // Feature 2
    tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.35)
      .to(text2Ref.current, { opacity: 0, y: -40, duration: 0.1 }, 0.6);

    // Feature 3
    tl.to(text3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.7);

    // Force refresh to handle Next.js dynamic layout
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#030303] overflow-hidden">
      <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-8 md:gap-20">
        
        {/* Dynamic Copy (Responsive Column) */}
        <div className="w-full md:w-1/2 h-[20vh] md:h-full flex items-center relative order-2 md:order-1 px-4 md:px-0 -mt-12 md:mt-0">
          <div ref={text1Ref} className="absolute inset-x-4 md:inset-x-0 flex flex-col justify-center opacity-0 translate-y-20">
            <h3 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              Their entire <span className="text-[#00f3ff]">fitness journey</span>, <br className="hidden md:block" />
              in their pocket.
            </h3>
          </div>
          <div ref={text2Ref} className="absolute inset-x-4 md:inset-x-0 flex flex-col justify-center opacity-0 translate-y-20">
            <h3 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              Frictionless <span className="text-[#00f3ff]">logbook</span> <br className="hidden md:block" />
              & 1RM tracking.
            </h3>
          </div>
          <div ref={text3Ref} className="absolute inset-x-4 md:inset-x-0 flex flex-col justify-center opacity-0 translate-y-20">
            <h3 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              Direct <span className="text-[#00f3ff]">messaging</span> that <br className="hidden md:block" />
              cuts the noise.
            </h3>
          </div>
        </div>

        {/* iPhone Chassis (Responsive Column) */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-2 scale-[0.75] md:scale-100">
          {/* Device Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[400px] bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none z-0" />

          {/* Device Wrapper */}
          <div className="relative w-[360px] h-[730px] flex items-center justify-center rounded-[3rem]">
            {/* Hollow Frame (Top Layer) */}
            <img 
              src="/iphone-frame.png" 
              alt="Phone Frame" 
              className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none drop-shadow-[0_0_40px_rgba(0,243,255,0.15)]" 
            />
            
            {/* Screen Mask (Bottom Layer) */}
            <div className="absolute top-[4.5%] md:top-[2%] bottom-[4%] md:bottom-[1.5%] left-[4.5%] right-[4.5%] z-10 overflow-hidden rounded-[2.5rem] bg-[#050505]">
              {/* Sliding Track */}
              <div ref={phoneTrackRef} className="w-[300%] h-full flex">
                {/* Screen 1: Workout Logging */}
                <div className="w-1/3 h-full bg-gradient-to-b from-gray-900 to-black p-8 pt-16 flex flex-col">
                  <div className="h-6 w-32 bg-white/10 rounded-full mb-8 animate-pulse" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-20 w-full bg-white/5 border border-white/10 rounded-2xl flex items-center px-4 gap-4">
                        <div className="h-10 w-10 rounded-lg bg-[#00f3ff20] border border-[#00f3ff40]" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-2.5 w-2/3 bg-white/20 rounded-full" />
                          <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Screen 2: Performance Analytics */}
                <div className="w-1/3 h-full bg-gradient-to-b from-[#1a1a1a] to-black p-8 pt-20 flex flex-col items-center">
                   <div className="h-44 w-44 rounded-full border-[12px] border-[#00f3ff10] flex items-center justify-center relative mb-12">
                      <div className="absolute inset-0 rounded-full border-[12px] border-t-[#00f3ff] border-r-[#00f3ff] border-l-transparent border-b-transparent animate-spin-slow" />
                      <span className="text-4xl font-black text-white">72%</span>
                      <span className="absolute -bottom-4 text-[10px] text-gray-500 font-bold tracking-widest uppercase">Target Hit</span>
                   </div>
                   <div className="w-full space-y-3">
                      <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between px-6 hover:bg-white/10 transition-colors">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Calories</span>
                        <span className="text-sm font-black text-white">2,140</span>
                      </div>
                      <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between px-6 bg-[#00f3ff05] border-[#00f3ff20]">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Protein</span>
                        <span className="text-sm font-black text-[#00f3ff]">182g</span>
                      </div>
                   </div>
                </div>
                
                {/* Screen 3: Trainer Chat */}
                <div className="w-1/3 h-full bg-gradient-to-b from-[#0a0a0a] to-[#141414] p-8 pt-16 flex flex-col">
                   <div className="flex items-center gap-3 mb-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#00f3ff] to-blue-600 shadow-lg shadow-[#00f3ff20]" />
                      <div>
                        <div className="h-2.5 w-20 bg-white/30 rounded-full mb-1.5" />
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                          <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                        </div>
                      </div>
                   </div>
                   <div className="space-y-4 flex flex-col">
                      <div className="self-end bg-[#00f3ff] text-black text-[11px] font-bold py-3 px-4 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg shadow-[#00f3ff10]">
                        Solid workout today. You hit your Bench Press 1RM goal!
                      </div>
                      <div className="self-start bg-white/10 text-white text-[11px] font-medium py-3 px-4 rounded-2xl rounded-tl-none max-w-[85%]">
                        Feeling unstoppable. Thanks Coach! 🙌
                      </div>
                      <div className="self-end bg-[#00f3ff] text-black text-[11px] font-bold py-3 px-4 rounded-2xl rounded-tr-none max-w-[40%]">
                        Let's go. 🚀
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
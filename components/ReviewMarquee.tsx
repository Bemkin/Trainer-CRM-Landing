"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alex Rivera",
    handle: "@arivera_performance",
    text: "FitEthio changed my coaching business. The automation alone saved me 10 hours a week.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    handle: "@schen_fitness",
    text: "The UI is lightyears ahead of TrueCoach. My clients actually enjoy logging their workouts now.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    handle: "@mthorne_elite",
    text: "The 3D analytics dashboard gives my athletes a competitive edge they can't get elsewhere.",
    avatar: "MT"
  },
  {
    name: "Elena Rodriguez",
    handle: "@erod_wellness",
    text: "Transitioning to FitEthio was the best decision for my boutique studio's growth.",
    avatar: "ER"
  },
  {
    name: "David Park",
    handle: "@dpark_strength",
    text: "Finally, a CRM that understands the nuances of elite sports performance.",
    avatar: "DP"
  },
  {
    name: "Jordan Smith",
    handle: "@jsmith_coach",
    text: "Super intuitive and visually stunning. It makes my brand look premium.",
    avatar: "JS"
  }
];

// Duplicate the array for seamless infinite scrolling
const firstRow = [...testimonials, ...testimonials];
const secondRow = [...testimonials, ...testimonials].reverse();

export default function ReviewMarquee() {
  return (
    <section className="relative w-full overflow-hidden py-32 bg-[#030303] flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          Trusted by <span className="text-[#00f3ff]">elite coaches.</span>
        </h2>
      </motion.div>

      {/* 3D Stage Container */}
      <div 
        className="relative w-full max-w-[1800px]"
        style={{ 
          perspective: "1200px", 
          transformStyle: "preserve-3d",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <div 
          style={{ 
            transform: "rotateX(20deg) rotateZ(-2deg)",
            transformStyle: "preserve-3d"
          }}
          className="flex flex-col gap-4 md:gap-8 py-10"
        >
          {/* Track 1: Right to Left */}
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 40 
            }}
            className="flex w-max gap-4 md:gap-6"
          >
            {firstRow.map((review, i) => (
              <ReviewCard key={`row1-${i}`} {...review} />
            ))}
          </motion.div>

          {/* Track 2: Left to Right */}
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 50 
            }}
            className="flex w-max gap-4 md:gap-6"
          >
            {secondRow.map((review, i) => (
              <ReviewCard key={`row2-${i}`} {...review} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ name, handle, text, avatar }: typeof testimonials[0]) {
  return (
    <div className="w-[260px] md:w-[400px] p-4 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white flex flex-col gap-3 md:gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-colors group cursor-default">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f3ff]/20 to-[#0066ff]/20 border border-white/10 flex items-center justify-center font-bold text-sm text-[#00f3ff]">
          {avatar}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm md:text-lg leading-none">{name}</span>
          <span className="text-[#00f3ff] text-xs md:text-sm mt-1">{handle}</span>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed italic text-sm md:text-lg whitespace-normal">
        "{text}"
      </p>
    </div>
  );
}

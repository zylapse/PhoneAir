/**
 * HeroSection — Awwwards Dynamic Edition.
 * Features massive staggered text reveals, a kinetic marquee, and architectural crosshairs.
 */
import { motion } from 'framer-motion';

const marqueeText = "NO WIRES. NO LIMITS. PHONE AIR. THE FUTURE IS FORMLESS. ";

export default function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between"
    >
      {/* Architectural Crosshairs (Faint Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-white/10 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Top Bar Details - Absolute positioned so it doesn't mess with vertical flex centering */}
      <div className="absolute top-24 md:top-32 left-0 w-full px-[8%] flex justify-between items-start z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mono text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.4em] text-white/30"
        >
          SYS.V1 <br/> ONLINE
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-right mono text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.4em] text-white/30"
        >
          LAT 37.7749 <br/> LONG -122.4194
        </motion.div>
      </div>

      {/* Main Massive Typography */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center w-full px-[4%] mt-20 md:mt-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center w-full"
        >
          <motion.h1 
            variants={item} 
            className="text-[16vw] md:text-[18vw] leading-[0.85] font-extrabold tracking-tighter text-white"
          >
            SHAPE
          </motion.h1>
          <motion.h1 
            variants={item} 
            className="text-[16vw] md:text-[18vw] leading-[0.85] font-extrabold tracking-tighter text-transparent text-stroke opacity-60"
          >
            OF AIR
          </motion.h1>
        </motion.div>
      </div>

      {/* Kinetic Marquee Bottom - Dark Theme */}
      <div className="relative z-10 border-t border-white/10 overflow-hidden flex items-center h-16 bg-black text-white mt-auto">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap"
        >
          {/* Repeat text 4 times for seamless looping */}
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="font-display font-bold text-xl uppercase tracking-widest px-8 opacity-80">
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

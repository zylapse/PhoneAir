/**
 * FeaturesSection — Auto-Switching Kinetic Showcase.
 * Cycles through architectural capabilities every 2 seconds.
 * Pauses on hover.
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { features } from '../data/features';

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [isPaused, setIsPaused] = useState(false);

  // Auto-switch logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 2000); // 2 seconds per user request
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = features[activeIndex];

  return (
    <section
      id="features"
      className="bg-white text-black min-h-screen flex flex-col justify-center py-20 relative overflow-hidden border-t border-black/10"
    >
      {/* Light Grid Overlay */}
      <div className="grid-overlay-light absolute inset-0 opacity-10 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-[8%] relative z-10">
        <header ref={headerRef} className="mb-24">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            className="mono text-[0.7rem] tracking-[0.4em] text-black/40 uppercase mb-8"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="text-6xl md:text-[8vw] font-extrabold text-black tracking-tighter leading-[0.8] uppercase"
          >
            SYSTEM <br />
            ARCHITECTURE
          </motion.h2>
        </header>

        <div className="flex flex-col md:flex-row gap-20 items-center mb-24">
          
          {/* Detail Panel */}
          <div 
            className="w-full md:w-1/2 cursor-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            data-cursor="explore"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mono text-[0.7rem] text-black/30 block mb-8 tracking-[0.4em]">
                  [0{activeIndex + 1} / 0{features.length}]
                </span>
                
                <h3 className="text-5xl md:text-7xl font-extrabold text-black mb-10 tracking-tighter leading-none uppercase">
                  {active.name}
                </h3>
                
                <p className="text-xl md:text-2xl font-medium text-black/60 leading-relaxed mb-12 max-w-md">
                  {active.description}
                </p>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-[1px] bg-black/20" />
                  <p className="mono text-xs text-black tracking-[0.3em] uppercase">
                    {active.stat}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual Side - Abstract Typographic Kinetic Art */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-[50vh] flex items-center justify-center relative pointer-events-none">
             {/* Massive Background Text Stroke number */}
             <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="text-[40vw] md:text-[25vw] font-extrabold leading-none tracking-tighter text-transparent text-stroke-black select-none absolute"
                  >
                    0{activeIndex + 1}
                  </motion.span>
                </AnimatePresence>
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                 animate={{ scale: 1, opacity: 1, rotate: 0 }}
                 exit={{ scale: 1.2, opacity: 0, rotate: 10 }}
                 transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                 className="relative z-10"
               >
                 {/* Clean architectural framing */}
                 <div className="w-64 h-64 border border-black/10 relative flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                   <div className="absolute inset-2 border border-black/5" />
                   <div className="absolute inset-4 border border-black/20 mix-blend-overlay" />
                   <div className="font-extrabold text-8xl tracking-tighter text-black">
                      {active.visual}
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

        </div>

        {/* Cinematic Progress Nav */}
        <div className="flex gap-4">
          {features.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex-1 h-2 bg-black/5 relative cursor-none group overflow-hidden"
              data-cursor="explore"
            >
              {/* Hover indicator */}
              <div className="absolute inset-0 bg-black/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
              
              {/* Active Progress Bar */}
              {activeIndex === i && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isPaused ? '100%' : '100%' }}
                  transition={{ 
                    duration: 2, 
                    ease: "linear",
                  }}
                  className={`absolute inset-0 bg-black z-10 ${isPaused ? 'opacity-50' : 'opacity-100'}`}
                />
              )}
              {/* Completed Bars */}
              {activeIndex > i && (
                <div className="absolute inset-0 bg-black z-10" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

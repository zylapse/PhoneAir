/**
 * TeamSection — Awwwards Compact Light Edition.
 * Strict grid alignment to fix layout issues.
 */
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { team } from '../data/team';

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="team" className="bg-white text-black min-h-screen flex flex-col justify-center py-20 border-t border-black/10 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay-light opacity-20 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-[8%] relative z-10">
        <header className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mono text-[0.7rem] tracking-[0.4em] text-black/40 uppercase mb-4"
          >
            The People
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none uppercase"
          >
            THE ARCHITECTS
          </motion.h2>
        </header>

        <div ref={ref} className="flex flex-col border-t border-black/20">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group border-b border-black/20 py-8 md:py-10 cursor-none relative"
              data-cursor="explore"
            >
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center">
                
                {/* Index + Name (Spans 8 columns on Desktop) */}
                <div className="md:col-span-8 flex items-center gap-6 md:gap-12 transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:translate-x-4">
                  <span className="mono text-xs text-black/30 group-hover:text-white/40 transition-colors duration-500 block">
                    0{i + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase text-black group-hover:text-white transition-colors duration-500">
                    {member.name}
                  </h3>
                </div>
                
                {/* Details (Spans 4 columns on Desktop) */}
                <div className="md:col-span-4 flex flex-col items-start gap-2">
                  <p className="mono text-[0.6rem] md:text-[0.65rem] text-black/50 group-hover:text-white/60 uppercase tracking-[0.3em] transition-colors duration-500">
                    {member.role}
                  </p>
                  
                  {/* Desktop Expandable Bio */}
                  <div className="hidden md:block overflow-hidden w-full">
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="text-xs text-white/80 leading-relaxed mt-2"
                        >
                          {member.bio}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile static bio */}
                  <p className="md:hidden text-xs text-black/60 group-hover:text-white/80 leading-relaxed transition-colors duration-500 mt-2">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Hover Background Fill */}
              <div className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[0.22,1,0.36,1] z-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * SpecsSection — B&W Blueprint Edition.
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const specs = [
  { label: 'OS Updates', value: '15 Years', unit: '' },
  { label: 'Display', value: '6.7"', unit: ' OLED' },
  { label: 'Weight', value: '184', unit: 'g' },
  { label: 'Charge', value: '3m', unit: ' Radius' },
  { label: 'Battery', value: '30%', unit: ' Reserve' },
  { label: 'Network', value: '6G', unit: ' Ready' },
];

export default function SpecsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="specs" className="bg-black min-h-screen flex flex-col justify-center py-20 border-y border-white/5 relative overflow-hidden">
      <div className="grid-overlay absolute inset-0 opacity-20 pointer-events-none" />
      
      <div ref={ref} className="w-full max-w-7xl mx-auto px-[8%] grid md:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mono text-[0.7rem] tracking-[0.4em] text-white/30 uppercase mb-8"
          >
            Technical Sheet
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="text-5xl md:text-7xl font-extrabold text-white mb-16 leading-none tracking-tighter"
          >
            DATA <br />
            ARCHITECTURE
          </motion.h2>

          <div className="flex flex-col border-t border-white/20">
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-white/20 py-6 md:py-8 px-4 flex justify-between items-end cursor-none relative overflow-hidden"
                data-cursor="explore"
              >
                {/* Hover Background */}
                <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[0.22,1,0.36,1] z-0" />
                
                <p className="mono text-xs md:text-sm text-white/50 group-hover:text-black/50 uppercase relative z-10 transition-colors duration-500">
                  {spec.label}
                </p>
                <p className="text-3xl md:text-5xl font-extrabold text-white group-hover:text-black relative z-10 transition-colors duration-500 tracking-tighter">
                  {spec.value}<span className="text-base md:text-lg font-normal opacity-50 ml-1">{spec.unit}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* High-Tech Abstract Radar Visual */}
        <div className="relative aspect-square border border-white/10 flex items-center justify-center overflow-hidden bg-[#050505]">
           <div className="absolute inset-0 opacity-20 border-b-[50%] border-white/5" />
           <div className="absolute inset-0 opacity-20 border-r-[50%] border-white/5" />
           
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
             className="w-[90%] h-[90%] border border-white/10 rounded-full flex items-center justify-center relative"
           >
              {/* Outer Ring Dashes */}
              <svg className="absolute inset-0 w-full h-full text-white/20" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              </svg>

              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="w-[70%] h-[70%] border border-white/20 rounded-full flex items-center justify-center relative"
              >
                {/* Radar Sweep */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.1) 100%)' }}
                />
                
                <div className="w-[50%] h-[50%] border border-white/40 rounded-full backdrop-blur-md bg-white/5 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                   <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
              </motion.div>
              
              <div className="absolute top-0 w-px h-[20%] bg-white/50" />
              <div className="absolute bottom-0 w-px h-[20%] bg-white/50" />
              <div className="absolute left-0 h-px w-[20%] bg-white/50" />
              <div className="absolute right-0 h-px w-[20%] bg-white/50" />
           </motion.div>

           <div className="absolute bottom-4 right-4 text-[0.5rem] mono text-white/40 tracking-[0.4em] uppercase text-right">
              System Scan <br/> Active // 001
           </div>
        </div>
      </div>
    </section>
  );
}

/**
 * PhoneCanvas — Monochrome Edition.
 * Stark, high-contrast 3D journey.
 */
import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneModel from './PhoneModel';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    eyebrow: 'INTRODUCING',
    title: 'PHONE AIR',
    sub: 'The pinnacle of minimalist engineering.',
  },
  {
    eyebrow: 'MATERIAL',
    title: 'TITANIUM',
    sub: 'Forged in high-pressure vacuums. Built for decades.',
  },
  {
    eyebrow: 'TECHNOLOGY',
    title: 'AIR CHARGE',
    sub: 'Energy, untethered. A new era of power.',
  },
  {
    eyebrow: 'FUTURE',
    title: 'UNSTOPPABLE',
    sub: 'Scroll to explore the architecture of tomorrow.',
  },
];

export default function PhoneCanvas() {
  const phoneRef = useRef(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const journey = document.querySelector('#phone-journey');
    if (!journey) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#phone-journey',
        start: 'top top',
        end: '+=300%',
        scrub: 1.2,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.08) setPhase(0);
          else if (p < 0.15) setPhase(1);
          else if (p < 0.22) setPhase(2);
          else setPhase(3);

          if (!phoneRef.current) return;
          const phone = phoneRef.current;

          // Scroll-driven animation logic
          if (p <= 0.05) phone.position.y = gsap.utils.mapRange(0, 0.05, -3, 0, p);
          if (p >= 0.08 && p < 0.15) {
            const t = (p - 0.08) / 0.07;
            phone.rotation.y = t * Math.PI;
          }
          if (p >= 0.15 && p < 0.22) {
            const t = (p - 0.15) / 0.07;
            phone.rotation.x = t * 0.4;
            phone.rotation.z = t * 0.2;
          }
          if (p >= 0.22 && p < 0.3) {
            const t = (p - 0.22) / 0.08;
            phone.rotation.y = Math.PI + t * Math.PI;
            phone.scale.setScalar(1 + t * 0.2);
          }
          if (p >= 0.29) {
            const t = Math.min((p - 0.29) / 0.02, 1);
            phone.scale.setScalar(Math.max(1.2 - t * 1.2, 0));
          }
        },
      },
    });

    return () => tl.kill();
  }, []);

  const currentPhase = phases[phase] || phases[0];

  return (
    <section id="phone-journey" className="relative w-screen h-screen bg-air-black overflow-hidden">
      {/* Grid Overlay */}
      <div className="grid-overlay absolute inset-0 opacity-20 pointer-events-none" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ fov: 40, position: [0, 0, 5] }} gl={{ antialias: true, alpha: true }}>
          <PhoneModel ref={phoneRef} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.9} intensity={0.2} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Text UI */}
      <div className="absolute left-[8%] top-1/2 -translate-y-1/2 z-20 max-w-lg pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mono text-[0.7rem] tracking-[0.4em] text-air-white/40 mb-6 uppercase">
              {currentPhase.eyebrow}
            </p>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] mb-8 text-air-white">
              {currentPhase.title}
            </h1>
            <p className="text-lg text-air-white/60 leading-relaxed mb-10 max-w-sm">
              {currentPhase.sub}
            </p>

            {phase === 0 && (
              <div className="flex gap-4 pointer-events-auto">
                <button 
                  className="btn-primary" 
                  onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Reserve
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Corner Stats (Minimalist Decor) */}
      <div className="absolute bottom-10 right-10 z-20 text-right mono text-[0.6rem] text-air-white/20 tracking-widest hidden md:block">
        <p>MODEL: AIR-01</p>
        <p>LAT: 37.7749° N</p>
        <p>LON: 122.4194° W</p>
      </div>
    </section>
  );
}

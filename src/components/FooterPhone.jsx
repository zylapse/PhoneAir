/**
 * FooterPhone — Awwwards Interactive CTA.
 * Massive, immersive text layer.
 */
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FooterPhone() {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <div id="footer-cta" ref={containerRef} className="bg-white py-0 border-t border-black/10 relative overflow-hidden h-screen flex flex-col justify-center items-center">
      <div className="grid-overlay-light absolute inset-0 opacity-20" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/10 pointer-events-none" />

      {/* Massive Background Text */}
      <motion.div style={{ y: y1 }} className="absolute w-full flex justify-center pointer-events-none z-0">
        <h2 className="text-[25vw] font-extrabold text-black/5 tracking-tighter leading-none select-none">
          RESERVE
        </h2>
      </motion.div>

      {/* Abstract spacer instead of 3D Canvas */}
      <motion.div 
        style={{ scale }}
        className="w-full max-w-4xl h-[400px] relative z-10 flex items-center justify-center cursor-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-1/2 h-[2px] bg-black/20" />
      </motion.div>

      {/* Foreground Overlay Text */}
      <motion.div style={{ y: y2 }} className="absolute w-full flex justify-center pointer-events-none z-20 mix-blend-difference">
        <h2 className="text-[12vw] font-extrabold text-white tracking-tighter leading-none text-stroke opacity-30 select-none">
          UNIT . 01
        </h2>
      </motion.div>
    </div>
  );
}

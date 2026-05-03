/**
 * PageLoader — Simple Logo and Progress Bar.
 */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export default function PageLoader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    // 1. Counter Logic
    let start = 0;
    const end = 100;
    const duration = 2; // total loading time
    const interval = setInterval(() => {
      start += 1;
      if (start <= end) {
        setCounter(start);
      } else {
        clearInterval(interval);
      }
    }, (duration * 1000) / end);

    // 2. GSAP Reveal Sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    });

    tl.to(loaderRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'expo.inOut',
      delay: duration + 0.3
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[10000] bg-[#000] text-white flex flex-col items-center justify-center overflow-hidden"
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          <div className="relative z-10 flex flex-col items-center w-64 md:w-80">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <img 
                src="/airlogo.svg" 
                alt="PhoneAir" 
                className="h-10 md:h-12 w-auto" 
              />
            </motion.div>

            {/* Simple Progress Bar */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-white"
                 style={{ width: `${counter}%` }}
               />
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Navbar — Awwwards Minimal Edition.
 * Uses mix-blend-difference and airlogo.svg.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ onReserveClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[1000] px-[8%] py-8 flex justify-between items-center transition-all duration-500 mix-blend-difference text-white ${
        scrolled ? 'py-4' : ''
      }`}
    >
      <a href="#" className="flex items-center">
        <img 
          src="/airlogo.svg" 
          alt="Phone Air" 
          className="h-8 md:h-12 w-auto" 
        />
      </a>

      <div className="hidden md:flex gap-12">
        {['Products', 'Features', 'Team', 'About'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="mono text-[0.6rem] tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            {item}
          </a>
        ))}
      </div>

      <button 
        onClick={onReserveClick}
        className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 mono text-[0.65rem] font-bold uppercase tracking-[0.2em] hidden md:block cursor-none hover:bg-white hover:text-black transition-all duration-500"
      >
        <div className="relative z-10 flex flex-col h-[10px] overflow-hidden leading-none">
           <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">Reserve</span>
           <span className="absolute top-full group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">Reserve</span>
        </div>
      </button>
    </motion.nav>
  );
}

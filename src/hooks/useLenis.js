/**
 * useLenis — Initializes Lenis smooth scroll and syncs with GSAP ScrollTrigger.
 * lerp: 0.07 gives the premium "air-like" inertia feel.
 */
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      syncTouch: false,
    });

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafLoop = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafLoop);
      lenis.destroy();
    };
  }, []);
}

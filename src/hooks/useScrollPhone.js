/**
 * useScrollPhone — GSAP ScrollTrigger animation driver for the 3D phone journey.
 * Maps scroll progress (0→30% of page) to phone rotation, position, and scale.
 * Returns a ref to attach to the phone group in Three.js.
 */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollPhone() {
  const phoneRef = useRef(null);
  const textPhaseRef = useRef(0); // 0=hero, 1=rear, 2=aircharge, 3=zoom

  useEffect(() => {
    if (!phoneRef.current) return;

    const phone = phoneRef.current;

    // Reset to initial state
    phone.position.set(0, -4, 0);
    phone.rotation.set(0, 0, 0);
    phone.scale.set(1, 1, 1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#phone-journey',
        start: 'top top',
        end: '+=300%',
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.08) textPhaseRef.current = 0;
          else if (p < 0.15) textPhaseRef.current = 1;
          else if (p < 0.22) textPhaseRef.current = 2;
          else textPhaseRef.current = 3;
        },
      },
    });

    // Phase 0: Enter from bottom (0 → 8%)
    tl.fromTo(
      phone.position,
      { y: -4 },
      { y: 0, duration: 0.5, ease: 'power2.out' },
      0
    );

    // Phase 1: Show rear (8% → 15%)
    tl.to(
      phone.rotation,
      { y: Math.PI, duration: 0.5, ease: 'power2.inOut' },
      0.08
    );
    tl.to(
      phone.position,
      { y: 0.3, duration: 0.4, ease: 'power2.inOut' },
      0.08
    );

    // Phase 2: Diagonal tilt + Air Charge (15% → 22%)
    tl.to(
      phone.rotation,
      { y: Math.PI * 1.5, z: 0.2, duration: 0.5, ease: 'power2.inOut' },
      0.15
    );

    // Phase 3: Return front + zoom (22% → 30%)
    tl.to(
      phone.rotation,
      { y: Math.PI * 2, z: 0, duration: 0.4, ease: 'power2.inOut' },
      0.22
    );
    tl.to(
      phone.position,
      { z: 0.4, duration: 0.4, ease: 'power2.inOut' },
      0.22
    );
    tl.to(
      phone.scale,
      { x: 1.1, y: 1.1, z: 1.1, duration: 0.4, ease: 'power2.inOut' },
      0.22
    );

    // Phase fade out (28% → 30%)
    tl.to(
      phone.scale,
      { x: 0, y: 0, z: 0, duration: 0.15, ease: 'power2.in' },
      0.28
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return { phoneRef, textPhaseRef };
}

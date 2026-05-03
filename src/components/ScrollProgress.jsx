/**
 * ScrollProgress — Thin B&W progress bar on the left viewport edge.
 */
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(scrollTop / docHeight, 1) * 100;
      barRef.current.style.height = `${pct}vh`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 2,
        zIndex: 9997,
        height: '100vh',
        background: 'rgba(255,255,255,0.05)',
      }}
    >
      <div
        ref={barRef}
        className="bg-white"
        style={{ width: '100%', height: 0, transition: 'height 0.1s ease-out' }}
      />
    </div>
  );
}

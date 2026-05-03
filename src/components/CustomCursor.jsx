/**
 * CustomCursor — Framer Motion Magnetic Edition.
 * A single solid dot with mix-blend-difference that expands on interactive elements.
 */
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(true);

  // Smooth springs for cursor lag
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      // Disable on touch devices or screens smaller than 1024px
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsVisible(window.innerWidth > 1024 && !isTouch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    const handleMouseOver = (e) => {
      // Find closest parent with data-cursor
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        if (target.dataset.cursor === 'explore') setHoverText('VIEW');
        else if (target.dataset.cursor === 'click') setHoverText('CLICK');
        else setHoverText('');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[10000]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: '#FFFFFF',
        mixBlendMode: 'difference',
      }}
      animate={{
        width: isHovered ? 80 : 16,
        height: isHovered ? 80 : 16,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && hoverText ? 1 : 0 }}
        className="text-black font-extrabold tracking-widest text-[10px]"
        style={{ mixBlendMode: 'normal' }} // Ensures text reads clearly inside the inverted dot
      >
        {hoverText}
      </motion.span>
    </motion.div>
  );
}

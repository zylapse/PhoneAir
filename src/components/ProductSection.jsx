/**
 * ProductSection — Continuous Horizontal Scroll Edition.
 * Pins the entire section to the screen, completes the horizontal scroll, then resumes vertical scroll.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { products } from '../data/products';

export default function ProductSection() {
  const targetRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' });

  // Track the scroll progress through the massive 300vh wrapper
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map the scroll progress to horizontal translation.
  // We have 3 items, so translating by roughly -60vw to -70vw slides the last one into view.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    // The massive scroll container that dictates how long the horizontal scroll lasts
    <section id="products" ref={targetRef} className="bg-black text-white relative h-[300vh] border-t border-white/10">
      
      {/* The Sticky Viewport: Pins precisely to the screen edges */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Background Grid */}
        <div className="grid-overlay absolute inset-0 opacity-10 pointer-events-none" />

        {/* Header Area (Now pinned inside the viewport) */}
        <header ref={headerRef} className="relative z-10 w-full max-w-7xl mx-auto px-[8%] mb-12 flex-shrink-0">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            className="mono text-[0.7rem] tracking-[0.5em] text-white/50 uppercase mb-6"
          >
            Product Ecosystem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none"
          >
            THE CORE <br />
            ESSENTIALS
          </motion.h2>
        </header>

        {/* The Horizontal Scrolling Track */}
        <div className="relative flex items-center overflow-hidden w-full">
          <motion.div style={{ x }} className="flex gap-8 px-[8%] pb-12 w-[max-content]">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="relative group w-[85vw] md:w-[45vw] h-[50vh] flex-shrink-0 border border-white/20 bg-[#080808] p-8 md:p-12 flex flex-col justify-between overflow-hidden cursor-none"
                data-cursor="explore"
              >
                {/* Hover Background */}
                <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-[0.22,1,0.36,1] z-0" />

                {/* Numbering */}
                <span className="relative z-10 mono text-xs tracking-widest text-white/30 group-hover:text-black/40 transition-colors duration-500">
                  0{i + 1}
                </span>

                {/* Details Container */}
                <div className="relative z-10 flex flex-col gap-6">
                  {/* Badge */}
                  <span className="mono text-[0.6rem] text-white/50 group-hover:text-black/50 uppercase tracking-[0.3em] transition-colors duration-500">
                    {product.badge}
                  </span>

                  <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase text-white group-hover:text-black transition-colors duration-500">
                    {product.name}
                  </h3>

                  <p className="text-sm md:text-base text-white/60 group-hover:text-black/70 leading-relaxed font-medium transition-colors duration-500 max-w-lg">
                    {product.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="w-12 h-[1px] bg-white/30 group-hover:bg-black/30 mt-4 transition-colors duration-500" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}

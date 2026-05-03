/**
 * AboutSection — B&W Architectural Layout.
 * Brutalist grid, massive text, pure monochrome.
 */
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "We built Phone Air because we were tired of compromises. Wires everywhere. Battery anxiety. Phones that age into oblivion after two years. We believed the world deserved better.",
  "Air Charge is not a feature — it's a philosophy. The Reservation Battery is not a spec — it's a promise. And 15 years of OS updates is not a timeline — it's a commitment.",
  "Phone Air was founded by three engineers with one mission: build the phone that gets out of your way.",
];

const stats = [
  { label: 'Founded', value: '2024' },
  { label: 'Products', value: '3' },
  { label: 'Core Innovations', value: '3' },
  { label: 'OS Commitment', value: '15 Years' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  useEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-white text-black min-h-screen flex flex-col justify-center py-20 px-[8%] relative overflow-hidden border-t border-black/10"
    >
      {/* Light Grid overlay */}
      <div className="grid-overlay-light absolute inset-0 opacity-20 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24 border-b border-black/10 pb-8"
        >
          <p className="mono text-[0.6rem] tracking-[0.4em] text-black/50 uppercase mb-4">
            Manifesto // 01
          </p>
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none text-black uppercase">
            The Shape <br />
            Of Air.
          </h2>
        </motion.div>

        {/* Main layout: text + aside */}
        <div className="flex flex-col md:flex-row gap-20 items-start">
          {/* Paragraphs */}
          <div className="flex-1 flex flex-col gap-12">
            {paragraphs.map((p, i) => (
              <div
                key={i}
                ref={(el) => (textRefs.current[i] = el)}
                className="overflow-hidden"
              >
                <p
                  className={`font-body ${
                    i === 0
                      ? 'text-2xl md:text-4xl font-semibold leading-tight tracking-tight text-black'
                      : 'text-xl leading-relaxed text-black/60'
                  }`}
                >
                  {p}
                </p>
              </div>
            ))}

            {/* Decorative divider */}
            <div className="mt-8 flex items-center gap-4 border-t border-black/10 pt-4">
              <span className="mono text-[0.6rem] tracking-[0.3em] text-black/40 uppercase">
                End of Transmission
              </span>
            </div>
          </div>

          {/* Stats aside */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full md:w-80 bg-black text-white p-12 shrink-0 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`pb-8 mb-8 ${i < stats.length - 1 ? 'border-b border-white/10' : 'pb-0 mb-0'}`}
              >
                <p className="mono text-[0.6rem] tracking-[0.2em] text-white/40 uppercase mb-2">
                  {stat.label}
                </p>
                <p className="font-display font-bold text-2xl tracking-tight text-white group-hover:pl-2 transition-all duration-300">
                  {stat.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

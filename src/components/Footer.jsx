/**
 * Footer — Awwwards Massive Edition.
 * Consolidated end-of-page experience with kinetic typography and massive interactive links.
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Footer({ onReserveClick }) {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 1]);

  const links = ['Index', 'Capabilities', 'Architecture'];

  const socials = [
    {
      name: 'X',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    },
    {
      name: 'Instagram',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    {
      name: 'LinkedIn',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
    }
  ];

  return (
    <footer ref={footerRef} className="bg-black text-white relative border-t border-white/10 overflow-hidden pt-32 flex flex-col justify-between min-h-screen">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMTExIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10 pointer-events-none mix-blend-screen" />

      {/* 1. Massive Scrolling Marquee CTA */}
      <div className="w-full overflow-hidden border-b border-white/10 pb-10 mb-20 relative z-10">
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap cursor-pointer"
          onClick={onReserveClick}
        >
          {[1, 2, 3, 4].map((i) => (
            <h2 key={i} className="text-[12vw] font-extrabold tracking-tighter uppercase px-10 leading-none select-none hover:text-stroke transition-all duration-300">
              RESERVE NOW
            </h2>
          ))}
        </motion.div>
      </div>

      {/* 2. Massive Grid Links */}
      <div className="max-w-7xl mx-auto w-full px-[8%] grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 mb-32">
        <div className="flex flex-col gap-8">
          <p className="mono text-[0.6rem] text-white/40 uppercase tracking-[0.3em] mb-4">Sitemap</p>
          {links.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              data-cursor="explore"
              className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase group flex items-center gap-6"
            >
              <span className="w-0 h-[2px] bg-white group-hover:w-12 transition-all duration-500 ease-[0.22,1,0.36,1]" />
              <span className="group-hover:translate-x-4 transition-transform duration-500 ease-[0.22,1,0.36,1]">{item}</span>
            </a>
          ))}
          <button
            onClick={onReserveClick}
            data-cursor="explore"
            className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase group flex items-center gap-6 text-left"
          >
            <span className="w-0 h-[2px] bg-white group-hover:w-12 transition-all duration-500 ease-[0.22,1,0.36,1]" />
            <span className="group-hover:translate-x-4 transition-transform duration-500 ease-[0.22,1,0.36,1]">Reserve</span>
          </button>
        </div>

        <div className="flex flex-col justify-end items-start md:items-end text-left md:text-right gap-12">
          <div>
            <p className="mono text-[0.6rem] text-white/40 uppercase tracking-[0.3em] mb-6">Social Networks</p>
            <div className="flex gap-8">
              {socials.map(social => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  data-cursor="click"
                  className="text-white hover:text-white/50 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="max-w-xs mt-8">
            <p className="mono text-[0.6rem] text-white/40 uppercase tracking-[0.3em] mb-4">HQ</p>
            <p className="text-lg font-medium leading-relaxed">
              1 Infinite Loop, <br />
              Cupertino, CA 95014
            </p>
          </div>
        </div>
      </div>

      {/* 3. Epic Brand Anchor */}
      <div className="w-full mt-auto relative z-10 overflow-hidden flex flex-col justify-end pointer-events-none">
        <motion.div style={{ scale, opacity }} className="origin-bottom w-full flex justify-center pb-20">
          <img
            src="/airlogo.svg"
            alt="Phone Air"
            className="h-32 md:h-64 w-auto object-contain"
          />
        </motion.div>

        {/* Bottom copyright bar */}
        <div className="border-t border-white/10 mt-8 py-6 px-[8%] flex justify-between items-center bg-black">
          <p className="mono text-[0.5rem] text-white/40 tracking-[0.5em] uppercase">
            © 2026 Phone Air
          </p>
          <p className="mono text-[0.5rem] text-white/40 tracking-[0.5em] uppercase text-right">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

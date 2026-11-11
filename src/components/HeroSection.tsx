import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { InteractiveHalftoneCanvas } from './InteractiveHalftoneCanvas';
import { NewspaperMasthead } from './NewspaperMasthead';
import { HistoricalImageCard } from './HistoricalImageCard';
import douwesPortrait from '../assets/douwes landing page.jpg';

/**
 * HeroSection
 * Full-screen hero with:
 * - Halftone background (full density at bottom)
 * - Parallax title (slower) vs image (faster) on scroll
 * - Portrait card with 3D tilt
 * - Iconic quote
 */
export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Title moves slower than natural scroll
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  // Portrait moves faster (slight down)
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const springTitleY = useSpring(titleY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Interactive halftone canvas — reacts to mouse, ripples on click */}
      <InteractiveHalftoneCanvas
        spacing={24}
        minDotRadius={0.6}
        maxDotRadius={4.0}
        mouseRadius={150}
        mouseStrength={3.5}
        dotColor="#2B2B2B"
        className="opacity-30 z-0"
      />

      {/* Gradient wash so text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/80 to-[#FAF8F5]/70 z-[1]" />
      {/* Left vignette for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-transparent to-transparent z-[1]" />

      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pt-24 pb-20">
        {/* De Expres masthead */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <NewspaperMasthead edition="Ed. I — Th. I" date="Bandoeng, 8 Oktober 1912" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center min-h-[76vh]">
          {/* Text block */}
          <motion.div style={{ y: springTitleY }}>
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-mono text-[10px] font-bold tracking-[0.25em] text-neutral-500 uppercase mb-4"
            >
              Pahlawan Nasional Indonesia · Pelopor Nasionalisme
            </motion.p>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="overflow-hidden"
            >
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-black leading-none tracking-tighter text-neutral-900"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
              >
                DOUWES
              </motion.h1>
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-black leading-none tracking-tighter text-neutral-900"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
              >
                DEKKER
              </motion.h1>
            </motion.div>

            {/* Indonesian name */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-3 font-mono text-sm text-neutral-500 tracking-widest italic"
            >
              Danudirja Setiabudi · 1879 – 1950
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-8 border-l-2 border-neutral-800 pl-5"
            >
              <p className="font-serif text-lg italic leading-relaxed text-neutral-700">
                "Berani melawan, pantang menyerah, demi kemerdekaan."
              </p>
              <footer className="mt-2 font-mono text-xs text-neutral-400">
                — Ernest Douwes Dekker (Indische Partij)
              </footer>
            </motion.blockquote>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <a
                href="#lini-masa"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-stone-100 hover:bg-neutral-700 transition-colors duration-200 shadow-md"
              >
                Telusuri Lini Masa
                <span aria-hidden>→</span>
              </a>
              <a
                href="#galeri"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors duration-200"
              >
                Galeri Arsip
              </a>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
          >
            <HistoricalImageCard
              src={douwesPortrait}
              alt="Potret Ernest Douwes Dekker"
              year="1912"
              caption="Ernest Douwes Dekker, pendiri Indische Partij — partai kemerdekaan pertama di Hindia Belanda dengan semboyan 'Hindia untuk Putra Hindia'."
            />
          </motion.div>
        </div>

        {/* Scroll indicator + interactive hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          {/* Interactive canvas hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, delay: 2.5, repeat: 2 }}
            className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase mb-1"
          >
            Gerakkan kursor · Klik untuk riak
          </motion.p>
          <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">Gulir ke bawah</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-5 w-5 rounded-full border border-neutral-400 flex items-center justify-center"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

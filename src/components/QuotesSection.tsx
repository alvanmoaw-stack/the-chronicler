import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveHalftoneCanvas } from './InteractiveHalftoneCanvas';

interface Quote {
  text: string;
  source: string;
  year: string;
}

const quotes: Quote[] = [
  {
    text: 'Hindia untuk Putra Hindia — bukan untuk bangsa lain, bukan untuk penjajah.',
    source: 'Semboyan Indische Partij',
    year: '1912',
  },
  {
    text: 'Perjuangan kita bukan persoalan ras. Ini persoalan keadilan — dan keadilan tidak mengenal warna kulit.',
    source: 'Ernest Douwes Dekker, De Expres',
    year: '1912',
  },
  {
    text: 'Tidak ada kemerdekaan yang datang tanpa keberanian untuk menyebutnya dengan lantang: Kami Merdeka.',
    source: 'Danudirja Setiabudi',
    year: '1945',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * QuotesSection
 * Dark section with interactive halftone canvas behind kinetic typography.
 * Uses variants + staggerChildren instead of per-word viewport hooks
 * to avoid Lenis/IntersectionObserver interference.
 */
export const QuotesSection: React.FC = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-[#0a0a0a]" id="kutipan">
      {/* Interactive canvas — white dots on dark bg */}
      <InteractiveHalftoneCanvas
        spacing={26}
        minDotRadius={0.5}
        maxDotRadius={3.5}
        mouseRadius={140}
        mouseStrength={3.0}
        dotColor="rgba(250,248,245,0.55)"
        className="z-0"
      />

      {/* Gradient veil — keeps text readable but dots still visible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]/80 z-[1]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 space-y-16 sm:space-y-24">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center font-mono text-[10px] sm:text-xs font-bold tracking-[0.3em] text-stone-500 uppercase"
        >
          Kata-Kata yang Menggetarkan Batavia
        </motion.p>

        {/* Quote blocks */}
        {quotes.map((q, qi) => (
          <KineticQuote key={qi} quote={q} index={qi} />
        ))}
      </div>
    </section>
  );
};

interface KineticQuoteProps {
  quote: Quote;
  index: number;
}

const KineticQuote: React.FC<KineticQuoteProps> = ({ quote, index }) => {
  const words = quote.text.split(' ');
  const isRight = index % 2 === 1;

  return (
    <div className={isRight ? 'text-right' : 'text-left'}>

      {/* Word-by-word stagger using variants — triggered once on container enter */}
      <motion.p
        className="font-serif font-black leading-tight text-stone-100 ink-bleed"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
        aria-label={quote.text}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {words.map((word, wi) => (
          <motion.span
            key={wi}
            variants={wordVariants}
            className="inline-block mr-[0.22em] sm:mr-[0.28em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      {/* Attribution line */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.3 }}
        className="mt-4 sm:mt-5 inline-flex items-center gap-2 sm:gap-3"
      >
        {!isRight && <div className="h-px w-6 sm:w-10 bg-stone-700 flex-shrink-0" />}
        <span className="font-mono text-[10px] sm:text-xs text-stone-500">
          {quote.source} · {quote.year}
        </span>
        {isRight && <div className="h-px w-6 sm:w-10 bg-stone-700 flex-shrink-0" />}
      </motion.div>
    </div>
  );
};

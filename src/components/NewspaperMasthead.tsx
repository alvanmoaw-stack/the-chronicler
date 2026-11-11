import React from 'react';
import { motion } from 'framer-motion';

interface NewspaperMastheadProps {
  /** Surat kabar edition label */
  edition?: string;
  /** Date string */
  date?: string;
}

/**
 * NewspaperMasthead
 * Decorative top-of-section newspaper masthead treatment.
 * Mimics De Expres front-page header layout (classic Batavia press era).
 */
export const NewspaperMasthead: React.FC<NewspaperMastheadProps> = ({
  edition = 'No. 1',
  date = 'Bandoeng, 1912',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="select-none"
    >
      {/* Top rule */}
      <div className="flex items-center gap-0">
        <div className="h-[3px] flex-1 bg-neutral-900" />
        <div className="h-[1px] flex-1 bg-neutral-900 mt-[6px]" />
      </div>

      {/* Masthead row */}
      <div className="flex items-center justify-between py-1 border-b border-neutral-900">
        <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase">
          {edition}
        </span>
        <div className="text-center">
          <p
            className="font-serif font-black tracking-tight leading-none text-neutral-900"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontStyle: 'italic' }}
          >
            De Expres
          </p>
          <p className="font-mono text-[8px] tracking-[0.35em] text-neutral-500 uppercase mt-0.5">
            Orgaan van de Indische Partij
          </p>
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-500 uppercase text-right">
          {date}
        </span>
      </div>

      {/* Bottom double rule */}
      <div className="flex flex-col gap-[3px] mt-[2px]">
        <div className="h-[1px] bg-neutral-900" />
        <div className="h-[3px] bg-neutral-900" />
      </div>
    </motion.div>
  );
};


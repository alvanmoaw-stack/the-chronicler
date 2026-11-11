import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * IntroLoader
 * Displays a cinematic intro for ~2 seconds then fades out.
 * Hidden on prefers-reduced-motion.
 */
export const IntroLoader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    // Check if user prefers reduced motion — skip instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }

    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('out'), 2000);
    const t3 = setTimeout(onDone, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  const letters = 'THE CHRONICLER'.split('');

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-neutral-900"
          aria-hidden="true"
        >
          {/* Halftone dots layer */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative text-center select-none">
            {/* Staggered letter reveal */}
            <div className="overflow-hidden flex gap-[0.04em] justify-center mb-2">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block font-serif font-black text-stone-100"
                  style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', lineHeight: 1 }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="font-mono text-[10px] tracking-[0.4em] text-stone-500 uppercase"
            >
              Arsip Digital Sejarah Indonesia
            </motion.p>

            {/* Thin animated line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="mt-6 h-px bg-stone-700 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


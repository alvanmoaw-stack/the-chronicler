import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { timelineEvents } from '../data/timeline';

const tagColors: Record<string, string> = {
  Lahir: 'bg-stone-600',
  Militer: 'bg-neutral-700',
  Jurnalisme: 'bg-neutral-800',
  'Indische Partij': 'bg-red-900',
  Pengasingan: 'bg-neutral-600',
  Pendidikan: 'bg-stone-700',
  Internir: 'bg-neutral-500',
  Kemerdekaan: 'bg-green-900',
  Wafat: 'bg-stone-900',
};

/**
 * TimelineSection
 * Scroll-driven vertical timeline with animated progress line.
 * Events alternate left/right, fading in from their respective sides.
 */
export const TimelineSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden"
      id="lini-masa"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl px-6 mb-16 text-center"
      >
        <p className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          Jejak Perjuangan
        </p>
        <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl text-neutral-900">
          Lini Masa Perjuangan
        </h2>
        <p className="mt-4 text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Dari Pasuruan hingga Jakarta, dari penjara kolonial hingga kursi menteri — perjalanan satu abad seorang pejuang.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Vertical progress line (scroll-animated) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-neutral-200">
          <motion.div
            className="absolute top-0 left-0 w-full bg-neutral-900 origin-top"
            style={{ scaleY: lineScaleY, height: '100%' }}
          />
        </div>

        {/* Timeline events */}
        <div className="relative space-y-16">
          {timelineEvents.map((event, i) => (
            <TimelineItem key={event.year} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  event: (typeof timelineEvents)[number];
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => {
  const isLeft = event.side === 'left';

  return (
    <div className={`flex items-start gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className={`w-[calc(50%-2rem)] ${isLeft ? 'text-right' : 'text-left'}`}
      >
        <div
          className={`inline-block rounded-xl border border-neutral-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow duration-300 ${
            isLeft ? 'ml-auto' : 'mr-auto'
          }`}
        >
          {event.tag && (
            <span
              className={`mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase ${
                tagColors[event.tag] ?? 'bg-neutral-700'
              }`}
            >
              {event.tag}
            </span>
          )}
          <h3 className="font-serif text-lg font-bold text-neutral-900">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">{event.description}</p>
        </div>
      </motion.div>

      {/* Centre dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 flex-shrink-0 self-start mt-5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#FAF8F5] shadow-md">
          <span className="font-mono text-[10px] font-black text-neutral-900 leading-none">
            {event.year.slice(2)}
          </span>
        </div>
      </motion.div>

      {/* Year label (opposite side) */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={`w-[calc(50%-2rem)] pt-6 ${isLeft ? 'text-left' : 'text-right'}`}
      >
        <span className="font-mono text-3xl font-black text-neutral-200 select-none">
          {event.year}
        </span>
      </motion.div>
    </div>
  );
};

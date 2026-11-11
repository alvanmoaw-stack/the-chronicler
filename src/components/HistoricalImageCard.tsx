import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HistoricalImageCardProps {
  src: string;
  alt: string;
  year: string;
  caption: string;
  delay?: number;
}

/**
 * HistoricalImageCard
 * Three-layer interactive effect:
 * 1. Grayscale -> colour reveal on hover (Archival Color Reveal)
 * 2. 3D Perspective Tilt following cursor XY
 * 3. Halftone shadow shift + caption slide-up
 */
export const HistoricalImageCard: React.FC<HistoricalImageCardProps> = ({
  src,
  alt,
  year,
  caption,
  delay = 0,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        willChange: 'transform',
      }}
      className="group relative cursor-pointer"
    >
      {/* Halftone-style decorative shadow — shifts on hover */}
      <div
        className="absolute inset-0 rounded-xl bg-neutral-800 transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:translate-y-3"
        style={{ translate: '6px 6px' }}
      />

      {/* Card shell */}
      <div className="relative overflow-hidden rounded-xl border-2 border-neutral-900 bg-stone-100 shadow-lg">
        {/* Year badge */}
        <span className="absolute top-3 left-3 z-20 rounded bg-neutral-900/90 px-2.5 py-1 font-mono text-xs font-bold text-stone-100 backdrop-blur-sm">
          {year}
        </span>

        {/* Image: grayscale → color on hover, scale + tilt */}
        <div className="relative overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-80 w-full object-cover object-top grayscale contrast-125 brightness-90 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
          />
          {/* Vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent opacity-60" />
        </div>

        {/* Caption slide-up from bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-gradient-to-t from-neutral-950/95 via-neutral-900/80 to-transparent p-4 pt-10 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs font-medium leading-relaxed text-stone-200">{caption}</p>
        </div>
      </div>
    </motion.div>
  );
};


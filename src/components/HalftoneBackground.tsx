import React from 'react';

/**
 * HalftoneBackground
 * Pure-CSS halftone dot pattern — zero external image, zero network request.
 * Dot grid mimics vintage newspaper print (De Expres era).
 */
export const HalftoneBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Top: sparse dots fading in */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #2B2B2B 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.85) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      {/* Dense lower layer — bigger dots */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #2B2B2B 2.5px, transparent 2.5px)',
          backgroundSize: '14px 14px',
          backgroundPosition: '7px 7px', /* offset for diamond/rotated grid feel */
          maskImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.9) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.9) 100%)',
        }}
      />
    </div>
  );
};


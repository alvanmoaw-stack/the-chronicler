import React, { useEffect, useRef, useCallback } from 'react';

interface Dot {
  x: number;
  y: number;
  baseR: number;
  currentR: number;
  phase: number; // for idle wave animation
}

interface Ripple {
  x: number;
  y: number;
  startTime: number;
  speed: number;      // px per second
  maxRadius: number;
  strength: number;
}

interface InteractiveHalftoneCanvasProps {
  /** dot spacing in px */
  spacing?: number;
  /** max base dot radius (at bottom of canvas) */
  maxDotRadius?: number;
  /** min base dot radius (at top of canvas) */
  minDotRadius?: number;
  /** dot color */
  dotColor?: string;
  /** mouse influence radius in px */
  mouseRadius?: number;
  /** how much dots grow near mouse (multiplier on top of base) */
  mouseStrength?: number;
  className?: string;
}

/**
 * InteractiveHalftoneCanvas
 *
 * A performant canvas-based halftone dot grid with:
 * 1. Idle breathing / sine-wave animation
 * 2. Mouse proximity — dots near cursor expand
 * 3. Click ripple — expanding ring of boosted dots
 *
 * Runs entirely on requestAnimationFrame, zero React re-renders during animation.
 * GPU composited via `will-change: transform` on the canvas element.
 */
export const InteractiveHalftoneCanvas: React.FC<InteractiveHalftoneCanvasProps> = ({
  spacing = 22,
  maxDotRadius = 4.5,
  minDotRadius = 0.8,
  dotColor = '#2B2B2B',
  mouseRadius = 130,
  mouseStrength = 3.2,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());

  // Build dot grid based on canvas size
  const buildGrid = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Offset every other row (classic halftone diamond grid)
        const xOffset = row % 2 === 0 ? 0 : spacing * 0.5;
        const x = col * spacing + xOffset;
        const y = row * spacing;

        // Base radius grows linearly from top → bottom
        const tY = y / height;
        const baseR = minDotRadius + (maxDotRadius - minDotRadius) * tY;

        dots.push({
          x,
          y,
          baseR,
          currentR: baseR,
          // Random phase offset so wave doesn't look uniform
          phase: (col * 0.4 + row * 0.7) % (Math.PI * 2),
        });
      }
    }
    dotsRef.current = dots;
  }, [spacing, maxDotRadius, minDotRadius]);

  // Resize handler — rebuild grid + resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        buildGrid(width, height);
      }
    });

    observer.observe(canvas.parentElement ?? canvas);
    return () => observer.disconnect();
  }, [buildGrid]);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Click: add ripple
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        startTime: performance.now(),
        speed: 420,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.8,
        strength: 5,
      });
      // Keep max 5 ripples alive at once
      if (ripplesRef.current.length > 5) ripplesRef.current.shift();
    };

    // Track mouse over entire document so parallax works even outside canvas
    document.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);
    canvas.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (now: number) => {
      rafRef.current = requestAnimationFrame(animate);

      const elapsed = (now - startTimeRef.current) / 1000; // seconds
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dotColor;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mr2 = mouseRadius * mouseRadius;

      // Expire dead ripples
      ripplesRef.current = ripplesRef.current.filter(
        (r) => (now - r.startTime) / 1000 * r.speed < r.maxRadius
      );

      for (const dot of dotsRef.current) {
        let r = dot.baseR;

        // 1. Idle breathing wave
        const wave = Math.sin(elapsed * 1.4 + dot.phase) * 0.5 + 0.5; // 0..1
        r += wave * dot.baseR * 0.55;

        // 2. Mouse proximity — push dots outward
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < mr2) {
          const proximity = 1 - Math.sqrt(dist2) / mouseRadius; // 0..1
          // Smooth cubic falloff
          const influence = proximity * proximity * (3 - 2 * proximity);
          r += influence * mouseStrength * dot.baseR;
        }

        // 3. Ripple waves
        for (const ripple of ripplesRef.current) {
          const age = (now - ripple.startTime) / 1000;
          const waveFront = age * ripple.speed;
          const rdx = dot.x - ripple.x;
          const rdy = dot.y - ripple.y;
          const distFromOrigin = Math.sqrt(rdx * rdx + rdy * rdy);
          const delta = distFromOrigin - waveFront;
          // Ring width ~40px, gaussian envelope
          const ringWidth = 40;
          if (Math.abs(delta) < ringWidth) {
            const rippleFactor = Math.exp((-delta * delta) / (2 * (ringWidth * 0.4) ** 2));
            // Fade ripple over time
            const timeFade = Math.max(0, 1 - age / 1.5);
            r += rippleFactor * timeFade * ripple.strength * dot.baseR;
          }
        }

        // Clamp radius
        r = Math.max(0.2, r);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dotColor, mouseRadius, mouseStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
};


import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * useLenis — initializes Lenis smooth scroll and cleans up on unmount.
 * Dispatches native scroll event on each tick so Framer Motion's whileInView
 * and useScroll stay perfectly synced.
 */
export function useLenis() {
  useEffect(() => {
    // Respect prefers-reduced-motion: disable smooth scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Notify window on scroll tick so IntersectionObserver re-evaluates
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'));
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

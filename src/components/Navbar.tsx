import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

/**
 * Navbar — fixed, transparent → opaque on scroll, with mobile hamburger menu.
 */
export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  const links = [
    ['#profil', 'Profil'],
    ['#lini-masa', 'Lini Masa'],
    ['#kutipan', 'Kutipan'],
    ['#galeri', 'Galeri'],
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-neutral-200/60 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-serif font-black text-sm tracking-wide text-neutral-900"
            onClick={() => setMenuOpen(false)}
          >
            THE CHRONICLER
          </a>

          {/* Desktop links */}
          <nav className="hidden sm:flex items-center gap-6">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs font-semibold tracking-widest text-neutral-600 uppercase hover:text-neutral-900 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Hamburger (mobile) */}
          <button
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((p) => !p)}
            className="sm:hidden flex flex-col gap-[5px] p-2 group"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-neutral-900 origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block h-0.5 w-6 bg-neutral-900 origin-center"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-neutral-900 origin-center transition-all"
            />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="sm:hidden overflow-hidden border-t border-neutral-200/50 bg-[#FAF8F5]/98"
            >
              <div className="px-6 py-4 flex flex-col gap-5">
                {links.map(([href, label], i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="font-mono text-sm font-semibold tracking-widest text-neutral-700 uppercase hover:text-neutral-900"
                  >
                    {label}
                  </motion.a>
                ))}
                <div className="pt-2 border-t border-neutral-100">
                  <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                    Ernest Douwes Dekker · 1879 – 1950
                  </span>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

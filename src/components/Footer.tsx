import React from 'react';
import { motion } from 'framer-motion';

/**
 * Footer — simple, typographic, archival feel.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-neutral-200 bg-neutral-900 py-16 text-stone-400">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 mb-3">
              The Chronicler
            </h3>
            <p className="text-xs leading-relaxed text-stone-500">
              Platform edukasi sejarah interaktif mengangkat perjuangan tokoh-tokoh nasional Indonesia, dimulai dari Ernest Douwes Dekker — pelopor nasionalisme.
            </p>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-mono text-xs font-bold tracking-widest text-stone-300 uppercase mb-4">Navigasi</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                ['#hero', 'Hero'],
                ['#profil', 'Profil'],
                ['#lini-masa', 'Lini Masa'],
                ['#galeri', 'Galeri Arsip'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-stone-100 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-mono text-xs font-bold tracking-widest text-stone-300 uppercase mb-4">Referensi</h4>
            <ul className="space-y-2 text-xs text-stone-500 leading-relaxed">
              <li>Perpustakaan Nasional RI</li>
              <li>Arsip Nasional Republik Indonesia</li>
              <li>Wikipedia Commons (gambar publik)</li>
              <li>Sejarah Indonesia — Pahlawan Nasional</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="font-mono text-sm text-stone-500 tracking-widest uppercase">
            © 2026 · The Chronicler
          </p>
        </div>
      </div>
    </footer>
  );
};


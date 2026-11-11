import React from 'react';
import { motion } from 'framer-motion';
import { HistoricalImageCard } from './HistoricalImageCard';
import { InteractiveHalftoneCanvas } from './InteractiveHalftoneCanvas';
import { NewspaperMasthead } from './NewspaperMasthead';
import { galleryItems } from '../data/gallery';

/**
 * GallerySection
 * Full image grid with interactive halftone background, 3D tilt + grayscale reveal on each card.
 */
export const GallerySection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="galeri">
      {/* Interactive halftone behind gallery — lighter touch */}
      <InteractiveHalftoneCanvas
        spacing={20}
        minDotRadius={0.5}
        maxDotRadius={3.2}
        mouseRadius={110}
        mouseStrength={2.5}
        dotColor="#2B2B2B"
        className="opacity-20 z-0"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <NewspaperMasthead edition="Koleksi Arsip" date="Th. 1912 – 1950" />
          <div className="mt-6">
            <p className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
              Galeri Arsip &amp; De Expres
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl text-neutral-900">
              Dokumentasi Sejarah
            </h2>
            <p className="mt-4 text-neutral-600 max-w-xl mx-auto leading-relaxed text-sm">
              Arahkan kursor ke foto — warna asli terungkap. Latar halftone bergerak mengikuti kursor Anda.
            </p>
          </div>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {galleryItems.map((item, i) => (
            <HistoricalImageCard
              key={item.src}
              src={item.src}
              alt={item.alt}
              year={item.year}
              caption={item.caption}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* De Expres quote block */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 mx-auto max-w-3xl rounded-2xl border-l-4 border-neutral-900 bg-white/70 p-5 sm:p-8 shadow-sm backdrop-blur-sm"
        >
          <p className="font-mono text-[10px] sm:text-xs text-neutral-500 tracking-widest uppercase mb-4">
            De Expres, 1913
          </p>
          <p className="font-serif text-base sm:text-xl italic leading-relaxed text-neutral-800 mb-6">
            "Als ik eens Nederlander was, ik zou het zeker niet prettig vinden, dat aan vreemde volken — zelfs al waren zij mijn onderdanen — gevraagd werd een feest mee te vieren dat hun herinnert aan hun eigen slavernij en dienstbaarheid."
          </p>
          <div className="border-t border-neutral-200 pt-4">
            <p className="font-serif text-sm sm:text-base leading-relaxed text-neutral-700 mb-3">
              <strong className="text-neutral-900">Terjemahan:</strong> "Jika saya seorang Belanda, saya pasti tidak akan senang jika bangsa asing — bahkan jika mereka adalah rakyat saya — diminta merayakan perayaan yang mengingatkan mereka pada perbudakan dan ketundukan mereka sendiri."
            </p>
          </div>
          <footer className="mt-4 text-xs sm:text-sm text-neutral-500 not-italic">
            — Suwardi Suryaningrat, dalam surat kabar <em>De Expres</em> yang diedit oleh Douwes Dekker
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};


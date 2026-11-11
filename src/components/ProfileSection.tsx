import React from 'react';
import { motion } from 'framer-motion';
import { HalftoneBackground } from './HalftoneBackground';
import douwesProfile from '../assets/douwes profile.png';

/**
 * ProfileSection
 * Explains who Ernest Douwes Dekker was, and clearly distinguishes him
 * from Eduard Douwes Dekker (Multatuli / Max Havelaar).
 */
export const ProfileSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="profil">
      <HalftoneBackground className="opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            Mengenal Sang Pahlawan
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl text-neutral-900">
            Siapa Douwes Dekker?
          </h2>
        </motion.div>

        {/* Profile card with douwes profile image */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr] mb-20 items-center">
          {/* Ernest card — featured */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="group relative rounded-2xl border-2 border-neutral-900 bg-neutral-900 p-5 sm:p-6 text-stone-100 shadow-xl"
          >
            <div className="absolute top-3 right-3 rounded bg-white/10 px-2 py-1 font-mono text-[9px] font-bold tracking-widest text-stone-300 uppercase">
              Fokus Utama
            </div>
            <div className="mb-3 inline-flex items-center gap-2">
              <div className="h-1 w-6 bg-stone-400 rounded" />
              <span className="font-mono text-[11px] text-stone-400 tracking-widest uppercase">1879 – 1950</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold mb-1">Ernest Douwes Dekker</h3>
            <p className="font-mono text-xs text-stone-400 mb-4 italic">Danudirja Setiabudi</p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <li className="flex gap-2.5">
                <span className="text-stone-500 mt-0.5 flex-shrink-0">▸</span>
                <span><strong className="text-white">Pelopor Nasionalisme Indonesia</strong> dan pendiri partai kemerdekaan pertama — <em>Indische Partij</em> (1912).</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-stone-500 mt-0.5 flex-shrink-0">▸</span>
                <span>Bagian dari <strong className="text-white">Tiga Serangkai</strong> bersama Cipto Mangunkusumo dan Suwardi Suryaningrat.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-stone-500 mt-0.5 flex-shrink-0">▸</span>
                <span>Jurnalis tajam harian <em>De Expres</em> yang menggugat sistem kolonial melalui kata-kata.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-stone-500 mt-0.5 flex-shrink-0">▸</span>
                <span>Setelah kemerdekaan, mengabdi sebagai <strong className="text-white">Menteri Negara RI</strong> dengan nama Danudirja Setiabudi.</span>
              </li>
            </ul>
          </motion.div>

          {/* Douwes profile image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex items-end justify-center h-full min-h-[300px] lg:min-h-0"
          >
            <img 
              src={douwesProfile} 
              alt="Douwes Dekker Profile" 
              className="w-full h-full max-h-[500px] lg:max-h-none object-contain object-bottom" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};


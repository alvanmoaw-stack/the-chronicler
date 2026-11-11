import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewspaperReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewspaperReaderModal: React.FC<NewspaperReaderModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Newspaper Broadsheet Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border-4 border-neutral-900 bg-[#F4EFE6] text-neutral-900 shadow-2xl p-6 sm:p-10 selection:bg-neutral-900 selection:text-stone-100"
            style={{
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7), inset 0 0 80px rgba(180, 160, 130, 0.25)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Tutup Kliping"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-[#F4EFE6] text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>

            {/* Vintage Newspaper Top Bar */}
            <div className="border-b-2 border-neutral-900 pb-3 mb-6">
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-neutral-600 mb-1">
                <span>Edisi Khusus Arsip Nasional</span>
                <span>Bandoeng, Sabtu 19 Juli 1913</span>
                <span>Harga: 10 Cent</span>
              </div>
              <div className="text-center py-2 border-y border-neutral-900/40 my-1">
                <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight italic">
                  DE EXPRES
                </h2>
                <p className="font-mono text-[9px] sm:text-xs tracking-[0.3em] uppercase text-neutral-700 mt-1">
                  Dagblad voor Nederlandsch-Indië — Pemimpin Redaksi: E.F.E. Douwes Dekker
                </p>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 pt-1">
                <span>Jaargang II — No. 165</span>
                <span>Suplemen Sejarah &amp; Pergerakan</span>
                <span>Bandung / Batavia</span>
              </div>
            </div>

            {/* Headline */}
            <div className="text-center mb-8">
              <span className="stamp text-red-900 border-red-900 mb-3 inline-block">
                ARSIP SENSOR KOLONIAL
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 mt-2">
                "ALS IK EENS NEDERLANDER WAS"
              </h1>
              <p className="font-serif italic text-base sm:text-lg text-neutral-700 mt-2">
                (Seandainya Aku Seorang Belanda) — Tulisan Bersejarah yang Mengguncang Hindia
              </p>
              <div className="mx-auto mt-3 h-0.5 w-24 bg-neutral-900" />
            </div>

            {/* Newspaper Columns Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify font-serif text-sm leading-relaxed text-neutral-800">
              {/* Kolom Kiri: Naskah Belanda & Konteks */}
              <div className="border-b md:border-b-0 md:border-r border-neutral-300 md:pr-8 pb-6 md:pb-0">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 pb-1 border-b border-neutral-400 mb-3">
                  Naskah Asli (Fragmen De Expres 1913)
                </h3>
                <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-none text-neutral-900 italic">
                  "Als ik eens Nederlander was, zou ik het feest der onafhankelijkheid niet in Nederlandsch-Indië vieren. Ik zou eerst aan de onderworpen bevolking vrijheid schenken, alvorens mijn eigen onafhankelijkheid te gedenken..."
                </p>
                <p className="mt-3">
                  Tulisan ini dibuat oleh Suwardi Suryaningrat (Ki Hajar Dewantara) sebagai protes tajam atas rencana perayaan 100 tahun kemerdekaan Belanda dari Prancis yang justru dipungut biayanya dari rakyat pribumi yang sedang dijajah.
                </p>
                <div className="mt-4 p-4 bg-neutral-200/60 rounded border-l-4 border-neutral-900 font-sans text-xs">
                  <p className="font-bold text-neutral-900 mb-1">Peran Kritis Ernest Douwes Dekker:</p>
                  <p className="text-neutral-700">
                    Sebagai pimpinan <em>De Expres</em>, Douwes Dekker tidak hanya menerbitkan tulisan Suwardi, tetapi juga membela rekan-rekannya dengan menulis artikel pendamping berjudul <strong>"Onze Helden: Tjipto Mangoenkoesoemo en Soewardi Soerjaningrat"</strong> (Pahlawan Kita), yang akhirnya memicu pembuangan Tiga Serangkai ke Belanda.
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Terjemahan Indonesia & Dampak */}
              <div className="md:pl-2">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 pb-1 border-b border-neutral-400 mb-3">
                  Terjemahan &amp; Arti Sejarah
                </h3>
                <blockquote className="italic border-l-2 border-neutral-800 pl-3 py-1 my-2 bg-stone-200/40 text-neutral-900">
                  "Sekiranya aku seorang Belanda, aku tidak akan menyelenggarakan pesta kemerdekaan di negeri yang telah kita rampas kemerdekaannya. Sejajarkan dulu hak rakyat jajahan sebelum kita menari di atas keringat mereka."
                </blockquote>
                <p className="mt-3">
                  Artikel ini menjadi salah satu pamflet politik paling radikal dalam sejarah Nusantara. Pemerintah Hindia Belanda di bawah Gubernur Jenderal Idenburg segera memberlakukan pasal pembuangan (*exorbitante rechten*).
                </p>
                <div className="mt-6 border-t border-neutral-300 pt-4">
                  <h4 className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest mb-2">
                    Fakta Sejarah Penting:
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-neutral-700">
                    <li><strong>Agustus 1913:</strong> Tiga Serangkai resmi ditahan dan diputuskan untuk dibuang ke Kupang, Banda, dan Bangka, sebelum dialihkan langsung ke Belanda atas permintaan mereka.</li>
                    <li><strong>De Expres:</strong> Harian ini menjadi pelopor jurnalisme pergerakan nasional yang berani menyuarakan persatuan tanpa memandang suku, agama, maupun ras.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Signature / Footer */}
            <div className="mt-8 pt-4 border-t-2 border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600 gap-3">
              <span className="italic">Koleksi Digital Sejarah Pergerakan Kemerdekaan Indonesia</span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded bg-neutral-900 text-stone-100 font-bold hover:bg-neutral-800 transition-colors uppercase tracking-wider text-xs"
              >
                Tutup Arsip
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


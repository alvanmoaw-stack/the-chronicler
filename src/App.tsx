import { useState, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { TimelineSection } from './components/TimelineSection';
import { QuotesSection } from './components/QuotesSection';
import { GallerySection } from './components/GallerySection';
import { Footer } from './components/Footer';
import { IntroLoader } from './components/IntroLoader';
import { ChatBot } from './components/ChatBot';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  useLenis();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleIntroDone = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <IntroLoader onDone={handleIntroDone} />

      <div
        className="relative min-h-screen bg-[#FAF8F5] text-neutral-900 selection:bg-neutral-900 selection:text-stone-100"
        style={{
          overflow: introComplete ? 'visible' : 'hidden',
          maxHeight: introComplete ? 'none' : '100vh',
        }}
      >
        {/* Global scroll progress bar */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 right-0 left-0 z-[100] h-[3px] origin-left bg-neutral-900"
          aria-hidden="true"
        />

        <Navbar />

        <main>
          {/* 1. Hero — interactive halftone canvas */}
          <HeroSection />

          {/* 2. Profile */}
          <ProfileSection />

          {/* 3. Timeline */}
          <TimelineSection />

          {/* 4. Quotes — kinetic typography */}
          <QuotesSection />

          {/* 5. Gallery */}
          <GallerySection />
        </main>

        <Footer />

        {/* ChatBot - floating chat button */}
        {introComplete && <ChatBot />}
      </div>
    </>
  );
}

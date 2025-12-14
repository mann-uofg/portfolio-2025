import React, { useState, useEffect } from 'react';
import Lenis from 'lenis'; 
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { HelloIntro } from './components/HelloIntro';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import cloudImg from '/clouds.png';
import cloudNightImg from '/clouds_night.png';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  // Initialize state by checking localStorage
  const [showIntro, setShowIntro] = useState(() => {
    return !localStorage.getItem('hasSeenIntro');
  });

  const { scrollY } = useScroll();

  // Parallax Physics:
  // We move the background slower than the scroll to create depth.
  const backgroundY = useTransform(scrollY, [0, 5000], ["0%", "-50%"]);

  // Prevent browser scroll restoration on refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock scroll during intro
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showIntro]);

  // Toggle Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Initialize Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-apple-blue selection:text-white">
      <AnimatePresence>
        {showIntro && <HelloIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Seamless Parallax Background Container */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-b from-blue-50/80 to-white dark:from-[#050505] dark:to-[#1a1a1a] transition-colors duration-700">
        
        {/* 
            Seamless Mirroring Technique with Cross-Fade:
            We render two layers (Light & Dark) and fade between them using opacity.
        */}
        <motion.div 
            className="absolute inset-0 w-full h-[200vh]"
            style={{ y: backgroundY }}
        >
            {/* --- LIGHT MODE LAYER --- */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                {/* Image 1: Normal */}
                <div 
                    className="absolute top-0 left-0 w-full h-[100vh] opacity-80"
                    style={{
                        backgroundImage: `url(${cloudImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                />
                {/* Image 2: Mirrored Vertically */}
                <div 
                    className="absolute top-[100vh] left-0 w-full h-[100vh] opacity-80 scale-y-[-1]"
                    style={{
                        backgroundImage: `url(${cloudImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                />
                 {/* Image 3: Normal (Loop) */}
                 <div 
                    className="absolute top-[200vh] left-0 w-full h-[100vh] opacity-80"
                    style={{
                        backgroundImage: `url(${cloudImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                />
            </div>

            {/* --- DARK MODE LAYER --- */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                {/* Image 1: Normal */}
                <div 
                    className="absolute top-0 left-0 w-full h-[100vh] opacity-60 blur-sm"
                    style={{
                        backgroundImage: `url(${cloudNightImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                />
                {/* Image 2: Mirrored Vertically */}
                <div 
                    className="absolute top-[100vh] left-0 w-full h-[100vh] opacity-60 scale-y-[-1] blur-sm"
                    style={{
                        backgroundImage: `url(${cloudNightImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                />
                 {/* Image 3: Normal (Loop) */}
                 <div 
                    className="absolute top-[200vh] left-0 w-full h-[100vh] opacity-60 blur-sm"
                    style={{
                        backgroundImage: `url(${cloudNightImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center bottom',
                    }}
                />
            </div>
        </motion.div>

        {/* 
            Blur Overlay:
            Applies blur only to the center of the screen using a mask.
        */}
        <div 
            className="absolute inset-0 pointer-events-none backdrop-blur-[2px]"
            style={{
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
            }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="noise-overlay" />
        <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        
        <motion.main
          initial={{ opacity: 0, scale: 0.92, y: 50, filter: "blur(10px)" }}
          animate={!showIntro ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2 
          }}
        >
          <Hero />
          <Projects />
          <Experience />
          <Resume />
          <Contact />
        </motion.main>
        
        <Footer />
      </div>
    </div>
  );
};

export default App;
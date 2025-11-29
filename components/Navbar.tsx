import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, FileText, Mail, Sun, Moon, Layers } from 'lucide-react';

interface NavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

// Hook for responsive check
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const mouseX = useMotionValue(Infinity);
  const isMobile = useIsMobile();
  
  // Guide State
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0); // 0: Navbar, 1: Game

  useEffect(() => {
    // Show guide after the Hello animation finishes (approx 5s)
    const timer = setTimeout(() => setShowGuide(true), 4550);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (guideStep < 1) {
        setGuideStep(prev => prev + 1);
    } else {
        setShowGuide(false);
    }
  };

  const handleSkip = () => {
    setShowGuide(false);
  };

  // Only show guide if state is true AND we are not on mobile
  const shouldShowGuide = showGuide && !isMobile;

  // Lock scroll when guide is visible
  useEffect(() => {
    if (shouldShowGuide) {
      document.body.style.overflow = 'hidden';
      // Unlock scroll when guide closes or component unmounts
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [shouldShowGuide]);

  return (
    <>
      {/* Inject Handwritten Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        .font-hand { font-family: 'Kalam', cursive; }
      `}</style>

      {/* Top Brand Indicator - Minimalist & Fixed */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50 mix-blend-difference text-white pointer-events-none select-none"
      >
      </motion.div>

      {/* Spotlight Guide Overlay */}
      <AnimatePresence>
        {shouldShowGuide && (
            <div className="fixed inset-0 z-[60] overflow-hidden pointer-events-none">
                {/* Spotlight Hole & Shadow 
                    The div itself is the transparent "hole", the shadow creates the dark overlay around it.
                */}
                <motion.div
                    initial={false}
                    animate={guideStep === 0 ? "navbar" : "game"}
                    variants={{
                        navbar: {
                            top: "auto",
                            bottom: "16px",
                            left: "50%",
                            x: "-50%",
                            y: 0,
                            width: "min(50vw, 470px)",
                            height: "100px",
                            borderRadius: "20px"
                        },
                        game: {
                            // Desktop settings only (guide hidden on mobile)
                            top: "40%",
                            left: "75%",
                            bottom: "auto",
                            x: "-77%",
                            y: "-32%",
                            width: "450px",
                            height: "560px",
                            borderRadius: "40px"
                        }
                    }}
                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute shadow-[0_0_0_9999px_rgba(0,0,0,0.85)] border-2 border-white/20 pointer-events-auto"
                >
                    {/* Guide Content Container - Moves with the spotlight */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute w-[300px] pointer-events-auto"
                        style={{
                            // Position text relative to the hole based on step
                            top: guideStep === 0 ? "-180px" : "110%",
                            left: guideStep === 0 ? "50%" : "0%",
                            x: guideStep === 0 ? "-50%" : "-20%",
                        }}
                    >
                        <div className="relative flex flex-col items-center">
                            {/* Animated Arrow */}
                            <div className={`absolute ${guideStep === 0 ? '-bottom-4 left-1/2 -translate-x-1/2 translate-y-full' : '-top-16 left-10 -scale-y-100'}`}>
                                <svg width="60" height="60" viewBox="0 0 100 100" className="text-white/90 drop-shadow-lg">
                                    <motion.path 
                                        d="M20,10 C20,10 50,80 80,80" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="3" 
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                    <motion.path 
                                        d="M60,70 L80,80 L75,95" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="3" 
                                        strokeLinecap="round"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.4 }}
                                    />
                                </svg>
                            </div>

                            {/* Handwritten Note */}
                            <div className="font-hand text-white text-2xl md:text-3xl text-center rotate-[-2deg] drop-shadow-md">
                                {guideStep === 0 ? (
                                    <p>
                                        Hover here to explore <br/>
                                        <span className="text-yellow-300">my world!</span>
                                    </p>
                                ) : (
                                    <p>
                                        Initialize the system <br/>
                                        <span className="text-cyan-300">by clicking nodes!</span>
                                    </p>
                                )}
                            </div>

                            {/* Handwritten Buttons */}
                            <div className="flex gap-6 mt-4 font-hand text-xl">
                                <button 
                                    onClick={handleSkip}
                                    className="text-gray-400 hover:text-white transition-colors underline decoration-wavy decoration-gray-500/50"
                                >
                                    Skip
                                </button>
                                <button 
                                    onClick={handleNext}
                                    className="text-yellow-300 hover:text-yellow-200 transition-colors font-bold flex items-center gap-2"
                                >
                                    {guideStep === 0 ? "Next Step ->" : "Got it!"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* The Liquid Dock - Original Design Preserved */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-4 pointer-events-none transition-all duration-500 ${shouldShowGuide && guideStep === 0 ? 'z-[70]' : 'z-50'}`}>
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={`
                pointer-events-auto mx-auto flex h-16 items-end gap-4 rounded-2xl px-4 pb-3 shadow-2xl transition-all duration-500
                bg-white/40 dark:bg-black/40 backdrop-blur-2xl 
                border border-gray-400/40 dark:border-white/20
                ${shouldShowGuide && guideStep === 0 ? 'ring-4 ring-blue-500/30 scale-105' : ''}
            `}
        >
            <DockIcon mouseX={mouseX} href="#" icon={Home} label="Home" />
            <DockIcon mouseX={mouseX} href="#projects" icon={Briefcase} label="Work" />
            <DockIcon mouseX={mouseX} href="#experience" icon={Layers} label="Experience" />
            <DockIcon mouseX={mouseX} href="#resume" icon={FileText} label="Resume" />
            <DockIcon mouseX={mouseX} href="#contact" icon={Mail} label="Contact" />
            
            {/* Vertical Divider */}
            <div className="h-8 w-px bg-gray-400/30 dark:bg-white/20 mx-1 mb-1" />
            
            <DockIcon 
                mouseX={mouseX} 
                onClick={toggleTheme} 
                icon={isDark ? Sun : Moon} 
                label={isDark ? "Light Mode" : "Dark Mode"} 
            />
        </motion.div>
      </div>
    </>
  );
};

// Sub-component for the magnetic icons - Original Design Preserved
function DockIcon({ 
    mouseX, 
    href, 
    icon: Icon, 
    label, 
    onClick 
}: { 
    mouseX: MotionValue; 
    href?: string; 
    icon: any; 
    label: string; 
    onClick?: () => void; 
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Transform distance to width (Magnification effect)
  // Base width: 40px, Max width: 80px when cursor is close
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 85, 40]);
  
  // Add spring physics to the width change for smoothness
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square group relative flex items-center justify-center rounded-full bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 shadow-sm hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
        onClick={onClick}
    >
        {href ? (
            <a href={href} className="flex items-center justify-center w-full h-full">
                <Icon className="w-2/5 h-2/5 text-gray-800 dark:text-gray-200" />
            </a>
        ) : (
            <button className="flex items-center justify-center w-full h-full">
                <Icon className="w-2/5 h-2/5 text-gray-800 dark:text-gray-200" />
            </button>
        )}

        {/* Floating Tooltip */}
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-black text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
            {label}
        </span>
    </motion.div>
  );
}
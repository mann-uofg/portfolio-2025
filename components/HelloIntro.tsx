import React from 'react';
import { motion } from 'framer-motion';
import { AppleHelloEnglishEffect } from './AppleHelloEnglishEffect';

export const HelloIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-3xl overflow-hidden perspective-[1000px]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Crazy Background: Warp Speed Tunnel & Data Burst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         
         {/* 1. The Tunnel: Expanding Geometric Portals */}
         {[...Array(6)].map((_, i) => (
             <motion.div
                key={`tunnel-${i}`}
                className={`
                    absolute border-[1px] rounded-full
                    ${i % 2 === 0 ? 'border-blue-500/10 dark:border-blue-400/5' : 'border-purple-500/10 dark:border-purple-400/5'}
                `}
                style={{
                    width: '200px',
                    height: '200px',
                }}
                initial={{ 
                    scale: 0,
                    opacity: 0,
                    rotate: 0,
                    z: 0
                }}
                animate={{ 
                    scale: [0, 8], // Expand massively
                    opacity: [0, 0.3, 0], // Fade in then out - Lowered opacity significantly
                    rotate: [0, i % 2 === 0 ? 45 : -45], // Twist
                    z: [0, 200] // Move towards camera
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeIn",
                    delay: i * 0.5, // Stagger the rings
                }}
             />
         ))}
         
         {/* 2. The Starburst: High speed data lines shooting out */}
         {[...Array(12)].map((_, i) => {
             const angle = (i / 12) * 360; // Distribute around circle
             return (
                 <motion.div
                    key={`burst-${i}`}
                    className="absolute h-[1px] w-[100px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent origin-left"
                    style={{
                        left: '50%',
                        top: '50%',
                        rotate: angle,
                    }}
                    initial={{ 
                        x: 0,
                        scaleX: 0,
                        opacity: 0 
                    }}
                    animate={{ 
                        x: [0, 400], // Move outwards
                        scaleX: [0, 2, 0], // Stretch and shrink
                        opacity: [0, 0.3, 0] // Lowered opacity
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: Math.random() * 1.5
                    }}
                 />
             );
         })}

         {/* 3. Ambient Floating Particles for Depth */}
         {[...Array(20)].map((_, i) => (
             <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-gray-400/20 rounded-full"
                initial={{ 
                    x: (Math.random() - 0.5) * window.innerWidth,
                    y: (Math.random() - 0.5) * window.innerHeight,
                    scale: 0
                }}
                animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.2, 0] // Lowered opacity
                }}
                transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                }}
             />
         ))}
      </div>

      <div className="relative z-10 text-black dark:text-white scale-110 md:scale-125">
        {/* Speed 0.7 makes it slightly faster than default to feel snappy */}
        <AppleHelloEnglishEffect speed={0.7} onAnimationComplete={() => {
            // Add a small delay before fading out so the user sees the full "hello"
            setTimeout(onComplete, 1000);
        }} />
      </div>
    </motion.div>
  );
};
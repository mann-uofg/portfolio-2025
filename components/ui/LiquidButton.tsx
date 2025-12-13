import React from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  children, 
  href, 
  onClick, 
  className = '',
  variant = 'primary'
}) => {
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.1 });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.4 });

  const isPrimary = variant === 'primary';

  const baseClasses = `
    relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-base transition-all duration-300
    flex items-center justify-center gap-2 group
    ${className}
  `;

  // Deep liquid shadows with thicker glass feel
  const primaryClasses = `
    text-white
    bg-apple-blue
    shadow-[0_10px_30px_-10px_rgba(0,113,227,0.6),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_0_rgba(0,0,0,0.1)]
    border-none
  `;

  const secondaryClasses = `
    text-light-text dark:text-dark-text
    bg-white/60 dark:bg-white/5
    backdrop-blur-xl
    shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4)]
    border border-white/20
    hover:bg-white/80 dark:hover:bg-white/10
  `;

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      {...props}
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 0 }}
      onMouseEnter={() => playHover()}
      onMouseDown={() => playClick()}
      // SUPER BOUNCY & FAST
      transition={{ type: "spring", stiffness: 500, damping: 15 }} 
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      
      {/* Gloss Shine */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-50 rounded-t-2xl pointer-events-none"></div>
      
      {/* Shimmer Animation */}
      {isPrimary && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0 pointer-events-none" />
      )}
    </Component>
  );
};
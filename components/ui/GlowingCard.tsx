import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlowingCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`
        relative overflow-hidden rounded-[2rem] 
        bg-white/40 dark:bg-white/5 
        backdrop-blur-2xl saturate-150
        border border-white/40 dark:border-white/10
        shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]
        group
        ${className}
      `}
    >
      {/* Dynamic Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.2), transparent 40%)`,
        }}
      />
      
      {/* Inner Gloss Light */}
      <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_40px_rgba(255,255,255,0.3)] pointer-events-none z-20"></div>

      <div className="relative h-full z-30">{children}</div>
    </motion.div>
  );
};
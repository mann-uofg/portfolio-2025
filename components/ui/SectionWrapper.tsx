import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '' }) => {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2, x: -10 }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          rotate: 0, 
          x: 0 
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          // Combine a spring for the bounce with a slightly different timing for the shake
          type: "spring",
          stiffness: 120,
          damping: 12, // Lower damping allows a bit more "wobble" before settling
          mass: 1.2,
        }}
        className="max-w-7xl mx-auto z-10 relative"
      >
        {children}
      </motion.div>
    </section>
  );
};
import React, { useState, useRef } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { ExternalLink, Github, X, ArrowUpRight, Layers } from 'lucide-react';
import { Project } from '../types';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LiquidButton } from './ui/LiquidButton';

const projects: Project[] = [
  {
    id: 1,
    title: "Vision Pro OS",
    description: "Spatial computing interface for web.",
    longDescription: "Reimagining the web browser for a 3D space. This project implements a complete window management system using Three.js and React Fiber, allowing users to manipulate DOM elements in 3D space. Features include hand-tracking emulation, depth-based blur, and volumetric lighting.",
    tags: ["Three.js", "React Fiber", "WebGL"],
    image: "https://picsum.photos/1000/800?random=10",
    link: "#",
    github: "#",
    featured: true
  },
  {
    id: 2,
    title: "NeoBank",
    description: "The next generation of DeFi.",
    longDescription: "A frictionless banking interface that consolidates crypto and fiat assets. Built with Next.js 14 and Tailwind, featuring real-time websocket updates for market data, biometric authentication flows, and AI-driven spending insights.",
    tags: ["Next.js 14", "Solidity", "Tailwind"],
    image: "https://picsum.photos/1000/800?random=11",
    link: "#",
    github: "#",
    featured: false
  },
  {
    id: 3,
    title: "Sonic Stream",
    description: "Lossless audio streaming protocol.",
    longDescription: "An open-source protocol for high-fidelity audio streaming over poor network conditions. Uses adaptive buffering and a custom compression algorithm to deliver CD-quality sound at 128kbps bandwidth.",
    tags: ["Rust", "WebAssembly", "Audio API"],
    image: "https://picsum.photos/1000/800?random=12",
    link: "#",
    github: "#",
    featured: false
  },
  {
    id: 4,
    title: "Pixel Cloud",
    description: "Distributed GPU rendering.",
    longDescription: "Decentralized rendering network allowing users to monetize their idle GPU power. The frontend dashboard visualizes active render jobs with a stunning particle simulation.",
    tags: ["WebRTC", "Go", "Distributed Systems"],
    image: "https://picsum.photos/1000/800?random=13",
    link: "#",
    github: "#",
    featured: true
  }
];

export const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <SectionWrapper id="projects" className="py-40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider mb-4"
                >
                    <Layers className="w-4 h-4" /> Selected Work
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-bold text-light-text dark:text-dark-text tracking-tighter">
                    Digital <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Real Estate.</span>
                </h2>
            </div>
            <p className="text-xl text-light-secondary dark:text-dark-secondary max-w-sm leading-relaxed">
                Crafting immersive digital experiences that push the boundaries of the browser.
            </p>
        </div>

        {/* BENTO GRID LAYOUT - LIQUID STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className={`
                relative group cursor-pointer rounded-[2.5rem] overflow-hidden
                liquid-card
                ${project.featured ? 'md:col-span-8' : 'md:col-span-4'}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
               {/* Background Image with Parallax on Hover */}
               <div className="absolute inset-0 w-full h-full overflow-hidden">
                   <motion.img 
                        layoutId={`image-${project.id}`}
                        src={project.image}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
               </div>

               {/* Content Overlay */}
               <motion.div 
                    className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end z-20"
                    layoutId={`content-${project.id}`}
                >
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{project.title}</h3>
                        <p className="text-gray-300 line-clamp-2 text-lg group-hover:text-white transition-colors">{project.description}</p>
                   </div>
               </motion.div>

               {/* Hover Icon */}
               <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 border border-white/20">
                   <ArrowUpRight className="w-6 h-6" />
               </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* IMMERSIVE MODAL */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-3xl z-[60]"
            />
            
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
              {projects.filter(p => p.id === selectedId).map(project => (
                <motion.div
                  layoutId={`card-container-${project.id}`}
                  key={project.id}
                  className="w-full max-w-5xl h-[85vh] bg-[#f5f5f7] dark:bg-[#101010] rounded-[3rem] overflow-hidden shadow-2xl relative pointer-events-auto flex flex-col md:flex-row"
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  {/* Close Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="absolute top-6 right-6 z-50 p-3 bg-black/5 dark:bg-white/10 backdrop-blur-xl rounded-full text-black dark:text-white hover:scale-110 transition-transform"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Left Side: Image */}
                  <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                    <motion.img 
                      layoutId={`image-${project.id}`}
                      src={project.image} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                  </div>

                  {/* Right Side: Details */}
                  <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto p-8 md:p-12 bg-white dark:bg-[#101010]">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                        className="h-full flex flex-col"
                    >
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(tag => (
                                <span key={tag} className="px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                                    {tag}
                                </span>
                                ))}
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6 tracking-tighter">{project.title}</h2>
                            <p className="text-xl text-light-secondary dark:text-dark-secondary leading-relaxed mb-10 font-light">
                                {project.longDescription}
                            </p>

                            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 mb-8">
                                <h4 className="font-bold text-light-text dark:text-dark-text mb-2">Tech Stack</h4>
                                <div className="flex gap-4 text-3xl text-gray-400">
                                    {/* Mock Icons */}
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <LiquidButton href={project.link} variant="primary" className="flex-1">
                                View Live
                            </LiquidButton>
                            <LiquidButton href={project.github} variant="secondary" className="flex-1">
                                <Github className="w-5 h-5" />
                            </LiquidButton>
                        </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
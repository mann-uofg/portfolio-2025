import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, RefreshCw, Power, Cpu, CheckCircle2 } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse Interaction Logic
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // Calculate center-based coordinates (-1 to 1)
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Physics for smooth movement
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transforms for 3D Tilt
  const rotateX = useTransform(springY, [-1, 1], [5, -5]); // Tilt up/down
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]); // Tilt left/right

  // --- MINI GAME LOGIC ---
  const GRID_SIZE = 5;
  const [grid, setGrid] = useState<boolean[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const startNewGame = () => {
    const newGrid = Array(GRID_SIZE * GRID_SIZE).fill(true);
    let previousIndex = -1;
    // Create solvable puzzle by working backwards
    for(let i = 0; i < 7; i++) {
        let r = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        while(r === previousIndex) r = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        toggleLogic(newGrid, r);
        previousIndex = r;
    }
    setGrid([...newGrid]);
    setIsWon(false);
    setMoves(0);
  };

  const toggleLogic = (currentGrid: boolean[], index: number) => {
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;
      const indices = [index];
      if (row > 0) indices.push(index - GRID_SIZE);
      if (row < GRID_SIZE - 1) indices.push(index + GRID_SIZE);
      if (col > 0) indices.push(index - 1);
      if (col < GRID_SIZE - 1) indices.push(index + 1);
      indices.forEach(i => currentGrid[i] = !currentGrid[i]);
  };

  const handleCellClick = (index: number) => {
      if (isWon) return;
      const newGrid = [...grid];
      toggleLogic(newGrid, index);
      setGrid(newGrid);
      setMoves(m => m + 1);
      if (newGrid.every(c => c)) setIsWon(true);
  };

  useEffect(() => { startNewGame(); }, []);
  // -----------------------

  return (
    <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden perspective-1000"
    >
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center lg:text-left"
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full glass text-xs font-bold tracking-widest text-apple-blue uppercase shadow-lg shadow-blue-500/10 backdrop-blur-xl border border-blue-200/50 dark:border-blue-900/30">
            Computer Engineering Student
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-light-text dark:text-dark-text leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-600 dark:from-white dark:to-gray-400">Silicon</span> Roots.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Digital</span> Flow.
          </h1>
          
          <p className="text-xl md:text-2xl text-light-secondary dark:text-dark-secondary mb-12 max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
            Bridging the gap between hardware architecture and immersive software experiences. Crafting efficient, scalable systems with an eye for design.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <LiquidButton href="#projects" variant="primary">
               View Projects <ArrowDown className="w-4 h-4" />
            </LiquidButton>
            
            <div className="flex items-center gap-3">
               <a href="#" className="p-4 glass rounded-full text-light-text dark:text-dark-text hover:bg-white/40 dark:hover:bg-white/10 transition-all hover:scale-110 shadow-lg shadow-black/5">
                 <Github className="w-5 h-5" />
               </a>
               <a href="#" className="p-4 glass rounded-full text-light-text dark:text-dark-text hover:bg-white/40 dark:hover:bg-white/10 transition-all hover:scale-110 shadow-lg shadow-black/5">
                 <Linkedin className="w-5 h-5" />
               </a>
            </div>
          </div>
        </motion.div>

        {/* Interactive Game Container */}
        <motion.div 
            style={{ 
                y, 
                opacity,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className="relative hidden lg:flex flex-col h-[600px] w-full items-center justify-center gap-6"
        >
            <div className="relative w-[400px] bg-black/5 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-2xl p-6 transform-style-3d">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Cpu className={`w-5 h-5 ${isWon ? 'text-green-500' : 'text-blue-500'}`} />
                        <span className="text-sm font-bold tracking-wider text-light-text dark:text-dark-text uppercase">
                            {isWon ? 'System Online' : 'Initialize Core'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-500">{moves} MOVES</span>
                        <button 
                            onClick={startNewGame}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-500 hover:text-blue-500"
                            title="Reset System"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-5 gap-3 mb-6">
                    {grid.map((active, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.05, z: 10 }}
                            whileTap={{ scale: 0.95, z: 0 }}
                            onClick={() => handleCellClick(i)}
                            className={`
                                aspect-square rounded-lg transition-all duration-300 relative overflow-hidden
                                ${active 
                                    ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-blue-400' 
                                    : 'bg-gray-200/20 dark:bg-white/5 border border-white/10 hover:border-white/30'
                                }
                            `}
                        >
                            {active && (
                                <motion.div 
                                    layoutId="glow"
                                    className="absolute inset-0 bg-gradient-to-tr from-cyan-400/50 to-transparent" 
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Status Bar */}
                <div className="h-12 bg-black/5 dark:bg-black/20 rounded-xl flex items-center justify-between px-4 border border-white/5">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isWon ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-medium text-gray-500">
                            {isWon ? 'OPTIMAL EFFICIENCY' : 'PARTIAL POWER'}
                        </span>
                    </div>
                    {isWon && (
                        <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="text-green-500"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                        </motion.div>
                    )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-[2rem] blur-xl"></div>
            </div>
            
            {/* Game Tip */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="text-xs text-center font-mono py-1.5 px-3 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-200 shadow-sm"
            >
                <span className="font-bold text-blue-600 dark:text-blue-400 mr-1.5">TIP</span> 
                Click a node to toggle its state and neighbors. Light them all up.
            </motion.div>
        </motion.div>
      </div>
      
    </div>
  );
};
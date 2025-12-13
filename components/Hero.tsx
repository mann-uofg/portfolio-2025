import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, RefreshCw, Power, Cpu, CheckCircle2, Wand2 } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';
import confetti from 'canvas-confetti';

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
  
  // New State for Solver
  const [solutionPath, setSolutionPath] = useState<number[]>([]);
  const [isAutoSolving, setIsAutoSolving] = useState(false);

  const startNewGame = () => {
    const newGrid = Array(GRID_SIZE * GRID_SIZE).fill(true);
    const newSolutionPath: number[] = [];
    let previousIndex = -1;
    
    // Create solvable puzzle by working backwards
    for(let i = 0; i < 7; i++) {
        let r = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        while(r === previousIndex) r = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        toggleLogic(newGrid, r);
        newSolutionPath.push(r); // Track the move
        previousIndex = r;
    }
    
    // Consolidate duplicates in path (clicking twice cancels out)
    const uniquePath = newSolutionPath.reduce((acc, curr) => {
        if (acc.includes(curr)) {
            return acc.filter(n => n !== curr);
        }
        return [...acc, curr];
    }, [] as number[]);

    setGrid([...newGrid]);
    setSolutionPath(uniquePath);
    setIsWon(false);
    setMoves(0);
    setIsAutoSolving(false);
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
      if (isWon || isAutoSolving) return;
      
      const newGrid = [...grid];
      toggleLogic(newGrid, index);
      setGrid(newGrid);
      setMoves(m => m + 1);
      
      // Update solution path dynamically
      setSolutionPath(prev => {
          if (prev.includes(index)) {
              // User clicked a correct node, remove it from needed moves
              return prev.filter(i => i !== index);
          } else {
              // User clicked a wrong node, add it to needed moves (needs undo)
              return [...prev, index];
          }
      });

      if (newGrid.every(c => c)) {
        setIsWon(true);
        triggerWinConfetti(); // Call the function
      }
  };

  const handleAutoWin = () => {
    const newGrid = Array(25).fill(true);
    setGrid(newGrid);
    setIsWon(true);
    triggerWinConfetti(); 
  };

  const triggerWinConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#007AFF', '#00C7BE', '#ffffff']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#007AFF', '#00C7BE', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleAutoSolve = async () => {
      if (isAutoSolving || isWon) return;
      setIsAutoSolving(true);
      
      // Create a copy of the path to iterate over
      const movesToMake = [...solutionPath];
      
      for (const index of movesToMake) {
          await new Promise(resolve => setTimeout(resolve, 300)); // Delay for animation
          
          setGrid(prev => {
              const newGrid = [...prev];
              toggleLogic(newGrid, index);
              return newGrid;
          });
          
          // Remove from path visually
          setSolutionPath(prev => prev.filter(i => i !== index));
      }
      
      setIsWon(true);
      setIsAutoSolving(false);
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
          
                <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-light-text dark:text-dark-text mb-8"
                >
                maybe <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Awwwards</span> nominee? not yet.
                </motion.h1>
                
                <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-light-secondary dark:text-dark-secondary max-w-2xl mb-8 mt-8"
                >
                I'm <span className="font-semibold text-light-text dark:text-dark-text">Mann Modi</span> — an International student studying Computer Engineering at the{' '}
                <a 
                  href="https://www.uoguelph.ca/engineering/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="chromatic-glass px-3 py-1 rounded-2xl inline-block transform hover:rotate-2 hover:scale-105 transition-all duration-500 font-semibold text-light-text dark:text-dark-text"
                >
                  University of Guelph 🇨🇦
                </a>I write code that somehow works and design websites that make people forget to blink.
                </motion.p>

          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start mt-4">
            <LiquidButton href="#projects" variant="primary">
               View Projects <ArrowDown className="w-4 h-4" />
            </LiquidButton>
            
            <div className="flex items-center gap-3">
               <a 
               href="https://github.com/mann-uofg" 
               target="_blank" 
               rel="noopener noreferrer"
               className="p-4 glass rounded-full text-light-text dark:text-dark-text hover:bg-white/40 dark:hover:bg-white/10 transition-all hover:scale-110 shadow-lg shadow-black/5"
               >
               <Github className="w-5 h-5" />
               </a>
               <a 
               href="https://linkedin.com/in/mann-uofg" 
               target="_blank" 
               rel="noopener noreferrer"
               className="p-4 glass rounded-full text-light-text dark:text-dark-text hover:bg-white/40 dark:hover:bg-white/10 transition-all hover:scale-110 shadow-lg shadow-black/5"
               >
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
                        
                        {/* Auto Solve Button - Appears after 30 moves */}
                        <AnimatePresence>
                            {moves >= 30 && !isWon && (
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={handleAutoSolve}
                                    disabled={isAutoSolving}
                                    className="p-2 rounded-full bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
                                    title="Auto Fix System"
                                >
                                    <Wand2 className={`w-4 h-4 ${isAutoSolving ? 'animate-spin' : ''}`} />
                                </motion.button>
                            )}
                        </AnimatePresence>

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
                            disabled={isAutoSolving}
                            className={`
                                aspect-square rounded-lg transition-all duration-300 relative overflow-hidden
                                ${active 
                                    ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-blue-400' 
                                    : 'bg-gray-200/20 dark:bg-white/5 border border-white/10 hover:border-white/30'
                                }
                                ${isAutoSolving && solutionPath.includes(i) ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-black' : ''}
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
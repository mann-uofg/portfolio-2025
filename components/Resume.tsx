import React, { useState } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { Download, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { LiquidButton } from './ui/LiquidButton';

export const Resume: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const pdfUrl = "assets/Resume-LATEST.pdf";

  return (
    <SectionWrapper id="resume" className="bg-gray-50/50 dark:bg-[#101010] py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-3">Resume.</h2>
             <p className="text-light-secondary dark:text-dark-secondary text-lg">Review my professional credentials.</p>
          </div>
          <div className="mt-6 md:mt-0">
             <LiquidButton href={pdfUrl} variant="primary">
                <Download className="w-4 h-4" /> Download PDF
             </LiquidButton>
          </div>
        </div>

        {/* macOS Style Window - Liquid Glass Edition */}
        <motion.div 
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] border border-white/40 dark:border-white/10 bg-white/60 dark:bg-[#1e1e1e]/80 backdrop-blur-xl"
        >
            {/* Window Title Bar */}
            <div className="h-14 bg-white/50 dark:bg-[#252525]/50 backdrop-blur-md border-b border-black/5 dark:border-white/5 flex items-center px-6 justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10 shadow-sm"></div>
                </div>
                <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">Resume_2025.pdf</span>
                <div className="flex gap-3 text-gray-400">
                    <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="hover:text-black dark:hover:text-white transition-colors"><ZoomOut className="w-4 h-4"/></button>
                    <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="hover:text-black dark:hover:text-white transition-colors"><ZoomIn className="w-4 h-4"/></button>
                </div>
            </div>

            {/* PDF Content Area */}
            <div className="h-[600px] bg-gray-100 dark:bg-[#1a1a1a] overflow-hidden flex justify-center p-0 relative">
                 <div 
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                    className="w-full h-full bg-white"
                 >
                    <iframe 
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
                        className="w-full h-full border-none" 
                        title="Resume PDF"
                    ></iframe>
                 </div>
            </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
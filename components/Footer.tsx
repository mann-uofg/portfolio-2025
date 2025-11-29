import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';

export const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative pt-32 pb-12 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent dark:from-[#0a0a0a] dark:to-transparent pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <div className="max-w-2xl">
                        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-light-text dark:text-dark-text mb-8 leading-[0.9]">
                            Let's <br/>
                            <span className="chromatic-glass px-4 rounded-3xl inline-block transform hover:rotate-2 transition-transform duration-500 cursor-default">Build</span> <br/>
                            The Future.
                        </h2>
                        <div className="flex gap-8">
                            <a href="mailto:hello@example.com" className="text-2xl font-medium hover:text-blue-500 transition-colors">hello@example.com</a>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                        <LiquidButton onClick={scrollToTop} variant="secondary" className="!rounded-full !p-6 !aspect-square">
                            <ArrowUp className="w-6 h-6" />
                        </LiquidButton>
                        <span className="text-sm font-medium text-gray-500">Back to Top</span>
                    </div>
                </div>

                <div className="h-px w-full bg-black/10 dark:bg-white/10 mb-8"></div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
                    <p>© {new Date().getFullYear()} DevFolio. Crafted with Fluid Physics.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
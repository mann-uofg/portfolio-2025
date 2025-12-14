import React, { useState, useRef } from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { ExternalLink, Github, X, ArrowUpRight, Layers } from 'lucide-react';
import { Project } from '../types';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LiquidButton } from './ui/LiquidButton';
import { TextScramble } from './ui/TextScramble';

const projects: Project[] = [
	{
		id: 1,
		title: 'Stock Price Prediction Model',
		description:
			'Get predictions for any tickers listed on NASDAQ & NYSE, Just for Educational Purposes.',
		longDescription:
			'Reimagining the web browser for a 3D space. This project implements a complete window management system using Three.js and React Fiber, allowing users to manipulate DOM elements in 3D space. Features include hand-tracking emulation, depth-based blur, and volumetric lighting.',
		tags: ['Python', 'pandas', 'numpy', 'scikit-learn', 'yfinance'],
		image: '/stock-project.png',
		link: 'https://github.com/mann-uofg/stock-price-prediction',
		github: 'https://github.com/mann-uofg/stock-price-prediction',
		featured: true,
	},
	{
		id: 2,
		title: 'CodeView MCP',
		description:
			'AI-powered code-review toolkit: MCP server + CLI to analyze GitHub PRs with local LLM smells, cloud LLM summaries, inline comments, risk gating, and test stub generation',
		longDescription:
			'A frictionless banking interface that consolidates crypto and fiat public. Built with Next.js 14 and Tailwind, featuring real-time websocket updates for market data, biometric authentication flows, and AI-driven spending insights.',
		tags: ['Python', 'SQLite', 'ChromaDB', 'LLMs'],
		image: '/mcp-project.png',
		link: 'https://pypi.org/project/reviewgenie-mcp/1.3.0/',
		github: 'https://github.com/mann-uofg/codeview-mcp',
		featured: false,
	},
	{
		id: 3,
		title: 'Portfolio 2025',
		description: 'I make myself a new fresh portfolio every year, here\'s the one for 2025.',
		longDescription:
			'Decentralized rendering network allowing users to monetize their idle GPU power. The frontend dashboard visualizes active render jobs with a stunning particle simulation.',
		tags: ['Vite.js', 'TypeScript', 'Liquid Glass', 'WebGL', 'Framer Motion'],
		image: '/portfolio-project.png',
		link: '#',
		github: 'https://github.com/mann-uofg/portfolio-2025',
		featured: false,
	},
	{
		id: 4,
		title: 'ugflow.com',
		description: 'Conflict-free course scheduling, Advanced GPA calculation for UofG students.',
		longDescription:
			'An open-source protocol for high-fidelity audio streaming over poor network conditions. Uses adaptive buffering and a custom compression algorithm to deliver CD-quality sound at 128kbps bandwidth.',
		tags: ['Python', 'JavaScript', 'Vite.js', 'Django', 'Framer Motion'],
		image: '/ugflow-project.png',
		link: 'https://ugflow.com/',
		github: 'https://github.com/brij0/coursescheduler',
		featured: true,
	},
];

export const Projects: React.FC = () => {
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
							Digital <br />{' '}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
								Real Estate.
							</span>
						</h2>
					</div>
					<p className="text-xl text-light-secondary dark:text-dark-secondary max-w-sm leading-relaxed">
						Crafting immersive digital experiences that push the boundaries of the
						browser.
					</p>
				</div>

				{/* BENTO GRID LAYOUT - LIQUID STYLE */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
					{projects.map((project, index) => (
						<motion.div
							key={project.id}
							onClick={() => window.open(project.github, '_blank')}
							className={`
                relative group cursor-pointer rounded-[2.5rem] overflow-hidden
                liquid-card
                ${project.featured ? 'md:col-span-8' : 'md:col-span-4'}
              `}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: 'spring', stiffness: 300, damping: 15 }}
						>
							{/* Background Image with Parallax on Hover */}
							<div className="absolute inset-0 w-full h-full overflow-hidden">
								<motion.img
									src={project.image}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
							</div>

							{/* Content Overlay */}
							<motion.div
								className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end z-20"
							>
								<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
									<div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white border border-white/10"
											>
												{tag}
											</span>
										))}
									</div>
									<h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
										{project.title}
									</h3>
									<p className="text-gray-300 line-clamp-2 text-lg group-hover:text-white transition-colors">
										{project.description}
									</p>
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
		</SectionWrapper>
	);
};
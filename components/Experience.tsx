import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { motion } from 'framer-motion';

const experiences = [
	{
		id: 1,
		role: 'Computer Lab Assistant',
		company: 'University of Guelph',
		period: 'Sept. 2025 - Present',
		description: [
			'Improved lab reliability by updating software and systems across 60+ departmental computers.',
			'Enhanced student support by creating manuals and diagrams, reducing repeated technical queries by 30%.',
			'Minimized downtime by organizing inventory and reporting issues promptly, improving maintenance efficiency by 25%.',
		],
	},
	{
		id: 2,
		role: 'Software Engineer Intern',
		company: 'Outlier.ai',
		period: 'May 2025 - Sept. 2025',
		description: [
			'Achieved scalable data labeling workflows by building automation modules, increasing processing efficiency by 35%.',
			'Achieved cleaner architecture by refactoring core Python services, improving API response times by 28%.',
			'Delivered reliable releases by implementing Pytest-based testing pipelines, reducing bug detection time by 40%.',
		],
	},
	// {
	// 	id: 3,
	// 	role: 'Junior Developer',
	// 	company: 'Creative Agency',
	// 	period: '2020 - 2021',
	// 	description: [
	// 		'Collaborated with designers to implement pixel-perfect UIs.',
	// 		'Maintained legacy PHP codebases and migrated them to Node.js.',
	// 		'Optimized website performance, achieving 95+ Lighthouse scores.',
	// 	],
	// },
];

export const Experience = () => {
	return (
		<SectionWrapper
			id="experience"
			className="py-20"
		>
			<div className="flex flex-col items-center justify-center w-full mb-20">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="text-center"
				>
					<h1 className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2 tracking-tight">
						Previous
					</h1>
					<h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-wide">
						Work Experience
					</h2>
				</motion.div>
			</div>

				<div className="relative">
					{/* Liquid Spine */}
					<div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 bg-gradient-to-b from-blue-500/20 via-purple-500/50 to-blue-500/20 rounded-full blur-sm"></div>
					<div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>

					<div className="space-y-24">
						{experiences.map((exp, index) => (
							<motion.div
								key={exp.id}
								initial={{ opacity: 0, y: 100, scale: 0.8 }} // Exaggerated jump start
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{
									type: 'spring',
									stiffness: 200,
									damping: 12,
									delay: index * 0.1, // Stagger
								}}
								className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
									index % 2 === 0 ? 'md:flex-row-reverse' : ''
								}`}
							>
								{/* Content Half */}
								<div className="flex-1 pl-8 md:pl-0 md:px-12">
									<div className="chromatic-glass p-8 md:p-10 rounded-[2.5rem] hover:scale-[1.02] transition-transform duration-500 group">
										<div className="flex flex-col gap-2 mb-6">
											<span className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
												{exp.company}
											</span>
											<h3 className="text-3xl font-bold text-light-text dark:text-dark-text">
												{exp.role}
											</h3>
											<span className="inline-block px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-medium text-light-secondary dark:text-dark-secondary w-fit">
												{exp.period}
											</span>
										</div>
										<ul className="space-y-3">
											{exp.description.map((item, i) => (
												<li
													key={i}
													className="flex items-start gap-3 text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed"
												>
													<span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0"></span>
													{item}
												</li>
											))}
										</ul>
									</div>
								</div>

								{/* Spine Node */}
								<div className="absolute left-[-6px] md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4">
									<div className="w-4 h-4 rounded-full bg-white dark:bg-black border-[3px] border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] relative z-10"></div>
									<div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30"></div>
								</div>

								{/* Empty Half for Balance */}
								<div className="hidden md:block flex-1"></div>
							</motion.div>
						))}
					</div>
				</div>
		</SectionWrapper>
	);
};
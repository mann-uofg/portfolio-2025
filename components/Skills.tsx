import React from 'react';
import { SectionWrapper } from './ui/SectionWrapper';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Layers, Cpu, Globe, Smartphone, Cloud } from 'lucide-react';
import { Skill } from '../types';

const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend', icon: <Layout /> },
  { name: 'SwiftUI', level: 80, category: 'frontend', icon: <Smartphone /> },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: <Code /> },
  { name: 'Node.js', level: 85, category: 'backend', icon: <Cpu /> },
  { name: 'PostgreSQL', level: 80, category: 'backend', icon: <Database /> },
  { name: 'AWS', level: 70, category: 'tools', icon: <Cloud /> },
  { name: 'WebGL', level: 75, category: 'core', icon: <Globe /> },
  { name: 'System Design', level: 85, category: 'core', icon: <Layers /> },
];

export const Skills: React.FC = () => {
  return (
    <SectionWrapper id="skills" className="py-24 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4">Technical Proficiency.</h2>
          <p className="text-light-secondary dark:text-dark-secondary max-w-xl mx-auto text-lg">
            Deep expertise across the stack, with a focus on performance and scalability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="p-8 rounded-3xl bg-light-bg dark:bg-[#1c1c1e] flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-24 h-24 mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-gray-200 dark:text-white/10"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset="251.2"
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * skill.level) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="text-apple-blue"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-apple-blue">
                   {skill.icon && React.cloneElement(skill.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-light-text dark:text-dark-text mb-1">{skill.name}</h3>
              <span className="text-xs font-medium text-light-secondary dark:text-dark-secondary uppercase tracking-wide">{skill.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
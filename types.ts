import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: React.ReactNode;
  category: 'frontend' | 'backend' | 'tools' | 'core';
}
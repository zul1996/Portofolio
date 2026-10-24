export type ViewId = 'home' | 'projects' | 'about' | 'skills' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  metrics?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: {
    name: string;
    description: string;
    tags: string[];
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    eyebrow: string;
    title: string;
    headline: string;
    subheadline: string;
    status: {
      available: boolean;
      label: string;
      subtext: string;
    };
    location: string;
    timezone: string;
    email: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    telegram?: string;
  };
  projects: Project[];
  about: {
    lead: string;
    paragraphs: string[];
    principles: {
      title: string;
      description: string;
    }[];
    experience: ExperienceItem[];
  };
  skills: SkillCategory[];
}

export type Language = 'vi' | 'en' | 'zh' | 'tw';

export type ThemeMood = 'cyber' | 'aurora' | 'obsidian' | 'emerald' | 'amber';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'frontend' | 'backend' | 'cloud' | 'creative';
  icon: string;
  description: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  highlight?: boolean;
}

export interface Project {
  id: string;
  title: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  tagline: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  description: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  category: 'fullstack' | 'ai' | 'creative' | 'mobile';
  coverImage: string;
  additionalImages?: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics: {
    label: {
      vi: string;
      en: string;
      zh?: string;
      tw?: string;
    };
    value: string;
  }[];
  features: {
    vi: string[];
    en: string[];
    zh?: string[];
    tw?: string[];
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  company: string;
  location: string;
  description: {
    vi: string[];
    en: string[];
    zh?: string[];
    tw?: string[];
  };
  techStack: string[];
  current?: boolean;
}

export interface EducationItem {
  degree: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  institution: string;
  period: string;
  honor?: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  alias?: string;
  glyph?: string;
  pathName?: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  role: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  specialty: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  bio: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  avatar: string;
  coreSkills: string[];
  status?: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  socials?: {
    github?: string;
    linkedin?: string;
    email?: string;
    x?: string;
  };
  highlight?: boolean;
}

export interface TeamInfo {
  name: string;
  codename: string;
  subtitle?: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  tagline: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  description: {
    vi: string;
    en: string;
    zh?: string;
    tw?: string;
  };
  philosophyQuote?: {
    quote: {
      vi: string;
      en: string;
      zh?: string;
      tw?: string;
    };
    cite: string;
  };
  avatar: string;
  banner: string;
  founded: string;
  location: string;
  stats: {
    membersCount: number;
    completedProjects: number;
    uptimePercentage: string;
  };
  links: {
    github?: string;
    discord?: string;
  };
}


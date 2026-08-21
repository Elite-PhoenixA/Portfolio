import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Eye 
} from 'lucide-react';
import { Project, Language } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import { getLocalized, UI_TRANSLATIONS } from '../utils/i18n';

interface ProjectsProps {
  lang: Language;
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ lang, onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'fullstack' | 'ai' | 'creative'>('all');

  const filterOptions: { id: 'all' | 'fullstack' | 'ai' | 'creative'; key: keyof typeof UI_TRANSLATIONS.projects.categories }[] = [
    { id: 'all', key: 'all' },
    { id: 'fullstack', key: 'fullstack' },
    { id: 'ai', key: 'ai' },
    { id: 'creative', key: 'creative' },
  ];

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => selectedFilter === 'all' || p.category === selectedFilter
  );

  return (
    <section id="projects" className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="text-[11px] font-['JetBrains_Mono'] tracking-[0.28em] text-[#d4b870] uppercase font-semibold mb-2">
          — CHAPTER IV —
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-['Cinzel'] font-semibold uppercase tracking-wider text-[#f0d98c] mb-3 border-[#d4b870]/30">
          <FolderGit2 className="w-3.5 h-3.5 text-[#d4b870]" />
          <span>{UI_TRANSLATIONS.projects.badge[lang] || UI_TRANSLATIONS.projects.badge.en}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e8e0c8] font-['Cinzel',serif]">
          {UI_TRANSLATIONS.projects.title[lang] || UI_TRANSLATIONS.projects.title.en}
        </h2>
        <div className="gold-divider" />
        <p className="mt-1 text-base sm:text-lg text-[#e8e0c8]/75 max-w-2xl font-normal">
          {UI_TRANSLATIONS.projects.subtitle[lang] || UI_TRANSLATIONS.projects.subtitle.en}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filterOptions.map((opt) => {
          const isActive = selectedFilter === opt.id;
          const label = UI_TRANSLATIONS.projects.categories[opt.key][lang] || UI_TRANSLATIONS.projects.categories[opt.key].en;
          return (
            <button
              key={opt.id}
              onClick={() => {
                soundEffects.playClick();
                setSelectedFilter(opt.id);
              }}
              className={`px-4 py-2 rounded-full text-[11px] font-['Cinzel'] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] text-[#080706] shadow-lg shadow-[#d4b870]/20 font-bold'
                  : 'glass-pill text-[#e8e0c8]/75 hover:text-white hover:bg-white/10 hover:border-[#d4b870]/30'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 2-Column Responsive Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="phoenix-card rounded-3xl overflow-hidden group hover:border-[#d4b870]/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl hover:shadow-2xl border-[#d4b870]/25 bg-[#0e0d0a]/80 backdrop-blur-xl"
            >
              {/* Project Visual Cover with Hover Zoom */}
              <div 
                className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer"
                onClick={() => {
                  soundEffects.playClick();
                  onSelectProject(project);
                }}
              >
                <img
                  src={project.coverImage}
                  alt={getLocalized(project.title, lang, project.title.en)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/30 to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full glass-pill text-[11px] font-mono uppercase tracking-wider text-white/90 backdrop-blur-md border-[#d4b870]/30">
                    {project.category}
                  </span>
                </div>

                {/* Inspect Overlay Prompt */}
                <div className="absolute inset-0 bg-[#080706]/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-xs sm:text-sm font-['Cinzel'] tracking-wider">
                  <Eye className="w-4 h-4 text-[#f0d98c]" />
                  <span>{UI_TRANSLATIONS.projects.inspectArchitecture[lang] || UI_TRANSLATIONS.projects.inspectArchitecture.en}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  {/* Title */}
                  <h3 
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(project);
                    }}
                    className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-white group-hover:text-[#f0d98c] transition-colors cursor-pointer mb-2"
                  >
                    {getLocalized(project.title, lang, project.title.en)}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-[#e8e0c8]/75 leading-relaxed line-clamp-2 mb-4 font-normal">
                    {getLocalized(project.tagline, lang, project.tagline.en)}
                  </p>

                  {/* Quick Metrics */}
                  {project.metrics && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="px-2.5 py-1 rounded-lg bg-[#d4b870]/10 border border-[#d4b870]/20 text-[11px] font-mono text-[#f0d98c]">
                          <span className="text-white/60 mr-1">{getLocalized(m.label, lang, m.label.en)}:</span>
                          <span className="font-semibold text-[#f0d98c]">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-[#FAF5EE]/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onSelectProject(project);
                    }}
                    className="text-xs font-semibold text-[#f0d98c] hover:text-white flex items-center gap-1.5 group/btn transition-colors cursor-pointer"
                  >
                    <span>{UI_TRANSLATIONS.projects.deepDive[lang] || UI_TRANSLATIONS.projects.deepDive.en}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full glass-pill hover:text-[#f0d98c] hover:bg-white/15 text-white/70 transition-all"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full glass-pill hover:text-[#f0d98c] hover:bg-white/15 text-white/70 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  );
};

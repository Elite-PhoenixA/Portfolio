import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Server, 
  Cloud, 
  Sparkles, 
  Search, 
  Layers, 
  Cpu, 
  Database,
  Atom,
  Palette,
  Terminal,
  Box,
  GitBranch,
  Layout,
  Gauge,
  GitPullRequest
} from 'lucide-react';
import { Language } from '../types';
import { SKILLS_DATA } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import { getLocalized, UI_TRANSLATIONS } from '../utils/i18n';

interface SkillsProps {
  lang: Language;
  onSkillsVisibilityChange?: (isVisible: boolean) => void;
  isObsidianActive?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Atom,
  Code2,
  Palette,
  Sparkles,
  Server,
  Terminal,
  Database,
  Cpu,
  Box,
  Cloud,
  GitBranch,
  Layout,
  Gauge,
  GitPullRequest
};

export const Skills: React.FC<SkillsProps> = ({ 
  lang, 
  onSkillsVisibilityChange,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'cloud' | 'creative'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // IntersectionObserver to auto-trigger Obsidian Void theme & blended Qwen Cyber Rain only when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onSkillsVisibilityChange?.(entry.isIntersecting);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-5% 0px -10% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onSkillsVisibilityChange]);

  const categories: { 
    id: 'all' | 'frontend' | 'backend' | 'cloud' | 'creative'; 
    labelKey: keyof typeof UI_TRANSLATIONS.skills.categories;
    icon: typeof Layers 
  }[] = [
    { id: 'all', labelKey: 'all', icon: Layers },
    { id: 'frontend', labelKey: 'frontend', icon: Code2 },
    { id: 'backend', labelKey: 'backend', icon: Server },
    { id: 'cloud', labelKey: 'cloud', icon: Cloud },
    { id: 'creative', labelKey: 'creative', icon: Sparkles },
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const descText = getLocalized(skill.description, lang, skill.description.en);
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-24 px-4 max-w-6xl mx-auto z-10"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="text-[11px] font-['JetBrains_Mono'] tracking-[0.28em] text-[#d4b870] uppercase font-semibold mb-2">
          — CHAPTER II —
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-['Cinzel'] font-semibold uppercase tracking-wider text-[#f0d98c] mb-3 border-[#d4b870]/30">
          <Cpu className="w-3.5 h-3.5 text-[#d4b870]" />
          <span>{UI_TRANSLATIONS.skills.badge[lang] || UI_TRANSLATIONS.skills.badge.en}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e8e0c8] font-['Cinzel',serif]">
          {UI_TRANSLATIONS.skills.title[lang] || UI_TRANSLATIONS.skills.title.en}
        </h2>
        <div className="gold-divider" />
        <p className="mt-1 text-base sm:text-lg text-[#e8e0c8]/75 max-w-2xl font-normal">
          {UI_TRANSLATIONS.skills.subtitle[lang] || UI_TRANSLATIONS.skills.subtitle.en}
        </p>
      </div>

      {/* Filter Controls & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const catLabel = UI_TRANSLATIONS.skills.categories[cat.labelKey][lang] || UI_TRANSLATIONS.skills.categories[cat.labelKey].en;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-['Cinzel'] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] text-[#080706] shadow-lg shadow-[#d4b870]/20 font-bold'
                    : 'glass-pill text-[#e8e0c8]/70 hover:text-white hover:bg-white/10 hover:border-[#d4b870]/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#080706]' : 'text-[#d4b870]'}`} />
                <span>{catLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Search / Filter input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#d4b870]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={UI_TRANSLATIONS.skills.searchPlaceholder[lang] || UI_TRANSLATIONS.skills.searchPlaceholder.en}
            className="w-full pl-9 pr-4 py-2 rounded-full text-xs font-mono bg-white/5 border border-[#d4b870]/20 text-[#e8e0c8] placeholder-white/40 focus:outline-none focus:border-[#d4b870] focus:bg-white/10 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-white/40 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
            >
              ×
            </button>
          )}
        </div>

      </div>

      {/* Skills Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.icon] || Code2;
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="phoenix-card rounded-2xl p-5 hover:border-[#d4b870]/60 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between border-[#d4b870]/30 bg-[#0e0d0a]/80 backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#d4b870]/15 border border-[#d4b870]/30 flex items-center justify-center group-hover:border-[#d4b870] group-hover:bg-[#d4b870]/25 transition-all">
                        <Icon className="w-5 h-5 text-[#f0d98c] group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold font-['Cinzel',serif] text-white group-hover:text-[#f0d98c] transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4b870]/60">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {skill.highlight && (
                      <span className="px-2 py-0.5 rounded-md bg-[#d4b870]/20 border border-[#d4b870]/40 text-[10px] font-mono font-bold text-[#f0d98c]">
                        CORE
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#e8e0c8]/75 line-clamp-2 leading-relaxed mb-4 font-normal">
                    {getLocalized(skill.description, lang, skill.description.en)}
                  </p>
                </div>

                {/* Progress Bar & Proficiency Score */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60 mb-1.5">
                    <span>{UI_TRANSLATIONS.skills.proficiency[lang] || UI_TRANSLATIONS.skills.proficiency.en}</span>
                    <span className="text-[var(--primary-light)] font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)]"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-white/50 text-sm">
          {UI_TRANSLATIONS.skills.noMatch[lang] || UI_TRANSLATIONS.skills.noMatch.en}
        </div>
      )}
    </section>
  );
};

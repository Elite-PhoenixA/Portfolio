import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { getLocalized, UI_TRANSLATIONS } from '../utils/i18n';

interface ExperienceProps {
  lang: Language;
}

export const Experience: React.FC<ExperienceProps> = ({ lang }) => {
  return (
    <section id="experience" className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="text-[11px] font-['JetBrains_Mono'] tracking-[0.28em] text-[#d4b870] uppercase font-semibold mb-2">
          — CHAPTER V —
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-['Cinzel'] font-semibold uppercase tracking-wider text-[#f0d98c] mb-3 border-[#d4b870]/30">
          <Briefcase className="w-3.5 h-3.5 text-[#d4b870]" />
          <span>{UI_TRANSLATIONS.experience.badge[lang] || UI_TRANSLATIONS.experience.badge.en}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e8e0c8] font-['Cinzel',serif]">
          {UI_TRANSLATIONS.experience.title[lang] || UI_TRANSLATIONS.experience.title.en}
        </h2>
        <div className="gold-divider" />
        <p className="mt-1 text-base sm:text-lg text-[#e8e0c8]/75 max-w-2xl font-normal">
          {UI_TRANSLATIONS.experience.subtitle[lang] || UI_TRANSLATIONS.experience.subtitle.en}
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l border-[#d4b870]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {EXPERIENCE_DATA.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#d4b870] group-hover:bg-[#d4b870] group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(212,184,112,0.5)]" />

            {/* Experience Card */}
            <div className="phoenix-card rounded-3xl p-6 sm:p-8 hover:border-[#d4b870]/60 transition-all duration-300 border-[#d4b870]/25 bg-[#0e0d0a]/80 backdrop-blur-xl">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#f0d98c] transition-colors font-['Cinzel',serif]">
                    {getLocalized(exp.role, lang, exp.role.en)}
                  </h3>
                  <div className="text-sm font-semibold text-[#f0d98c] mt-0.5 font-['JetBrains_Mono']">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/60">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    <Calendar className="w-3 h-3 text-[#d4b870]" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    <MapPin className="w-3 h-3 text-white/50" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Bullet points */}
              <div className="space-y-2.5 mb-6">
                {getLocalized(exp.description, lang, exp.description.en).map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#e8e0c8]/85 leading-relaxed font-normal">
                    <CheckCircle2 className="w-4 h-4 text-[#d4b870] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}

        {/* Education Milestone Item */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="relative group pt-4"
        >
          {/* Education node */}
          <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-[#080706] border-2 border-[#d4b870] group-hover:bg-[#d4b870] group-hover:scale-125 transition-all shadow-md" />

          <div className="phoenix-card rounded-3xl p-6 sm:p-8 hover:border-[#d4b870]/60 transition-all border-[#d4b870]/25 bg-[#0e0d0a]/80 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4b870]/15 border border-[#d4b870]/30 flex items-center justify-center text-[#f0d98c] shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base sm:text-lg font-bold text-white font-['Cinzel',serif]">
                    {getLocalized(EDUCATION_DATA[0].degree, lang, EDUCATION_DATA[0].degree.en)}
                  </h3>
                  <span className="text-xs font-mono text-[#f0d98c] bg-[#d4b870]/10 px-2.5 py-1 rounded-full border border-[#d4b870]/30 w-fit">
                    {EDUCATION_DATA[0].period}
                  </span>
                </div>
                <div className="text-sm text-white/70 mt-1">
                  {EDUCATION_DATA[0].institution}
                </div>
                {EDUCATION_DATA[0].honor && (
                  <div className="text-xs text-[#f0d98c] font-medium mt-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4b870]" />
                    <span>{getLocalized(EDUCATION_DATA[0].honor, lang, EDUCATION_DATA[0].honor.en)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

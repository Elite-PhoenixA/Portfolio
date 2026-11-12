import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
} from 'lucide-react';
import { Project, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { getLocalized, UI_TRANSLATIONS } from '../utils/i18n';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: Language;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang }) => {
  // Lock body scroll and listen for Escape key when project modal is open
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEffects.playClick();
        onClose();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const modalLabels = {
    features: {
      vi: 'Tính năng & Kiến trúc nổi bật',
      en: 'Key Engineering Features',
      zh: '核心技术特色',
      tw: '核心技術特色',
    },
    techUsed: {
      vi: 'Công nghệ sử dụng',
      en: 'Technologies Used',
      zh: '所用技术栈',
      tw: '所用技術棧',
    },
    liveDemo: {
      vi: 'Trải Nghiệm Live Demo',
      en: 'Launch Live Demo',
      zh: '体验在线演示',
      tw: '體驗線上展示',
    },
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#080706]/85 backdrop-blur-xl -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] max-h-[90dvh] overflow-y-auto glass-panel-elevated rounded-3xl p-5 sm:p-8 bg-[#0E0C09]/98 shadow-2xl border border-[#d4b870]/35 my-auto"
          >
            {/* Close Button X (Sticky top-right) */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="sticky float-right -mr-1 -mt-1 p-2 rounded-full bg-white/10 hover:bg-[#d4b870]/25 text-[#FAF5EE]/90 hover:text-[#f0d98c] transition-all z-20 cursor-pointer border border-[#d4b870]/40 shadow-lg"
              id="close-project-modal"
              title="Close modal (Esc)"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Cover */}
            <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-6 border border-[#d4b870]/30 clear-both">
              <img
                src={project.coverImage}
                alt={getLocalized(project.title, lang, project.title.en)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="px-3 py-1 rounded-full bg-[#d4b870]/20 text-[#f0d98c] border border-[#d4b870]/30 text-xs font-semibold backdrop-blur-md uppercase tracking-wider font-mono">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f0d98c] font-['Cinzel',serif] mb-2">
                {getLocalized(project.title, lang, project.title.en)}
              </h3>
              <p className="text-sm sm:text-base text-[#e8e0c8]/90 font-medium leading-relaxed font-['Cinzel'] tracking-wide">
                {getLocalized(project.tagline, lang, project.tagline.en)}
              </p>
            </div>

            {/* Metrics Ribbon */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="rounded-xl p-3 text-center border border-[#d4b870]/20 bg-[#d4b870]/10">
                    <div className="text-lg sm:text-xl font-bold text-[#f0d98c] font-mono">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-white/70 mt-0.5">
                      {getLocalized(metric.label, lang, metric.label.en)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Story & Problem/Solution */}
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#d4b870] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4b870]" />
                <span>{UI_TRANSLATIONS.projects.inspectArchitecture[lang] || UI_TRANSLATIONS.projects.inspectArchitecture.en}</span>
              </h4>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                {getLocalized(project.description, lang, project.description.en)}
              </p>
            </div>

            {/* Key Features Checklist */}
            {project.features && (
              <div className="mb-6">
                <h4 className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#d4b870] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4b870]" />
                  <span>{getLocalized(modalLabels.features, lang, modalLabels.features.en)}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {getLocalized(project.features, lang, project.features.en).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/85 bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4b870] mt-2 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div className="mb-8">
              <h4 className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#d4b870] mb-2.5 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#d4b870]" />
                <span>{getLocalized(modalLabels.techUsed, lang, modalLabels.techUsed.en)}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[#d4b870]/10 border border-[#d4b870]/30 text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-[#d4b870]/20 border border-[#d4b870]/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#080706] bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] hover:opacity-95 transition-all flex items-center gap-2 shadow-lg cursor-pointer font-bold"
                >
                  <span>{getLocalized(modalLabels.liveDemo, lang, modalLabels.liveDemo.en)}</span>
                  <ExternalLink className="w-4 h-4 text-[#080706]" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  FileText, 
  Mail, 
  Globe, 
  MapPin, 
} from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO, EXPERIENCE_DATA, SKILLS_DATA } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import { getLocalized } from '../utils/i18n';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, lang }) => {
  // Lock body scroll and listen for Escape key when resume modal is open
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  const labels = {
    badge: {
      vi: 'Hồ Sơ Năng Lực (Curriculum Vitae)',
      en: 'Professional CV',
      zh: '个人履历 (Curriculum Vitae)',
      tw: '個人履歷 (Curriculum Vitae)',
    },
    printBtn: {
      vi: 'In / Lưu PDF',
      en: 'Print / PDF',
      zh: '打印 / 保存 PDF',
      tw: '列印 / 儲存 PDF',
    },
    summaryTitle: {
      vi: 'Tóm Tắt Chuyên Môn',
      en: 'Executive Summary',
      zh: '专业综述',
      tw: '專業綜述',
    },
    skillsTitle: {
      vi: 'Năng Lực Kỹ Thuật Trọng Tâm',
      en: 'Core Technical Competencies',
      zh: '核心技术能力',
      tw: '核心技術能力',
    },
    expTitle: {
      vi: 'Kinh Nghiệm Làm Việc',
      en: 'Professional Experience',
      zh: '工作经历',
      tw: '工作經歷',
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:m-0 print:static">
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
            className="fixed inset-0 bg-[#080706]/90 backdrop-blur-xl -z-10 print:hidden"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] max-h-[92dvh] overflow-y-auto glass-panel-elevated rounded-3xl p-5 sm:p-10 bg-[#0E0C09]/98 shadow-2xl border border-[#d4b870]/35 my-auto print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black print:p-0"
          >
            {/* Top Actions (Hidden in print) */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6 print:hidden">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#f0d98c]">
                <FileText className="w-4 h-4 text-[#d4b870]" />
                <span>{getLocalized(labels.badge, lang, labels.badge.en)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-[#d4b870]/20 hover:text-[#f0d98c] transition-all cursor-pointer border border-[#d4b870]/30 shadow-md"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-[#d4b870]" />
                  <span>{getLocalized(labels.printBtn, lang, labels.printBtn.en)}</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onClose();
                  }}
                  className="p-1.5 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/10"
                  id="close-resume-modal"
                  title="Close (Esc)"
                  aria-label="Close resume modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Content */}
            <div className="space-y-8">
              
              {/* Header / Intro */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 print:border-black">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f0d98c] font-['Cinzel',serif] print:text-black">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-sm font-semibold text-[#d4b870] mt-1 print:text-black font-['Cinzel'] tracking-wide">
                    {getLocalized(PERSONAL_INFO.titles, lang, PERSONAL_INFO.titles.en)}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-white/70 print:text-black">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#d4b870] print:text-black" />
                    <span>{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#f0d98c] print:text-black" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#d4b870] print:text-black" />
                    <span>{PERSONAL_INFO.github}</span>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#f0d98c] mb-2 font-mono print:text-black">
                  {getLocalized(labels.summaryTitle, lang, labels.summaryTitle.en)}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed print:text-black">
                  {getLocalized(PERSONAL_INFO.detailedBio, lang, PERSONAL_INFO.detailedBio.en)}
                </p>
              </div>

              {/* Core Competencies / Skills */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#f0d98c] mb-3 font-mono print:text-black">
                  {getLocalized(labels.skillsTitle, lang, labels.skillsTitle.en)}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {SKILLS_DATA.slice(0, 8).map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-[#d4b870]/20 print:bg-gray-100 print:text-black">
                      <span className="font-semibold text-white print:text-black">{skill.name}</span>
                      <span className="font-mono text-[#f0d98c] print:text-black">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#f0d98c] mb-4 font-mono print:text-black">
                  {getLocalized(labels.expTitle, lang, labels.expTitle.en)}
                </h2>
                <div className="space-y-6">
                  {EXPERIENCE_DATA.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-sm font-bold text-white print:text-black">
                          {getLocalized(exp.role, lang, exp.role.en)} — <span className="text-[#f0d98c] print:text-black">{exp.company}</span>
                        </h3>
                        <span className="text-xs font-mono text-white/60 print:text-black">{exp.period}</span>
                      </div>
                      <ul className="space-y-1 text-xs text-white/75 pl-4 list-disc print:text-black">
                        {getLocalized(exp.description, lang, exp.description.en).map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

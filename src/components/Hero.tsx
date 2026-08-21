import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowDown, 
  Sparkles, 
  FileText, 
  Send
} from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import { getLocalized, UI_TRANSLATIONS } from '../utils/i18n';

interface HeroProps {
  lang: Language;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenResume }) => {
  const scrollTo = (id: string) => {
    soundEffects.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: PERSONAL_INFO.github,
      icon: Github,
      label: 'https://github.com/Elite-PhoenixA',
    },
    {
      name: 'LinkedIn',
      url: PERSONAL_INFO.linkedin,
      icon: Linkedin,
      label: 'in/nguyenkhuongduy',
    },
    {
      name: 'X (Twitter)',
      url: PERSONAL_INFO.x,
      icon: Twitter,
      label: '@khuongduy_dev',
    },
    {
      name: 'Email',
      url: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
      label: PERSONAL_INFO.email,
    },
  ];

  const getStatusText = () => {
    if (lang === 'vi') return PERSONAL_INFO.availability.statusVi;
    if (lang === 'zh') return PERSONAL_INFO.availability.statusZh;
    if (lang === 'tw') return PERSONAL_INFO.availability.statusTw;
    return PERSONAL_INFO.availability.status;
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen min-h-[100svh] flex flex-col justify-center items-center px-4 pt-24 pb-16 overflow-hidden z-10"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Cover & Avatar Visual Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full mb-16 sm:mb-20"
        >
          {/* Horizontal Cover Image Container */}
          <div className="relative w-full aspect-[16/6] sm:aspect-[16/5] md:aspect-[3/1] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel-elevated p-1 shadow-2xl group border-theme-subtle">
            <div 
              className="w-full h-full rounded-[20px] sm:rounded-[24px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('${PERSONAL_INFO.coverUrl}')`,
              }}
            >
              {/* Inner ambient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/90 via-[#080706]/30 to-transparent" />
              <div className="absolute inset-0 bg-theme-subtle mix-blend-overlay" />
            </div>

            {/* Subtle banner watermark / badge */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 px-3 py-1 rounded-full glass-pill text-[11px] font-semibold tracking-wider text-white/90 uppercase flex items-center gap-1.5 backdrop-blur-md border-theme-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b870] animate-ping" />
              <span>{lang === 'vi' ? 'Hà Nội, VN' : lang === 'zh' || lang === 'tw' ? '河内 · 越南' : 'Hanoi, VN'}</span>
            </div>
          </div>

          {/* Centered Overlapping Circular Avatar */}
          <div className="absolute left-1/2 -bottom-14 sm:-bottom-18 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 220, damping: 20 }}
              className="relative group cursor-pointer"
              onClick={() => soundEffects.playChime()}
            >
              {/* Pulsing theme aura ring */}
              <div className="absolute -inset-1 rounded-full bg-theme-gradient opacity-75 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />
              
              {/* Avatar container */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-[#080706] shadow-2xl overflow-hidden bg-[#16120D] ring-2 ring-[#d4b870]/30 group-hover:ring-[#d4b870] transition-all">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Status indicator badge */}
              <div 
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-[#080706] border border-[#d4b870]/30 shadow-lg"
                title={getStatusText()}
              >
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#d4b870] flex items-center justify-center glow-theme">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#080706]" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Information Block */}
        <div className="flex flex-col items-center text-center mt-2 max-w-2xl px-2">
          
          {/* Phoenix A Chapter Marker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mb-3 text-[11px] font-['JetBrains_Mono'] tracking-[0.28em] text-[#d4b870] uppercase font-semibold flex items-center gap-2"
          >
            <span>—</span>
            <span>{UI_TRANSLATIONS.hero.filiusSolis[lang] || UI_TRANSLATIONS.hero.filiusSolis.en}</span>
            <span>—</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-['Cinzel',serif] bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#c8c8c8] bg-clip-text text-transparent"
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          {/* Professional Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-3 flex items-center gap-2 text-sm sm:text-base md:text-lg font-['Cinzel'] font-semibold text-[#f0d98c] tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-[#d4b870] animate-pulse" />
            <span>
              {getLocalized(PERSONAL_INFO.titles, lang, PERSONAL_INFO.titles.en)}
            </span>
          </motion.div>

          {/* Golden Divider */}
          <div className="gold-divider my-4" />

          {/* Latin / Ancient Motto */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xs sm:text-sm font-['Cinzel'] tracking-widest text-[#d4b870]/90 italic font-semibold mb-2"
          >
            {UI_TRANSLATIONS.hero.motto[lang] || UI_TRANSLATIONS.hero.motto.en}
          </motion.p>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-base sm:text-lg text-[#e8e0c8]/85 leading-relaxed max-w-xl font-normal"
          >
            {getLocalized(PERSONAL_INFO.shortBio, lang, PERSONAL_INFO.shortBio.en)}
          </motion.p>

          {/* Sigils Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4 flex items-center gap-3 text-xs font-mono text-[#d4b870]/70"
          >
            <span>☉</span>
            <span>·</span>
            <span>道</span>
            <span>·</span>
            <span className="font-['Cinzel'] tracking-wider">VERITAS</span>
            <span>·</span>
            <span>鳳凰</span>
            <span>·</span>
            <span>⌬</span>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playClick()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill hover:bg-white/10 hover:border-[#d4b870]/40 text-xs sm:text-sm text-[#FAF5EE]/80 hover:text-[#f0d98c] transition-all duration-200 group"
                  id={`hero-social-${social.name.toLowerCase()}`}
                >
                  <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{social.name}</span>
                </a>
              );
            })}
          </motion.div>

          {/* Primary & Secondary Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            {/* Primary Action CTA */}
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 rounded-full text-sm font-bold text-[#080706] bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] hover:opacity-95 transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#d4b870]/20 flex items-center gap-2 cursor-pointer"
              id="hero-view-projects-btn"
            >
              <span>{UI_TRANSLATIONS.hero.exploreWork[lang] || UI_TRANSLATIONS.hero.exploreWork.en}</span>
              <ArrowDown className="w-4 h-4 text-[#080706]" />
            </button>

            {/* Contact Me CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-3 rounded-full text-sm font-semibold text-[#FAF5EE] glass-panel-elevated hover:bg-white/15 hover:border-[#d4b870]/40 hover:text-[#f0d98c] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              id="hero-contact-btn"
            >
              <Send className="w-4 h-4 text-[#d4b870]" />
              <span>{UI_TRANSLATIONS.hero.getInTouch[lang] || UI_TRANSLATIONS.hero.getInTouch.en}</span>
            </button>

            {/* Quick Resume CTA */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenResume();
              }}
              className="px-4 py-3 rounded-full text-sm font-medium text-[#FAF5EE]/80 glass-pill hover:text-[#f0d98c] hover:bg-white/10 hover:border-[#d4b870]/30 transition-all flex items-center gap-1.5 cursor-pointer"
              id="hero-resume-btn"
            >
              <FileText className="w-4 h-4 text-[#d4b870]" />
              <span>{UI_TRANSLATIONS.nav.resume[lang] || UI_TRANSLATIONS.nav.resume.en}</span>
            </button>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2 cursor-pointer text-white/40 hover:text-[#d4b870] transition-colors"
          onClick={() => scrollTo('about')}
          id="hero-scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};


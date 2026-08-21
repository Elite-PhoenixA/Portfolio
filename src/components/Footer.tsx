import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    soundEffects.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const motto: Record<Language, string> = {
    vi: 'FILIUS SOLIS · KỸ NGHỆ ĐỘT PHÁ & TRIẾT LÝ TỐI GIẢN',
    en: 'FILIUS SOLIS · ALL PATHS RETURN TO THE SUN',
    zh: 'FILIUS SOLIS · 卓越工程与极简哲学',
    tw: 'FILIUS SOLIS · 卓越工程與極簡哲學',
  };

  const backToTopText: Record<Language, string> = {
    vi: 'Về Đầu Trang',
    en: 'Back to Top',
    zh: '返回顶部',
    tw: '返回頂部',
  };

  return (
    <footer className="relative z-10 border-t border-[#d4b870]/20 bg-[#050505]/95 backdrop-blur-xl py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] flex items-center justify-center text-[10px] font-bold text-[#080706]">
              ☉
            </div>
            <span className="font-bold text-sm text-[#f0d98c] font-['Cinzel',serif] tracking-wider">
              {PERSONAL_INFO.name} · PHOENIX A
            </span>
          </div>
          <p className="text-xs text-[#e8e0c8]/60 mt-1 font-['Cinzel'] tracking-wider">
            {motto[lang] || motto.en}
          </p>
        </div>

        {/* Center: Social icons */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-[#f0d98c] hover:bg-white/10 text-white/70 transition-all border-[#d4b870]/30 hover:border-[#d4b870]/60"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-[#f0d98c] hover:bg-white/10 text-white/70 transition-all border-[#d4b870]/30 hover:border-[#d4b870]/60"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.x}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full glass-pill hover:text-[#f0d98c] hover:bg-white/10 text-white/70 transition-all border-[#d4b870]/30 hover:border-[#d4b870]/60"
            title="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-full glass-pill hover:text-[#f0d98c] hover:bg-white/10 text-white/70 transition-all border-[#d4b870]/30 hover:border-[#d4b870]/60"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Back to top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill hover:bg-white/15 hover:border-[#d4b870]/60 text-xs font-['Cinzel'] uppercase tracking-wider font-semibold text-white/80 hover:text-[#f0d98c] transition-all cursor-pointer border-[#d4b870]/30"
            id="back-to-top-btn"
          >
            <span>{backToTopText[lang] || backToTopText.en}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#d4b870]" />
          </button>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#e8e0c8]/50 gap-2 text-center font-mono">
        <span>© {new Date().getFullYear()} {PERSONAL_INFO.name} (PHOENIX A). All rights reserved.</span>
        <span>EX TENEBRIS AD LUCEM · REACT 19 & MOTION</span>
      </div>
    </footer>
  );
};

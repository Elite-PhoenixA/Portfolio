import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  FileText, 
  Menu, 
  X, 
  Send,
  CloudRain,
  ChevronDown,
  Check
} from 'lucide-react';
import { Language, ThemeMood } from '../types';
import { soundEffects } from '../utils/audio';
import { LANGUAGES, UI_TRANSLATIONS } from '../utils/i18n';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme?: ThemeMood;
  setTheme?: (theme: ThemeMood) => void;
  onOpenResume: () => void;
  isRainActive?: boolean;
  setIsRainActive?: (active: boolean) => void;
  rainColorMode?: 'theme' | 'amber';
  setRainColorMode?: (mode: 'theme' | 'amber') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  onOpenResume,
  isRainActive = true,
  setIsRainActive,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'team', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: UI_TRANSLATIONS.nav.about },
    { id: 'skills', label: UI_TRANSLATIONS.nav.skills },
    { id: 'team', label: UI_TRANSLATIONS.nav.team },
    { id: 'projects', label: UI_TRANSLATIONS.nav.projects },
    { id: 'experience', label: UI_TRANSLATIONS.nav.experience },
    { id: 'contact', label: UI_TRANSLATIONS.nav.contact },
  ];

  const scrollTo = (id: string) => {
    soundEffects.playClick();
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const handleSelectLang = (newLang: Language) => {
    setLang(newLang);
    soundEffects.playClick();
    setLangDropdownOpen(false);
  };

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 ${
          scrolled 
            ? 'glass-panel-elevated shadow-2xl bg-[#0a0a08]/90 border-[#d4b870]/30 backdrop-blur-xl' 
            : 'glass-pill bg-[#0a0a08]/70 border-white/10 backdrop-blur-lg'
        }`}
      >
        {/* Brand / Logo Mark */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-full hover:bg-white/5 transition-all text-left group"
          id="nav-brand-button"
        >
          <div className="w-7 h-7 rounded-full bg-[#d4b870]/15 flex items-center justify-center border border-[#d4b870]/40 group-hover:border-[#d4b870] transition-all shadow-[0_0_10px_rgba(212,184,112,0.2)]">
            <span className="text-xs font-bold font-['Cinzel'] text-[#f0d98c]">☉</span>
          </div>
          <span className="font-['Cinzel'] font-bold tracking-[0.18em] text-xs sm:text-sm text-[#e8e0c8] group-hover:text-[#f0d98c] transition-colors">
            PHOENIX A
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1.5 text-[11px] font-['Cinzel'] uppercase tracking-[0.14em] font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-[#f0d98c] font-bold'
                    : 'text-[#e8e0c8]/70 hover:text-[#f0d98c] hover:bg-white/5'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label[lang] || item.label.en}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#d4b870]/15 rounded-full border border-[#d4b870]/40 -z-10 shadow-[0_0_12px_rgba(212,184,112,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Utility Controls */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* 4-Language Selector Dropdown with ID #lang-toggle-button */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                soundEffects.playClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                langDropdownOpen
                  ? 'bg-[#d4b870]/20 border-[#d4b870] text-[#f0d98c] shadow-[0_0_15px_rgba(212,184,112,0.3)]'
                  : 'bg-[#141410]/70 hover:bg-[#1c1a14] border-[#d4b870]/30 text-[#e8e0c8] hover:text-[#f0d98c]'
              }`}
              title="Select Language / Chọn ngôn ngữ / 切换语言 / 切換語言"
              id="lang-toggle-button"
              aria-haspopup="true"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#d4b870]" />
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="font-['JetBrains_Mono',monospace] text-[11px] font-bold tracking-wider">
                {currentLangObj.code.toUpperCase()}
              </span>
              <ChevronDown className={`w-3 h-3 text-[#d4b870] transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Selection Popup Menu */}
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e0d0a]/95 border border-[#d4b870]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,184,112,0.15)] backdrop-blur-xl p-2 z-50 flex flex-col gap-1 overflow-hidden"
                >
                  <div className="px-2.5 py-1.5 text-[10px] font-['Cinzel',serif] uppercase tracking-[0.2em] text-[#d4b870]/80 border-b border-[#d4b870]/20 flex items-center justify-between">
                    <span>Language / 語言 / 语言</span>
                    <span className="text-[9px] font-['JetBrains_Mono',monospace] text-[#8a8270]">4 LOCALES</span>
                  </div>

                  {LANGUAGES.map((item) => {
                    const isSelected = item.code === lang;
                    return (
                      <button
                        key={item.code}
                        onClick={() => handleSelectLang(item.code)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                          isSelected
                            ? 'bg-[#d4b870]/20 text-[#f0d98c] font-semibold border border-[#d4b870]/40 shadow-[0_0_10px_rgba(212,184,112,0.15)]'
                            : 'text-[#c8c0b0] hover:text-[#FAF5EE] hover:bg-white/5 border border-transparent'
                        }`}
                        id={`lang-option-${item.code}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{item.flag}</span>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.nativeLabel}</span>
                            <span className="text-[10px] text-[#8a8270] tracking-wide">
                              {item.code.toUpperCase()} · {item.region}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#d4b870] stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resume Quick Trigger */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenResume();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#FAF5EE] hover:text-[#f0d98c] bg-white/5 hover:bg-[#d4b870]/15 border border-[#d4b870]/25 transition-all"
            id="nav-resume-button"
          >
            <FileText className="w-3.5 h-3.5 text-[#d4b870]" />
            <span>{UI_TRANSLATIONS.nav.resume[lang] || UI_TRANSLATIONS.nav.resume.en}</span>
          </button>

          {/* Contact Quick Button with Dynamic Theme Gradient */}
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#080706] bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] hover:brightness-110 transition-all shadow-md shadow-[#d4b870]/20 cursor-pointer"
            id="nav-contact-cta"
          >
            <Send className="w-3 h-3 text-[#080706]" />
            <span>{UI_TRANSLATIONS.nav.contact[lang] || UI_TRANSLATIONS.nav.contact.en}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-white/80 hover:bg-white/5 lg:hidden"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto fixed inset-x-4 top-20 rounded-3xl glass-panel-elevated p-5 shadow-2xl bg-[#0a0a08]/98 z-50 flex flex-col gap-3 lg:hidden border border-[#d4b870]/30 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-[#d4b870]/20 text-[#f0d98c] font-semibold border border-[#d4b870]/40'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label[lang] || item.label.en}
                </button>
              ))}
            </div>

            {/* Mobile 4-Language Quick Selector Grid */}
            <div className="pt-3 border-t border-[#d4b870]/20 flex flex-col gap-2">
              <span className="text-xs text-[#d4b870] font-['Cinzel',serif] uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Language / 語言
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      soundEffects.playClick();
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                      lang === item.code
                        ? 'bg-[#d4b870]/25 text-[#f0d98c] font-bold border border-[#d4b870]/50'
                        : 'bg-white/5 text-[#c8c0b0] hover:bg-white/10'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span className="truncate">{item.nativeLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Cyber Rain Toggle Row */}
            {setIsRainActive && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
                <span className="text-xs text-white/70 flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-[#d4b870]" />
                  {UI_TRANSLATIONS.nav.cyberRain[lang] || 'Cyber Rain Animation'}
                </span>
                <button
                  onClick={() => {
                    setIsRainActive(!isRainActive);
                    soundEffects.playClick();
                  }}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                    isRainActive ? 'bg-[#d4b870] text-[#080706] font-bold' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {isRainActive ? 'Active' : 'Off'}
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex gap-2">
              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-[#d4b870]/20 border border-[#d4b870]/30 text-xs font-semibold text-center text-[#f0d98c]"
              >
                {UI_TRANSLATIONS.nav.resume[lang] || UI_TRANSLATIONS.nav.resume.en}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

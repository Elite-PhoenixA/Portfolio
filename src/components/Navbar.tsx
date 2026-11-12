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
  Check,
  Palette,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Language, ThemeMood } from '../types';
import { soundEffects } from '../utils/audio';
import { LANGUAGES, THEME_OPTIONS, UI_TRANSLATIONS, getLocalized } from '../utils/i18n';

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
  theme = 'amber',
  setTheme,
  onOpenResume,
  isRainActive = true,
  setIsRainActive,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.getMutedState());

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  // Sync audio muted state
  useEffect(() => {
    const unsubscribe = soundEffects.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'team', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 220;

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
    setThemeDropdownOpen(false);
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
  const currentThemeObj = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  const handleSelectLang = (newLang: Language) => {
    setLang(newLang);
    soundEffects.playClick();
    setLangDropdownOpen(false);
  };

  const handleSelectTheme = (newTheme: ThemeMood) => {
    setTheme?.(newTheme);
    soundEffects.playClick();
    setThemeDropdownOpen(false);
  };

  const handleToggleSound = () => {
    soundEffects.toggleMute();
  };

  const handleToggleRain = () => {
    soundEffects.playClick();
    setIsRainActive?.(!isRainActive);
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 max-w-6xl w-full mx-auto ${
          scrolled 
            ? 'glass-panel-elevated shadow-2xl bg-[#0a0a08]/92 border-[#d4b870]/30 backdrop-blur-xl' 
            : 'glass-pill bg-[#0a0a08]/75 border-white/10 backdrop-blur-lg'
        }`}
      >
        {/* Brand / Logo Mark */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-full hover:bg-white/5 transition-all text-left group shrink-0 cursor-pointer"
          id="nav-brand-button"
          aria-label="Phoenix A Homepage"
        >
          <div 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-[0_0_12px_rgba(212,184,112,0.25)] border"
            style={{
              backgroundColor: `${currentThemeObj.color}15`,
              borderColor: `${currentThemeObj.color}60`,
            }}
          >
            <span className="text-xs sm:text-sm font-bold font-['Cinzel']" style={{ color: currentThemeObj.color }}>
              ☉
            </span>
          </div>
          <span className="font-['Cinzel'] font-bold tracking-[0.16em] text-xs sm:text-sm text-[#e8e0c8] group-hover:text-[#f0d98c] transition-colors whitespace-nowrap">
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
                className={`relative px-3 py-1.5 text-[11px] font-['Cinzel'] uppercase tracking-[0.14em] font-semibold rounded-full transition-all duration-200 cursor-pointer ${
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
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Cyber Rain Quick Toggle (Desktop) */}
          <button
            onClick={handleToggleRain}
            className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full transition-all border cursor-pointer ${
              isRainActive
                ? 'bg-[#d4b870]/15 text-[#f0d98c] border-[#d4b870]/40 shadow-[0_0_10px_rgba(212,184,112,0.2)]'
                : 'bg-white/5 text-white/40 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title={isRainActive ? 'Cyber Rain: ON (Click to Pause)' : 'Cyber Rain: OFF (Click to Enable)'}
            aria-label="Toggle cyber rain"
          >
            <CloudRain className="w-3.5 h-3.5" />
          </button>

          {/* Sound Audio FX Toggle (Desktop & Tablet) */}
          <button
            onClick={handleToggleSound}
            className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full transition-all border cursor-pointer ${
              !isMuted
                ? 'bg-[#d4b870]/15 text-[#f0d98c] border-[#d4b870]/40 shadow-[0_0_10px_rgba(212,184,112,0.2)]'
                : 'bg-white/5 text-white/40 border-white/10 hover:text-white hover:bg-white/10'
            }`}
            title={!isMuted ? 'Sound FX: ON (Click to Mute)' : 'Sound FX: MUTED (Click to Enable Chimes)'}
            aria-label="Toggle sound effects"
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Theme Mood Selector Dropdown */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => {
                setThemeDropdownOpen(!themeDropdownOpen);
                setLangDropdownOpen(false);
                soundEffects.playClick();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border cursor-pointer ${
                themeDropdownOpen
                  ? 'bg-white/15 border-[#d4b870] text-[#f0d98c] shadow-[0_0_12px_rgba(212,184,112,0.3)]'
                  : 'bg-[#141410]/70 hover:bg-[#1c1a14] border-[#d4b870]/30 text-[#e8e0c8] hover:text-[#f0d98c]'
              }`}
              title="Theme Color Mood / Đổi chủ đề màu sắc"
              aria-haspopup="true"
              aria-expanded={themeDropdownOpen}
              id="theme-toggle-button"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: currentThemeObj.color }} />
              <span 
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px]" 
                style={{ backgroundColor: currentThemeObj.color, boxShadow: `0 0 8px ${currentThemeObj.color}` }} 
              />
              <ChevronDown className={`w-3 h-3 text-[#d4b870] transition-transform duration-200 hidden xs:inline ${themeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Theme Dropdown Menu */}
            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0e0d0a]/98 border border-[#d4b870]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(212,184,112,0.15)] backdrop-blur-2xl p-2 z-50 flex flex-col gap-1 overflow-hidden"
                >
                  <div className="px-2.5 py-1.5 text-[10px] font-['Cinzel',serif] uppercase tracking-[0.2em] text-[#d4b870]/80 border-b border-[#d4b870]/20 flex items-center justify-between">
                    <span>{UI_TRANSLATIONS.nav.theme[lang] || 'Theme Mood'}</span>
                    <span className="text-[9px] font-mono text-[#8a8270]">5 PRESETS</span>
                  </div>

                  {THEME_OPTIONS.map((t) => {
                    const isSelected = t.id === theme;
                    const name = getLocalized(t.name, lang, t.name.en);
                    const desc = getLocalized(t.desc, lang, t.desc.en);
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleSelectTheme(t.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white/10 text-[#f0d98c] font-semibold border border-[#d4b870]/50 shadow-[0_0_12px_rgba(212,184,112,0.2)]'
                            : 'text-[#c8c0b0] hover:text-[#FAF5EE] hover:bg-white/5 border border-transparent'
                        }`}
                        id={`theme-option-${t.id}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ 
                              backgroundColor: t.color,
                              boxShadow: isSelected ? `0 0 10px ${t.color}` : 'none'
                            }}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-xs text-white">{name}</span>
                            <span className="text-[10px] text-[#8a8270] truncate max-w-[160px]">{desc}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#d4b870] stroke-[2.5] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4-Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setThemeDropdownOpen(false);
                soundEffects.playClick();
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border cursor-pointer ${
                langDropdownOpen
                  ? 'bg-[#d4b870]/20 border-[#d4b870] text-[#f0d98c] shadow-[0_0_15px_rgba(212,184,112,0.3)]'
                  : 'bg-[#141410]/70 hover:bg-[#1c1a14] border-[#d4b870]/30 text-[#e8e0c8] hover:text-[#f0d98c]'
              }`}
              title="Select Language / Chọn ngôn ngữ"
              id="lang-toggle-button"
              aria-haspopup="true"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#d4b870]" />
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="font-['JetBrains_Mono',monospace] text-[11px] font-bold tracking-wider hidden xs:inline">
                {currentLangObj.code.toUpperCase()}
              </span>
              <ChevronDown className={`w-3 h-3 text-[#d4b870] transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Selection Popup Menu */}
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e0d0a]/98 border border-[#d4b870]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(212,184,112,0.15)] backdrop-blur-2xl p-2 z-50 flex flex-col gap-1 overflow-hidden"
                >
                  <div className="px-2.5 py-1.5 text-[10px] font-['Cinzel',serif] uppercase tracking-[0.2em] text-[#d4b870]/80 border-b border-[#d4b870]/20 flex items-center justify-between">
                    <span>Language / 語言 / 语言</span>
                    <span className="text-[9px] font-mono text-[#8a8270]">4 LOCALES</span>
                  </div>

                  {LANGUAGES.map((item) => {
                    const isSelected = item.code === lang;
                    return (
                      <button
                        key={item.code}
                        onClick={() => handleSelectLang(item.code)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#d4b870]/20 text-[#f0d98c] font-semibold border border-[#d4b870]/40 shadow-[0_0_10px_rgba(212,184,112,0.15)]'
                            : 'text-[#c8c0b0] hover:text-[#FAF5EE] hover:bg-white/5 border border-transparent'
                        }`}
                        id={`lang-option-${item.code}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{item.flag}</span>
                          <div className="flex flex-col">
                            <span className="font-medium text-white">{item.nativeLabel}</span>
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

          {/* Resume Quick Trigger (Desktop & Tablet) */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenResume();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#FAF5EE] hover:text-[#f0d98c] bg-white/5 hover:bg-[#d4b870]/15 border border-[#d4b870]/25 transition-all cursor-pointer"
            id="nav-resume-button"
          >
            <FileText className="w-3.5 h-3.5 text-[#d4b870]" />
            <span className="font-['Cinzel'] tracking-wider">{UI_TRANSLATIONS.nav.resume[lang] || UI_TRANSLATIONS.nav.resume.en}</span>
          </button>

          {/* Contact Quick Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#080706] bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] hover:brightness-110 transition-all shadow-md shadow-[#d4b870]/20 cursor-pointer"
            id="nav-contact-cta"
          >
            <Send className="w-3 h-3 text-[#080706]" />
            <span className="font-['Cinzel'] tracking-wider">{UI_TRANSLATIONS.nav.contact[lang] || UI_TRANSLATIONS.nav.contact.en}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-1.5 sm:p-2 rounded-full text-white/90 hover:bg-white/10 lg:hidden cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </motion.nav>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto fixed inset-x-3 sm:inset-x-6 top-16 sm:top-20 max-h-[85vh] overflow-y-auto rounded-3xl glass-panel-elevated p-4 sm:p-5 shadow-2xl bg-[#0a0a08]/98 z-50 flex flex-col gap-3 lg:hidden border border-[#d4b870]/40 backdrop-blur-2xl"
            >
              {/* Top Drawer Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-['Cinzel'] uppercase tracking-widest text-[#f0d98c] font-bold">
                  Navigation Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left px-3 py-2.5 rounded-xl text-xs font-medium font-['Cinzel'] tracking-wider transition-all cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-[#d4b870]/20 text-[#f0d98c] font-bold border border-[#d4b870]/40 shadow-[0_0_10px_rgba(212,184,112,0.2)]'
                        : 'text-white/80 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                    id={`mobile-nav-${item.id}`}
                  >
                    {item.label[lang] || item.label.en}
                  </button>
                ))}
              </div>

              {/* Theme Mood Selector Grid */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <span className="text-xs text-[#d4b870] font-['Cinzel',serif] uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  {UI_TRANSLATIONS.nav.theme[lang] || 'Theme Mood'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {THEME_OPTIONS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        handleSelectTheme(t.id);
                      }}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                        theme === t.id
                          ? 'bg-white/15 text-[#f0d98c] font-bold border border-[#d4b870]'
                          : 'bg-white/5 text-[#c8c0b0] hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: t.color, boxShadow: `0 0 6px ${t.color}` }} 
                      />
                      <span className="truncate">{getLocalized(t.name, lang, t.name.en)}</span>
                    </button>
                  ))}
                </div>
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
                        handleSelectLang(item.code);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                        lang === item.code
                          ? 'bg-[#d4b870]/25 text-[#f0d98c] font-bold border border-[#d4b870]/50'
                          : 'bg-white/5 text-[#c8c0b0] hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span className="truncate">{item.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cyber Rain & Audio Toggle Quick Toggles */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                {/* Cyber Rain Toggle */}
                <button
                  onClick={handleToggleRain}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                    isRainActive 
                      ? 'bg-[#d4b870]/20 text-[#f0d98c] border-[#d4b870]/40' 
                      : 'bg-white/5 text-white/60 border-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>Cyber Rain</span>
                  </span>
                  <span className="text-[10px] font-bold font-mono">
                    {isRainActive ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* Audio Sound Toggle */}
                <button
                  onClick={handleToggleSound}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                    !isMuted 
                      ? 'bg-[#d4b870]/20 text-[#f0d98c] border-[#d4b870]/40' 
                      : 'bg-white/5 text-white/60 border-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>Audio FX</span>
                  </span>
                  <span className="text-[10px] font-bold font-mono">
                    {!isMuted ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-[#d4b870]/20 border border-[#d4b870]/30 text-xs font-semibold text-center text-[#f0d98c] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#d4b870]" />
                  <span>{UI_TRANSLATIONS.nav.resume[lang] || UI_TRANSLATIONS.nav.resume.en}</span>
                </button>

                <button
                  onClick={() => scrollTo('contact')}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#f0d98c] to-[#d4b870] text-[#080706] text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3 h-3 text-[#080706]" />
                  <span>{UI_TRANSLATIONS.nav.contact[lang] || UI_TRANSLATIONS.nav.contact.en}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

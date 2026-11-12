import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  ChevronRight,
  Globe2,
  Calendar,
  Zap,
  Flame,
  Sparkles,
  X,
} from 'lucide-react';
import { Language, TeamMember } from '../types';
import { TEAM_DATA, TEAM_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import { getLocalized, UI_TRANSLATIONS } from '../utils/i18n';
import { TeamCyberRain, TeamRainMode } from './TeamCyberRain';

interface TeamProps {
  lang: Language;
}

export const Team: React.FC<TeamProps> = ({ lang }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filter, setFilter] = useState<'all' | 'lead' | 'specialist'>('all');
  const [rainMode, setRainMode] = useState<TeamRainMode>('hybrid');

  // Lock body scroll and listen for Escape key when member codex modal is open
  useEffect(() => {
    if (!selectedMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  const filteredMembers = TEAM_DATA.filter((member) => {
    if (filter === 'lead') return member.highlight;
    if (filter === 'specialist') return !member.highlight;
    return true;
  });

  const getActiveOpsLabel = () => {
    return UI_TRANSLATIONS.team.activeOps[lang] || UI_TRANSLATIONS.team.activeOps.en;
  };

  const getCommunionLabel = () => {
    return UI_TRANSLATIONS.team.communion[lang] || UI_TRANSLATIONS.team.communion.en;
  };

  const getExploreLabel = () => {
    return UI_TRANSLATIONS.team.exploreCodex[lang] || UI_TRANSLATIONS.team.exploreCodex.en;
  };

  return (
    <section id="team" className="relative py-28 px-4 max-w-6xl mx-auto z-10 font-['Cormorant_Garamond',serif]">
      {/* Background Multi-Layer Cyber Rain (Inherits Technical Proficiency Matrix Rain + Integrates Red Hat Cyber Rain, Red Lightning & Fiery Embers from cyber-rain-red.html) */}
      <div 
        className="absolute -inset-x-6 sm:-inset-x-16 -inset-y-16 -z-10 overflow-hidden pointer-events-none"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.65) 20%, black 30%, black 70%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.15) 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.65) 20%, black 30%, black 70%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.15) 92%, transparent 100%)',
        }}
      >
        <TeamCyberRain mode={rainMode} opacity={0.78} />
      </div>

      {/* Balanced Seamless Ambient Glow Accents (Eliminates harsh horizontal color separation) */}
      <div 
        className={`absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] rounded-full blur-[190px] -z-10 pointer-events-none transition-colors duration-700 ${
          rainMode === 'redhat' 
            ? 'bg-[#ff0022]/12' 
            : rainMode === 'hybrid' 
            ? 'bg-[#ff2200]/10' 
            : 'bg-[#d4b870]/8'
        }`} 
      />
      <div 
        className={`absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[210px] -z-10 pointer-events-none transition-colors duration-700 opacity-70 ${
          rainMode === 'redhat' 
            ? 'bg-[#ff0022]/10' 
            : rainMode === 'hybrid' 
            ? 'bg-[#ff2200]/8' 
            : 'bg-[#d4b870]/6'
        }`} 
      />

      {/* CHAPTER HEADER (Inspired by phoenixa.html + cyber-rain-red.html) */}
      <div className="flex flex-col items-center text-center mb-10">
        {/* Sigil & Chapter Marker */}
        <div className="text-2xl sm:text-3xl text-[#d4b870] mb-2 tracking-[0.4em] drop-shadow-[0_0_15px_rgba(212,184,112,0.5)] font-['Cinzel',serif] select-none flex items-center gap-2">
          <span>☥</span>
          <span className="bg-gradient-to-r from-[#f0d98c] via-[#ff4444] to-[#f0d98c] bg-clip-text text-transparent">鳳凰 · RED HAT</span>
          <span>☥</span>
        </div>
        
        <span className="font-['JetBrains_Mono',monospace] text-xs uppercase text-[#d4b870] tracking-[0.35em] mb-2">
          — CHAPTER III · THE SQUAD &amp; RED TEAM —
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.12em] uppercase font-['Cinzel',serif] bg-gradient-to-b from-[#f0d98c] via-[#d4b870] to-[#8a8a78] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,184,112,0.25)]">
          {TEAM_INFO.name}
        </h2>

        <p className="font-['Cinzel',serif] text-xs sm:text-sm tracking-[0.4em] text-[#c8c8c8] mt-2 uppercase">
          {TEAM_INFO.subtitle ? getLocalized(TEAM_INFO.subtitle, lang, TEAM_INFO.subtitle.en) : 'SON OF RA · 太陽之子 · EPA SQUAD // RED TEAM'}
        </p>

        {/* Elegant Golden/Crimson Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4b870] to-transparent my-4" />

        <p className="italic text-base sm:text-lg text-[#8a8270] max-w-2xl font-light">
          <span className="text-[#d4b870] mr-2">❦</span>
          {getLocalized(TEAM_INFO.tagline, lang, TEAM_INFO.tagline.en)}
          <span className="text-[#d4b870] ml-2">❦</span>
        </p>

        {/* Cyber Rain Multi-Engine Mode Controller (Inherited Skills Rain + Red Hat Security Rain) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-black/70 border border-[#d4b870]/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => {
              setRainMode('hybrid');
              soundEffects.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-['JetBrains_Mono',monospace] tracking-wider transition-all cursor-pointer ${
              rainMode === 'hybrid'
                ? 'bg-gradient-to-r from-[#d4b870] to-[#ff3333] text-black font-bold shadow-[0_0_15px_rgba(255,60,60,0.4)]'
                : 'text-[#e8e0c8]/70 hover:text-white hover:bg-white/10'
            }`}
            title="Inherits Skills Cyber Rain + Red Hat Apocalypse Rain simultaneously"
          >
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{getLocalized(UI_TRANSLATIONS.team.cyberRainModes.hybrid, lang, 'HYBRID STORM')}</span>
            <span className="sm:hidden">HYBRID</span>
          </button>

          <button
            onClick={() => {
              setRainMode('redhat');
              soundEffects.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-['JetBrains_Mono',monospace] tracking-wider transition-all cursor-pointer ${
              rainMode === 'redhat'
                ? 'bg-gradient-to-r from-[#ff0000] to-[#990000] text-white font-bold shadow-[0_0_15px_rgba(255,0,0,0.6)] border border-[#ff4444]'
                : 'text-[#e8e0c8]/70 hover:text-[#ff4444] hover:bg-white/10'
            }`}
            title="Red Hat Security: Crimson Katakana Rain, Red Lightning, Fiery Embers, Red Alert"
          >
            <Flame className="w-3.5 h-3.5 text-[#ff4444] shrink-0" />
            <span className="hidden sm:inline">{getLocalized(UI_TRANSLATIONS.team.cyberRainModes.redhat, lang, 'RED HAT APOCALYPSE')}</span>
            <span className="sm:hidden">RED HAT</span>
          </button>

          <button
            onClick={() => {
              setRainMode('phoenix');
              soundEffects.playClick();
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-['JetBrains_Mono',monospace] tracking-wider transition-all cursor-pointer ${
              rainMode === 'phoenix'
                ? 'bg-gradient-to-r from-[#f0d98c] to-[#d4b870] text-black font-bold shadow-[0_0_15px_rgba(212,184,112,0.4)]'
                : 'text-[#e8e0c8]/70 hover:text-[#f0d98c] hover:bg-white/10'
            }`}
            title="Phoenix A Imperial Gold Matrix Rain"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f0d98c] shrink-0" />
            <span className="hidden sm:inline">{getLocalized(UI_TRANSLATIONS.team.cyberRainModes.phoenix, lang, 'PHOENIX GOLD MATRIX')}</span>
            <span className="sm:hidden">PHOENIX GOLD</span>
          </button>
        </div>
      </div>

      {/* TEAM SHOWCASE BANNER & MANIFEST CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        className="relative mb-16 rounded-2xl overflow-hidden border border-[#d4b870]/25 bg-[#0a0a0a]/85 backdrop-blur-xl shadow-2xl group"
        id="phoenix-banner-card"
      >
        {/* Ancient Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d4b870] z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d4b870] z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d4b870] z-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d4b870] z-20 pointer-events-none" />

        {/* Banner Image Container */}
        <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden border-b border-[#d4b870]/20">
          <img
            src={TEAM_INFO.banner}
            alt={`${TEAM_INFO.name} Banner`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
          />
          {/* Subtle Golden Dark Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm bg-black/75 backdrop-blur-md text-[11px] font-['JetBrains_Mono',monospace] text-[#f0d98c] border border-[#d4b870]/40 flex items-center gap-1.5 shadow-lg">
                <span className="text-[#d4b870]">☉</span>
                {TEAM_INFO.codename}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-sm bg-black/75 backdrop-blur-md text-[11px] font-['JetBrains_Mono',monospace] text-[#8a8a78] border border-white/10 shadow-lg">
                <Calendar className="w-3 h-3 text-[#d4b870]/70" />
                Est. {TEAM_INFO.founded}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm bg-black/75 backdrop-blur-md text-[11px] font-['JetBrains_Mono',monospace] text-[#f0d98c] border border-[#d4b870]/40 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f0d98c] animate-ping" />
                {getActiveOpsLabel()}
              </span>
            </div>
          </div>
        </div>

        {/* Team Profile Header (Avatar + Identity + Manifest Code + Stats) */}
        <div className="relative px-6 sm:px-10 pb-8 pt-0 -mt-16 sm:-mt-20 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#d4b870]/15">
            {/* Avatar & Team Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Portrait Box with Egyptian corner accents */}
              <div className="relative group/avatar">
                <div className="w-24 h-24 sm:w-28 sm:h-28 p-1.5 bg-[#0a0a0a] border border-[#d4b870]/60 shadow-[0_0_25px_rgba(212,184,112,0.2)] relative">
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#f0d98c]" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#f0d98c]" />

                  <img
                    src={TEAM_INFO.avatar}
                    alt={TEAM_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-105 group-hover/avatar:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#0a0a0a] border border-[#d4b870] flex items-center justify-center shadow-lg text-[10px] text-[#f0d98c]">
                  ☉
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-2xl sm:text-3xl font-normal font-['Cinzel',serif] tracking-[0.1em] text-[#e8e0c8]">
                    {TEAM_INFO.name}
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-['JetBrains_Mono',monospace] font-bold text-[#d4b870] bg-[#d4b870]/10 border border-[#d4b870]/30">
                    {TEAM_INFO.codename}
                  </span>
                </div>
                <p className="text-sm italic text-[#d4b870] mt-1 font-['Cormorant_Garamond',serif]">
                  {getLocalized(TEAM_INFO.tagline, lang, TEAM_INFO.tagline.en)}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#8a8270] mt-2 font-['JetBrains_Mono',monospace]">
                  <span className="flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-[#d4b870]/60" />
                    {TEAM_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Links & Quick Actions */}
            <div className="flex items-center gap-3 self-start md:self-end">
              {TEAM_INFO.links.github && (
                <a
                  href={TEAM_INFO.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 font-['Cinzel',serif] text-xs tracking-wider text-[#e8e0c8] hover:text-[#f0d98c] bg-black/60 hover:bg-[#d4b870]/10 border border-[#d4b870]/30 transition-all"
                  title="Team GitHub"
                >
                  <Github className="w-4 h-4 text-[#d4b870]" />
                  <span>GITHUB · 碼</span>
                </a>
              )}
              <a
                href="#contact"
                className="flex items-center gap-1.5 px-5 py-2 font-['Cinzel',serif] text-xs tracking-wider text-[#0a0a0a] bg-gradient-to-r from-[#d4b870] to-[#f0d98c] hover:brightness-110 font-bold transition-all shadow-[0_0_15px_rgba(212,184,112,0.3)]"
              >
                <Mail className="w-4 h-4" />
                <span>{getCommunionLabel()}</span>
              </a>
            </div>
          </div>

          {/* Description with Dropcap (from phoenixa.html) */}
          <div className="mt-6 text-base sm:text-lg text-[#e8e0c8]/90 leading-relaxed font-['Cormorant_Garamond',serif]">
            <p>
              <span className="font-['Cinzel',serif] text-4xl float-left leading-none pr-3 pt-1 text-[#d4b870]">
                {getLocalized(TEAM_INFO.description, lang, TEAM_INFO.description.en).charAt(0)}
              </span>
              {getLocalized(TEAM_INFO.description, lang, TEAM_INFO.description.en).slice(1)}
            </p>
          </div>

          {/* Code Manifest Block (from phoenixa.html // phoenix_a.manifest) */}
          <div className="mt-6 p-4 sm:p-5 rounded-md bg-[#0a0a0a]/90 border border-[#d4b870]/20 font-['JetBrains_Mono',monospace] text-xs text-[#e8e0c8] relative overflow-x-auto">
            <div className="absolute top-2.5 right-3 text-[10px] text-[#8a8270] tracking-wider">
              // phoenix_squad.manifest
            </div>
            <div className="space-y-1 text-[11px] sm:text-xs">
              <p className="text-[#8a8270] italic">// 道可道，非常道 — The code that can be written breathes eternal fire</p>
              <p>
                <span className="text-[#d4b870]">const</span> <span className="text-[#c8c8c8]">phoenixSquad</span> = &#123;
              </p>
              <p className="pl-4">
                <span className="text-[#c8c8c8]">collective:</span> <span className="text-[#f0d98c]">'PHOENIX A'</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#c8c8c8]">members:</span> [<span className="text-[#f0d98c]">'@Elite'</span>, <span className="text-[#f0d98c]">'@Kaze'</span>, <span className="text-[#f0d98c]">'@Aero'</span>],
              </p>
              <p className="pl-4">
                <span className="text-[#c8c8c8]">creed:</span> <span className="text-[#d4b870]">function</span>() &#123;
              </p>
              <p className="pl-8">
                <span className="text-[#d4b870]">return</span> <span className="text-[#f0d98c]">'Code is poetry. Poetry is code. Both are light.'</span>;
              </p>
              <p className="pl-4">&#125;</p>
              <p>&#125;;</p>
            </div>
          </div>

          {/* Stats Bar (Golden Border Style) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#d4b870]/15">
            <div className="p-3.5 rounded-sm bg-black/40 border border-[#d4b870]/20 flex flex-col items-center text-center">
              <span className="text-2xl font-normal font-['Cinzel',serif] text-[#f0d98c]">
                {TEAM_INFO.stats.membersCount}
              </span>
              <span className="text-[10px] font-['Cinzel',serif] text-[#8a8270] uppercase tracking-wider mt-1">
                {UI_TRANSLATIONS.team.statMembers[lang] || UI_TRANSLATIONS.team.statMembers.en}
              </span>
            </div>

            <div className="p-3.5 rounded-sm bg-black/40 border border-[#d4b870]/20 flex flex-col items-center text-center">
              <span className="text-2xl font-normal font-['Cinzel',serif] text-[#f0d98c]">
                {TEAM_INFO.stats.completedProjects}+
              </span>
              <span className="text-[10px] font-['Cinzel',serif] text-[#8a8270] uppercase tracking-wider mt-1">
                {UI_TRANSLATIONS.team.statWorks[lang] || UI_TRANSLATIONS.team.statWorks.en}
              </span>
            </div>

            <div className="p-3.5 rounded-sm bg-black/40 border border-[#d4b870]/20 flex flex-col items-center text-center">
              <span className="text-2xl font-normal font-['Cinzel',serif] text-[#f0d98c]">
                {TEAM_INFO.stats.uptimePercentage}
              </span>
              <span className="text-[10px] font-['Cinzel',serif] text-[#8a8270] uppercase tracking-wider mt-1">
                {UI_TRANSLATIONS.team.statUptime[lang] || UI_TRANSLATIONS.team.statUptime.en}
              </span>
            </div>

            <div className="p-3.5 rounded-sm bg-black/40 border border-[#d4b870]/20 flex flex-col items-center text-center">
              <span className="text-2xl font-normal font-['Cinzel',serif] text-[#f0d98c]">
                100%
              </span>
              <span className="text-[10px] font-['Cinzel',serif] text-[#8a8270] uppercase tracking-wider mt-1">
                {UI_TRANSLATIONS.team.statPurity[lang] || UI_TRANSLATIONS.team.statPurity.en}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* THE PATHS SECTION HEADER (Inspired by phoenixa.html THE PATHS) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-['JetBrains_Mono',monospace] text-[11px] uppercase text-[#d4b870] tracking-[0.3em] block mb-1">
            — CHAPTER · THE PATHS —
          </span>
          <h3 className="text-2xl sm:text-3xl font-normal text-[#e8e0c8] font-['Cinzel',serif] tracking-[0.1em] flex items-center gap-2">
            <span>{UI_TRANSLATIONS.team.thePaths[lang] || UI_TRANSLATIONS.team.thePaths.en}</span>
          </h3>
          <p className="text-xs italic text-[#8a8270] mt-0.5">
            {lang === 'vi' 
              ? 'Ba vị trí kỹ sư tương ứng với ba con đường tinh thông công nghệ' 
              : lang === 'zh'
              ? '三位核心大师各执一脉，融汇技术与设计之道'
              : lang === 'tw'
              ? '三位核心大師各執一脈，融匯技術與設計之道'
              : 'Three master adepts wielding distinct paths of the technological arts'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-sm bg-black/60 border border-[#d4b870]/20">
          <button
            onClick={() => {
              setFilter('all');
              soundEffects.playClick();
            }}
            className={`px-3 py-1 text-xs font-['Cinzel',serif] tracking-wider transition-all ${
              filter === 'all'
                ? 'bg-[#d4b870] text-[#0a0a0a] font-bold shadow-[0_0_10px_rgba(212,184,112,0.3)]'
                : 'text-[#8a8270] hover:text-[#e8e0c8]'
            }`}
          >
            {lang === 'vi' ? 'TẤT CẢ' : lang === 'zh' || lang === 'tw' ? '全部' : 'ALL'} ({TEAM_DATA.length})
          </button>
          <button
            onClick={() => {
              setFilter('lead');
              soundEffects.playClick();
            }}
            className={`px-3 py-1 text-xs font-['Cinzel',serif] tracking-wider transition-all ${
              filter === 'lead'
                ? 'bg-[#d4b870] text-[#0a0a0a] font-bold shadow-[0_0_10px_rgba(212,184,112,0.3)]'
                : 'text-[#8a8270] hover:text-[#e8e0c8]'
            }`}
          >
            {lang === 'vi' ? 'CORE LEAD' : lang === 'zh' || lang === 'tw' ? '核心领袖' : 'LEAD'} (1)
          </button>
          <button
            onClick={() => {
              setFilter('specialist');
              soundEffects.playClick();
            }}
            className={`px-3 py-1 text-xs font-['Cinzel',serif] tracking-wider transition-all ${
              filter === 'specialist'
                ? 'bg-[#d4b870] text-[#0a0a0a] font-bold shadow-[0_0_10px_rgba(212,184,112,0.3)]'
                : 'text-[#8a8270] hover:text-[#e8e0c8]'
            }`}
          >
            {lang === 'vi' ? 'CHUYÊN GIA' : lang === 'zh' || lang === 'tw' ? '专家使徒' : 'SPECIALISTS'} (2)
          </button>
        </div>
      </div>

      {/* THE 3 PATH CARDS (Grid inspired by path-card in phoenixa.html) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => {
          const isCoreLead = member.highlight;

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-7 rounded-sm transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                isCoreLead
                  ? 'bg-[#0a0a0a]/90 border border-[#d4b870]/40 shadow-[0_0_25px_rgba(212,184,112,0.15)] hover:border-[#f0d98c]/80'
                  : 'bg-[#0a0a0a]/75 border border-[#d4b870]/20 hover:border-[#d4b870]/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]'
              }`}
              id={`team-card-${member.id}`}
            >
              {/* Sliding Gold Line Animation on Hover (from path-card in phoenixa.html) */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4b870] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#d4b870]/60" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#d4b870]/60" />

              <div>
                {/* Path Glyph & Nickname Header */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="text-3xl font-['JetBrains_Mono',monospace] text-[#d4b870] drop-shadow-[0_0_12px_rgba(212,184,112,0.5)] select-none">
                    {member.glyph || '☉'}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCoreLead ? (
                      <span className="text-[10px] font-['Cinzel',serif] tracking-wider uppercase px-2 py-0.5 bg-[#d4b870]/15 text-[#f0d98c] border border-[#d4b870]/40">
                        Core Lead
                      </span>
                    ) : (
                      <span className="text-[10px] font-['Cinzel',serif] tracking-wider uppercase px-2 py-0.5 bg-black/40 text-[#8a8270] border border-white/10">
                        Adept
                      </span>
                    )}
                  </div>
                </div>

                {/* Path Title & Nickname */}
                <div className="mb-4">
                  <span className="text-[11px] font-['JetBrains_Mono',monospace] tracking-wider text-[#d4b870] uppercase block">
                    {member.pathName ? getLocalized(member.pathName, lang, member.pathName.en) : 'THE PATH'}
                  </span>
                  <h4 className="text-2xl font-normal font-['Cinzel',serif] tracking-[0.08em] text-[#e8e0c8] group-hover:text-[#f0d98c] transition-colors mt-0.5">
                    @{member.name}
                  </h4>
                  <p className="text-xs italic text-[#d4b870]/80 mt-1">
                    {getLocalized(member.role, lang, member.role.en)}
                  </p>
                </div>

                {/* Avatar portrait with corner brackets */}
                <div className="relative mb-5 w-20 h-20 p-1 border border-[#d4b870]/30 bg-black">
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#f0d98c]" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#f0d98c]" />
                  <img
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bio text in Cormorant Garamond */}
                <p className="text-sm sm:text-base text-[#8a8270] leading-relaxed mb-5 font-['Cormorant_Garamond',serif]">
                  {getLocalized(member.bio, lang, member.bio.en)}
                </p>

                {/* Core Skills Chips in JetBrains Mono */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {member.coreSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 text-[10px] font-['JetBrains_Mono',monospace] bg-black/40 text-[#c8c8c8] border border-[#d4b870]/20 group-hover:border-[#d4b870]/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions & Socials */}
              <div className="pt-4 border-t border-[#d4b870]/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.socials?.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#8a8270] hover:text-[#f0d98c] hover:bg-[#d4b870]/10 transition-all border border-transparent hover:border-[#d4b870]/20"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#8a8270] hover:text-[#f0d98c] hover:bg-[#d4b870]/10 transition-all border border-transparent hover:border-[#d4b870]/20"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials?.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-1.5 text-[#8a8270] hover:text-[#f0d98c] hover:bg-[#d4b870]/10 transition-all border border-transparent hover:border-[#d4b870]/20"
                      title="Email Direct"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedMember(member);
                    soundEffects.playClick();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-['Cinzel',serif] tracking-wider text-[#d4b870] hover:text-[#f0d98c] transition-colors group/btn uppercase"
                >
                  <span>{getExploreLabel()}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PHILOSOPHY QUOTE (Inspired by phoenixa.html PHILOSOPHY quote) */}
      {TEAM_INFO.philosophyQuote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 sm:p-12 text-center max-w-3xl mx-auto border-y border-[#d4b870]/20 bg-black/30 backdrop-blur-md"
        >
          <div className="text-xl text-[#d4b870] mb-3">❦</div>
          <blockquote className="text-lg sm:text-2xl italic text-[#e8e0c8] font-['Cormorant_Garamond',serif] leading-relaxed">
            "{getLocalized(TEAM_INFO.philosophyQuote.quote, lang, TEAM_INFO.philosophyQuote.quote.en)}"
          </blockquote>
          <cite className="block mt-4 text-xs font-['Cinzel',serif] tracking-[0.3em] uppercase text-[#d4b870] not-italic">
            — {TEAM_INFO.philosophyQuote.cite}
          </cite>
        </motion.div>
      )}

      {/* COMMUNION SIGILS & LINKS ROW (from phoenixa.html COMMUNION) */}
      <div className="mt-12 text-center">
        <div className="text-base sm:text-lg text-[#d4b870] tracking-[0.6em] mb-4 opacity-75 font-['JetBrains_Mono',monospace] select-none">
          ☉ · 道 · ☥ · ⌬ · ∞
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:ryusama26@gmail.com"
            className="px-5 py-2 font-['Cinzel',serif] text-xs tracking-widest text-[#e8e0c8] hover:text-[#f0d98c] border border-[#d4b870]/30 hover:border-[#d4b870] bg-[#d4b870]/5 transition-all"
          >
            EPISTULA · THƯ · 信
          </a>
          <a
            href={TEAM_INFO.links.github || 'https://github.com/Elite-PhoenixA'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 font-['Cinzel',serif] text-xs tracking-widest text-[#e8e0c8] hover:text-[#f0d98c] border border-[#d4b870]/30 hover:border-[#d4b870] bg-[#d4b870]/5 transition-all"
          >
            GITHUB · 碼
          </a>
          <a
            href="#projects"
            className="px-5 py-2 font-['Cinzel',serif] text-xs tracking-widest text-[#e8e0c8] hover:text-[#f0d98c] border border-[#d4b870]/30 hover:border-[#d4b870] bg-[#d4b870]/5 transition-all"
          >
            CODEX · LIBER · 典
          </a>
        </div>
      </div>

      {/* Deep-Dive Member Profile Codex Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-sm p-6 sm:p-8 bg-[#0a0a0a] border border-[#d4b870]/40 shadow-[0_0_40px_rgba(212,184,112,0.25)] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button X (Sticky top-right) */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-[#d4b870]/20 border border-[#d4b870]/30 transition-all cursor-pointer z-20"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#f0d98c]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#f0d98c]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#f0d98c]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#f0d98c]" />

              <div className="flex items-start gap-4 sm:gap-5 mb-6 pr-6">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 p-1 border border-[#d4b870] bg-black shrink-0">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-105"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-['JetBrains_Mono',monospace] text-[#d4b870] uppercase">
                    {selectedMember.pathName ? getLocalized(selectedMember.pathName, lang, selectedMember.pathName.en) : 'THE PATH'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#f0d98c] font-['Cinzel',serif] tracking-[0.08em]">
                    @{selectedMember.name}
                  </h3>
                  <p className="text-xs sm:text-sm italic text-[#d4b870] mt-0.5">
                    {getLocalized(selectedMember.role, lang, selectedMember.role.en)}
                  </p>
                  <p className="text-xs text-[#8a8270] mt-0.5">
                    {getLocalized(selectedMember.specialty, lang, selectedMember.specialty.en)}
                  </p>
                </div>
              </div>

              {/* Status & Summary */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-sm bg-black/60 border border-[#d4b870]/20">
                  <div className="text-[11px] uppercase font-['Cinzel',serif] text-[#d4b870] tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#d4b870]" />
                    {UI_TRANSLATIONS.team.missionTitle[lang] || 'CODEX & DISCIPLINE'}
                  </div>
                  <p className="text-sm text-[#e8e0c8]/85 leading-relaxed font-['Cormorant_Garamond',serif]">
                    {getLocalized(selectedMember.bio, lang, selectedMember.bio.en)}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-black/60 border border-[#d4b870]/20">
                  <div className="text-[11px] uppercase font-['Cinzel',serif] text-[#d4b870] tracking-widest mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#d4b870]" />
                    {UI_TRANSLATIONS.team.coreWeapons[lang] || 'CORE WEAPONS & TECH'}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedMember.coreSkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 sm:px-3 py-1 text-xs font-['JetBrains_Mono',monospace] bg-black text-[#f0d98c] border border-[#d4b870]/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#d4b870]/20">
                <div className="flex items-center gap-2">
                  {selectedMember.socials?.github && (
                    <a
                      href={selectedMember.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black hover:bg-[#d4b870]/10 text-[#e8e0c8] hover:text-[#f0d98c] transition-all border border-[#d4b870]/20"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials?.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black hover:bg-[#d4b870]/10 text-[#e8e0c8] hover:text-[#f0d98c] transition-all border border-[#d4b870]/20"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.socials?.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      className="p-2 bg-black hover:bg-[#d4b870]/10 text-[#e8e0c8] hover:text-[#f0d98c] transition-all border border-[#d4b870]/20"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-5 py-2 font-['Cinzel',serif] tracking-wider bg-gradient-to-r from-[#d4b870] to-[#f0d98c] text-[#0a0a0a] font-bold text-xs hover:brightness-110 transition-all cursor-pointer"
                >
                  {UI_TRANSLATIONS.team.closeBtn[lang] || 'CLOSE'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

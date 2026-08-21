import React, { useState, useEffect } from 'react';
import { Language, ThemeMood, Project } from './types';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Team } from './components/Team';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [userBaseTheme, setUserBaseTheme] = useState<ThemeMood>('amber');
  const [isRainActive, setIsRainActive] = useState<boolean>(true);
  const [rainColorMode, setRainColorMode] = useState<'theme' | 'amber'>('theme');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSkillsSectionActive, setIsSkillsSectionActive] = useState(false);

  // Dynamic effective theme: switches to 'obsidian' when inside Skills section, and reverts to user's chosen theme otherwise
  const effectiveTheme: ThemeMood = isSkillsSectionActive ? 'obsidian' : userBaseTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }, [effectiveTheme]);

  const handleThemeChange = (newTheme: ThemeMood) => {
    setUserBaseTheme(newTheme);
  };

  const handleSkillsVisibilityChange = (isVisible: boolean) => {
    setIsSkillsSectionActive(isVisible);
  };

  return (
    <div 
      data-theme={effectiveTheme}
      className="relative min-h-screen bg-[#050505] text-[#e8e0c8] font-['Cormorant_Garamond',serif] selection:bg-[#d4b870]/30 selection:text-[#f0d98c] overflow-x-hidden transition-colors duration-500"
    >
      {/* Cinematic Ambient Multi-layer Background with Dual Cyber Rain & Lightning Physics */}
      <AmbientBackground 
        theme={effectiveTheme} 
        isRainActive={isRainActive}
        rainColorMode={rainColorMode}
        isSkillsSectionActive={isSkillsSectionActive}
      />

      {/* Floating Glass Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={userBaseTheme}
        setTheme={handleThemeChange}
        onOpenResume={() => setIsResumeOpen(true)}
        isRainActive={isRainActive}
        setIsRainActive={setIsRainActive}
        rainColorMode={rainColorMode}
        setRainColorMode={setRainColorMode}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Full-Screen Centered Profile Hero */}
        <Hero 
          lang={lang} 
          onOpenResume={() => setIsResumeOpen(true)} 
        />

        {/* About Section & Live Interactive Terminal */}
        <About lang={lang} />

        {/* Technical Proficiency & Skills Matrix - Auto triggers Obsidian Void and Blended Rain ONLY when in view */}
        <Skills 
          lang={lang} 
          onSkillsVisibilityChange={handleSkillsVisibilityChange}
          isObsidianActive={isSkillsSectionActive}
        />

        {/* Engineering Team & Squad Showcase */}
        <Team lang={lang} />

        {/* Selected Works & Architecture Projects */}
        <Projects 
          lang={lang} 
          onSelectProject={(proj) => setSelectedProject(proj)} 
        />

        {/* Career Timeline & Milestones */}
        <Experience lang={lang} />

        {/* Contact, Hanoi Time & Interactive Form */}
        <Contact lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Project Deep-Dive Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />

      {/* Printable / Downloadable CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        lang={lang}
      />
    </div>
  );
}

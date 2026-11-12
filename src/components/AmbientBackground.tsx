import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ThemeMood } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CyberRain } from './CyberRain';
import { QwenCyberRain } from './QwenCyberRain';

interface AmbientBackgroundProps {
  theme: ThemeMood;
  isRainActive?: boolean;
  rainColorMode?: 'theme' | 'amber';
  isSkillsSectionActive?: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  theme,
  isRainActive = true,
  rainColorMode = 'theme',
  isSkillsSectionActive = false,
}) => {
  // Motion values to avoid continuous React re-renders on every mouse pixel movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 35, stiffness: 50 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 50 });

  const bgImageX = useTransform(springX, (val) => val * 0.4);
  const bgImageY = useTransform(springY, (val) => val * 0.4);
  const glowX = useTransform(springX, (val) => val * 0.8);
  const glowY = useTransform(springY, (val) => val * 0.8);
  const followerX = useTransform(springX, (val) => `calc(50vw + ${val * 12}px - 300px)`);
  const followerY = useTransform(springY, (val) => `calc(40vh + ${val * 12}px - 300px)`);

  useEffect(() => {
    // Only bind mousemove listener on pointer devices that support hover
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) {
      return;
    }

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        mouseX.set(x);
        mouseY.set(y);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const themeGradient = useMemo(() => {
    switch (theme) {
      case 'amber':
        return 'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.18), rgba(180, 83, 9, 0.12) 45%, rgba(8, 7, 6, 0.97) 80%)';
      case 'aurora':
        return 'radial-gradient(circle at 50% 30%, rgba(53, 255, 156, 0.15), rgba(126, 249, 255, 0.08) 40%, rgba(8, 7, 6, 0.97) 80%)';
      case 'obsidian':
        return 'radial-gradient(circle at 50% 30%, rgba(138, 92, 252, 0.18), rgba(60, 20, 100, 0.14) 45%, rgba(8, 7, 6, 0.98) 80%)';
      case 'emerald':
        return 'radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.16), rgba(6, 78, 59, 0.2) 50%, rgba(8, 7, 6, 0.97) 85%)';
      case 'cyber':
      default:
        return 'radial-gradient(circle at 50% 25%, rgba(126, 249, 255, 0.14), rgba(15, 59, 46, 0.15) 45%, rgba(8, 7, 6, 0.97) 80%)';
    }
  }, [theme]);

  const followerBackground = useMemo(() => {
    switch (theme) {
      case 'amber':
        return 'radial-gradient(circle, rgba(245,158,11,0.28) 0%, transparent 70%)';
      case 'aurora':
        return 'radial-gradient(circle, rgba(53,255,156,0.3) 0%, transparent 70%)';
      case 'obsidian':
        return 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)';
      case 'emerald':
        return 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)';
      case 'cyber':
      default:
        return 'radial-gradient(circle, rgba(126,249,255,0.28) 0%, transparent 70%)';
    }
  }, [theme]);

  const effectiveRainTheme = rainColorMode === 'amber' ? 'amber' : theme;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="ambient-background-root">
      {/* Layer 0: High-res background image with crossfade */}
      <AnimatePresence>
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{
            opacity: 0.32,
            scale: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url('${PERSONAL_INFO.themeBackgrounds[theme]}')`,
            x: bgImageX,
            y: bgImageY,
          }}
        />
      </AnimatePresence>

      {/* Layer 1: First Cyber Rain (Interactive Digital Wave & Ripple Physics Engine) */}
      {isRainActive && (
        <CyberRain
          theme={effectiveRainTheme}
          opacity={0.82}
          interactive={true}
          waterLevelRatio={0.82}
          className="pointer-events-none"
        />
      )}

      {/* Layer 1.5: Blended Second Cyber Rain (Exact Qwen Katakana/Hex Rain + Dynamic Lightning & Sky Flashes - Only active when user is in Skills section) */}
      {isRainActive && (
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            isSkillsSectionActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <QwenCyberRain
            theme="obsidian"
            opacity={0.82}
            isObsidianSkillsActive={isSkillsSectionActive}
          />
        </div>
      )}

      {/* Layer 2: Atmospheric radial theme glow */}
      <motion.div
        className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
        style={{
          background: themeGradient,
          x: glowX,
          y: glowY,
        }}
      />

      {/* Layer 3: Vignette (darkened edges) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(8, 7, 6, 0.85) 90%, #080706 100%)'
        }}
      />

      {/* Layer 4: Interactive ambient light cursor follower (desktop only) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 pointer-events-none hidden md:block"
        style={{
          background: followerBackground,
          x: followerX,
          y: followerY,
        }}
      />

      {/* Layer 5: Cinematic film noise grain */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-35" />
    </div>
  );
};

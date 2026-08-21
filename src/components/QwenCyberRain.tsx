import React, { useEffect, useRef } from 'react';
import { ThemeMood } from '../types';

interface QwenCyberRainProps {
  theme?: ThemeMood;
  opacity?: number;
  isObsidianSkillsActive?: boolean;
  className?: string;
}

export const QwenCyberRain: React.FC<QwenCyberRainProps> = ({
  theme = 'obsidian',
  opacity = 0.85,
  isObsidianSkillsActive = false,
  className = '',
}) => {
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const lightningCanvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<ThemeMood>(theme);
  themeRef.current = theme;

  // 1. Exact Matrix Rain from Qwen_html_20260821_e0st5ls0t.html
  useEffect(() => {
    if (!isObsidianSkillsActive) return;

    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let cols = 0;
    let drops: number[] = [];
    let animationFrameId = 0;

    // Exact characters from Qwen_html_20260821_e0st5ls0t.html
    const chars = 'アカサタナハマヤラワ01<>/\\|#$%&@ABCDEF';

    function resize() {
      w = canvas!.width = canvas!.offsetWidth || window.innerWidth;
      h = canvas!.height = canvas!.offsetHeight || window.innerHeight;
      cols = Math.floor(w / 16);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx) return;
      // Semi-transparent background clear for classic matrix phosphorescent trail
      ctx.fillStyle = 'rgba(4, 7, 13, 0.12)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = '14px "JetBrains Mono", "Space Grotesk", monospace';

      const currentTheme = themeRef.current;

      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * 16;
        const r = Math.random();

        // Authentic Qwen palette blended with Obsidian Void neon purple / cyan / magenta accents
        if (currentTheme === 'obsidian' || isObsidianSkillsActive) {
          if (r < 0.08) {
            ctx.fillStyle = '#ff2bd6'; // neon magenta
          } else if (r < 0.25) {
            ctx.fillStyle = '#C084FC'; // obsidian purple light
          } else if (i % 5 === 0) {
            ctx.fillStyle = '#00e5ff'; // cyan
          } else if (i % 7 === 0) {
            ctx.fillStyle = '#A855F7'; // vivid obsidian purple
          } else {
            ctx.fillStyle = '#00ff9c'; // cyber green
          }
        } else if (currentTheme === 'amber') {
          ctx.fillStyle = r < 0.05 ? '#ff2bd6' : (i % 6 === 0 ? '#FBBF24' : '#F59E0B');
        } else if (currentTheme === 'aurora' || currentTheme === 'emerald') {
          ctx.fillStyle = r < 0.05 ? '#ff2bd6' : (i % 6 === 0 ? '#35FF9C' : '#00ff9c');
        } else {
          // Default Qwen color formula:
          ctx.fillStyle = r < 0.02 ? '#ff2bd6' : (i % 7 === 0 ? '#00e5ff' : '#00ff9c');
        }

        ctx.globalAlpha = 0.45 + Math.random() * 0.55;
        ctx.fillText(ch, i * 16, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + (i % 5) * 0.13;
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isObsidianSkillsActive]);

  // 2. Exact Lightning Bolt & Sky Flash engine from Qwen_html_20260821_e0st5ls0t.html
  useEffect(() => {
    if (!isObsidianSkillsActive) return;

    const canvas = lightningCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animationFrameId = 0;
    let spawnTimeoutId: NodeJS.Timeout | number = 0;

    interface Point {
      x: number;
      y: number;
    }
    interface Bolt {
      pts: Point[];
      branches: Point[][];
      life: number;
    }

    let bolts: Bolt[] = [];
    let flash = 0;

    function resize() {
      w = canvas!.width = canvas!.offsetWidth || window.innerWidth;
      h = canvas!.height = canvas!.offsetHeight || window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function path(p: Point[]) {
      if (!ctx || p.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(p[0].x, p[0].y);
      for (let k = 1; k < p.length; k++) {
        ctx.lineTo(p[k].x, p[k].y);
      }
      ctx.stroke();
    }

    function spawn() {
      let cx = Math.random() * w;
      let cy = 0;
      const pts: Point[] = [{ x: cx, y: cy }];

      while (cy < h * 0.92) {
        cy += 10 + Math.random() * 22;
        cx += (Math.random() - 0.5) * 46;
        pts.push({ x: cx, y: cy });
      }

      const branches: Point[][] = [];
      pts.forEach((p, i) => {
        if (i > 3 && Math.random() < 0.13) {
          let bx = p.x;
          let by = p.y;
          const bp: Point[] = [{ x: bx, y: by }];
          const n = 3 + ((Math.random() * 4) | 0);
          for (let k = 0; k < n; k++) {
            bx += (Math.random() - 0.5) * 62;
            by += 8 + Math.random() * 18;
            bp.push({ x: bx, y: by });
          }
          branches.push(bp);
        }
      });

      bolts.push({ pts, branches, life: 1 });
      flash = isObsidianSkillsActive ? 0.45 : 0.3;

      const nextDelay = isObsidianSkillsActive 
        ? 600 + Math.random() * 1800 
        : 900 + Math.random() * 2600;
      spawnTimeoutId = setTimeout(spawn, nextDelay);
    }

    spawnTimeoutId = setTimeout(spawn, 1000);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const currentTheme = themeRef.current;
      const isObsidian = currentTheme === 'obsidian' || isObsidianSkillsActive;

      // Atmospheric flash
      if (flash > 0) {
        if (isObsidian) {
          ctx.fillStyle = `rgba(192, 132, 252, ${flash * 0.08})`;
        } else {
          ctx.fillStyle = `rgba(140, 225, 255, ${flash * 0.06})`;
        }
        ctx.fillRect(0, 0, w, h);
        flash -= 0.02;
      }

      bolts = bolts.filter((b) => b.life > 0);

      bolts.forEach((b) => {
        if (isObsidian) {
          ctx.shadowColor = '#C084FC';
          ctx.shadowBlur = 24;
          ctx.lineWidth = 2.4;
          ctx.strokeStyle = `rgba(243, 232, 255, ${b.life})`;
          path(b.pts);

          ctx.lineWidth = 1.2;
          ctx.strokeStyle = `rgba(192, 132, 252, ${b.life * 0.85})`;
          b.branches.forEach(path);
        } else {
          ctx.shadowColor = '#00e5ff';
          ctx.shadowBlur = 20;
          ctx.lineWidth = 2.2;
          ctx.strokeStyle = `rgba(190, 242, 255, ${b.life})`;
          path(b.pts);

          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(0, 229, 255, ${b.life * 0.8})`;
          b.branches.forEach(path);
        }

        b.life -= 0.055;
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(draw);
    }

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(spawnTimeoutId as number);
    };
  }, [isObsidianSkillsActive]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      {/* Qwen Matrix Rain Canvas */}
      <canvas
        ref={rainCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, mixBlendMode: 'screen' }}
        id="qwen-cyber-rain-canvas"
      />
      {/* Qwen Lightning & Storm Flash Canvas */}
      <canvas
        ref={lightningCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3, mixBlendMode: 'screen' }}
        id="qwen-lightning-canvas"
      />
    </div>
  );
};

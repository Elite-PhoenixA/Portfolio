import React, { useEffect, useRef, useState } from 'react';

export type TeamRainMode = 'hybrid' | 'redhat' | 'phoenix';

interface TeamCyberRainProps {
  mode?: TeamRainMode;
  opacity?: number;
  className?: string;
  onModeChange?: (mode: TeamRainMode) => void;
}

export const TeamCyberRain: React.FC<TeamCyberRainProps> = ({
  mode = 'hybrid',
  opacity = 0.85,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoenixCanvasRef = useRef<HTMLCanvasElement>(null);
  const redRainCanvasRef = useRef<HTMLCanvasElement>(null);
  const lightningCanvasRef = useRef<HTMLCanvasElement>(null);
  const embersCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);

  // High performance: only animate when in or near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.02, rootMargin: '200px 0px 200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 1. PHOENIX A GOLDEN/CYAN MATRIX RAIN (Inherited from Skills & phoenixa.html)
  useEffect(() => {
    if (!isInView || mode === 'redhat') return;

    const canvas = phoenixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const traditionalChinese = '道德經天地人神鬼陰陽五行八卦易書禮樂春秋論語孟子仁義禮智信無極太極玄妙空虛靜觀照覺悟空靈真善美鳳凰太陽光明永生蓮花聖蛇權杖';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzΩΣΔΦΨαβγδεζηθικλμνξπρστυφχψω';
    const code = '{}[]<>()=>+*/&|;:0123456789#@!?%$^~∞∑∫√≠≈∂∆⌬';
    const chars = (traditionalChinese + latin + code).split('');

    const fontSize = 15;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      width = canvas.width = Math.round(rect.width || window.innerWidth);
      height = canvas.height = Math.round(rect.height || 1200);
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -80);
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    const draw = (time: number) => {
      if (time - lastTime > 45) {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.12)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px "JetBrains Mono", "Noto Sans CJK TC", monospace`;
        ctx.textBaseline = 'top';

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const brightness = Math.random();

          if (brightness > 0.96) {
            ctx.shadowColor = 'rgba(240, 217, 140, 0.95)';
            ctx.shadowBlur = 14;
            ctx.fillStyle = '#f8ecc0';
          } else if (brightness > 0.82) {
            ctx.shadowColor = 'rgba(212, 184, 112, 0.6)';
            ctx.shadowBlur = 8;
            ctx.fillStyle = '#d4b870';
          } else if (brightness > 0.5) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#a89860';
          } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#6a6a58';
          }

          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 0.65 + Math.random() * 0.45;
        }
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, isInView]);

  // 2. APOCALYPTIC RED CYBER RAIN (Directly integrated from cyber-rain-red.html)
  useEffect(() => {
    if (!isInView || mode === 'phoenix') return;

    const canvas = redRainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let drops: number[] = [];

    // Exact characters from cyber-rain-red.html
    const chars = 'アカサタナハマヤラワガザダバパ01!@#$%&*<>/?\\|{}[]+=~^0123456789ABCDEF⚠☢☣✖';
    const colors = [
      '#ff0000', '#ff1a1a', '#ff3333', '#ff4d4d',
      '#cc0000', '#990000', '#660000',
      '#ff0040', '#ff0066', '#ff0033',
      '#ff3300', '#ff6600',
      '#ff0000', '#ff0000', '#ff0000'
    ];

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      width = canvas.width = Math.round(rect.width || window.innerWidth);
      height = canvas.height = Math.round(rect.height || 1200);
      cols = Math.floor(width / 14);
      drops = Array.from({ length: cols }, () => Math.random() * -80);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!ctx) return;
      // Semi-transparent background trail
      ctx.fillStyle = mode === 'hybrid' ? 'rgba(8, 2, 2, 0.08)' : 'rgba(8, 2, 2, 0.12)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = '13px "JetBrains Mono", monospace';

      for (let i = 0; i < cols; i++) {
        // In hybrid mode, alternate or interweave columns
        if (mode === 'hybrid' && i % 2 === 0 && Math.random() < 0.25) {
          drops[i] += 0.7;
          continue;
        }

        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * 14;
        const colorIdx = Math.floor(Math.random() * colors.length);
        const baseColor = colors[colorIdx];

        if (Math.random() < 0.035) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 12;
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = baseColor;
          ctx.shadowColor = baseColor;
          ctx.shadowBlur = 6;
          ctx.globalAlpha = 0.55 + Math.random() * 0.45;
        }

        // Special warning/danger icons glow brighter
        if ('⚠☢⚡☣✖'.includes(ch)) {
          ctx.fillStyle = '#ff0000';
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 18;
          ctx.globalAlpha = 0.95;
          ctx.font = '16px "JetBrains Mono", monospace';
        }

        ctx.fillText(ch, i * 14, y);
        ctx.shadowBlur = 0;
        ctx.font = '13px "JetBrains Mono", monospace';

        if (y > height && Math.random() > 0.972) {
          drops[i] = 0;
        }
        drops[i] += 0.6 + Math.random() * 0.8 + (i % 3) * 0.15;
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, isInView]);

  // 3. RED LIGHTNING & SKY STORM FLASH ENGINE (From cyber-rain-red.html)
  useEffect(() => {
    if (!isInView || mode === 'phoenix') return;

    const canvas = lightningCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
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
      thickness: number;
    }

    let bolts: Bolt[] = [];
    let flash = 0;
    let screenShake = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      width = canvas.width = Math.round(rect.width || window.innerWidth);
      height = canvas.height = Math.round(rect.height || 1200);
    };

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
      let cx = Math.random() * width;
      let cy = 0;
      const pts: Point[] = [{ x: cx, y: cy }];

      while (cy < height * 0.9) {
        cy += 8 + Math.random() * 18;
        cx += (Math.random() - 0.5) * 55;
        pts.push({ x: cx, y: cy });
      }

      const branches: Point[][] = [];
      pts.forEach((p, i) => {
        if (i > 2 && Math.random() < 0.18) {
          let bx = p.x;
          let by = p.y;
          const bp: Point[] = [{ x: bx, y: by }];
          const n = 2 + Math.floor(Math.random() * 5);
          for (let k = 0; k < n; k++) {
            bx += (Math.random() - 0.5) * 70;
            by += 6 + Math.random() * 20;
            bp.push({ x: bx, y: by });
          }
          branches.push(bp);
        }
      });

      bolts.push({
        pts,
        branches,
        life: 1,
        thickness: 1.5 + Math.random() * 2,
      });

      flash = 0.4;
      screenShake = 6;

      // Double strike probability
      if (Math.random() < 0.3) {
        setTimeout(() => spawn(), 80 + Math.random() * 120);
      }

      const nextDelay = 800 + Math.random() * 2600;
      spawnTimeoutId = setTimeout(spawn, nextDelay);
    }

    spawnTimeoutId = setTimeout(spawn, 900);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (screenShake > 0) {
        const sx = (Math.random() - 0.5) * screenShake;
        const sy = (Math.random() - 0.5) * screenShake;
        ctx.save();
        ctx.translate(sx, sy);
        screenShake *= 0.85;
        if (screenShake < 0.3) screenShake = 0;
      }

      if (flash > 0) {
        ctx.fillStyle = `rgba(255, 20, 20, ${flash * 0.08})`;
        ctx.fillRect(-20, -20, width + 40, height + 40);
        flash -= 0.025;
      }

      bolts = bolts.filter((b) => b.life > 0);

      bolts.forEach((b) => {
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 25;

        // Core white bolt
        ctx.lineWidth = b.thickness;
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.life * 0.9})`;
        path(b.pts);

        // Scarlet outer corona
        ctx.lineWidth = b.thickness * 2.5;
        ctx.strokeStyle = `rgba(255, 30, 30, ${b.life * 0.6})`;
        path(b.pts);

        // Branching forks
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255, 60, 60, ${b.life * 0.7})`;
        b.branches.forEach(path);

        b.life -= 0.06;
      });

      ctx.shadowBlur = 0;
      if (screenShake > 0) ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(spawnTimeoutId as number);
    };
  }, [mode, isInView]);

  // 4. RISING EMBERS & FIERY SPARK PARTICLES (From cyber-rain-red.html)
  useEffect(() => {
    if (!isInView || mode === 'phoenix') return;

    const canvas = embersCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      decay: number;
      color: string;
      glow: boolean;
    }

    let particles: Particle[] = [];

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      width = canvas.width = Math.round(rect.width || window.innerWidth);
      height = canvas.height = Math.round(rect.height || 1200);
    };

    resize();
    window.addEventListener('resize', resize);

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: height + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(1 + Math.random() * 3),
        size: 1 + Math.random() * 3,
        life: 1,
        decay: 0.003 + Math.random() * 0.008,
        color: Math.random() < 0.7 ? '#ff4400' : '#ffaa00',
        glow: Math.random() < 0.35,
      };
    }

    const intervalId = setInterval(() => {
      if (particles.length < 110) {
        particles.push(createParticle());
      }
    }, 35);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.life -= p.decay;
        p.x += Math.sin(p.y * 0.02) * 0.35;

        if (p.glow) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, p.size * p.life), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, [mode, isInView]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
      id="team-cyber-rain-container"
    >
      {/* Layer 1: Phoenix A Golden Matrix Rain */}
      {(mode === 'hybrid' || mode === 'phoenix') && (
        <canvas
          ref={phoenixCanvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
          style={{ 
            opacity: mode === 'hybrid' ? 0.7 : 0.88, 
            mixBlendMode: 'screen',
            zIndex: 1 
          }}
          id="team-phoenix-rain-canvas"
        />
      )}

      {/* Layer 2: Apocalyptic Red Cyber Rain (from cyber-rain-red.html) */}
      {(mode === 'hybrid' || mode === 'redhat') && (
        <canvas
          ref={redRainCanvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
          style={{
            opacity: mode === 'hybrid' ? 0.75 : 0.9,
            mixBlendMode: 'screen',
            zIndex: 2,
          }}
          id="team-red-rain-canvas"
        />
      )}

      {/* Layer 3: Rising Embers Particles (from cyber-rain-red.html) */}
      {(mode === 'hybrid' || mode === 'redhat') && (
        <canvas
          ref={embersCanvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
          style={{
            opacity: 0.8,
            mixBlendMode: 'screen',
            zIndex: 3,
          }}
          id="team-embers-canvas"
        />
      )}

      {/* Layer 4: Red Lightning Bolts & Screen Flashes (from cyber-rain-red.html) */}
      {(mode === 'hybrid' || mode === 'redhat') && (
        <canvas
          ref={lightningCanvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
          style={{
            opacity: 0.95,
            mixBlendMode: 'screen',
            zIndex: 4,
          }}
          id="team-lightning-canvas"
        />
      )}

      {/* Atmospheric Red Pulse & Blood Moon Aura (Seamless diffuse light) */}
      {(mode === 'hybrid' || mode === 'redhat') && (
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-[#ff0022]/6 rounded-full blur-[180px] pointer-events-none"
          style={{ zIndex: 0 }}
        />
      )}
    </div>
  );
};

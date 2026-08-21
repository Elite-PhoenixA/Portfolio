import React, { useEffect, useRef } from 'react';
import { ThemeMood } from '../types';

interface CyberRainProps {
  theme?: ThemeMood;
  opacity?: number;
  interactive?: boolean;
  waterLevelRatio?: number; // default 0.80 (80% of height)
  className?: string;
  onSplash?: (x: number, y: number) => void;
}

interface CharState {
  char: string;
  cycleTimer: number;
  cycleRate: number;
}

interface Column {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: CharState[];
  active: boolean;
  restartDelay: number;
  opacity: number;
  hitWater: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  life: number;
  decay: number;
}

interface WavePoint {
  y: number;
  vy: number;
}

export const CyberRain: React.FC<CyberRainProps> = ({
  theme = 'cyber',
  opacity = 0.85,
  interactive = true,
  waterLevelRatio = 0.82,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<ThemeMood>(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const FALL_SPEED = 1.05;
    const COLUMN_DENSITY = 0.72;
    const FONT_SIZE = Math.max(13, Math.min(16, Math.round(window.innerWidth / 90)));
    const WAVE_RESOLUTION = 4;
    const MAX_RIPPLES = 45;

    // Phoenix A Traditional Chinese, Latin/Greek & Code symbols (from phoenixa.html)
    const traditionalChinese = '道德經天地人神鬼陰陽五行八卦易書禮樂春秋論語孟子仁義禮智信無極太極玄妙空虛靜觀照覺悟空靈真善美鳳凰太陽光明永生蓮花聖蛇權杖';
    const latinGreek = 'ABCDEFGHIJKLMNOPQRSTUVWXYZΩΣΔΦΨαβγδεζηθικλμνξπρστυφχψω';
    const mathCode = '{}[]<>()=>+*/&|;:0123456789#@!?%$^~∞∑∫√≠≈∂∆⌬';
    const allChars = traditionalChinese + latinGreek + mathCode;
    const randomChar = () => allChars[Math.floor(Math.random() * allChars.length)];

    let columns: Column[] = [];
    let waterSurface = 0;
    let ripples: Ripple[] = [];
    let wavePoints: WavePoint[] = [];

    function createColumn(index: number, scatter: boolean): Column {
      const length = 10 + Math.floor(Math.random() * 22);
      const chars: CharState[] = Array.from({ length: length + 6 }, () => ({
        char: randomChar(),
        cycleTimer: Math.random() * 2.5,
        cycleRate: 0.3 + Math.random() * 1.8,
      }));

      let y: number;
      if (scatter) {
        if (Math.random() < COLUMN_DENSITY) {
          y = Math.random() * (waterSurface + length * FONT_SIZE) - length * FONT_SIZE * 0.3;
        } else {
          y = -length * FONT_SIZE - Math.random() * height * 0.5;
        }
      } else {
        y = -length * FONT_SIZE * (0.2 + Math.random() * 0.5);
      }

      return {
        x: index * FONT_SIZE,
        y,
        speed: 1.1 + Math.random() * 2.4,
        length,
        chars,
        active: scatter ? Math.random() < (COLUMN_DENSITY + 0.2) : Math.random() < COLUMN_DENSITY,
        restartDelay: 0,
        opacity: 0.6 + Math.random() * 0.4,
        hitWater: false,
      };
    }

    function initSystems() {
      waterSurface = height * waterLevelRatio;
      const colCount = Math.floor(width / FONT_SIZE) + 1;
      columns = Array.from({ length: colCount }, (_, i) => createColumn(i, true));
      const waveCount = Math.ceil(width / WAVE_RESOLUTION) + 2;
      wavePoints = Array.from({ length: waveCount }, () => ({ y: 0, vy: 0 }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSystems();
    }

    function spawnRipple(x: number, y: number) {
      if (ripples.length >= MAX_RIPPLES) ripples.shift();
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 28 + Math.random() * 45,
        speed: 18 + Math.random() * 28,
        life: 1.0,
        decay: 0.28 + Math.random() * 0.22,
      });
    }

    function disturbWave(x: number, force: number) {
      const idx = Math.floor(x / WAVE_RESOLUTION);
      const spread = 4;
      for (let i = -spread; i <= spread; i++) {
        const wi = idx + i;
        if (wi >= 0 && wi < wavePoints.length) {
          wavePoints[wi].vy += force * (1 - Math.abs(i) / (spread + 1));
        }
      }
    }

    // Dynamic color configurations by theme mood
    function getThemePalette(currentTheme: ThemeMood) {
      switch (currentTheme) {
        case 'amber':
          return {
            head: { r: 248, g: 236, b: 192, glow: 'rgba(240, 217, 140, 0.95)' },
            mid: { r: 212, g: 184, b: 112 },
            tail: { r: 168, g: 152, b: 96 },
            deep: { r: 106, g: 106, b: 88 },
            waterLine: 'rgba(212, 184, 112, 0.4)',
            ripple: 'rgba(212, 184, 112,',
            waterGradTop: 'rgba(15, 12, 8, 0.65)',
            waterGradBottom: 'rgba(5, 5, 5, 0.95)',
          };
        case 'aurora':
          return {
            head: { r: 240, g: 255, b: 248, glow: 'rgba(53, 255, 156, 0.9)' },
            mid: { r: 53, g: 255, b: 156 },
            tail: { r: 16, g: 185, b: 129 },
            deep: { r: 6, g: 95, b: 70 },
            waterLine: 'rgba(53, 255, 156, 0.35)',
            ripple: 'rgba(53, 255, 156,',
            waterGradTop: 'rgba(3, 28, 20, 0.6)',
            waterGradBottom: 'rgba(2, 18, 14, 0.95)',
          };
        case 'obsidian':
          return {
            head: { r: 250, g: 245, b: 255, glow: 'rgba(192, 132, 252, 0.9)' },
            mid: { r: 192, g: 132, b: 252 },
            tail: { r: 138, g: 92, b: 252 },
            deep: { r: 88, g: 28, b: 135 },
            waterLine: 'rgba(192, 132, 252, 0.35)',
            ripple: 'rgba(192, 132, 252,',
            waterGradTop: 'rgba(20, 12, 35, 0.6)',
            waterGradBottom: 'rgba(5, 3, 10, 0.95)',
          };
        case 'emerald':
          return {
            head: { r: 236, g: 253, b: 245, glow: 'rgba(52, 211, 153, 0.9)' },
            mid: { r: 52, g: 211, b: 153 },
            tail: { r: 16, g: 185, b: 129 },
            deep: { r: 4, g: 120, b: 87 },
            waterLine: 'rgba(52, 211, 153, 0.35)',
            ripple: 'rgba(52, 211, 153,',
            waterGradTop: 'rgba(2, 30, 20, 0.6)',
            waterGradBottom: 'rgba(1, 15, 10, 0.95)',
          };
        case 'cyber':
        default:
          return {
            head: { r: 235, g: 254, b: 255, glow: 'rgba(126, 249, 255, 0.95)' },
            mid: { r: 126, g: 249, b: 255 },
            tail: { r: 56, g: 189, b: 248 },
            deep: { r: 14, g: 116, b: 144 },
            waterLine: 'rgba(126, 249, 255, 0.35)',
            ripple: 'rgba(126, 249, 255,',
            waterGradTop: 'rgba(5, 24, 38, 0.6)',
            waterGradBottom: 'rgba(5, 11, 24, 0.95)',
          };
      }
    }

    let lastTime = 0;

    function render(timestamp: number) {
      const dt = Math.min((timestamp - (lastTime || timestamp)) / 1000, 0.05);
      lastTime = timestamp;
      const time = timestamp / 1000;

      ctx!.clearRect(0, 0, width, height);

      const palette = getThemePalette(themeRef.current);

      if (!prefersReduced) {
        // Update columns
        for (const col of columns) {
          if (!col.active) {
            col.restartDelay -= dt;
            if (col.restartDelay <= 0) {
              if (Math.random() < COLUMN_DENSITY) {
                Object.assign(col, createColumn(Math.floor(col.x / FONT_SIZE), false), { active: true });
              } else {
                col.restartDelay = 0.3 + Math.random() * 1.5;
              }
            }
            continue;
          }

          const prevY = col.y;
          col.y += col.speed * FALL_SPEED * dt * 60;

          for (const c of col.chars) {
            c.cycleTimer -= dt;
            if (c.cycleTimer <= 0) {
              c.char = randomChar();
              c.cycleTimer = c.cycleRate;
            }
          }

          // Raindrop touches the water surface
          if (!col.hitWater && col.y >= waterSurface && prevY < waterSurface) {
            col.hitWater = true;
            spawnRipple(col.x + FONT_SIZE * 0.5, waterSurface);
            disturbWave(col.x + FONT_SIZE * 0.5, -2.2 - Math.random() * 2.8);
          }

          if (col.y - col.length * FONT_SIZE > waterSurface + 35) {
            col.active = false;
            col.restartDelay = 0.2 + Math.random() * 2.0;
          }
        }

        // Update ripple physics
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += r.speed * dt;
          r.life -= r.decay * dt;
          if (r.life <= 0 || r.radius > r.maxRadius) {
            ripples.splice(i, 1);
          }
        }

        // Update spring wave physics
        for (const p of wavePoints) {
          p.vy += -0.03 * p.y;
          p.vy *= 0.97;
          p.y += p.vy;
        }

        // Wave propagation (neighbor spring coupling) - 3 passes
        for (let pass = 0; pass < 3; pass++) {
          for (let i = 0; i < wavePoints.length; i++) {
            if (i > 0) {
              wavePoints[i].vy += 0.24 * (wavePoints[i - 1].y - wavePoints[i].y);
            }
            if (i < wavePoints.length - 1) {
              wavePoints[i].vy += 0.24 * (wavePoints[i + 1].y - wavePoints[i].y);
            }
          }
        }
      }

      // Draw digital rain character streams (Phoenix A Matrix font)
      ctx!.font = `${FONT_SIZE}px "JetBrains Mono", "Noto Sans CJK TC", monospace`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'top';

      for (const col of columns) {
        if (!col.active) continue;

        for (let j = 0; j < col.length; j++) {
          const charY = col.y - j * FONT_SIZE;
          if (charY > waterSurface || charY < -FONT_SIZE) continue;

          let brightness: number;
          if (j === 0) brightness = 1.0;
          else if (j === 1) brightness = 0.9;
          else if (j < 4) brightness = 0.78 - (j - 2) * 0.08;
          else brightness = Math.max(0, 0.62 * (1 - j / col.length));

          const distToWater = waterSurface - charY;
          if (distToWater < FONT_SIZE * 3.5) {
            brightness *= Math.max(0, distToWater / (FONT_SIZE * 3.5));
          }
          brightness *= col.opacity;
          if (brightness < 0.02) continue;

          let r: number, g: number, b: number;
          if (j === 0) {
            r = palette.head.r;
            g = palette.head.g;
            b = palette.head.b;
          } else if (j < 3) {
            r = palette.mid.r;
            g = palette.mid.g;
            b = palette.mid.b;
          } else if (j < 8) {
            r = palette.tail.r;
            g = palette.tail.g;
            b = palette.tail.b;
          } else {
            r = palette.deep.r;
            g = palette.deep.g;
            b = palette.deep.b;
          }

          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`;

          if (j === 0) {
            ctx!.shadowColor = palette.head.glow;
            ctx!.shadowBlur = 10;
          }

          ctx!.fillText(col.chars[j % col.chars.length].char, col.x + FONT_SIZE * 0.5, charY);

          if (j === 0) {
            ctx!.shadowBlur = 0;
          }
        }
      }

      // Draw subtle water surface gradient at lower plane
      const waterGrad = ctx!.createLinearGradient(0, waterSurface, 0, height);
      waterGrad.addColorStop(0, palette.waterGradTop);
      waterGrad.addColorStop(1, palette.waterGradBottom);
      ctx!.fillStyle = waterGrad;
      ctx!.fillRect(0, waterSurface - 2, width, height - waterSurface + 2);

      // Draw fluid waterline path
      ctx!.beginPath();
      for (let x = 0; x <= width; x += WAVE_RESOLUTION) {
        const idx = Math.floor(x / WAVE_RESOLUTION);
        const waveY = idx < wavePoints.length ? wavePoints[idx].y : 0;
        const ambient = Math.sin(x * 0.01 + time * 0.8) * 1.5 + Math.sin(x * 0.023 + time * 0.5);
        const py = waterSurface + waveY + ambient;
        if (x === 0) ctx!.moveTo(x, py);
        else ctx!.lineTo(x, py);
      }
      ctx!.strokeStyle = palette.waterLine;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Draw expanding concentric ripple rings
      for (const r of ripples) {
        const alpha = r.life * 0.35;
        for (let ring = 0; ring < 3; ring++) {
          const ringRadius = r.radius - ring * 7;
          if (ringRadius <= 0) continue;
          ctx!.beginPath();
          ctx!.ellipse(r.x, r.y + ring * 2, ringRadius, ringRadius * 0.32, 0, 0, Math.PI * 2);
          ctx!.strokeStyle = `${palette.ripple} ${alpha * (1 - ring * 0.3)})`;
          ctx!.lineWidth = Math.max(0.6, 1.2 - ring * 0.25);
          ctx!.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    function handleInteract(e: MouseEvent | TouchEvent) {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const touch = 'touches' in e ? e.touches[0] : null;
      const clientX = touch ? touch.clientX : (e as MouseEvent).clientX;
      const clientY = touch ? touch.clientY : (e as MouseEvent).clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      disturbWave(x, -5 - Math.random() * 4);
      spawnRipple(x, waterSurface);

      const colIdx = Math.floor(x / FONT_SIZE);
      for (let di = -2; di <= 2; di++) {
        if (columns[colIdx + di]) {
          Object.assign(columns[colIdx + di], {
            active: true,
            y: Math.min(y, waterSurface - 50),
            speed: 2.8 + Math.random() * 2.2,
            hitWater: false,
          });
        }
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (!interactive) return;
      // Gentle wake when hovering near the water line
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (Math.abs(y - waterSurface) < 90) {
        disturbWave(x, -1.2);
        if (Math.random() < 0.15) {
          spawnRipple(x, waterSurface);
        }
      }
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('click', handleInteract);
    canvas.addEventListener('touchstart', handleInteract as EventListener, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleInteract);
      canvas.removeEventListener('touchstart', handleInteract as EventListener);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive, waterLevelRatio]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto transition-opacity duration-700 ${className}`}
      style={{
        opacity,
        zIndex: 2,
      }}
      id="cyber-rain-canvas"
    />
  );
};

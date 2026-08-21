import React, { useRef, useEffect, useState } from 'react';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  id
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [filterId] = useState(() => `lgb-${Math.random().toString(36).slice(2, 8)}`);
  const [mapUrl, setMapUrl] = useState('');
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const generate = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;
      setDims({ w, h });

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      const heightFn = (t: number) => Math.pow(1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 4), 0.25);
      const slopeFn = (t: number) => (heightFn(t + 0.001) - heightFn(t - 0.001)) / 0.002;

      const N = 128;
      const n1 = 1.0, n2 = 1.5;
      const rawDisp: number[] = [];
      let maxD = 0;
      for (let i = 0; i < N; i++) {
        const t = i / (N - 1);
        const slope = slopeFn(t);
        const theta1 = Math.atan(Math.abs(slope));
        const sinT2 = (n1 / n2) * Math.sin(theta1);
        if (Math.abs(sinT2) >= 1) { rawDisp.push(0); continue; }
        const mag = Math.tan(theta1 - Math.asin(sinT2)) * heightFn(t);
        rawDisp.push(slope >= 0 ? mag : -mag);
        maxD = Math.max(maxD, Math.abs(mag));
      }
      if (maxD > 0) for (let i = 0; i < N; i++) rawDisp[i] /= maxD;

      const bezel = h / 2;

      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const dL = px, dR = w - 1 - px, dT = py, dB = h - 1 - py;
          const dH = Math.min(dL, dR);
          const dV = Math.min(dT, dB);

          let dx = 0, dy = 0;

          if (dH < bezel) {
            const si = Math.min(N - 1, Math.round((dH / bezel) * (N - 1)));
            dx = rawDisp[si] * (dL < dR ? 1 : -1);
          }
          if (dV < bezel) {
            const si = Math.min(N - 1, Math.round((dV / bezel) * (N - 1)));
            dy = rawDisp[si] * (dT < dB ? 1 : -1);
          }

          const idx = (py * w + px) * 4;
          data[idx] = Math.max(0, Math.min(255, Math.round(128 + dx * 127)));
          data[idx + 1] = Math.max(0, Math.min(255, Math.round(128 + dy * 127)));
          data[idx + 2] = 128;
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setMapUrl(canvas.toDataURL('image/png'));
    };

    const raf = requestAnimationFrame(generate);
    const ro = new ResizeObserver(generate);
    ro.observe(el);
    return () => { 
      cancelAnimationFrame(raf); 
      ro.disconnect(); 
    };
  }, []);

  return (
    <>
      {mapUrl && (
        <svg width="0" height="0" className="absolute pointer-events-none" colorInterpolationFilters="sRGB">
          <defs>
            <filter id={filterId} x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse">
              <feImage href={mapUrl} x="0" y="0" width={dims.w} height={dims.h} result="dispMap" />
              <feDisplacementMap in="SourceGraphic" in2="dispMap" scale="40" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}
      <button
        ref={btnRef}
        onClick={onClick}
        id={id}
        className={`relative inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 bg-white/[0.04] text-white font-medium text-sm tracking-wide cursor-pointer overflow-hidden transition-all duration-300 hover:border-white/40 hover:-translate-y-0.5 shadow-lg backdrop-blur-md ${className}`}
        style={{
          backdropFilter: mapUrl ? `url(#${filterId})` : 'blur(12px)',
          WebkitBackdropFilter: mapUrl ? `url(#${filterId})` : 'blur(12px)',
        }}
      >
        {/* Specular glass highlight */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)',
          }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    </>
  );
};
export default LiquidGlassButton;

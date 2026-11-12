import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  CheckCircle, 
  Sparkles, 
  Flame,
  CornerDownLeft
} from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import { getLocalized, UI_TRANSLATIONS } from '../utils/i18n';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Welcome to Khuong Duy dev terminal v2.4.0 [Phoenix A Edition]',
    'Type "help" or click a command below to inspect system identity.',
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalOutput]);

  const handleCommand = (cmd: string) => {
    soundEffects.playClick();
    const cleanCmd = cmd.trim().toLowerCase();
    const newLogs = [...terminalOutput, `$ ${cmd}`];

    switch (cleanCmd) {
      case 'help':
        newLogs.push('Available commands: [whoami] [stack] [focus] [uptime] [projects] [contact] [clear]');
        break;
      case 'whoami':
        newLogs.push(`> Nguyễn Khương Duy — Senior Full-Stack & Creative Developer`);
        newLogs.push(`> Alias: Elite · Collective: PHOENIX A (Filius Solis)`);
        newLogs.push(`> Location: Hanoi, Vietnam / Available Worldwide`);
        break;
      case 'stack':
        newLogs.push(`> Core: React 19, TypeScript, Node.js, Next.js, PostgreSQL, Go`);
        newLogs.push(`> Architecture: Microservices, WebSockets, Tailwind, Docker, K8s, GCP`);
        break;
      case 'focus':
        newLogs.push(`> Crafting high-impact UI/UX with 60-120fps animations & sub-20ms latency.`);
        break;
      case 'uptime':
        newLogs.push(`> 5+ Years of production engineering without compromise. 99.98% availability.`);
        break;
      case 'projects':
        newLogs.push(`> 42+ projects shipped. Featured: Lumina Nexus, Aether Studio, Chrono Synth, Void Vault.`);
        break;
      case 'contact':
        newLogs.push(`> Direct: ryusama26@gmail.com · Response SLA: < 24 business hours.`);
        break;
      case 'clear':
        setTerminalOutput(['Terminal cleared. Ready for input.']);
        setTerminalInput('');
        return;
      default:
        newLogs.push(`> Command not recognized: "${cleanCmd}". Type "help" for command list.`);
    }

    setTerminalOutput(newLogs);
    setTerminalInput('');
  };

  const getStatLabel = (stat: typeof PERSONAL_INFO.stats[0]) => {
    if (lang === 'vi') return stat.labelVi;
    if (lang === 'zh') return stat.labelZh;
    if (lang === 'tw') return stat.labelTw;
    return stat.labelEn;
  };

  const getPhilosophyParagraph2 = () => {
    if (lang === 'vi') {
      return 'Tôi đặc biệt chú trọng đến tính nhất quán trong kiến trúc, tính dễ mở rộng của mã nguồn (clean code, clean architecture) và tốc độ tải trang tối ưu. Đối với tôi, một sản phẩm hoàn hảo phải mượt mà từ lõi backend cho đến từng khung hình hiển thị trên mắt người dùng.';
    }
    if (lang === 'zh') {
      return '我专注于系统架构的一致性、代码的可维护性与扩展性（整洁架构），以及毫秒级渲染性能。卓越的软件必须在后端稳定可靠，同时在前端交互中呈现丝滑顺畅的视觉体验。';
    }
    if (lang === 'tw') {
      return '我專注於系統架構的一致性、程式碼的可維護性與擴展性（整潔架構），以及毫秒級渲染效能。卓越的軟體必須在後端穩定可靠，同時在前端互動中呈現絲滑順暢的視覺體驗。';
    }
    return 'I focus relentlessly on architectural cohesion, maintainable codebases, and sub-millisecond render optimizations. Great software must feel effortless under the hood while delighting users across every single interaction frame.';
  };

  const getFocusText = () => {
    if (lang === 'vi') return 'Nghiên cứu kiến trúc AI Agents, WebGL Shaders & hệ thống High-Concurrency';
    if (lang === 'zh') return '探索 AI 智能体工作流、WebGL 着色器以及高并发全栈系统';
    if (lang === 'tw') return '探索 AI 智慧體工作流、WebGL 著色器以及高並發全端系統';
    return 'Exploring Agentic workflows, real-time spatial web, and high-concurrency systems.';
  };

  return (
    <section id="about" className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="text-[11px] font-['JetBrains_Mono'] tracking-[0.28em] text-[#d4b870] uppercase font-semibold mb-2">
          — CHAPTER I —
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-['Cinzel'] font-semibold uppercase tracking-wider text-[#f0d98c] mb-3 border-[#d4b870]/30">
          <Compass className="w-3.5 h-3.5 text-[#d4b870]" />
          <span>{UI_TRANSLATIONS.about.badge[lang] || UI_TRANSLATIONS.about.badge.en}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e8e0c8] font-['Cinzel',serif]">
          {UI_TRANSLATIONS.about.title[lang] || UI_TRANSLATIONS.about.title.en}
        </h2>
        <div className="gold-divider" />
        <p className="mt-1 text-base sm:text-lg text-[#e8e0c8]/75 max-w-2xl font-normal">
          {UI_TRANSLATIONS.about.subtitle[lang] || UI_TRANSLATIONS.about.subtitle.en}
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Personal Narrative & Philosophy (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="phoenix-card rounded-3xl p-6 sm:p-8 border-[#d4b870]/30 bg-[#0e0d0a]/80 backdrop-blur-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#f0d98c] font-['Cinzel',serif] mb-4 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#d4b870]" />
              <span>{UI_TRANSLATIONS.about.journeyTitle[lang] || UI_TRANSLATIONS.about.journeyTitle.en}</span>
            </h3>
            
            <p className="dropcap text-[#e8e0c8]/90 leading-relaxed text-base sm:text-lg mb-4 font-normal">
              {getLocalized(PERSONAL_INFO.detailedBio, lang, PERSONAL_INFO.detailedBio.en)}
            </p>

            <p className="text-[#e8e0c8]/85 leading-relaxed text-base sm:text-lg font-normal">
              {getPhilosophyParagraph2()}
            </p>

            {/* Core Values / Highlights */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#d4b870] mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm text-white/90">
                  <span className="font-semibold text-[#f0d98c]">Clean Architecture:</span>{' '}
                  {lang === 'vi' ? 'Code có cấu trúc, dễ mở rộng và bảo trì' : lang === 'zh' || lang === 'tw' ? '清晰解耦、可高度扩展的代码结构' : 'Scalable, decoupled micro-components'}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#d4b870] mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm text-white/90">
                  <span className="font-semibold text-[#f0d98c]">Performance-First:</span>{' '}
                  {lang === 'vi' ? 'Tối ưu tốc độ tải và 60fps mượt mà' : lang === 'zh' || lang === 'tw' ? '亚50毫秒响应与60fps极致流畅' : 'Sub-50ms API and 60fps fluid UI'}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#d4b870] mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm text-white/90">
                  <span className="font-semibold text-[#f0d98c]">Design Fidelity:</span>{' '}
                  {lang === 'vi' ? 'Chính xác từng pixel theo thiết kế UI/UX' : lang === 'zh' || lang === 'tw' ? '精准还原UI/UX视觉排版细节' : 'Pixel-perfect typography & spacing'}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#d4b870] mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm text-white/90">
                  <span className="font-semibold text-[#f0d98c]">Product Mindset:</span>{' '}
                  {lang === 'vi' ? 'Tập trung vào giá trị thực tế cho người dùng' : lang === 'zh' || lang === 'tw' ? '注重产品商业价值与用户真实体验' : 'Obsessed with real user outcomes'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#d4b870]/60 transition-all border-[#d4b870]/30 bg-[#0e0d0a]/70"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#f0d98c] font-['Space_Grotesk']">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] sm:text-xs text-[#FAF5EE]/70 font-medium">
                  {getStatLabel(stat)}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Interactive Developer Terminal (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel-elevated rounded-3xl overflow-hidden shadow-2xl border border-[#d4b870]/30 bg-[#0a0806]/95">
            {/* Terminal Top Bar */}
            <div className="bg-[#14100C]/95 px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                <span className="text-xs font-mono text-[#d4b870]/70 ml-2">khuongduy@phoenix-a:~</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#f0d98c]">
                <span className="w-2 h-2 rounded-full bg-[#d4b870] animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-5 bg-[#0A0806]/95 font-mono text-xs text-[#FAF5EE]/90 min-h-[220px] max-h-[300px] overflow-y-auto space-y-1.5 scrollbar-thin">
              {terminalOutput.map((line, index) => (
                <div 
                  key={index}
                  className={`${
                    line.startsWith('$') 
                      ? 'text-[#f0d98c] font-semibold' 
                      : line.startsWith('>') 
                      ? 'text-[#d4b870]' 
                      : 'text-white/70'
                  }`}
                >
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Quick Command Suggestions */}
            <div className="px-4 py-2.5 bg-[#120E0A] border-t border-white/5 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-white/40 uppercase font-semibold mr-1">Quick:</span>
              {['whoami', 'stack', 'focus', 'uptime', 'projects', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-[#d4b870]/20 text-[11px] font-mono text-[#f0d98c] border border-[#d4b870]/30 hover:border-[#d4b870] transition-all cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Input Prompt */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (terminalInput) handleCommand(terminalInput);
              }}
              className="p-3 bg-[#14100C] border-t border-white/10 flex items-center gap-2"
            >
              <span className="text-[#d4b870] font-mono font-bold">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command and press Enter..."
                className="w-full bg-transparent text-base sm:text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:text-[#f0d98c]"
                id="terminal-user-input"
              />
              <button 
                type="submit" 
                className="p-1.5 rounded text-[#d4b870]/70 hover:text-[#f0d98c] cursor-pointer"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Current Working Status Box */}
          <div className="glass-panel rounded-2xl p-4 flex items-center gap-3.5 border-[#d4b870]/30 bg-[#0e0d0a]/70">
            <div className="w-10 h-10 rounded-xl bg-[#d4b870]/15 flex items-center justify-center border border-[#d4b870]/30 shrink-0">
              <Flame className="w-5 h-5 text-[#d4b870]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white/90">
                {UI_TRANSLATIONS.about.currentFocus[lang] || UI_TRANSLATIONS.about.currentFocus.en}
              </div>
              <div className="text-xs text-[#FAF5EE]/70 mt-0.5">
                {getFocusText()}
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};


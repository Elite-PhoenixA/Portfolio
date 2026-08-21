import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  MessageSquareHeart,
} from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundEffects } from '../utils/audio';
import { UI_TRANSLATIONS } from '../utils/i18n';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'fullstack',
    budget: '$5,000 - $15,000',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hanoi Time Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundEffects.playChime();
    }, 1200);
  };

  const projectTypes: { id: 'fullstack' | 'ai' | 'consulting'; key: keyof typeof UI_TRANSLATIONS.contact.topics }[] = [
    { id: 'fullstack', key: 'fullstack' },
    { id: 'ai', key: 'ai' },
    { id: 'consulting', key: 'consulting' },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="text-[11px] font-['JetBrains_Mono'] tracking-[0.28em] text-[#d4b870] uppercase font-semibold mb-2">
          — CHAPTER VI —
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-['Cinzel'] font-semibold uppercase tracking-wider text-[#f0d98c] mb-3 border-[#d4b870]/30">
          <MessageSquareHeart className="w-3.5 h-3.5 text-[#d4b870]" />
          <span>{UI_TRANSLATIONS.contact.badge[lang] || UI_TRANSLATIONS.contact.badge.en}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e8e0c8] font-['Cinzel',serif]">
          {UI_TRANSLATIONS.contact.title[lang] || UI_TRANSLATIONS.contact.title.en}
        </h2>
        <div className="gold-divider" />
        <p className="mt-1 text-base sm:text-lg text-[#e8e0c8]/75 max-w-2xl font-normal">
          {UI_TRANSLATIONS.contact.subtitle[lang] || UI_TRANSLATIONS.contact.subtitle.en}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Direct Contact Details & Hanoi Time (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Direct Email Card */}
          <div className="phoenix-card rounded-3xl p-6 sm:p-7 border-[#d4b870]/25 bg-[#0e0d0a]/80 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4b870]/15 flex items-center justify-center border border-[#d4b870]/30 text-[#f0d98c]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/50">
                  {UI_TRANSLATIONS.contact.directEmail[lang] || UI_TRANSLATIONS.contact.directEmail.en}
                </div>
                <div className="text-base sm:text-lg font-bold text-[#f0d98c] font-['Cinzel',serif]">
                  {PERSONAL_INFO.email}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full py-2.5 px-4 rounded-xl glass-pill hover:bg-white/10 hover:border-[#d4b870]/60 text-xs font-['Cinzel'] uppercase tracking-wider font-semibold text-white/90 flex items-center justify-center gap-2 transition-all cursor-pointer border-[#d4b870]/30"
              id="copy-email-button"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#f0d98c]" />
                  <span className="text-[#f0d98c]">{UI_TRANSLATIONS.contact.copied[lang] || UI_TRANSLATIONS.contact.copied.en}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#d4b870]" />
                  <span>{UI_TRANSLATIONS.contact.copyEmail[lang] || UI_TRANSLATIONS.contact.copyEmail.en}</span>
                </>
              )}
            </button>
          </div>

          {/* Time & Availability Live Status */}
          <div className="phoenix-card rounded-3xl p-6 space-y-4 border-[#d4b870]/25 bg-[#0e0d0a]/80 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Clock className="w-4 h-4 text-[#d4b870]" />
                <span>{UI_TRANSLATIONS.contact.hanoiTime[lang] || UI_TRANSLATIONS.contact.hanoiTime.en}</span>
              </div>
              <div className="text-sm font-mono font-bold text-[#f0d98c] bg-white/5 px-2.5 py-1 rounded-lg border border-[#d4b870]/30">
                {currentTime || '10:00:00'}
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <MapPin className="w-4 h-4 text-[#f0d98c]" />
                <span>{UI_TRANSLATIONS.contact.location[lang] || UI_TRANSLATIONS.contact.location.en}</span>
              </div>
              <span className="text-xs font-medium text-white/90 font-mono">
                {PERSONAL_INFO.location}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <ShieldCheck className="w-4 h-4 text-[#d4b870]" />
                <span>{UI_TRANSLATIONS.contact.availability[lang] || UI_TRANSLATIONS.contact.availability.en}</span>
              </div>
              <span className="text-xs font-semibold text-[#f0d98c] bg-[#d4b870]/15 px-2.5 py-0.5 rounded-full border border-[#d4b870]/30 font-mono">
                {UI_TRANSLATIONS.contact.openToWork[lang] || UI_TRANSLATIONS.contact.openToWork.en}
              </span>
            </div>
          </div>

          {/* Quick Chat Channels */}
          <div className="phoenix-card rounded-3xl p-6 border-[#d4b870]/25 bg-[#0e0d0a]/80 backdrop-blur-xl">
            <div className="text-xs font-semibold text-[#d4b870]/80 uppercase tracking-wider mb-3">
              {UI_TRANSLATIONS.contact.altChannels[lang] || UI_TRANSLATIONS.contact.altChannels.en}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4b870]/60 text-xs font-medium text-white/90 hover:text-[#f0d98c] transition-all flex items-center justify-between"
              >
                <span>LinkedIn</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </a>
              <a
                href={PERSONAL_INFO.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4b870]/60 text-xs font-medium text-white/90 hover:text-[#f0d98c] transition-all flex items-center justify-between"
              >
                <span>X (Twitter)</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Project Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="phoenix-card rounded-3xl p-6 sm:p-8 border-[#d4b870]/25 bg-[#0e0d0a]/80 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#d4b870]/15 border border-[#d4b870] flex items-center justify-center text-[#f0d98c] shadow-lg">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-['Cinzel',serif]">
                    {UI_TRANSLATIONS.contact.successTitle[lang] || UI_TRANSLATIONS.contact.successTitle.en}
                  </h3>
                  <p className="text-base text-[#e8e0c8]/80 max-w-md font-normal">
                    {UI_TRANSLATIONS.contact.successDesc[lang] || UI_TRANSLATIONS.contact.successDesc.en}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'fullstack',
                        budget: '$5,000 - $15,000',
                        message: '',
                      });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-full text-xs font-['Cinzel'] uppercase tracking-wider font-semibold glass-pill hover:bg-white/15 text-white transition-all cursor-pointer border-[#d4b870]/30 hover:text-[#f0d98c]"
                  >
                    {UI_TRANSLATIONS.contact.sendAnother[lang] || UI_TRANSLATIONS.contact.sendAnother.en}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-['Cinzel',serif]">
                      {UI_TRANSLATIONS.contact.sendMessage[lang] || UI_TRANSLATIONS.contact.sendMessage.en}
                    </h3>
                    <span className="text-xs text-[#f0d98c] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4b870] animate-ping" />
                      <span>{UI_TRANSLATIONS.contact.responseSLA[lang] || UI_TRANSLATIONS.contact.responseSLA.en}</span>
                    </span>
                  </div>

                  {/* Project Type Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      {UI_TRANSLATIONS.contact.topic[lang] || UI_TRANSLATIONS.contact.topic.en}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {projectTypes.map((type) => {
                        const label = UI_TRANSLATIONS.contact.topics[type.key][lang] || UI_TRANSLATIONS.contact.topics[type.key].en;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, projectType: type.id })}
                            className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                              formData.projectType === type.id
                                ? 'bg-[#d4b870]/20 border-[#d4b870] text-[#f0d98c] font-semibold shadow-md'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        {UI_TRANSLATIONS.contact.nameLabel[lang] || UI_TRANSLATIONS.contact.nameLabel.en}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={UI_TRANSLATIONS.contact.namePlaceholder[lang] || UI_TRANSLATIONS.contact.namePlaceholder.en}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#d4b870] focus:bg-white/10 transition-all"
                        id="contact-form-name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                        {UI_TRANSLATIONS.contact.emailLabel[lang] || UI_TRANSLATIONS.contact.emailLabel.en}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#d4b870] focus:bg-white/10 transition-all"
                        id="contact-form-email"
                      />
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                      {UI_TRANSLATIONS.contact.messageLabel[lang] || UI_TRANSLATIONS.contact.messageLabel.en}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={UI_TRANSLATIONS.contact.messagePlaceholder[lang] || UI_TRANSLATIONS.contact.messagePlaceholder.en}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#d4b870] focus:bg-white/10 transition-all resize-none"
                      id="contact-form-message"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-[#080706] bg-gradient-to-r from-[#f0d98c] via-[#d4b870] to-[#bfa054] hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl glow-theme cursor-pointer disabled:opacity-50"
                    id="contact-form-submit"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-[#080706] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#080706]" />
                        <span>{UI_TRANSLATIONS.contact.submitButton[lang] || UI_TRANSLATIONS.contact.submitButton.en}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

    </section>
  );
};

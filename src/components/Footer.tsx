import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { Mail, Copy, Check, FileDown, Github, Linkedin, Code, ArrowUp, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#22d3ee', '#10b981', '#38bdf8'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setMsgSent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setMsgSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 border-t border-white/[0.08] bg-[#09090B]">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Left info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Build Something High-Performance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Looking for a Backend or SDE Intern?
            </h2>

            <p className="text-zinc-400 text-base max-w-lg leading-relaxed">
              I am actively seeking SDE / Backend developer opportunities to architect scalable APIs, robust smart contracts, and AI-driven platforms. Let's connect.
            </p>

            {/* Direct Email Copy Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-zinc-200 transition-all group shadow-inner"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="text-zinc-300 font-medium">{PERSONAL_INFO.email}</span>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 text-zinc-400 group-hover:text-cyan-300">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </span>
              </button>

              <MagneticButton
                variant="primary"
                href={PERSONAL_INFO.resumePdf}
                download="Pranav_Badagi_Resume.pdf"
                className="gap-2"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </MagneticButton>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-blue-400 border border-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-amber-400 border border-white/10 transition-colors"
              >
                <Code className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>

          {/* Right quick message box */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121215]/80 border border-white/10 backdrop-blur-md shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Dispatch Direct Message</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mb-5">
                Send a quick note directly or reach out via email.
              </p>

              {msgSent ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white font-mono">Transmission Sent!</div>
                  <div className="text-xs text-zinc-400">
                    Thank you! I will review your message and reply promptly.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Recruiters, Tech Leads"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 font-mono transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 font-mono transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discussing an internship opening or project collaboration..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 font-mono transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. Built with React, Tailwind CSS, & Framer Motion.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-zinc-600">Bengaluru, KA</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

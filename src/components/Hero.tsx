import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TextScramble } from './TextScramble';
import { MagneticButton } from './MagneticButton';
import { SpotlightBackground } from './SpotlightBackground';
import { ArrowDown, Github, Linkedin, ShieldCheck, Terminal, Sparkles, Code2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SpotlightBackground className="min-h-screen pt-32 pb-20 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Scrambled Title, Bio, and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.status}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-cyan-400">{PERSONAL_INFO.location}</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">{PERSONAL_INFO.name}</span>
                <span className="text-cyan-400">.</span>
              </h1>
            </motion.div>

            {/* Cryptographic Text Scramble Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-1"
            >
              <div className="text-lg sm:text-xl md:text-2xl font-mono text-zinc-300 font-semibold flex items-center gap-2 flex-wrap">
                <TextScramble
                  text={PERSONAL_INFO.title}
                  className="text-cyan-300 tracking-tight"
                />
              </div>
            </motion.div>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-sans"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 flex-wrap pt-3"
            >
              <MagneticButton
                variant="primary"
                onClick={() => scrollTo('projects')}
                className="gap-2"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={() => scrollTo('contact')}
              >
                <span>Get in Touch</span>
              </MagneticButton>

              <div className="flex items-center gap-2 ml-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 border border-white/10 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Engineering Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-[#121215]/95 border border-white/10 p-5 shadow-2xl backdrop-blur-xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>pranav@kernel:~$</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  zsh
                </span>
              </div>

              {/* Terminal Body */}
              <div className="font-mono text-xs space-y-3 text-zinc-300">
                <div className="text-zinc-500">
                  # Running diagnostic sanity checks...
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Automated Test Coverage
                  </span>
                  <span className="font-bold text-emerald-400">81+ Suites PASS</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    SIH 2026 National Finalist
                  </span>
                  <span className="font-bold text-cyan-400">MARINEX AI</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    University Academic Standing
                  </span>
                  <span className="font-bold text-amber-300">8.8 CGPA (VTU)</span>
                </div>

                <div className="pt-2 text-[11px] text-zinc-400 border-t border-white/5">
                  <p className="text-cyan-400/90">
                    &gt; const engineer = &#123;
                  </p>
                  <p className="pl-4 text-zinc-400">
                    core: ["Java 21", "Spring Boot 3", "Solidity"],
                  </p>
                  <p className="pl-4 text-zinc-400">
                    frontend: ["React 18", "Redux", "Tailwind"],
                  </p>
                  <p className="pl-4 text-zinc-400">
                    focus: "Decentralized Systems & AI Workflows"
                  </p>
                  <p className="text-cyan-400/90">&gt; &#125;;</p>
                </div>
              </div>

              {/* Bottom pulse */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  EVM & Rest APIs Ready
                </span>
                <span>v2.4.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SpotlightBackground>
  );
};

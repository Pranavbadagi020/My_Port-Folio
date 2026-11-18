import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { X, ExternalLink, Github, Check, Copy, Layers, Cpu, Code2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'specs'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.modalDetails.codeSnippet?.code) {
      navigator.clipboard.writeText(project.modalDetails.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          layoutId={`card-container-${project.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#121215] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="relative px-6 py-5 border-b border-white/[0.08] flex items-start justify-between bg-zinc-900/60 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {project.badge || 'Project Specs'}
                </span>
                {project.featuredTag && (
                  <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {project.featuredTag}
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5 font-mono">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-6 pt-3 pb-2 border-b border-white/[0.06] bg-zinc-950/40 text-xs font-mono">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Architecture & Data Flow
            </button>
            {project.modalDetails.codeSnippet && (
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'code'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Implementation Logic
              </button>
            )}
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'specs'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Tech Stack Breakdown
            </button>
          </div>

          {/* Body Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-zinc-300">
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-mono mb-2">
                    System Overview
                  </h4>
                  <p className="leading-relaxed text-zinc-300 bg-zinc-900/40 p-4 rounded-xl border border-white/5">
                    {project.modalDetails.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-mono mb-2">
                    Architectural Strategy
                  </h4>
                  <p className="leading-relaxed text-zinc-300 bg-zinc-900/40 p-4 rounded-xl border border-white/5">
                    {project.modalDetails.architectureOverview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-mono mb-3">
                    Key Architectural Pillars
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.modalDetails.architectureHighlights.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono text-[10px] border border-cyan-500/20">
                          {index + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.metrics && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-mono mb-2">
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {project.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-900/80 p-3 rounded-xl border border-white/5 text-center"
                        >
                          <div className="text-xs text-zinc-500 font-mono">{m.label}</div>
                          <div className="text-base font-bold text-white mt-1 font-mono">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'code' && project.modalDetails.codeSnippet && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 bg-zinc-950 px-4 py-2 rounded-t-xl border border-white/10 border-b-0">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 inline-block animate-pulse" />
                    {project.modalDetails.codeSnippet.filename}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy Snippet</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#0b0c10] border border-white/10 rounded-b-xl p-4 overflow-x-auto text-xs font-mono text-zinc-200 leading-relaxed shadow-inner">
                  <pre className="selection:bg-cyan-500/30 selection:text-white">
                    <code>{project.modalDetails.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.modalDetails.techBreakdown.map((group, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08]"
                    >
                      <h5 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                        {group.category}
                      </h5>
                      <ul className="space-y-2">
                        {group.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-xs text-zinc-300 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-mono mb-2">
                    Full Project Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer with Links */}
          <div className="px-6 py-4 border-t border-white/[0.08] bg-zinc-900/80 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-zinc-500 font-mono">
              Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-zinc-300">ESC</kbd> to close
            </span>
            <div className="flex items-center gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

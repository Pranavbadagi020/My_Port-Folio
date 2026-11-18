import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Search,
  Terminal,
  FolderGit2,
  Cpu,
  GraduationCap,
  Mail,
  FileDown,
  Github,
  Linkedin,
  Code,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Social';
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  hotkey?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpen }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Cmd+K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#22d3ee', '#10b981', '#38bdf8'],
    });
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const scrollTo = (id: string) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Jump to Projects',
      description: 'Explore SIH 2026 MARINEX, CertChain & VoteHub',
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      action: () => scrollTo('projects'),
      hotkey: 'P',
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Jump to Skills',
      description: 'Java 21, Spring Boot, Solidity, React, and systems matrix',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      action: () => scrollTo('skills'),
      hotkey: 'S',
    },
    {
      id: 'nav-milestones',
      category: 'Navigation',
      title: 'Jump to Milestones',
      description: 'Information Science B.E., SIH Hackathon, and academic timeline',
      icon: <GraduationCap className="w-4 h-4 text-cyan-400" />,
      action: () => scrollTo('milestones'),
      hotkey: 'M',
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Jump to Contact',
      description: 'Direct message, email copy, and social links',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => scrollTo('contact'),
      hotkey: 'C',
    },
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: copied ? 'Email Copied!' : 'Copy Email Address',
      description: PERSONAL_INFO.email,
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-cyan-400" />,
      action: copyEmail,
      hotkey: 'E',
    },
    {
      id: 'act-resume',
      category: 'Actions',
      title: 'Download Resume (PDF)',
      description: 'Official software engineering resume',
      icon: <FileDown className="w-4 h-4 text-cyan-400" />,
      action: () => {
        window.open(PERSONAL_INFO.resumePdf, '_blank');
        onClose();
      },
      hotkey: 'R',
    },
    {
      id: 'soc-github',
      category: 'Social',
      title: 'Visit GitHub Profile',
      description: 'Explore open source code repositories (@Pranavbadagi020)',
      icon: <Github className="w-4 h-4 text-zinc-300" />,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
    {
      id: 'soc-linkedin',
      category: 'Social',
      title: 'Visit LinkedIn Profile',
      description: 'Connect professionally with Pranav Badagi',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      },
    },
    {
      id: 'soc-leetcode',
      category: 'Social',
      title: 'Visit LeetCode Profile',
      description: 'View problem-solving track record & algorithmic solutions',
      icon: <Code className="w-4 h-4 text-amber-400" />,
      action: () => {
        window.open(PERSONAL_INFO.leetcode, '_blank');
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Palette Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#121215] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-zinc-900/50">
              <Search className="w-5 h-5 text-zinc-400 mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, project, or jump to section..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
              />
              <button
                onClick={onClose}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-zinc-500">
                  No matching commands found for "{search}"
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono cursor-pointer transition-colors ${
                      selectedIndex === idx
                        ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30'
                        : 'text-zinc-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-zinc-900 border border-white/5">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-white tracking-wide">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-zinc-400 line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.hotkey && (
                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-white/10 font-mono">
                          {item.hotkey}
                        </kbd>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="px-4 py-2.5 border-t border-white/[0.06] bg-zinc-950/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1 rounded bg-zinc-800 text-zinc-400">↑↓</kbd> to navigate
                </span>
                <span>
                  <kbd className="px-1 rounded bg-zinc-800 text-zinc-400">↵</kbd> to select
                </span>
                <span>
                  <kbd className="px-1 rounded bg-zinc-800 text-zinc-400">esc</kbd> to dismiss
                </span>
              </div>
              <span className="text-cyan-400 font-medium">Cmd+K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

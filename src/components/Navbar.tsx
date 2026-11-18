import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, Terminal, Command } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Milestones', href: '#milestones' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090B]/80 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white font-mono font-bold tracking-tight text-base group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <span>
              {PERSONAL_INFO.name}
              <span className="text-cyan-400">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-zinc-900/60 border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1 text-xs font-mono text-zinc-300 hover:text-cyan-300 hover:bg-white/5 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Cmd+K Pill and Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/10 text-xs font-mono transition-all group"
              title="Open Command Palette"
            >
              <Command className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-white/10">
                ⌘K
              </kbd>
            </button>

            <a
              href={PERSONAL_INFO.resumePdf}
              download="Pranav_Badagi_Resume.pdf"
              className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all"
            >
              Resume PDF
            </a>
          </div>

          {/* Mobile Menu & Cmd+K Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-cyan-400 text-xs font-mono"
              aria-label="Open command palette"
            >
              <Command className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-[#121215]/95 backdrop-blur-xl border-b border-white/10 mt-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-2.5 rounded-lg text-sm font-mono text-zinc-300 hover:text-cyan-300 hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10">
            <a
              href={PERSONAL_INFO.resumePdf}
              download="Pranav_Badagi_Resume.pdf"
              className="block text-center px-4 py-2.5 rounded-lg text-sm font-mono font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

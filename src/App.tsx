import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { TechMarquee } from './components/TechMarquee';
import { Timeline } from './components/Timeline';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <ProjectGrid />
        <TechMarquee />
        <Timeline />
      </main>

      {/* Footer & Contact */}
      <Footer />

      {/* Global Cmd+K / Ctrl+K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpen={() => setIsCommandPaletteOpen(true)}
      />
    </div>
  );
}

export default App;

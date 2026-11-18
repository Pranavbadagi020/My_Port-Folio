import React, { useState } from 'react';
import { MARQUEE_TECH_ROW_1, MARQUEE_TECH_ROW_2, SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, CheckCircle2, Filter } from 'lucide-react';

export const TechMarquee: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories =
    selectedCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-zinc-950/40 border-y border-white/[0.04]">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Cpu className="w-4 h-4" />
              <span>Core Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Technical Arsenal & Systems Stack
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md font-mono">
            Dual-lane infinite marquee showcasing core competencies. Hover any badge to pause rotation.
          </p>
        </div>
      </div>

      {/* Dual Row Infinite Marquee */}
      <div className="relative w-full space-y-4 my-8 mask-fade overflow-hidden">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Leftward scrolling */}
        <div className="flex overflow-hidden group select-none">
          <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused] shrink-0">
            {[...MARQUEE_TECH_ROW_1, ...MARQUEE_TECH_ROW_1].map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] text-zinc-200 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-zinc-800 transition-all cursor-default"
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-mono font-medium whitespace-nowrap">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Rightward counter-scrolling */}
        <div className="flex overflow-hidden group select-none">
          <div className="flex gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused] shrink-0">
            {[...MARQUEE_TECH_ROW_2, ...MARQUEE_TECH_ROW_2].map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] text-zinc-200 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-zinc-800 transition-all cursor-default"
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-mono font-medium whitespace-nowrap">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categorized Skills Clean Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-zinc-500 mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                  : 'bg-zinc-900/60 text-zinc-400 border border-white/5 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Matrices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="p-5 rounded-2xl bg-[#121215]/80 border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide mb-4 font-mono pb-2 border-b border-white/[0.06] flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-[10px] text-cyan-400 font-normal">
                    {category.skills.length} tools
                  </span>
                </h3>

                <ul className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between text-xs text-zinc-300 group"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            skill.highlight ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-zinc-600'
                          }`}
                        />
                        <span className="group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Production Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

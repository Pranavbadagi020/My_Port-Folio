import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MILESTONES } from '../data/portfolioData';
import { Calendar, GraduationCap, Award, GitBranch, Sparkles } from 'lucide-react';

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll linked beam animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="milestones" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Milestones Track</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Engineering Trajectory
          </h2>
          <p className="text-zinc-400 text-sm mt-3 font-mono">
            Scroll-linked progress beam tracking hackathons, university coursework, and systems milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-8">
          {/* Base inactive vertical track */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-zinc-800 -translate-x-1/2" />

          {/* Glowing Animated SVG Progress Beam strictly tied to useScroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 sm:left-1/2 top-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] z-10 origin-top"
          />

          {/* Milestones entries */}
          <div className="space-y-12">
            {MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-[#09090B] border-2 border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  {/* Content Card (Left or Right on desktop) */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="p-6 rounded-2xl bg-[#121215]/90 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 group shadow-lg">
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {milestone.year}
                        </span>
                        {milestone.highlight && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {milestone.highlight}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {milestone.title}
                      </h3>

                      <p className="text-xs font-mono text-zinc-400 mt-1">
                        {milestone.institution}
                      </p>

                      <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                        {milestone.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.06]">
                        {milestone.badges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/5"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

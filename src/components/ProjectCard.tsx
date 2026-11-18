import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Github, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springX = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 0.1 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 0.1 });

  // Range of tilt: -7deg to +7deg
  const rotateX = useTransform(springY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    // Set CSS variables for cursor-following border sheen
    cardRef.current.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="relative group h-full cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <motion.div
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          scale: isHovered && !isTouchDevice ? 1.015 : 1,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full flex flex-col justify-between bg-[#121215]/90 backdrop-blur-sm rounded-2xl border border-white/[0.08] p-6 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_10px_35px_-5px_rgba(34,211,238,0.12)] overflow-hidden"
      >
        {/* Dynamic Border Sheen effect tracking cursor */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(34, 211, 238, 0.15), rgba(16, 185, 129, 0.05), transparent 70%)`,
          }}
        />

        {/* Ambient top-right glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

        {/* Top Badges & Meta */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {project.badge || 'Featured'}
              </span>
              {project.featuredTag && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {project.featuredTag}
                </span>
              )}
            </div>

            {/* Quick action links */}
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
          </h3>

          <p className="text-xs font-mono text-cyan-400/80 mt-1">
            {project.subtitle}
          </p>

          <p className="text-zinc-400 text-sm mt-3 line-clamp-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Project Metrics snippet if available */}
        {project.metrics && (
          <div className="relative z-10 grid grid-cols-3 gap-2 my-4 pt-3 border-t border-white/[0.06]">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-left">
                <span className="block text-[10px] text-zinc-500 font-mono uppercase">{m.label}</span>
                <span className="text-xs font-bold text-zinc-200 font-mono">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Tech Stack Tags */}
        <div className="relative z-10 pt-4 border-t border-white/[0.06] mt-2">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/50 text-zinc-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Click to view architecture & code
            </span>
            <span className="text-[11px] text-cyan-400 font-medium">Specs →</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

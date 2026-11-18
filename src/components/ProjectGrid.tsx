import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Sparkles, Terminal } from 'lucide-react';

export const ProjectGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Terminal className="w-4 h-4" />
              <span>Architectural Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering Projects
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md font-mono">
            Interactive 3D bento cards. Hover to inspect perspective sheen; click any card to inspect system architecture, data models & smart contract logic.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="min-h-[380px]">
              <ProjectCard
                project={project}
                onSelect={(proj) => setSelectedProject(proj)}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Project Architecture Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

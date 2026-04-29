"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        className="group relative p-8 bg-white dark:bg-brand-black border border-brand-hairline dark:border-white/10 rounded-lg hover:border-brand-green transition-all duration-500 flex flex-col h-[400px] cursor-pointer"
      >
        {/* Floating Image Preview (Dynamic Aspect Ratio) */}
        {isHovering && project.image && (
          <div 
            className="pointer-events-none absolute z-50 w-48 h-auto overflow-hidden rounded-xl shadow-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5"
            style={{ 
              left: mousePos.x + 20, 
              top: mousePos.y - 20,
              transform: 'translate(0, -100%) rotate(2deg)',
            }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto block"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-green font-bold">
              {project.technologies[0]}
            </span>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full border border-brand-hairline dark:border-white/10 flex items-center justify-center group-hover:bg-brand-green group-hover:border-brand-green transition-all">
                <span className="text-xl group-hover:text-white transition-colors">+</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-3xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
            {project.title}
          </h3>
          
          <p className="text-brand-body-muted dark:text-white/60 mb-8 flex-grow leading-relaxed max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] px-2 py-1 bg-brand-stone dark:bg-white/5 border border-brand-hairline dark:border-white/10 rounded text-brand-muted font-mono">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] px-2 py-1 text-brand-muted font-mono italic">
                +{project.technologies.length - 3} más
              </span>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

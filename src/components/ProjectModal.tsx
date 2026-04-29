"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Evitar scroll en el body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const allImages = [project.image, ...(project.gallery || [])].filter(Boolean) as string[];

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-brand-black rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-brand-hairline dark:border-white/10">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-brand-hairline dark:border-white/10 bg-white dark:bg-brand-black z-10">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-brand-stone dark:hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Info Column */}
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-mono uppercase text-brand-green font-bold mb-2 block">Descripción</span>
                  <p className="text-lg leading-relaxed text-brand-body-muted dark:text-white/80">
                    {project.longDescription || project.description}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-brand-green font-bold mb-4 block">Tecnologías</span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-brand-stone dark:bg-white/5 border border-brand-hairline dark:border-white/10 rounded-full text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-brand-primary text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      GitHub
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-brand-hairline dark:border-white/20 px-6 py-3 rounded-full font-bold hover:bg-brand-stone dark:hover:bg-white/5 transition-colors">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Gallery Column */}
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase text-brand-green font-bold block">Galería (Haz clic para ampliar)</span>
                <div className="grid grid-cols-1 gap-4">
                  {allImages.length > 0 ? (
                    allImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedImage(img)}
                        className="relative aspect-video rounded-xl overflow-hidden border border-brand-hairline dark:border-white/10 bg-brand-stone dark:bg-white/5 cursor-zoom-in group"
                      >
                        <Image 
                          src={img} 
                          alt={`${project.title} - ${idx + 1}`} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-mono bg-black/50 px-3 py-1 rounded-full">Ver completa</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="aspect-video rounded-xl border border-brand-hairline dark:border-white/10 flex items-center justify-center text-brand-muted italic text-sm">
                      Próximamente más capturas...
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/95 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center" onClick={() => setSelectedImage(null)}>
            <img 
              src={selectedImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>
        </div>
      )}
    </>
  );
}

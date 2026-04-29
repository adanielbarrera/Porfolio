"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { sendEmail } from "@/app/actions";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [aboutImageLoaded, setAboutImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [messageState, setMessageState] = useState<{ success?: string, error?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white dark:bg-black">
      <Navbar />

      {/* Experimental Hero Section */}
      <section className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 overflow-hidden">
        {/* Large Background Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
          <h1 className="text-hero opacity-[0.03] dark:opacity-[0.05] leading-none text-center">
            DEVELOPER<br />SYSTEMS
          </h1>
        </div>

        {/* Foreground Title Behind Image */}
        <div className="relative z-10 flex flex-col items-center">
          <h2
            className="text-hero text-brand-green translate-y-12 md:translate-y-20 z-0 transition-transform duration-100 ease-out"
            style={{ transform: `translate(${scrollY * 0.5}px, ${typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 80}px)` }}
          >
            CREATIVE
          </h2>

          {/* Professional Photo Container (Now Transparent) */}
          <div className="relative w-64 h-80 md:w-80 md:h-[450px] z-10 group">
            {/* Soft Glow effect behind the person */}
            <div className="absolute inset-0 bg-brand-green/10 rounded-full blur-3xl group-hover:bg-brand-green/20 transition-colors duration-700 scale-150"></div>

            <div className="relative w-full h-full overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-brand-muted font-mono text-xs uppercase p-12 text-center opacity-20">
                  Cargando...
                </div>
              )}
              <Image
                src="/me.png"
                alt="Daniel Barrera"
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className={`object-contain transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </div>
          </div>

          <h2
            className="text-hero text-brand-primary dark:text-white -translate-y-12 md:-translate-y-20 z-20 transition-transform duration-100 ease-out"
            style={{ transform: `translate(-${scrollY * 0.5}px, -${typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 80}px)` }}
          >
            ENGINEER
          </h2>
        </div>
        {/* Hero Meta Info */}
        <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 flex flex-col md:flex-row justify-between items-end gap-6 z-30">
          <div className="max-w-xs">
            <p className="text-sm font-mono text-brand-green mb-2 uppercase tracking-tighter font-bold">Based in Toluca, Mexico</p>
            <p className="text-xs text-brand-muted leading-relaxed">Especializado en la creación de interfaces de alto rendimiento y sistemas escalables.</p>
          </div>
          <Link
            href="#projects"
            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest"
          >
            Explorar Trabajo
            <div className="w-12 h-12 rounded-full border border-brand-green flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
              ↓
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="w-full py-32 px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-brand-hairline dark:border-white/10 pb-12">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-green mb-4 block font-bold">
              01 — PROYECTOS
            </span>
            <h2 className="text-section-heading">
              Ingeniería de Software Aplicada
            </h2>
          </div>
          <p className="text-brand-muted max-w-sm text-sm leading-relaxed">
            Una selección de desarrollos que priorizan la eficiencia del código y la experiencia de usuario bajo estándares empresariales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="w-full py-32 px-6 max-w-7xl border-t border-brand-hairline dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-green mb-4 block font-bold">
              02 — EXPERIENCIA
            </span>
            <h2 className="text-section-heading mb-8">
              Trayectoria Profesional
            </h2>
            <p className="text-brand-muted leading-relaxed">
              Un registro cronológico de mi evolución técnica y las soluciones aportadas a diferentes organizaciones.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="group relative pl-8 border-l border-brand-hairline dark:border-white/10 hover:border-brand-green transition-colors pb-12 last:pb-0">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-brand-hairline dark:bg-white/20 group-hover:bg-brand-green transition-colors" />
                <span className="text-xs font-mono text-brand-green mb-2 block">{exp.period}</span>
                <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                <h4 className="text-lg text-brand-muted mb-4">{exp.company}</h4>
                <p className="text-brand-body-muted dark:text-white/70 max-w-2xl leading-relaxed mb-6">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-1 bg-brand-stone dark:bg-white/5 border border-brand-hairline dark:border-white/10 rounded font-mono text-brand-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="w-full py-32 px-6 bg-brand-stone dark:bg-brand-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl bg-brand-stone/50 dark:bg-brand-black/50">
              {!aboutImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-brand-muted font-mono text-xs uppercase p-12 text-center opacity-40">
                  Cargando...
                </div>
              )}
              <Image
                src="/about-me.png"
                alt="Sobre mí"
                fill
                className={`object-cover transition-opacity duration-1000 ${aboutImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setAboutImageLoaded(true)}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-brand-green/10 mix-blend-multiply" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-green mb-4 block font-bold">
                03 — SOBRE MÍ
              </span>
              <h2 className="text-section-heading mb-8">
                Ingeniería con alma creativa.
              </h2>
              <div className="space-y-6 text-lg text-brand-body-muted dark:text-white/80 leading-relaxed">
                <p>
                  Mi viaje en el desarrollo comenzó por la curiosidad de cómo las grandes marcas construían sus mundos digitales. Hoy, esa curiosidad se ha transformado en una metodología rigurosa para crear sistemas que no solo funcionan y automatizan procesos, sino que cuentan una historia.
                </p>
                <p>
                  Creo firmemente que el código es una forma de diseño. Cada decisión técnica, desde la elección del framework hasta la optimización de un asset, impacta directamente en la emoción y la confianza del usuario final.
                </p>
                <p>
                  Cuando no estoy frente a la pantalla, me encontrarás explorando la intersección entre la tecnología y el arte, o buscando la siguiente gran arquitectura para simplificar problemas complejos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills / Deep Green Section */}
      <section className="w-full bg-brand-green py-32 px-6 flex flex-col items-center text-white">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6 block font-bold">
                04 — EXPERTISE
              </span>
              <h2 className="text-section-heading mb-8">
                Llevando la complejidad hacia la simplicidad técnica.
              </h2>
              <p className="text-white/70 text-lg max-w-md leading-relaxed">
                Mi enfoque combina la rigidez de la ingeniería de sistemas con la fluidez del diseño moderno.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-white/40 font-mono text-xs uppercase tracking-widest font-bold">Core Stack</h3>
                <ul className="space-y-2 text-xl font-medium">
                  <li>Next.js / React</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Node.js</li>
                  <li>PostgreSQL</li>
                  <li>Prisma ORM</li>
                  <li>CodeIgniter</li>
                  <li>Oracle Cloud</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-white/40 font-mono text-xs uppercase tracking-widest font-bold">Workflow</h3>
                <ul className="space-y-2 text-xl font-medium">
                  <li>System Design</li>
                  <li>API Architecture</li>
                  <li>Performance Opt</li>
                  <li>Unit Testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-32 px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-green mb-4 block font-bold">
              05 — CONTACTO
            </span>
            <h2 className="text-section-heading mb-8">
              ¿Tienes un proyecto en mente? Hagámoslo realidad.
            </h2>
            <p className="text-brand-muted text-lg mb-12 max-w-md leading-relaxed">
              Estoy disponible para nuevos desafíos y colaboraciones en proyectos de alto impacto tecnológico.
            </p>

            <div className="space-y-6">
              <a href="mailto:adanielb.dev@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-brand-hairline dark:border-white/10 flex items-center justify-center group-hover:bg-brand-green group-hover:border-brand-green transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-brand-muted">Email</p>
                  <p className="font-medium group-hover:text-brand-green transition-colors">adanielb.dev@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-brand-hairline dark:border-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-brand-muted">Ubicación</p>
                  <p className="font-medium text-brand-primary dark:text-white">Toluca, México</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-stone dark:bg-brand-black p-8 md:p-12 rounded-2xl border border-brand-hairline dark:border-white/10">
            <h3 className="text-2xl font-bold mb-8">Envíame un mensaje</h3>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name");
                const email = formData.get("email");
                const message = formData.get("message");
                const mailtoUrl = `mailto:adanielb.dev@gmail.com?subject=Mensaje de ${name} (${email})&body=${encodeURIComponent(message as string)}`;
                window.location.href = mailtoUrl;
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-brand-muted">Nombre</label>
                  <input name="name" required type="text" className="w-full bg-transparent border-b border-brand-hairline dark:border-white/20 py-2 focus:border-brand-green outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-brand-muted">Email</label>
                  <input name="email" required type="email" className="w-full bg-transparent border-b border-brand-hairline dark:border-white/20 py-2 focus:border-brand-green outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-brand-muted">Mensaje</label>
                <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-brand-hairline dark:border-white/20 py-2 focus:border-brand-green outline-none transition-colors resize-none" placeholder="¿Cómo puedo ayudarte?"></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green text-white py-4 rounded-pill font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
              >
                Continuar en mi Correo
              </button>
            </form>
          </div>        </div>
      </section>

      <Footer />
    </main>
  );
}

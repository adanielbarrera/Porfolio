export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Freelance",
    role: "Junior Web Developer",
    period: "Presente",
    description: "Agregar descripción de experiencia como freelance. Mencionar que es trabajo independiente y que se tienen clientes variados. Por el momento no hay clientes. ",
    technologies: ["Next.js", "TypeScript", "Node.js"]
  },
  {
    id: "2",
    company: "Facultad de Medicina - UAEMEX",
    role: "Mantenimiento de Software y Sistemas",
    period: "2026 - Presente",
    description: "Apoyo en el mantenimiento, solución de problemas y mejora continua a los sistemas internos de la facultad, asegurando su óptimo funcionamiento y adaptación a las necesidades de los usuarios.",
    technologies: []
  },
  {
    id: "3",
    company: "Dirección General de Fiscalización GEM",
    role: "Desarrollador | Servicio Social",
    period: "2024 — 2025",
    description: "Apoyo en el desarrollo y mantenimiento de los sistemas de la Dirección General de Fiscalización, contribuyendo a la mejora continua y eficiencia de los procesos internos.",
    technologies: ["PHP", "CodeIgniter", "Bootstrap", "MSSQL Server", "Java", "JQuery"]
  }
];

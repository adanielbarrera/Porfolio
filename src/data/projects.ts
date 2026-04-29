export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string; // Captura principal para el hover
  gallery?: string[]; // Fotos adicionales para el pop-up
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Forge | Gym Track App",
    description: "Plataforma integral de seguimiento de entrenamientos y gestión de gimnasios con análisis de IA.",
    longDescription: "Forge es una plataforma diseñada para centros boutique y entrenadores personales. Cierra la brecha entre la recolección de datos y el coaching real mediante el uso de IA para analizar el rendimiento de los atletas, permitiendo un seguimiento preciso y personalizado de cada sesión.",
    technologies: ["React", "Node.js", "Prisma ORM", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/adanielbarrera/Forge",
    image: "/projects/forge-main.png", // Debes añadir esta imagen a public/projects/
    gallery: ["/projects/forge-1.png", "/projects/forge-2.png"],
    featured: true
  },
  {
    id: "2",
    title: "Pocket Finance | Tracker de Finanzas",
    description: "Sistema para monitorear ingresos y gastos con integración de Apple Shortcuts y Google Sheets.",
    longDescription: "Pocket finance ayuda al usuario a monitorear sus fuentes de ingresos y gastos (tarjetas y efectivo). Implementa un atajo de Apple que envía peticiones API para registrar transacciones automáticamente en Google Sheets, facilitando el control financiero diario.",
    technologies: ["Google Scripts", "Apple Shortcuts", "API Rest"],
    github: "https://github.com/adanielbarrera/pocket-finance",
    image: "/projects/finance-main.png", // Debes añadir esta imagen a public/projects/
    gallery: ["/projects/finance-1.png", "/projects/finance-2.png"],
    featured: true
  }
];

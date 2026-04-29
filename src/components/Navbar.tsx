import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center px-6 py-6">
      <div className="max-w-7xl w-full flex justify-between items-center bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-brand-hairline dark:border-white/10">
        <Link href="/" className="font-bold tracking-tighter text-xl">
          Daniel Barrera<span className="text-brand-green">.</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="#projects" className="text-sm font-medium hover:text-brand-green transition-colors">Proyectos</Link>
          <Link href="#experience" className="text-sm font-medium hover:text-brand-green transition-colors">Experiencia</Link>
          <Link href="#about" className="text-sm font-medium hover:text-brand-green transition-colors">Sobre mí</Link>
          <Link
            href="#contact"
            className="bg-brand-green text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}

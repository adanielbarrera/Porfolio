export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-brand-hairline dark:border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold tracking-tighter text-xl">
            Daniel Barrera<span className="text-brand-green">.</span>
          </span>
          <p className="text-xs text-brand-muted font-mono">© {new Date().getFullYear()} — Diseñado y desarrollado con precisión.</p>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <a href="https://www.linkedin.com/in/adanielbarrera/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">LinkedIn</a>
          <a href="https://github.com/adanielbarrera" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_90%,black)]/95 backdrop-blur-xs">
      <div className="site-container flex h-18 items-center justify-between gap-6">
        <a href="#hero" className="text-sm font-semibold tracking-[0.14em] text-[var(--text)] uppercase">
          Civil Premium
        </a>
        <nav className="hidden items-center gap-6 text-xs tracking-[0.12em] text-[var(--muted)] uppercase md:flex">
          <a href="#servicios" className="transition-colors hover:text-[var(--text)]">
            Servicios
          </a>
          <a href="#proceso" className="transition-colors hover:text-[var(--text)]">
            Proceso
          </a>
          <a href="#confianza" className="transition-colors hover:text-[var(--text)]">
            Confianza
          </a>
        </nav>
        <div className="hidden sm:block">
          <Button href="#cta-final" variant="ghost">
            Contacto
          </Button>
        </div>
      </div>
    </header>
  );
}

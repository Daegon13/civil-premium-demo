export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="site-container flex flex-col gap-3 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Civil Premium · Consultoría en Ingeniería Civil.</p>
        <p>Madrid · Barcelona · Proyectos en ámbito nacional</p>
      </div>
    </footer>
  );
}

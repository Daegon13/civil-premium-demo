import { siteContent } from "@/content/siteContent";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_94%,black)]/95">
      <div className="site-container flex h-16 items-center justify-between">
        <p className="text-sm font-semibold tracking-[0.06em] text-[var(--color-text)]">{siteContent.brand.name}</p>
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Consultoría estructural</p>
      </div>
    </header>
  );
}

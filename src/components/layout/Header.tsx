import { siteContent } from "@/content/siteContent";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[rgba(15,19,24,0.86)] backdrop-blur">
      <div className="site-container flex h-16 items-center justify-between">
        <p className="text-sm font-semibold tracking-[0.06em] text-[var(--color-text)]">{siteContent.brand.name}</p>
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">Ingeniería civil</p>
      </div>
    </header>
  );
}

import { siteContent } from "@/content/siteContent";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color-mix(in_srgb,var(--color-border)_74%,var(--color-accent)_26%)] bg-[color-mix(in_srgb,var(--color-bg)_92%,black)]/95 backdrop-blur-md">
      <div className="site-container flex h-16 items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-[0.07em] text-[var(--color-text)]">{siteContent.brand.name}</p>
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
          {siteContent.brand.serviceLine}
        </p>
      </div>
    </header>
  );
}

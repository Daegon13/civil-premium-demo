import { siteContent } from "@/content/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="site-container flex flex-col gap-2 text-sm text-[var(--color-text-muted)] sm:flex-row sm:justify-between">
        <p className="text-[var(--color-text)]">{siteContent.brand.name}</p>
        <p>Dirección técnica de obras civiles · Base visual v1</p>
      </div>
    </footer>
  );
}

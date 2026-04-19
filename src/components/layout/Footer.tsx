import { siteContent } from "@/content/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-8">
      <div className="site-container flex flex-col gap-2 text-sm text-[var(--color-muted)] sm:flex-row sm:justify-between">
        <p>{siteContent.brand.name}</p>
        <p>Base premium en construcción · Patch 00</p>
      </div>
    </footer>
  );
}

import { siteContent } from "@/content/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-7">
      <div className="site-container flex flex-col gap-2 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[var(--color-text)]">{siteContent.brand.name}</p>
        <p className="text-xs sm:text-sm">
          <a className="underline-offset-4 hover:underline" href={`mailto:${siteContent.contact.email}`}>
            {siteContent.contact.email}
          </a>
        </p>
      </div>
    </footer>
  );
}

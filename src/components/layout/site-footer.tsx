export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto w-full max-w-6xl px-6 text-sm text-white/60">
        © {new Date().getFullYear()} Civil Premium
      </div>
    </footer>
  );
}

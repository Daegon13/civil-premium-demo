export default function NotFound() {
  return (
    <main className="site-shell grid min-h-screen place-items-center px-6 text-center">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">404</p>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">Página no encontrada</h1>
        <p className="text-sm text-[var(--color-muted)]">Volvé al inicio para continuar con la navegación.</p>
      </div>
    </main>
  );
}

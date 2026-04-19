import { GridOverlay } from "@/components/visual/GridOverlay";

export function HeroStructureVisual() {
  return (
    <div className="technical-grid relative min-h-[23.5rem] overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-border)_76%,var(--color-accent)_24%)] bg-[radial-gradient(120%_95%_at_88%_8%,color-mix(in_srgb,var(--color-accent)_26%,transparent)_0%,transparent_56%),var(--color-surface)] p-5 shadow-[var(--shadow-panel)] sm:min-h-[25rem] sm:p-6">
      <GridOverlay />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,transparent_14%,rgba(13,17,23,0.4)_62%,rgba(9,12,16,0.8)_100%)]" />

      <div className="relative z-10 grid h-full grid-rows-[1fr_auto] gap-5">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-md)+2px)] border border-[color-mix(in_srgb,var(--color-border)_68%,var(--color-accent)_32%)] bg-[color-mix(in_srgb,var(--color-surface-muted)_86%,#0f1318)] p-4 sm:p-5">
          <div className="absolute left-4 top-4 h-2 w-16 rounded-full bg-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] blur-[1px]" />
          <div className="absolute right-6 top-6 h-3 w-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]" />

          <svg aria-hidden viewBox="0 0 560 320" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g className="translate-y-[14px] opacity-35 blur-[0.6px]">
              <path d="M35 245 L270 125 L520 230" stroke="color-mix(in srgb, var(--color-text-muted) 34%, transparent)" strokeWidth="1.8" />
              <path d="M110 264 L110 110 L305 30 L305 180" stroke="color-mix(in srgb, var(--color-text-muted) 24%, transparent)" strokeWidth="1.7" />
              <path d="M305 180 L500 96 L500 248 L305 320 Z" stroke="color-mix(in srgb, var(--color-text-muted) 24%, transparent)" strokeWidth="1.7" />
            </g>

            <g className="stroke-[color-mix(in_srgb,var(--color-text-muted)_60%,var(--color-accent)_20%)] opacity-75" strokeWidth="1.1">
              <path className="hero-draw-line" d="M35 245 L270 125 L520 230" />
              <path className="hero-draw-line delay-150" d="M35 220 L270 100 L520 205" />
              <path className="hero-draw-line delay-300" d="M110 264 L110 110 L305 30 L305 180" />
              <path className="hero-draw-line delay-500" d="M305 180 L500 96 L500 248 L305 320 Z" />
              <path className="hero-draw-line delay-700" d="M110 110 L305 30 L500 96" />
              <path className="hero-draw-line delay-[900ms]" d="M110 264 L305 180 L500 248" />
            </g>

            <g className="translate-x-[7px] -translate-y-[5px] opacity-55">
              <path d="M35 245 L270 125 L520 230" stroke="color-mix(in srgb, var(--color-accent) 44%, transparent)" strokeWidth="1.3" />
              <path d="M110 264 L110 110 L305 30 L305 180" stroke="color-mix(in srgb, var(--color-accent) 42%, transparent)" strokeWidth="1.25" />
              <path d="M305 180 L500 96 L500 248 L305 320 Z" stroke="color-mix(in srgb, var(--color-accent) 42%, transparent)" strokeWidth="1.25" />
            </g>

            <g className="stroke-[color-mix(in_srgb,var(--color-accent)_82%,#d4deea)] opacity-85" strokeWidth="1.2">
              <path className="hero-draw-line" d="M35 245 L270 125 L520 230" />
              <path className="hero-draw-line delay-150" d="M35 220 L270 100 L520 205" />
              <path className="hero-draw-line delay-300" d="M110 264 L110 110 L305 30 L305 180" />
              <path className="hero-draw-line delay-500" d="M305 180 L500 96 L500 248 L305 320 Z" />
              <path className="hero-draw-line delay-700" d="M110 110 L305 30 L500 96" />
              <path className="hero-draw-line delay-[900ms]" d="M110 264 L305 180 L500 248" />
            </g>

            <g className="opacity-65">
              <ellipse cx="258" cy="112" rx="88" ry="34" fill="url(#surface-grad)" />
              <ellipse cx="384" cy="180" rx="126" ry="48" fill="url(#surface-grad-2)" />
            </g>

            <g className="opacity-80">
              <path d="M238 78 L280 55" stroke="color-mix(in srgb, #dbe5f1 66%, transparent)" strokeWidth="1.1" />
              <path d="M410 108 L448 92" stroke="color-mix(in srgb, #dbe5f1 48%, transparent)" strokeWidth="1" />
              <circle cx="270" cy="125" r="3.2" fill="color-mix(in srgb, #e3edf9 76%, transparent)" />
            </g>

            <defs>
              <linearGradient id="surface-grad" x1="170" y1="112" x2="346" y2="112" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="transparent" />
                <stop offset="0.5" stopColor="color-mix(in srgb, var(--color-accent) 22%, #b7c6d7)" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="surface-grad-2" x1="258" y1="180" x2="510" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="transparent" />
                <stop offset="0.48" stopColor="color-mix(in srgb, var(--color-accent) 18%, #9eb0c5)" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(10,13,18,0.82),transparent)]" />
          <div className="hero-layer-sweep absolute -left-[32%] top-[36%] h-20 w-[68%] rotate-[12deg] border-y border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] bg-[linear-gradient(90deg,transparent,rgba(176,192,209,0.08),transparent)]" />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_90%,#0f141b)] px-4 py-3 sm:px-5">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Lectura de capas</p>
            <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--color-text)_82%,var(--color-text-muted))]">
              Primero base y estructura; después superficie y luz para revelar cómo el volumen guía cada decisión técnica.
            </p>
          </div>
          <div className="flex min-w-[6.1rem] flex-col items-end justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_75%,#0c1016)] p-3 text-right">
            <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Rigor</p>
            <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-text)]">01</p>
          </div>
        </div>
      </div>
    </div>
  );
}

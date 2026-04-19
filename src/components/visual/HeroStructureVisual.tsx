import { GridOverlay } from "@/components/visual/GridOverlay";

export function HeroStructureVisual() {
  return (
    <div className="technical-grid group relative min-h-[25rem] overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-border)_76%,var(--color-accent)_24%)] bg-[radial-gradient(130%_100%_at_88%_8%,color-mix(in_srgb,var(--color-accent)_24%,transparent)_0%,transparent_58%),var(--color-surface)] p-5 shadow-[var(--shadow-panel)] sm:min-h-[27rem] sm:p-6 lg:min-h-[29.5rem]">
      <GridOverlay />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,transparent_14%,rgba(13,17,23,0.35)_62%,rgba(9,12,16,0.74)_100%)]" />

      <div className="relative z-10 grid h-full grid-rows-[1fr_auto] gap-4 sm:gap-5">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-md)+2px)] border border-[color-mix(in_srgb,var(--color-border)_68%,var(--color-accent)_32%)] bg-[color-mix(in_srgb,var(--color-surface-muted)_86%,#0f1318)] p-4 sm:p-5">
          <div className="absolute left-4 top-4 h-2 w-16 rounded-full bg-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] blur-[1px] opacity-55" />
          <div className="absolute right-6 top-6 h-3 w-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] opacity-80" />

          <svg aria-hidden viewBox="0 0 560 320" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g className="translate-y-[14px] opacity-35 blur-[0.6px]">
              <path d="M35 245 L270 125 L520 230" stroke="color-mix(in srgb, var(--color-text-muted) 34%, transparent)" strokeWidth="1.8" />
              <path d="M110 264 L110 110 L305 30 L305 180" stroke="color-mix(in srgb, var(--color-text-muted) 24%, transparent)" strokeWidth="1.7" />
              <path d="M305 180 L500 96 L500 248 L305 320 Z" stroke="color-mix(in srgb, var(--color-text-muted) 24%, transparent)" strokeWidth="1.7" />
            </g>

            <g className="stroke-[color-mix(in_srgb,var(--color-text-muted)_60%,var(--color-accent)_20%)] opacity-70" strokeWidth="1.1">
              <path className="hero-draw-line [animation-duration:0.95s]" d="M35 245 L270 125 L520 230" />
              <path className="hero-draw-line delay-150 [animation-duration:0.95s]" d="M35 220 L270 100 L520 205" />
              <path className="hero-draw-line delay-300 [animation-duration:1.1s]" d="M110 264 L110 110 L305 30 L305 180" />
              <path className="hero-draw-line delay-500 [animation-duration:1.1s]" d="M305 180 L500 96 L500 248 L305 320 Z" />
              <path className="hero-draw-line delay-700 [animation-duration:1.15s]" d="M110 110 L305 30 L500 96" />
              <path className="hero-draw-line delay-[900ms] [animation-duration:1.15s]" d="M110 264 L305 180 L500 248" />
            </g>

            <g className="translate-x-[7px] -translate-y-[5px] opacity-45 transition-opacity duration-700 delay-[1200ms] group-hover:opacity-55">
              <path d="M35 245 L270 125 L520 230" stroke="color-mix(in srgb, var(--color-accent) 44%, transparent)" strokeWidth="1.3" />
              <path d="M110 264 L110 110 L305 30 L305 180" stroke="color-mix(in srgb, var(--color-accent) 42%, transparent)" strokeWidth="1.25" />
              <path d="M305 180 L500 96 L500 248 L305 320 Z" stroke="color-mix(in srgb, var(--color-accent) 42%, transparent)" strokeWidth="1.25" />
            </g>

            <g className="stroke-[color-mix(in_srgb,var(--color-accent)_82%,#d4deea)] opacity-80" strokeWidth="1.2">
              <path className="hero-draw-line [animation-duration:1.2s]" d="M35 245 L270 125 L520 230" />
              <path className="hero-draw-line delay-150 [animation-duration:1.2s]" d="M35 220 L270 100 L520 205" />
              <path className="hero-draw-line delay-300 [animation-duration:1.35s]" d="M110 264 L110 110 L305 30 L305 180" />
              <path className="hero-draw-line delay-500 [animation-duration:1.35s]" d="M305 180 L500 96 L500 248 L305 320 Z" />
              <path className="hero-draw-line delay-700 [animation-duration:1.4s]" d="M110 110 L305 30 L500 96" />
              <path className="hero-draw-line delay-[900ms] [animation-duration:1.4s]" d="M110 264 L305 180 L500 248" />
            </g>

            <g className="opacity-72" stroke="color-mix(in srgb, var(--color-accent) 58%, transparent)" strokeWidth="1">
              <path d="M35 276 H520" strokeDasharray="5 7" />
              <path d="M35 276 v-14" />
              <path d="M520 276 v-14" />
              <path d="M84 244 h14" />
              <path d="M84 220 h10" />
              <path d="M84 196 h14" />
              <path d="M84 172 h10" />
            </g>

            <g className="opacity-0 [animation:fadeUp_640ms_ease_1.25s_forwards]" fill="color-mix(in srgb, var(--color-text-muted) 88%, transparent)">
              <text x="46" y="268" fontSize="10" letterSpacing="1.7">MOD 3.00 m</text>
              <text x="400" y="268" fontSize="10" letterSpacing="1.7">EJE B-B</text>
              <text x="98" y="150" fontSize="9" letterSpacing="1.4">COTA +7.20</text>
              <text x="322" y="88" fontSize="9" letterSpacing="1.4">NUDO N-04</text>
            </g>
          </svg>

          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(10,13,18,0.82),transparent)]" />
          <div className="hero-layer-sweep absolute -left-[35%] top-[36%] h-20 w-[72%] rotate-[12deg] border-y border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-[linear-gradient(90deg,transparent,rgba(176,192,209,0.08),transparent)] [animation-delay:1.4s] [animation-duration:3.8s] [animation-iteration-count:1]" />
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

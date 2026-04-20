"use client";

import { GridOverlay } from "@/components/visual/GridOverlay";
import { useParallaxTilt } from "@/hooks/useParallaxTilt";

export function Hero3DStage() {
  const { tiltRef, enabled, handlePointerMove, handlePointerLeave } = useParallaxTilt();

  return (
    <div className="hero-stage-entry [perspective:1200px]">
      <div
        ref={tiltRef}
        className="technical-grid group relative min-h-[25rem] overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-border)_76%,var(--color-accent)_24%)] bg-[radial-gradient(130%_100%_at_88%_8%,color-mix(in_srgb,var(--color-accent)_24%,transparent)_0%,transparent_58%),var(--color-surface)] p-5 shadow-[var(--shadow-panel)] sm:min-h-[27rem] sm:p-6 lg:min-h-[29.5rem]"
        onPointerMove={enabled ? handlePointerMove : undefined}
        onPointerLeave={enabled ? handlePointerLeave : undefined}
        style={{ willChange: enabled ? "transform" : "auto" }}
      >
        <GridOverlay />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,transparent_14%,rgba(13,17,23,0.35)_62%,rgba(9,12,16,0.74)_100%)]" />

        <div className="relative z-10 grid h-full grid-rows-[1fr_auto] gap-4 sm:gap-5">
          <div className="relative overflow-hidden rounded-[calc(var(--radius-md)+2px)] border border-[color-mix(in_srgb,var(--color-border)_68%,var(--color-accent)_32%)] bg-[color-mix(in_srgb,var(--color-surface-muted)_86%,#0f1318)] p-4 sm:p-5">
            <div className="absolute inset-0 [perspective:1100px]">
              <div className="relative h-full w-full [transform-style:preserve-3d]">
                <div className="absolute inset-0 opacity-70 [transform:translateZ(-48px)]">
                  <svg aria-hidden viewBox="0 0 560 320" className="h-full w-full" fill="none">
                    <defs>
                      <pattern id="hero-tech-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M32 0H0V32" stroke="color-mix(in srgb, var(--color-text-muted) 34%, transparent)" strokeWidth="0.9" />
                      </pattern>
                    </defs>
                    <rect x="20" y="14" width="520" height="290" fill="url(#hero-tech-grid)" />
                    <path d="M20 58 H540 M20 142 H540 M20 226 H540" stroke="color-mix(in srgb, var(--color-text-muted) 22%, transparent)" strokeDasharray="6 8" />
                    <path d="M84 14 V304 M244 14 V304 M404 14 V304" stroke="color-mix(in srgb, var(--color-text-muted) 22%, transparent)" strokeDasharray="6 8" />
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-[7%_9%_15%_9%] blur-xl opacity-55 [transform:translateZ(-18px)]">
                  <div className="h-full w-full rounded-[28%] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-accent)_36%,#8ea4bb)_0%,transparent_68%)]" />
                </div>

                <div className="absolute inset-[8%_8%_12%_8%] [transform:translateZ(10px)]">
                  <svg aria-hidden viewBox="0 0 560 320" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <g className="opacity-92">
                      <path d="M94 238 L262 150 L442 208 L278 290 Z" fill="color-mix(in srgb, var(--color-accent) 18%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 62%, #d4deea)" strokeWidth="1.2" />
                      <path d="M262 150 L262 76 L442 132 L442 208 Z" fill="color-mix(in srgb, var(--color-accent) 10%, #171d25)" stroke="color-mix(in srgb, var(--color-accent) 55%, #c9d5e2)" strokeWidth="1.1" />
                      <path d="M94 238 L94 164 L262 76 L262 150 Z" fill="color-mix(in srgb, var(--color-surface-muted) 72%, #151b23)" stroke="color-mix(in srgb, var(--color-accent) 42%, #aab7c7)" strokeWidth="1.1" />
                      <path d="M154 210 L322 120 L382 138 L214 228 Z" fill="color-mix(in srgb, #ffffff 4%, transparent)" stroke="color-mix(in srgb, var(--color-accent) 26%, transparent)" strokeWidth="0.9" />
                    </g>
                  </svg>
                </div>

                <div className="absolute inset-[4%_6%_8%_6%] [transform:translateZ(44px)]">
                  <svg aria-hidden viewBox="0 0 560 320" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <g className="stroke-[color-mix(in_srgb,var(--color-accent)_84%,#d4deea)] opacity-90" strokeWidth="1.2">
                      <path className="hero-draw-line [animation-duration:1.1s]" d="M94 238 L262 150 L442 208 L278 290 Z" />
                      <path className="hero-draw-line delay-150 [animation-duration:1.2s]" d="M94 164 L262 76 L442 132" />
                      <path className="hero-draw-line delay-300 [animation-duration:1.1s]" d="M94 164 L94 238 M262 76 L262 150 M442 132 L442 208" />
                      <path className="hero-draw-line delay-500 [animation-duration:1.3s]" d="M122 252 L290 164 L410 216 M178 280 L346 192" />
                    </g>

                    <g className="stroke-[color-mix(in_srgb,var(--color-text-muted)_72%,var(--color-accent)_18%)] opacity-84" strokeWidth="1">
                      <path d="M64 286 H470" strokeDasharray="5 7" />
                      <path d="M64 286 v-16 M470 286 v-16" />
                      <path d="M70 152 H94 M252 66 H272 M442 122 H466" />
                      <path d="M86 242 h-15 M86 198 h-11 M274 292 v14 M438 212 h13" />
                    </g>

                    <g className="opacity-95" fill="color-mix(in srgb, var(--color-text-muted) 92%, transparent)">
                      <text x="74" y="279" fontSize="10" letterSpacing="1.6">MOD 3.00 m</text>
                      <text x="343" y="279" fontSize="10" letterSpacing="1.6">TRAMO EJE A-A</text>
                      <text x="28" y="204" fontSize="9" letterSpacing="1.35">COTA +7.20</text>
                      <text x="470" y="142" fontSize="9" letterSpacing="1.35">NODO N-04</text>
                      <text x="262" y="60" fontSize="8" letterSpacing="1.35">PLANO P-01</text>
                    </g>

                    <g className="fill-[color-mix(in_srgb,var(--color-accent)_80%,#dde6f1)]">
                      <circle cx="94" cy="238" r="2.8" />
                      <circle cx="262" cy="150" r="2.8" />
                      <circle cx="442" cy="208" r="2.8" />
                      <circle cx="262" cy="76" r="2.8" />
                      <circle cx="94" cy="164" r="2.8" />
                      <circle cx="442" cy="132" r="2.8" />
                    </g>
                  </svg>
                </div>

                <div className="absolute inset-x-[8%] top-[24%] h-20 rotate-[12deg] border-y border-[color-mix(in_srgb,var(--color-accent)_48%,transparent)] bg-[linear-gradient(90deg,transparent,rgba(176,192,209,0.14),transparent)] opacity-0 hero-layer-sweep [transform:translateZ(62px)] [animation-delay:1.2s] [animation-duration:3.8s] [animation-iteration-count:1]" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(10,13,18,0.82),transparent)]" />
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_90%,#0f141b)] px-4 py-3 sm:px-5">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Lectura de capas</p>
              <p className="mt-2 text-sm text-[color-mix(in_srgb,var(--color-text)_82%,var(--color-text-muted))]">
                Grid base, wireframe, volumen, sombra y luz técnica para leer cotas, nodos y trama estructural en una sola escena.
              </p>
            </div>
            <div className="flex min-w-[6.1rem] flex-col items-end justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_75%,#0c1016)] p-3 text-right">
              <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Rigor</p>
              <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-text)]">01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

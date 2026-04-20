import Link from "next/link";

import { MetricPill } from "@/components/ui/MetricPill";
import { buttonClassName } from "@/components/ui/Button";
import { HeroStructureVisual } from "@/components/visual/HeroStructureVisual";
import { siteContent } from "@/content/siteContent";

export function Hero() {
  return (
    <section className="theme-hero section-hero section-spacing section-density-relaxed pb-12 sm:pb-14" id="inicio">
      <div className="site-container grid items-center gap-10 md:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:grid-cols-[0.9fr_1.1fr] xl:gap-20">
        <div className="space-y-6 sm:space-y-7">
          <div className="space-y-2">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              Ingeniería civil premium · decisiones con respaldo técnico
            </p>
            <div className="flex flex-wrap items-center gap-2.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              <span>Hoja H-01</span>
              <span className="h-3 w-px bg-[color-mix(in_srgb,var(--color-border)_74%,transparent)]" />
              <span>Lectura técnica</span>
              <span className="h-3 w-px bg-[color-mix(in_srgb,var(--color-border)_74%,transparent)]" />
              <span>Datum ±0.00</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-balance text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.032em] text-[var(--color-text)] sm:text-[2.7rem] lg:text-[3.05rem] xl:text-[3.25rem]">
              Dirección técnica para ejecutar obra con menos incertidumbre y más control.
            </h1>
            <div className="flex max-w-xl items-start gap-3">
              <span className="mt-3 h-px w-14 bg-[color-mix(in_srgb,var(--color-accent)_58%,transparent)] sm:w-20" />
              <p className="text-pretty text-[1.02rem] leading-relaxed text-[var(--color-text-muted)] sm:text-[1.08rem]">
                Ordenamos la complejidad en un plan accionable: diagnóstico, prioridades y seguimiento técnico para
                proteger plazo, presupuesto y cumplimiento normativo.
              </p>
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-border)_80%,var(--color-accent)_20%)] bg-[color-mix(in_srgb,var(--color-surface)_82%,white_18%)] px-3.5 py-2.5 sm:px-4">
            <div className="grid gap-2 text-[0.56rem] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:grid-cols-3 sm:gap-3">
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> Eje estructural A-A</p>
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> Cota crítica +7.20</p>
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> Módulo base 3.00 m</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <Link className={buttonClassName("primary")} href={siteContent.contact.calendlyLink} rel="noreferrer" target="_blank">
                {siteContent.cta.primary}
              </Link>
              <Link className={buttonClassName("secondary")} href="#proceso">
                {siteContent.cta.secondary}
              </Link>
            </div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              Primera reunión en 72 h · hoja de ruta desde la sesión inicial
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <MetricPill label="Precisión" value="Trazable" />
            <MetricPill label="Riesgo" value="Controlado" />
            <MetricPill label="Decisión" value="Sustentada" />
          </div>
        </div>

        <HeroStructureVisual />
      </div>
    </section>
  );
}

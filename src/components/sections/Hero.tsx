import Link from "next/link";

import { MetricPill } from "@/components/ui/MetricPill";
import { buttonClassName } from "@/components/ui/Button";
import { HeroStructureVisual } from "@/components/visual/HeroStructureVisual";
import { siteContent } from "@/content/siteContent";

export function Hero() {
  return (
    <section className="section-spacing pb-14 sm:pb-16" id="inicio">
      <div className="site-container grid items-center gap-10 md:gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
        <div className="space-y-7 sm:space-y-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
            Ingeniería civil premium · decisiones con respaldo técnico
          </p>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)] sm:text-[2.55rem] lg:text-[3.25rem]">
              Dirección técnica para ejecutar obra con menos incertidumbre y más control.
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
              Ordenamos la complejidad en un plan accionable: diagnóstico, prioridades y seguimiento técnico para
              proteger plazo, presupuesto y cumplimiento normativo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <Link className={buttonClassName("primary")} href={siteContent.contact.calendlyLink} rel="noreferrer" target="_blank">
              {siteContent.cta.primary}
            </Link>
            <Link className={buttonClassName("secondary")} href="#proceso">
              {siteContent.cta.secondary}
            </Link>
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

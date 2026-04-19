import { Button } from "@/components/ui/Button";
import { MetricPill } from "@/components/ui/MetricPill";
import { HeroStructureVisual } from "@/components/visual/HeroStructureVisual";

export function Hero() {
  return (
    <section className="section-spacing">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="space-y-8">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            Ingeniería civil premium · precisión estructural
          </p>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text)] sm:text-4xl lg:text-[3.15rem] lg:leading-[1.05]">
              Dirección técnica con criterio estructural para obras que no admiten margen de error.
            </h1>
            <p className="max-w-2xl text-pretty text-base text-[var(--color-text-muted)] sm:text-lg">
              Convertimos complejidad constructiva en un plan claro: diagnóstico, modelado técnico y control de ejecución
              para proteger plazos, presupuesto y desempeño estructural.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button>Solicitar diagnóstico técnico</Button>
            <Button variant="secondary">Revisar enfoque de trabajo</Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

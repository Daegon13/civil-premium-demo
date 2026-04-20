import { SectionHeading } from "@/components/ui/SectionHeading";

const withSupport = [
  "Se define alcance con supuestos explícitos y prioridades técnicas.",
  "Las decisiones se documentan y se pueden justificar ante terceros.",
  "La coordinación en obra sigue un criterio común entre disciplinas.",
  "Los ajustes se resuelven con método, no por urgencia del momento.",
];

const withoutSupport = [
  "Cambios de rumbo frecuentes por falta de diagnóstico previo.",
  "Mayor exposición a retrabajos, costos no previstos y demoras.",
  "Inconsistencias entre diseño, ejecución y requerimientos normativos.",
  "Comunicación fragmentada que dificulta tomar decisiones oportunas.",
];

export function TrustBlock() {
  return (
    <section className="theme-section-emphasis section-close section-spacing section-density-relaxed section-divider">
      <div className="site-container space-y-9">
        <SectionHeading
          eyebrow="Confianza basada en método"
          title="Respaldo técnico vs. improvisación: la diferencia se nota en cada decisión"
          description="Cuando hay orden técnico desde el inicio, el proyecto gana trazabilidad, previsibilidad y control operativo."
          role="close"
        />

        <div className="grid gap-3.5 lg:grid-cols-5 lg:gap-4">
          <article className="block-evidence card-motion card-motion-glow rounded-[var(--radius-lg)] p-6 sm:p-7 lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-accent-strong)]">Con respaldo técnico</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
              {withSupport.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="block-evidence card-motion card-motion-glow rounded-[var(--radius-lg)] p-6 sm:p-7 lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-[0.1em] uppercase text-[var(--color-text)]">Cuando se improvisa</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
              {withoutSupport.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

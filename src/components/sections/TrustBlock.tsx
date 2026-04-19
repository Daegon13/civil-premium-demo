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
    <section className="section-spacing section-divider">
      <div className="site-container space-y-8">
        <SectionHeading
          eyebrow="Confianza basada en método"
          title="Respaldo técnico vs. improvisación: la diferencia se nota en cada decisión"
          description="Cuando hay orden técnico desde el inicio, el proyecto gana trazabilidad, previsibilidad y control operativo."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="text-sm font-semibold tracking-[0.08em] uppercase text-[var(--color-accent-strong)]">Con respaldo técnico</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
              {withSupport.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
            <h3 className="text-sm font-semibold tracking-[0.08em] uppercase text-[var(--color-text)]">Cuando se improvisa</h3>
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

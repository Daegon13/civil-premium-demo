import { SectionHeading } from "@/components/ui/SectionHeading";

const risks = [
  "Sobrecostos por indefinición técnica en etapas tempranas.",
  "Retrabajos por coordinación deficiente entre diseño y obra.",
  "Demoras por falta de control documental y trazabilidad.",
  "Exposición a incumplimientos normativos evitables.",
];

export function ProblemsSolved() {
  return (
    <section className="section-spacing section-divider">
      <div className="site-container space-y-8">
        <SectionHeading
          eyebrow="Problemas que resolvemos"
          title="Intervenimos antes de que la complejidad se convierta en costo"
          description="Nuestro marco operativo está orientado a detectar desviaciones tempranas y corregirlas con criterios medibles."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {risks.map((risk) => (
            <article key={risk} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
              <p className="text-sm text-[var(--color-text-muted)]">{risk}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

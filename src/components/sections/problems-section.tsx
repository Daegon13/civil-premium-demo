import { SectionHeading } from "@/components/ui/section-heading";

const problems = [
  "Sobrecostes por definición técnica insuficiente en fase temprana",
  "Retrasos por coordinación ineficiente entre agentes de obra",
  "Riesgo contractual por documentación no trazable",
  "Decisiones críticas tomadas sin lectura estructural completa",
];

export function ProblemsSection() {
  return (
    <section id="problemas" className="section-spacing border-b border-[var(--line)]">
      <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeading
          eyebrow="Qué resolvemos"
          title="Reducimos fricción técnica en proyectos donde cada desvío cuesta demasiado."
          description="Nos enfocamos en los puntos de fallo que afectan cronograma, seguridad y retorno de inversión."
        />

        <div className="grid gap-3">
          {problems.map((problem) => (
            <article
              key={problem}
              className="rounded-sm border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-sm leading-relaxed text-[var(--text)]"
            >
              {problem}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

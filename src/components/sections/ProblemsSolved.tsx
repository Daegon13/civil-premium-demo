import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  {
    title: "La obra parte sin definiciones críticas",
    detail: "Detectamos vacíos técnicos antes de licitar o ejecutar, evitando decisiones caras en terreno.",
  },
  {
    title: "El presupuesto se dispara por cambios tardíos",
    detail: "Traducimos ingeniería a alcances y prioridades para que cada peso tenga justificación técnica.",
  },
  {
    title: "Aparecen observaciones normativas al final",
    detail: "Regularizamos documentación y cumplimiento desde el inicio para no frenar entregas ni recepciones.",
  },
  {
    title: "Nadie tiene trazabilidad de decisiones",
    detail: "Estructuramos control técnico e informes claros para saber qué se decidió, cuándo y por qué.",
  },
];

export function ProblemsSolved() {
  return (
    <section className="section-spacing section-divider">
      <div className="site-container space-y-9">
        <SectionHeading
          eyebrow="Qué resolvemos"
          title="Problemas de obra que impactan directo en plazo, costo y tranquilidad"
          description="Si el cliente entiende el riesgo, puede comprar la solución correcta. Nosotros lo hacemos visible y accionable."
        />

        <div className="grid gap-3.5 md:grid-cols-6 md:gap-4">
          {problems.map((problem, index) => (
            <article
              key={problem.title}
              className={`block-diagnostic fade-up rounded-[var(--radius-md)] px-5 py-5 sm:px-6 sm:py-6 ${
                index === 0 ? "md:col-span-4" : "md:col-span-3"
              }`}
              data-stagger={String(index + 1).padStart(2, "0")}
            >
              <h3 className="text-base font-semibold tracking-[-0.01em] text-[var(--color-text)]">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{problem.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

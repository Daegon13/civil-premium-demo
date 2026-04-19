import { SectionHeading } from "@/components/ui/SectionHeading";

const projectTypes = ["Obra nueva residencial", "Ampliaciones y refuerzos", "Regularizaciones complejas", "Infraestructura liviana privada"];

export function ProjectTypes() {
  return (
    <section className="section-spacing">
      <div className="site-container space-y-8">
        <SectionHeading
          eyebrow="Tipologías de proyecto"
          title="Experiencia aplicada en proyectos civiles de escala acotada y alta exigencia"
          description="Adaptamos la estrategia técnica según el tipo de activo, su condición estructural y el contexto regulatorio de cada encargo."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projectTypes.map((type) => (
            <article key={type} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5">
              <p className="text-sm font-medium text-[var(--color-text)]">{type}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

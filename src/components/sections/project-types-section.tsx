import { SectionHeading } from "@/components/ui/section-heading";

const projectTypes = [
  "Naves logísticas e industriales",
  "Infraestructura urbana y redes de servicio",
  "Activos terciarios con operación activa",
  "Rehabilitación de patrimonio estructural",
];

export function ProjectTypesSection() {
  return (
    <section id="intervenciones" className="section-spacing section-muted">
      <div className="site-container grid gap-10 lg:grid-cols-2 lg:items-start">
        <SectionHeading
          eyebrow="Ámbitos de trabajo"
          title="Intervenimos donde la complejidad técnica exige criterio experimentado."
        />

        <ul className="grid gap-3">
          {projectTypes.map((item) => (
            <li
              key={item}
              className="rounded-sm border border-[var(--line)] bg-[var(--surface-alt)] px-5 py-4 text-sm text-[var(--text)] sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

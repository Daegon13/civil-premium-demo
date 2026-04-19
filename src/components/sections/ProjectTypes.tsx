import { SectionHeading } from "@/components/ui/SectionHeading";

const projectTypes = [
  {
    title: "Obra nueva residencial",
    description: "Definición estructural y soporte técnico desde anteproyecto hasta ejecución.",
  },
  {
    title: "Reformas y ampliaciones",
    description: "Intervenciones en activos existentes con criterios de compatibilidad y seguridad.",
  },
  {
    title: "Regularizaciones técnicas",
    description: "Orden documental y validación estructural para destrabar procesos administrativos.",
  },
  {
    title: "Patologías y refuerzos",
    description: "Diagnóstico técnico y propuesta de intervención para recuperar desempeño.",
  },
  {
    title: "Adecuaciones para habilitación",
    description: "Ajustes técnicos coordinados con requerimientos normativos y operativos.",
  },
  {
    title: "Supervisión de ejecución",
    description: "Control de criterios en obra para reducir desvíos y decisiones improvisadas.",
  },
];

export function ProjectTypes() {
  return (
    <section className="theme-section section-spacing">
      <div className="site-container space-y-9">
        <SectionHeading
          eyebrow="Tipos de proyectos e intervenciones"
          title="Criterio técnico aplicado según contexto, no soluciones genéricas"
          description="Cada encargo requiere leer el estado real del activo, ordenar prioridades y definir una estrategia de intervención viable."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {projectTypes.map((item, index) => (
            <article
              key={item.title}
              className={`block-evidence rounded-[var(--radius-md)] px-5 py-5 sm:px-6 sm:py-6 ${
                index === 0 || index === 5 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <p className="text-sm font-semibold tracking-[-0.01em] text-[var(--color-text)]">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";

const services = [
  {
    title: "Due diligence técnica",
    description:
      "Auditoría previa a inversión para identificar riesgos estructurales, normativos y de operación con evidencia trazable.",
    items: ["Revisión documental", "Inspección de campo", "Matriz de riesgo"],
  },
  {
    title: "Ingeniería de rehabilitación",
    description:
      "Definimos alcance, fases y prioridades para intervenir activos existentes sin sobredimensionar coste ni tiempos.",
    items: ["Patologías y causas", "Diseño de soluciones", "Plan de ejecución"],
  },
  {
    title: "Oficina técnica externa",
    description:
      "Actuamos como apoyo de dirección para consolidar reportes, control de cambios y coherencia entre contratistas.",
    items: ["Control de hitos", "Soporte contractual", "Seguimiento técnico"],
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="section-spacing section-muted">
      <div className="site-container space-y-10">
        <SectionHeading
          eyebrow="Servicios"
          title="Especialidades diseñadas para proyectos complejos, no para volumen genérico."
          description="Cada frente técnico se ejecuta con responsables senior, métricas operativas y comunicación clara para comités de decisión."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

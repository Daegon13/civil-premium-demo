import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    index: "01",
    name: "Dirección técnica de obra",
    description: "Supervisión integral con seguimiento de calidad, hitos críticos y coordinación entre equipos de proyecto y ejecución.",
  },
  {
    index: "02",
    name: "Regularización y documentación",
    description: "Gestión técnica y documental para actualizar el estado normativo de activos y reducir contingencias futuras.",
  },
  {
    index: "03",
    name: "Diagnóstico estructural",
    description: "Evaluación de patologías, priorización de intervenciones y plan de estabilidad con base en evidencia técnica.",
  },
];

export function Services() {
  return (
    <section className="section-spacing">
      <div className="site-container space-y-8">
        <SectionHeading
          eyebrow="Servicios núcleo"
          title="Capacidades técnicas para proyectos con exigencia real"
          description="Un portafolio sobrio y especializado para clientes que necesitan criterio de ingeniería, no soluciones genéricas."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

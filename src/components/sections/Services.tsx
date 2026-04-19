import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    index: "01",
    name: "Diagnóstico técnico inicial",
    description: "Visita, revisión documental y mapa de riesgos para decidir con datos antes de invertir fuerte.",
    outcome: "Entregable: informe priorizado en 7 días",
  },
  {
    index: "02",
    name: "Dirección y control de obra",
    description: "Supervisión de hitos críticos, coordinación de especialidades y control de calidad en terreno.",
    outcome: "Entregable: reportes quincenales trazables",
  },
  {
    index: "03",
    name: "Regularización técnica",
    description: "Ordenamos antecedentes, planos y respaldos para cumplir exigencias normativas sin fricciones.",
    outcome: "Entregable: carpeta técnica lista para gestión",
  },
];

export function Services() {
  return (
    <section className="section-spacing">
      <div className="site-container space-y-8">
        <SectionHeading
          eyebrow="Servicios"
          title="Servicios claros para comprar con confianza"
          description="Sin paquetes confusos: cada servicio tiene alcance, criterio técnico y un resultado verificable."
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

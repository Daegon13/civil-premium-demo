import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = ["Dirección de obra", "Regularizaciones", "Asesoramiento técnico"];

export function Services() {
  return (
    <section className="section-spacing">
      <div className="site-container space-y-8">
        <SectionHeading eyebrow="Servicios" title="Oferta núcleo con foco comercial" />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service} name={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

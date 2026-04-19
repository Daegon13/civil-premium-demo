import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FinalCTA() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="panel p-8 sm:p-10">
          <SectionHeading
            eyebrow="Siguiente paso"
            title="Coordinemos una evaluación técnica preliminar"
            description="Revisamos alcance, riesgos principales y viabilidad operativa para establecer una hoja de ruta clara desde el inicio."
          />
          <div className="mt-7 flex flex-wrap gap-3">
            <Button>Agendar reunión técnica</Button>
            <Button variant="ghost">Solicitar propuesta</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

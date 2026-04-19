import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FinalCTA() {
  return (
    <section className="section-spacing">
      <div className="site-container rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
        <SectionHeading
          eyebrow="Siguiente paso"
          title="Cierre comercial listo para capturar intención"
          description="Bloque base para llamada a acción final con oferta clara y canal de contacto directo."
        />
        <div className="mt-6">
          <Button>Agendar consulta técnica</Button>
        </div>
      </div>
    </section>
  );
}

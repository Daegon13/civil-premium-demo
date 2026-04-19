import { ProcessStep } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section className="section-spacing section-divider">
      <div className="site-container space-y-8">
        <SectionHeading eyebrow="Proceso" title="Secuencia de trabajo clara y auditable" />
        <div className="grid gap-4 md:grid-cols-3">
          <ProcessStep step="01" title="Diagnóstico técnico" />
          <ProcessStep step="02" title="Plan de intervención" />
          <ProcessStep step="03" title="Control de ejecución" />
        </div>
      </div>
    </section>
  );
}

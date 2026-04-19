import { ProcessStep } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section className="section-spacing section-divider">
      <div className="site-container space-y-8">
        <SectionHeading
          eyebrow="Proceso"
          title="Secuencia operativa clara, técnica y auditable"
          description="Cada fase incorpora entregables verificables para mantener trazabilidad y control de decisiones durante todo el ciclo del proyecto."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <ProcessStep
            step="01"
            title="Levantamiento y diagnóstico"
            detail="Revisión de antecedentes, inspección técnica inicial y definición de condicionantes críticos."
          />
          <ProcessStep
            step="02"
            title="Estrategia y planificación"
            detail="Diseño de ruta de intervención con hitos, riesgos priorizados y esquema de control por etapa."
          />
          <ProcessStep
            step="03"
            title="Ejecución y control técnico"
            detail="Supervisión en terreno, informes de avance y ajustes sustentados por criterio de ingeniería."
          />
        </div>
      </div>
    </section>
  );
}

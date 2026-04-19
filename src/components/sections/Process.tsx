import { ProcessStep } from "@/components/ui/ProcessStep";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section className="theme-section-emphasis section-spacing section-divider" id="proceso">
      <div className="site-container space-y-9">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso breve, técnico y transparente"
          description="El cliente siempre sabe en qué etapa está el proyecto, qué se entrega y cuál es el próximo paso."
        />
        <div className="grid gap-3.5 md:grid-cols-6 md:gap-4">
          <div className="md:col-span-2">
            <ProcessStep
              step="01"
              title="Diagnosticar"
              detail="Levantamiento en terreno y revisión de antecedentes para identificar riesgos y oportunidades reales."
              deliverable="Resultado: prioridades definidas"
            />
          </div>
          <div className="md:col-span-2">
            <ProcessStep
              step="02"
              title="Planificar"
              detail="Definimos hoja de ruta, hitos de control y criterios técnicos para ejecutar sin improvisar."
              deliverable="Resultado: plan validado"
            />
          </div>
          <div className="md:col-span-2">
            <ProcessStep
              step="03"
              title="Ejecutar y controlar"
              detail="Acompañamos la obra con seguimiento técnico, alertas tempranas y decisiones sustentadas."
              deliverable="Resultado: avance trazable"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

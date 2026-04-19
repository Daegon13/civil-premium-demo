import { ProcessStep } from "@/components/ui/process-step";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Diagnóstico inicial",
    description:
      "Levantamiento técnico, validación de documentación y lectura de contexto operativo para acotar incertidumbre desde el inicio.",
  },
  {
    title: "Estrategia de intervención",
    description:
      "Modelamos escenarios, coste total y impacto en continuidad de servicio antes de recomendar una ruta ejecutiva.",
  },
  {
    title: "Implementación controlada",
    description:
      "Coordinamos agentes técnicos y seguimiento de obra con reportes ejecutivos breves y accionables.",
  },
  {
    title: "Cierre y transferencia",
    description:
      "Entregables finales, lecciones aprendidas y base documental para operación o futuras fases de inversión.",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="section-spacing border-b border-[var(--line)]">
      <div className="site-container space-y-10">
        <SectionHeading
          eyebrow="Proceso"
          title="Un método corto, riguroso y repetible para proteger tiempo, capital y reputación."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <ProcessStep key={step.title} index={index + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

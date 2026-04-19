import { Button } from "@/components/ui/Button";
import { MetricPill } from "@/components/ui/MetricPill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroStructureVisual } from "@/components/visual/HeroStructureVisual";
import { WireframeTransition } from "@/components/visual/WireframeTransition";
import { siteContent } from "@/content/siteContent";

export function Hero() {
  return (
    <section className="section-spacing">
      <div className="site-container grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="space-y-7 pt-2">
          <SectionHeading
            eyebrow="Consultoría de ingeniería civil"
            title={siteContent.brand.tagline}
            description="Diseñamos y ejecutamos decisiones de obra con metodología estricta, documentación trazable y una dirección técnica que prioriza control real sobre improvisación."
          />
          <div className="flex flex-wrap gap-3">
            <Button>Solicitar evaluación inicial</Button>
            <Button variant="secondary">Ver metodología técnica</Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MetricPill label="Plazos" value="Previsibles" />
            <MetricPill label="Ejecución" value="Controlada" />
            <MetricPill label="Riesgo" value="Mitigado" />
          </div>
        </div>

        <div className="space-y-4">
          <HeroStructureVisual />
          <WireframeTransition />
        </div>
      </div>
    </section>
  );
}

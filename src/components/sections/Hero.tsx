import { Button } from "@/components/ui/Button";
import { MetricPill } from "@/components/ui/MetricPill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroStructureVisual } from "@/components/visual/HeroStructureVisual";
import { WireframeTransition } from "@/components/visual/WireframeTransition";
import { siteContent } from "@/content/siteContent";

export function Hero() {
  return (
    <section className="section-spacing">
      <div className="site-container grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Ingeniería civil premium"
            title={siteContent.brand.tagline}
            description="Base estructural del proyecto: mensaje claro, respaldo técnico y control del proceso desde el primer contacto comercial."
          />
          <div className="flex flex-wrap gap-3">
            <Button>Solicitar evaluación inicial</Button>
            <Button variant="ghost">Ver enfoque técnico</Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MetricPill label="Enfoque" value="Precisión" />
            <MetricPill label="Proceso" value="Control" />
            <MetricPill label="Estándar" value="Premium" />
          </div>
        </div>
        <div className="space-y-3">
          <HeroStructureVisual />
          <WireframeTransition />
        </div>
      </div>
    </section>
  );
}

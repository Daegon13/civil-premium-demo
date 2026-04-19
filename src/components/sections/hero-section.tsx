import { Button } from "@/components/ui/button";
import { MetricPill } from "@/components/ui/metric-pill";

const metrics = [
  { value: "+220", label: "expedientes técnicos y diagnósticos" },
  { value: "98%", label: "cumplimiento de plazos contractuales" },
  { value: "15 años", label: "de práctica en obra y supervisión" },
];

export function HeroSection() {
  return (
    <section id="hero" className="section-spacing border-b border-[var(--line)]">
      <div className="site-container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
            Ingeniería civil estratégica
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
            Consultoría técnica premium para decisiones de alto impacto en activos civiles.
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Acompañamos a promotoras, operadores y direcciones de proyecto con criterio
            estructural, control documental y una ejecución silenciosa orientada a resultados.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#cta-final">Solicitar evaluación</Button>
            <Button href="#servicios" variant="ghost">
              Explorar servicios
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {metrics.map((metric) => (
            <MetricPill key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

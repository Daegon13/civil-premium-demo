import { SectionHeading } from "@/components/ui/SectionHeading";

export function TrustBlock() {
  return (
    <section className="section-spacing section-divider">
      <div className="site-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          eyebrow="Respaldo técnico"
          title="Metodología sobria para decisiones de alto impacto"
          description="Priorizamos evidencia técnica, comunicación directa y estándares consistentes para sostener confianza en cada fase del proyecto."
        />
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <ul className="space-y-3 text-sm text-[var(--color-text-muted)]">
            <li>• Informes técnicos con criterios verificables.</li>
            <li>• Coordinación directa con equipos de obra y arquitectura.</li>
            <li>• Protocolos de revisión enfocados en calidad y cumplimiento.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

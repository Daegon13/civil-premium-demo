import { SectionHeading } from "@/components/ui/section-heading";

export function TrustSection() {
  return (
    <section id="confianza" className="section-spacing border-b border-[var(--line)]">
      <div className="site-container grid gap-8 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Confianza"
          title="Operamos con perfil bajo y estándares altos en cada informe y cada visita técnica."
        />

        <div className="space-y-4 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            Nuestra relación con cliente se basa en precisión documental, criterio independiente y
            confidencialidad operativa.
          </p>
          <p>
            No vendemos volumen ni plantillas: construimos una capa técnica robusta para respaldar
            decisiones ejecutivas.
          </p>
        </div>
      </div>
    </section>
  );
}

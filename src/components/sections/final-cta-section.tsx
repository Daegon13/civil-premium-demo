import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section id="cta-final" className="section-spacing">
      <div className="site-container rounded-sm border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
              Próximo paso
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
              Si necesitas un socio técnico serio, conversemos con datos sobre la mesa.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Agenda una llamada de evaluación y prepararemos un marco inicial de actuación para tu
              activo o proyecto.
            </p>
          </div>
          <Button href="#hero">Agendar evaluación técnica</Button>
        </div>
      </div>
    </section>
  );
}

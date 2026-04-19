import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteContent } from "@/content/siteContent";

export function FinalCTA() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="panel p-8 sm:p-10">
          <SectionHeading
            eyebrow="CTA final"
            title="Si necesitás ordenar una decisión de obra, conversemos"
            description="Una primera conversación técnica sirve para clarificar alcance, prioridades y próximos pasos antes de comprometer recursos."
          />

          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <p>1. Compartís contexto y objetivo del proyecto.</p>
              <p>2. Identificamos riesgos críticos y nivel de intervención.</p>
              <p>3. Definimos un camino de trabajo claro para avanzar.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button>Agendar reunión técnica</Button>
              <Button variant="ghost">Solicitar propuesta</Button>
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--color-border)] pt-5 text-sm text-[var(--color-text-muted)]">
            <p>
              Contacto directo: <a className="text-[var(--color-text)] underline-offset-4 hover:underline" href={`mailto:${siteContent.contact.email}`}>{siteContent.contact.email}</a>
              {" · "}
              <a className="text-[var(--color-text)] underline-offset-4 hover:underline" href={siteContent.contact.phoneLink} target="_blank" rel="noreferrer">
                WhatsApp {siteContent.contact.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

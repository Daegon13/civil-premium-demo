import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClassName } from "@/components/ui/Button";
import { siteContent } from "@/content/siteContent";

export function FinalCTA() {
  return (
    <section className="theme-section section-close section-spacing section-density-low section-divider" id="contacto">
      <div className="site-container">
        <div className="panel panel-cta panel-clean p-8 sm:p-12">
          <SectionHeading
            eyebrow="Próximo paso"
            title="Si estás por definir una decisión de obra, conversemos"
            description="Una llamada breve alcanza para clarificar alcance, riesgo y próximos pasos antes de comprometer recursos."
            role="close"
          />

          <div className="mt-10 grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-3 text-[0.97rem] leading-relaxed text-[var(--color-text-muted)]">
              <p>1. Compartís contexto y objetivo del proyecto.</p>
              <p>2. Identificamos riesgos críticos y nivel de intervención.</p>
              <p>3. Definimos una ruta técnica concreta para avanzar.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link className={buttonClassName("primary")} href={siteContent.contact.calendlyLink} rel="noreferrer" target="_blank">
                {siteContent.cta.finalPrimary}
              </Link>
              <Link className={buttonClassName("ghost")} href={siteContent.contact.phoneLink} rel="noreferrer" target="_blank">
                {siteContent.cta.finalSecondary}
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-text-muted)]">
            <p>
              Contacto directo: {" "}
              <a className="text-[var(--color-text)] underline-offset-4 hover:underline" href={`mailto:${siteContent.contact.email}`}>
                {siteContent.contact.email}
              </a>
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

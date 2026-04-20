type ProcessStepProps = {
  step: string;
  title: string;
  detail: string;
  deliverable: string;
};

export function ProcessStep({ step, title, detail, deliverable }: ProcessStepProps) {
  return (
    <article className="block-flow fade-up rounded-[var(--radius-md)] p-5 sm:p-6" data-stagger={step}>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-secondary-strong)]">Fase {step}</p>
      <h3 className="mt-3 text-[1.06rem] font-semibold tracking-[-0.01em] text-[var(--color-text)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{detail}</p>
      <p className="mt-5 border-t border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-accent)_22%)] pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-secondary-strong)]">{deliverable}</p>
    </article>
  );
}

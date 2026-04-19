type ProcessStepProps = {
  step: string;
  title: string;
  detail: string;
  deliverable: string;
};

export function ProcessStep({ step, title, detail, deliverable }: ProcessStepProps) {
  return (
    <article className="card-lift fade-up rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5" data-stagger={step}>
      <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Fase {step}</p>
      <h3 className="mt-3 text-base font-medium text-[var(--color-text)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{detail}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">{deliverable}</p>
    </article>
  );
}

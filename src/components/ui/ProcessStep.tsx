type ProcessStepProps = {
  step: string;
  title: string;
  detail: string;
};

export function ProcessStep({ step, title, detail }: ProcessStepProps) {
  return (
    <article className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Fase {step}</p>
      <h3 className="mt-3 text-base font-medium text-[var(--color-text)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{detail}</p>
    </article>
  );
}

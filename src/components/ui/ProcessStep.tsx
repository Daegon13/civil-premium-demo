type ProcessStepProps = {
  step: string;
  title: string;
};

export function ProcessStep({ step, title }: ProcessStepProps) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Paso {step}</p>
      <p className="mt-2 text-sm font-medium text-[var(--color-text)]">{title}</p>
    </div>
  );
}

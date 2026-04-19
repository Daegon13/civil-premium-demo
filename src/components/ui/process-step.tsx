type ProcessStepProps = {
  index: number;
  title: string;
  description: string;
};

export function ProcessStep({ index, title, description }: ProcessStepProps) {
  return (
    <article className="grid gap-5 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-6 md:grid-cols-[auto_1fr] md:items-start">
      <p className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--line)] text-sm font-medium text-[var(--accent)]">
        {String(index).padStart(2, "0")}
      </p>
      <div>
        <h3 className="text-base font-semibold text-[var(--text)]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      </div>
    </article>
  );
}

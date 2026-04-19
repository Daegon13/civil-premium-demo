type MetricPillProps = {
  label: string;
  value: string;
};

export function MetricPill({ label, value }: MetricPillProps) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-surface)_86%,#ffffff_14%),var(--color-surface))] px-4 py-3.5">
      <p className="text-lg font-semibold tracking-[-0.015em] text-[var(--color-text)]">{value}</p>
      <p className="mt-1 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-[var(--color-accent-strong)]">{label}</p>
    </div>
  );
}

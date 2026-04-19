type MetricPillProps = {
  label: string;
  value: string;
};

export function MetricPill({ label, value }: MetricPillProps) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5">
      <p className="text-lg font-semibold tracking-[-0.01em] text-[var(--color-text)]">{value}</p>
      <p className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
}

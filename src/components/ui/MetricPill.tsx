type MetricPillProps = {
  label: string;
  value: string;
};

export function MetricPill({ label, value }: MetricPillProps) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3">
      <p className="text-lg font-semibold text-[var(--color-text)]">{value}</p>
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">{label}</p>
    </div>
  );
}

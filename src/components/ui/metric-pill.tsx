type MetricPillProps = {
  value: string;
  label: string;
};

export function MetricPill({ value, label }: MetricPillProps) {
  return (
    <article className="rounded-sm border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
      <p className="text-xl font-semibold text-[var(--text)]">{value}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{label}</p>
    </article>
  );
}

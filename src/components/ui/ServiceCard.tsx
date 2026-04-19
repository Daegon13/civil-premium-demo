type ServiceCardProps = {
  index: string;
  name: string;
  description: string;
  outcome: string;
};

export function ServiceCard({ index, name, description, outcome }: ServiceCardProps) {
  return (
    <article className="block-diagnostic technical-grid fade-up relative isolate overflow-hidden rounded-[var(--radius-lg)] p-6 sm:p-6" data-stagger={index}>
      <div className="relative z-10 space-y-4">
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">{index}</p>
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--color-text)]">{name}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        <p className="border-t border-[color-mix(in_srgb,var(--color-border)_78%,var(--color-accent)_22%)] pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">{outcome}</p>
      </div>
    </article>
  );
}

type ServiceCardProps = {
  index: string;
  name: string;
  description: string;
  outcome: string;
};

export function ServiceCard({ index, name, description, outcome }: ServiceCardProps) {
  return (
    <article className="panel technical-grid card-lift fade-up relative isolate overflow-hidden p-6" data-stagger={index}>
      <div className="relative z-10 space-y-4">
        <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">{index}</p>
        <h3 className="text-lg font-medium text-[var(--color-text)]">{name}</h3>
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{description}</p>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-accent-strong)]">{outcome}</p>
      </div>
    </article>
  );
}

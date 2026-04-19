type ServiceCardProps = {
  title: string;
  description: string;
  items: string[];
};

export function ServiceCard({ title, description, items }: ServiceCardProps) {
  return (
    <article className="rounded-sm border border-[var(--line)] bg-[var(--surface-alt)] p-6">
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      <ul className="mt-5 space-y-2 border-t border-[var(--line)] pt-4">
        {items.map((item) => (
          <li key={item} className="text-sm text-[var(--text)]">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

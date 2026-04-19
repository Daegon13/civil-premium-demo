type ServiceCardProps = {
  name: string;
};

export function ServiceCard({ name }: ServiceCardProps) {
  return (
    <article className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
      <h3 className="text-base font-medium text-[var(--color-text)]">{name}</h3>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Bloque placeholder para oferta comercial.</p>
    </article>
  );
}

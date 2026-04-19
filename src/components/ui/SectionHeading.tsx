type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-[var(--color-muted)] sm:text-base">{description}</p> : null}
    </header>
  );
}

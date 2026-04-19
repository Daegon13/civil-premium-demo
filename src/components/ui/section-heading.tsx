type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="max-w-3xl space-y-4">
      <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="text-pretty text-base text-[var(--muted)]">{description}</p> : null}
    </header>
  );
}

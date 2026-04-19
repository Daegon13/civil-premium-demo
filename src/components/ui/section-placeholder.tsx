type SectionPlaceholderProps = {
  id: string;
  title: string;
};

export function SectionPlaceholder({ id, title }: SectionPlaceholderProps) {
  return (
    <section id={id} className="border-b border-white/10 py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-lg font-semibold tracking-wide text-white/80">{title}</h2>
      </div>
    </section>
  );
}

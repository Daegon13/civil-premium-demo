import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <header className={cn("space-y-4", align === "center" && "mx-auto text-center") }>
      {eyebrow ? (
        <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">{eyebrow}</p>
      ) : null}
      <h2 className="max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[var(--color-text)] sm:text-[2rem] lg:text-[2.2rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-[var(--color-text-muted)] sm:text-base">{description}</p>
      ) : null}
    </header>
  );
}

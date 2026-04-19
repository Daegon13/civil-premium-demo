import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <header className={cn("space-y-3", align === "center" && "mx-auto text-center") }>
      {eyebrow ? (
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">{eyebrow}</p>
      ) : null}
      <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-[-0.015em] text-[var(--color-text)] sm:text-3xl lg:text-[2.05rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-sm text-[var(--color-text-muted)] sm:text-base">{description}</p>
      ) : null}
    </header>
  );
}

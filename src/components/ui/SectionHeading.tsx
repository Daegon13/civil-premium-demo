import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  refCode?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", refCode = "LÁM. TEC" }: SectionHeadingProps) {
  return (
    <header className={cn("space-y-4", align === "center" && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="hidden h-px w-14 bg-[color-mix(in_srgb,var(--color-accent)_56%,transparent)] sm:block" />
        {eyebrow ? (
          <p className="text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-secondary-strong)]">{eyebrow}</p>
        ) : null}
        <span className="h-4 w-px bg-[color-mix(in_srgb,var(--color-border-strong)_62%,transparent)]" />
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.19em] text-[color-mix(in_srgb,var(--color-text-muted)_78%,transparent)]">
          {refCode}
        </p>
      </div>

      <h2 className="max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[var(--color-text)] sm:text-[2rem] lg:text-[2.2rem]">
        {title}
      </h2>

      <div className={cn("flex items-center gap-2.5 text-[0.57rem] font-medium uppercase tracking-[0.17em] text-[var(--color-text-muted)]", align === "center" && "justify-center")}>
        <span>Ref · 01</span>
        <span className="h-3 w-px bg-[color-mix(in_srgb,var(--color-border)_80%,transparent)]" />
        <span>Esc 1:125</span>
        <span className="h-3 w-px bg-[color-mix(in_srgb,var(--color-border)_80%,transparent)]" />
        <span>Δ ± 2 mm</span>
      </div>

      {description ? (
        <p className="max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-[var(--color-text-muted)] sm:text-base">{description}</p>
      ) : null}
    </header>
  );
}

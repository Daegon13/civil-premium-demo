import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  refCode?: string;
  role?: "default" | "core" | "close";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  refCode = "LÁM. TEC",
  role = "default",
}: SectionHeadingProps) {
  const isCore = role === "core";
  const isClose = role === "close";

  return (
    <header className={cn("space-y-4", isCore && "space-y-3", align === "center" && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="hidden h-px w-14 bg-[color-mix(in_srgb,var(--color-accent)_56%,transparent)] sm:block" />
        {eyebrow ? (
          <p
            className={cn(
              "text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-secondary-strong)]",
              isClose && "tracking-[0.2em] text-[var(--color-text-muted)]",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <span className="h-4 w-px bg-[color-mix(in_srgb,var(--color-border-strong)_62%,transparent)]" />
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.19em] text-[color-mix(in_srgb,var(--color-text-muted)_78%,transparent)]">
          {refCode}
        </p>
      </div>

      <h2
        className={cn(
          "max-w-3xl text-balance text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.024em] text-[var(--color-text)] sm:text-[2.2rem] lg:text-[2.4rem]",
          isCore && "text-[1.65rem] leading-[1.12] sm:text-[1.9rem] lg:text-[2.1rem]",
          isClose && "max-w-2xl text-[1.35rem] leading-[1.22] sm:text-[1.55rem] lg:text-[1.72rem]",
        )}
      >
        {title}
      </h2>

      {isClose ? null : (
        <div
          className={cn(
            "flex items-center gap-2.5 text-[0.57rem] font-medium uppercase tracking-[0.17em] text-[var(--color-text-muted)]",
            isCore && "text-[0.54rem] tracking-[0.16em]",
            align === "center" && "justify-center",
          )}
        >
          <span>Ref · 01</span>
          <span className="h-3 w-px bg-[color-mix(in_srgb,var(--color-border)_80%,transparent)]" />
          <span>Esc 1:125</span>
          <span className="h-3 w-px bg-[color-mix(in_srgb,var(--color-border)_80%,transparent)]" />
          <span>Δ ± 2 mm</span>
        </div>
      )}

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-[1rem] leading-relaxed text-[var(--color-text-muted)] sm:text-[1.06rem]",
            isCore && "text-[0.92rem] sm:text-[0.98rem]",
            isClose && "max-w-xl text-[0.98rem] leading-[1.8] sm:text-[1.04rem]",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

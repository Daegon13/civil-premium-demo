import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border px-5 py-3 text-sm font-medium tracking-[0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#12161c] shadow-[0_10px_26px_-18px_rgba(176,192,209,0.9)] hover:-translate-y-[1px] hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)]",
        variant === "secondary" &&
          "border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:-translate-y-[1px] hover:border-[var(--color-border-strong)] hover:bg-[color-mix(in_srgb,var(--color-surface-muted)_85%,black)]",
        variant === "ghost" &&
          "border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:-translate-y-[1px] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)]",
        className,
      )}
      {...props}
    />
  );
}

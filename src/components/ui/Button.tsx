import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-md)] border px-5 py-3 text-sm font-medium tracking-[0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#12161c] hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)]",
        variant === "secondary" &&
          "border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-surface-muted)_85%,black)]",
        variant === "ghost" &&
          "border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]",
        className,
      )}
      {...props}
    />
  );
}

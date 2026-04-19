import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-md)] border px-5 py-3 text-sm font-medium transition-colors",
        variant === "primary"
          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#0E141B] hover:bg-[var(--color-accent-strong)]"
          : "border-[var(--color-line)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]",
        className,
      )}
      {...props}
    />
  );
}

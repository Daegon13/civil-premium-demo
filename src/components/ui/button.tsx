type ButtonVariant = "primary" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex h-11 items-center justify-center rounded-sm border px-5 text-sm font-medium tracking-[0.06em] uppercase transition-colors";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[var(--accent)] bg-[var(--accent)] text-[#0f1216] hover:bg-[#b4c4d4] hover:border-[#b4c4d4]",
  ghost:
    "border-[var(--line)] bg-transparent text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
};

export function Button({ children, href = "#", variant = "primary" }: ButtonProps) {
  return (
    <a href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </a>
  );
}

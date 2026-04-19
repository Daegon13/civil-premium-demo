export function GridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-border)_42%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-border)_42%,transparent)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-border-strong)_26%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-border-strong)_24%,transparent)_1px,transparent_1px)] bg-[size:120px_120px] opacity-45" />

      <div className="absolute left-0 right-0 top-[16%] border-t border-dashed border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] opacity-70" />
      <div className="absolute bottom-[20%] left-0 right-0 border-t border-dashed border-[color-mix(in_srgb,var(--color-accent)_42%,transparent)] opacity-60" />
      <div className="absolute bottom-0 top-0 left-[24%] border-l border-dashed border-[color-mix(in_srgb,var(--color-accent)_46%,transparent)] opacity-65" />
      <div className="absolute bottom-0 top-0 right-[18%] border-l border-dashed border-[color-mix(in_srgb,var(--color-accent)_36%,transparent)] opacity-55" />

      <div className="absolute left-[24%] top-[15.5%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_74%,white_26%)] bg-[var(--color-surface)]" />
      <div className="absolute right-[18%] bottom-[20%] h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_70%,white_30%)] bg-[var(--color-surface)]" />

      <div className="absolute left-[2.5%] top-[15%] text-[0.54rem] font-medium uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-text-muted)_76%,transparent)]">
        EJE +3.20
      </div>
      <div className="absolute bottom-[2.5%] right-[3%] text-[0.54rem] font-medium uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-text-muted)_76%,transparent)]">
        COTA -0.00
      </div>
    </div>
  );
}

import { GridOverlay } from "@/components/visual/GridOverlay";

export function HeroStructureVisual() {
  return (
    <div className="technical-grid relative min-h-80 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
      <GridOverlay />
      <div className="relative z-10 grid h-full grid-cols-2 gap-3">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]/75" />
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
        <div className="col-span-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)]/55" />
      </div>
    </div>
  );
}

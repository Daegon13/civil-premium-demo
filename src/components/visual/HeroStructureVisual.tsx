import { GridOverlay } from "@/components/visual/GridOverlay";

export function HeroStructureVisual() {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
      <GridOverlay />
      <div className="relative z-10 h-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[linear-gradient(155deg,rgba(127,164,200,0.14)_0%,rgba(127,164,200,0)_60%)]" />
    </div>
  );
}

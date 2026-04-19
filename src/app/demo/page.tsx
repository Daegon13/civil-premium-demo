import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { ProblemsSolved } from "@/components/sections/ProblemsSolved";
import { Process } from "@/components/sections/Process";
import { ProjectTypes } from "@/components/sections/ProjectTypes";
import { Services } from "@/components/sections/Services";
import { TrustBlock } from "@/components/sections/TrustBlock";

export const metadata: Metadata = {
  title: "Versión demo",
  description: "Variante demo preparada para presentaciones comerciales y capturas de portafolio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function DemoPage() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="site-container pt-6">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-surface-muted)_85%,black)] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[var(--color-accent-strong)] sm:text-sm">
            Demo comercial · versión lista para reels y capturas
          </div>
        </section>
        <Hero />
        <ProblemsSolved />
        <Services />
        <Process />
        <ProjectTypes />
        <TrustBlock />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

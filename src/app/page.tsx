import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemsSection } from "@/components/sections/problems-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectTypesSection } from "@/components/sections/project-types-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TrustSection } from "@/components/sections/trust-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemsSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectTypesSection />
        <TrustSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { ProblemsSolved } from "@/components/sections/ProblemsSolved";
import { Process } from "@/components/sections/Process";
import { ProjectTypes } from "@/components/sections/ProjectTypes";
import { Services } from "@/components/sections/Services";
import { TrustBlock } from "@/components/sections/TrustBlock";

export default function HomePage() {
  return (
    <div className="site-shell">
      <Header />
      <main>
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

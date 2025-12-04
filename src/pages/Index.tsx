import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  // Skills data - will be populated from database once connected
  const skills = [
    {
      id: "1",
      name: "Data Analytics",
      description: "Turn raw project and operational data into actionable insights: cost trends, productivity metrics, and reporting that guides decisions.",
      category: "Analysis"
    },
    {
      id: "2",
      name: "Marketing Strategy",
      description: "Design measurable strategies to grow digital presence, lead generation, and customer retention for construction and small business services.",
      category: "Marketing"
    },
    {
      id: "3",
      name: "Small Business Consulting",
      description: "Practical, budget-aware consulting to optimize operations, pricing, and market fit for local SMEs.",
      category: "Small Business Consulting"
    },
    {
      id: "4",
      name: "Product Strategy",
      description: "Roadmap and feature prioritization to transform service ideas into repeatable products and revenue streams.",
      category: "Product Strategy"
    },
    {
      id: "5",
      name: "Marketing Campaigns",
      description: "Plan and execute campaigns across social and digital channels to attract clients and build brand trust.",
      category: "Marketing"
    }
  ];
  const certificates: never[] = [];
  const projects: never[] = [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection skills={skills} />
        <CertificatesSection certificates={certificates} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

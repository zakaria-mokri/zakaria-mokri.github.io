import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/portfolio/SiteNav";
import { Hero } from "@/components/portfolio/Hero";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { CertificationsVault } from "@/components/portfolio/CertificationsVault";
import { SkillsMatrix } from "@/components/portfolio/SkillsMatrix";
import { ContactSection, SiteFooter } from "@/components/portfolio/ContactSection";
import { portfolioData } from "@/data/portfolioData";

const title = `${portfolioData.profile.name} — Software Engineer & IT Management`;
const description =
  "Portfolio of a Software Engineer and IT Management specialist: experience timeline, certifications vault, skills matrix and direct contact.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <ExperienceTimeline />
        <ProjectsSection />
        <EducationSection />
        <CertificationsVault />
        <SkillsMatrix />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

import { ContactSection } from "@/components/sections/contact-section";
import { AnimatedTimeline } from "@/components/sections/animated-timeline";
import { AnimatedHero } from "@/components/sections/animated-hero";
import { AnimatedCertifications } from "@/components/sections/animated-certifications";
import { AnimatedSkills } from "@/components/sections/animated-skills";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <AnimatedHero />

      {/* Certifications Section */}
      <AnimatedCertifications />

      {/* Skills Section */}
      <AnimatedSkills />

      {/* Timeline Section */}
      <AnimatedTimeline />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}

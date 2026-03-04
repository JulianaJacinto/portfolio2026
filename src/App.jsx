import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillSection";
import ProjectsSection from "./components/ProjectsSection";
import JourneySection from "./components/Journeysection";
import ContactSection from "./components/ContactSection";
import ServiceSection from "./components/ServiceSection";

import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <SkillsSection />
      <ServiceSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />

      <ScrollToTop /> 
    </>
  );
}
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import About from "./components/AboutSection";
import Skills from "./components/SkillSection";
import Projects from "./components/ProjectsSection";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
    </div>
  )
}

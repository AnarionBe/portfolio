import { NavBar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Experience } from "./components/experience";
import portfolioData from "../portfolio-data.json";

function App() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-background text-foreground">
      <NavBar />
      <Hero data={portfolioData.hero} />
      <Skills data={portfolioData.skills} projects={portfolioData.projects} />
      <Projects data={portfolioData.projects} allSkills={portfolioData.skills} />
      <Experience data={portfolioData.experience} />
    </div>
  );
}

export default App;

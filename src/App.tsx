import { NavBar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Experience } from "./components/experience";
import portfolioData from "../portfolio-data.json";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <Hero data={portfolioData.hero} />
        <Skills data={portfolioData.skills} />
        <Projects data={portfolioData.projects} />
        <Experience data={portfolioData.experience} />
      </main>
    </div>
  );
}

export default App;

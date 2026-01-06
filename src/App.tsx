import { useState } from "react";
import { NavBar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Experience } from "./components/experience";
import { usePortfolioData } from "./hooks/use-portfolio-data";

interface Project {
  title: string;
  shortDescription: string;
  longDescription: string;
  skills: string[];
  image?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const portfolioData = usePortfolioData();

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-background text-foreground">
      <NavBar />
      <Hero data={portfolioData.hero} />
      <Skills
        data={portfolioData.skills}
        tools={portfolioData.tools}
        languages={portfolioData.languages}
        softSkills={portfolioData.soft_skills}
        projects={portfolioData.projects}
        onProjectClick={setSelectedProject}
      />
      <Projects
        data={portfolioData.projects}
        allSkills={portfolioData.skills}
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
      />
      <Experience
        data={portfolioData.experience}
        allSkills={portfolioData.skills}
        allProjects={portfolioData.projects}
        onProjectClick={setSelectedProject}
      />
    </div>
  );
}

export default App;

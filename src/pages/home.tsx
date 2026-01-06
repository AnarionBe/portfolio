import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { Hero } from "../components/hero";
import { Skills } from "../components/skills";
import { Projects } from "../components/projects";
import { Experience } from "../components/experience";
import { Passions } from "../components/passions";
import { usePortfolioData } from "../hooks/use-portfolio-data";

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

export function Home() {
  const navigate = useNavigate();
  const portfolioData = usePortfolioData();

  const handleProjectClick = (project: Project) => {
    const projectSlug = project.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/project/${projectSlug}`);
  };

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
        onProjectClick={handleProjectClick}
      />
      <Projects
        data={portfolioData.projects}
        allSkills={portfolioData.skills}
        selectedProject={null}
        onProjectSelect={handleProjectClick}
      />
      <Experience
        data={portfolioData.experience}
        allSkills={portfolioData.skills}
        allProjects={portfolioData.projects}
        onProjectClick={handleProjectClick}
      />
      <Passions data={portfolioData.passions} />
    </div>
  );
}

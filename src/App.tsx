import { useState } from "react";
import { NavBar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Experience } from "./components/experience";
import { Passions } from "./components/passions";
import { ProjectModal } from "./components/project-modal";
import { usePortfolioData } from "./hooks/use-portfolio-data";
// import { MusicPlayer } from "./components/music-player";
// import portfolioDataMain from "../portfolio-data.json";

interface Project {
  title: string;
  shortDescription: string;
  longDescription: string;
  skills: string[];
  image?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  responsabilities?: string[];
  achievements?: string[];
}

function App() {
  const portfolioData = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
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
          selectedProject={selectedProject}
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

      <ProjectModal
        project={selectedProject}
        allSkills={portfolioData.skills}
        onClose={handleCloseModal}
      />

      {/* <MusicPlayer playlistId={portfolioDataMain.music.youtubePlaylistId} /> */}
    </>
  );
}

export default App;

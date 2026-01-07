import { useState, useEffect, useRef } from "react";
import { NavBar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Skills } from "./components/skills";
import { Projects } from "./components/projects";
import { Experience } from "./components/experience";
import { Passions } from "./components/passions";
import { Footer } from "./components/footer";
import { ProjectModal } from "./components/project-modal";
import { ScrollNavButton } from "./components/scroll-nav-button";
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
  const [currentSection, setCurrentSection] = useState("home");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sections = ["home", "skills", "projects", "experience", "passions"];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNavigate = (direction: "up" | "down") => {
    const currentIndex = sections.indexOf(currentSection);
    let targetIndex = currentIndex;

    if (direction === "up" && currentIndex > 0) {
      targetIndex = currentIndex - 1;
    } else if (direction === "down" && currentIndex < sections.length - 1) {
      targetIndex = currentIndex + 1;
    }

    const targetSection = document.getElementById(sections[targetIndex]);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hide browser UI on mobile on page load
  useEffect(() => {
    // Delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      // Scroll down slightly to hide the browser UI on mobile
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.scrollTo(0, 1);
        // Force a reflow
        scrollContainer.scrollTop = 1;
      }
      window.scrollTo(0, 1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Get all sections
    const sectionElements = scrollContainer.querySelectorAll("section[id]");

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update URL when section is in view (more than 50% visible)
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.getAttribute("id");
            if (sectionId) {
              // Update URL without scrolling
              window.history.replaceState(null, "", `#${sectionId}`);
              // Update current section state
              setCurrentSection(sectionId);
            }
          }
        });
      },
      {
        root: scrollContainer,
        threshold: [0, 0.5, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    // Observe all sections
    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll snap-y snap-proximity bg-background text-foreground"
      >
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
          experiences={portfolioData.experience}
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

      {/* Footer - shown when on last section */}
      {currentSection === "passions" && (
        <div className="fixed bottom-0 left-0 right-0 z-30">
          <Footer data={portfolioData.hero} />
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        allSkills={portfolioData.skills}
        experiences={portfolioData.experience}
        onClose={handleCloseModal}
      />

      <ScrollNavButton
        currentSection={currentSection}
        sections={sections}
        onNavigate={handleNavigate}
      />

      {/* <MusicPlayer playlistId={portfolioDataMain.music.youtubePlaylistId} /> */}
    </>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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

// Type definition for Visual Viewport API
interface VisualViewportAPI {
  height: number;
  width: number;
  offsetTop: number;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}

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
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState("home");
  const [viewportHeight, setViewportHeight] = useState("100dvh");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Detect and fix mobile viewport issues
  useEffect(() => {
    const updateViewportHeight = () => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // On mobile, detect if browser UI is affecting viewport
        const visualViewport = (
          window as unknown as { visualViewport?: VisualViewportAPI }
        ).visualViewport;
        if (visualViewport) {
          // Use Visual Viewport API if available (most reliable)
          setViewportHeight(`${visualViewport.height}px`);
        } else {
          // Fallback: test if 100vh is accurate
          const testElement = document.createElement("div");
          testElement.style.cssText =
            "position:fixed; top:0; left:0; width:100%; height:100vh; pointer-events:none;";
          document.body.appendChild(testElement);

          setTimeout(() => {
            const actualHeight = testElement.offsetHeight;
            const windowHeight = window.innerHeight;

            // If there's a significant difference, browser UI is interfering
            if (Math.abs(actualHeight - windowHeight) > 50) {
              setViewportHeight(`${window.innerHeight}px`);
            } else {
              setViewportHeight("100dvh");
            }

            document.body.removeChild(testElement);
          }, 100);
        }
      } else {
        // On desktop, use 100dvh
        setViewportHeight("100dvh");
      }
    };

    updateViewportHeight();

    // Listen for viewport changes (browser UI appearance/disappearance)
    const handleViewportChange = () => {
      setTimeout(updateViewportHeight, 100);
    };

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);

    // Listen for Visual Viewport API changes
    const visualViewport = (
      window as unknown as { visualViewport?: VisualViewportAPI }
    ).visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", handleViewportChange);
    }

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
      if (visualViewport) {
        visualViewport.removeEventListener("resize", handleViewportChange);
      }
    };
  }, []);

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
        className="h-full overflow-y-scroll snap-y snap-proximity bg-background text-foreground"
        style={{ height: viewportHeight }}
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

      {/* Scroll down arrow - only show on hero section on desktop */}
      {currentSection === "home" && (
        <a
          href="#skills"
          className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 md:gap-2 text-primary/70 hover:text-primary transition-colors duration-200 animate-bounce z-20"
        >
          <span className="text-xs md:text-sm">{t("hero.scrollDown", "Scroll Down")}</span>
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      )}

      {/* <MusicPlayer playlistId={portfolioDataMain.music.youtubePlaylistId} /> */}
    </>
  );
}

export default App;

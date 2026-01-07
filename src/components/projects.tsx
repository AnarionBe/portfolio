import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./card";
import { TypingAnimation } from "./typing-animation";
import { useInView } from "../hooks/use-in-view";

interface Project {
  title: string;
  company?: string;
  shortDescription: string;
  longDescription: string;
  skills: string[];
  image?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface Experience {
  slug?: string;
  company: string;
}

interface ProjectsProps {
  data: Project[];
  experiences: Experience[];
  selectedProject?: Project | null;
  onProjectSelect?: (project: Project) => void;
}

export function Projects({ data, experiences, onProjectSelect }: ProjectsProps) {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isInView]);

  const getCompanyName = (companySlug?: string) => {
    if (!companySlug) return null;
    const experience = experiences.find((exp) => exp.slug === companySlug);
    return experience?.company;
  };

  return (
    <section
      id="projects"
      className="h-screen snap-start flex flex-col px-6 py-24"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <div
          ref={ref}
          className="space-y-2 sticky top-0 bg-background z-10 pb-4 md:pb-6"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
            <span className="text-primary">03.</span>{" "}
            <TypingAnimation
              text={`<${t("projects.title")} />`}
              startTyping={isInView}
              speed={80}
            />
          </h2>
          <div className="h-1 w-48 md:w-96 bg-neutral"></div>
        </div>

        <div
          ref={scrollContainerRef}
          className="space-y-12 flex-1 overflow-y-auto pr-4"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.map((project) => (
              <div
                key={project.title}
                onClick={() => onProjectSelect?.(project)}
                className="relative cursor-pointer h-full"
              >
                <Card
                  hover
                  image={project.image}
                  imageAlt={project.title}
                  className="h-full"
                >
                  <div className="flex flex-col h-full">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      {getCompanyName(project.company) && (
                        <p className="text-xs md:text-sm text-primary/70 mt-1">
                          {getCompanyName(project.company)}
                        </p>
                      )}
                    </div>

                    <p className="text-foreground/80 text-xs md:text-sm mt-3 md:mt-4 flex-1">
                      {project.shortDescription}
                    </p>

                    <div className="pt-3 md:pt-4">
                      <span className="text-sm md:text-base text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                        {t("projects.viewDetails")}
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

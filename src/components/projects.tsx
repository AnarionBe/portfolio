import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./card";
import { TypingAnimation } from "./typing-animation";
import { useInView } from "../hooks/use-in-view";

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

interface ProjectsProps {
  data: Project[];
  allSkills: Array<{
    slug: string;
    name: string;
    level: string;
    icon: string;
  }>;
  selectedProject?: Project | null;
  onProjectSelect?: (project: Project) => void;
}

export function Projects({
  data,
  allSkills,
  onProjectSelect,
}: ProjectsProps) {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isInView]);

  const getSkillDetails = (skillSlug: string) => {
    return allSkills.find((skill) => skill.slug === skillSlug);
  };

  return (
    <section
      id="projects"
      className="h-screen snap-start flex flex-col px-6 py-24"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <div ref={ref} className="space-y-2 sticky top-0 bg-background z-10 pb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            <span className="text-primary">03.</span>{" "}
            <TypingAnimation
              text={`<${t('projects.title')} />`}
              startTyping={isInView}
              speed={80}
            />
          </h2>
          <div className="h-1 w-96 bg-neutral"></div>
        </div>

        <div ref={scrollContainerRef} className="space-y-12 flex-1 overflow-y-auto pr-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((project) => (
              <div
                key={project.title}
                onClick={() => onProjectSelect?.(project)}
                className="relative cursor-pointer"
              >
                <Card
                  hover
                  image={project.image}
                  imageAlt={project.title}
                  className="h-full"
                >
                  <div className="flex flex-col h-full space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>

                    <p className="text-foreground/80 grow text-sm">
                      {project.shortDescription}
                    </p>

                    <div className="pt-2">
                      <span className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                        {t('projects.viewDetails')}
                        <svg
                          className="w-4 h-4"
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

                {/* Technology tags over the image */}
                {project.image && (
                  <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                    {project.skills.map((skillSlug) => {
                      const skill = getSkillDetails(skillSlug);
                      return (
                        <span
                          key={skillSlug}
                          className="text-xs px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-primary border border-primary/30 shadow-lg"
                        >
                          {skill?.name || skillSlug}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

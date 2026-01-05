import { useState } from "react";
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
    name: string;
    level: string;
    icon: string;
  }>;
}

export function Projects({ data, allSkills }: ProjectsProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const getSkillDetails = (skillName: string) => {
    return allSkills.find(skill => skill.name === skillName);
  };

  return (
    <>
      <section id="projects" className="h-screen snap-start overflow-y-auto px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-12">
            <div ref={ref} className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                <span className="text-primary">03.</span>{" "}
                <TypingAnimation text="<Projects />" startTyping={isInView} speed={80} />
              </h2>
              <div className="h-1 w-96 bg-neutral"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((project) => (
                <div
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                >
                  <Card
                    hover
                    image={project.image}
                    imageAlt={project.title}
                    className="cursor-pointer h-full"
                  >
                    <div className="flex flex-col h-full space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        {project.title}
                      </h3>

                      <p className="text-foreground/80 grow text-sm">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skillName) => {
                          return (
                            <span
                              key={skillName}
                              className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/30"
                            >
                              {skillName}
                            </span>
                          );
                        })}
                      </div>

                      <div className="pt-2">
                        <span className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                          View Details
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button positioned over the image */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors text-xl border border-neutral/30"
            >
              ✕
            </button>

            <Card image={selectedProject.image} imageAlt={selectedProject.title}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  {selectedProject.title}
                </h2>

                <p className="text-foreground/90 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Image Gallery */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Project Screenshots
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject.images.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group border border-neutral/30 hover:border-primary/50 transition-all duration-300"
                          onClick={() => setFullscreenImage(img)}
                        >
                          <img
                            src={img}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.skills.map((skillName) => {
                      const skill = getSkillDetails(skillName);
                      return (
                        <div
                          key={skillName}
                          className="px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/30 flex items-center gap-2"
                        >
                          <span className="font-medium">{skillName}</span>
                          {skill && (
                            <span className="text-xs text-foreground/60">
                              {skill.level}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      className="px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-60 flex items-center justify-center p-6"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors text-2xl border border-neutral/30"
          >
            ✕
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

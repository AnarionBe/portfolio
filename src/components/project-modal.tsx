import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./card";

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
  responsabilities?: string[];
  achievements?: string[];
}

interface Skill {
  slug: string;
  name: string;
  level: string;
  icon: string;
}

interface Experience {
  slug?: string;
  company: string;
}

interface ProjectModalProps {
  project: Project | null;
  allSkills: Skill[];
  experiences: Experience[];
  onClose: () => void;
}

export function ProjectModal({ project, allSkills, experiences, onClose }: ProjectModalProps) {
  const { t } = useTranslation();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  if (!project) return null;

  const getSkillDetails = (skillSlug: string) => {
    return allSkills.find((skill) => skill.slug === skillSlug);
  };

  const getCompanyName = (companySlug?: string) => {
    if (!companySlug) return null;
    const experience = experiences.find((exp) => exp.slug === companySlug);
    return experience?.company;
  };

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div
          className="max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors text-xl border border-neutral/30"
          >
            ✕
          </button>

          <Card image={project.image} imageAlt={project.title}>
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {project.title}
                </h1>
                {getCompanyName(project.company) && (
                  <p className="text-lg text-primary/80 mt-2">
                    {getCompanyName(project.company)}
                  </p>
                )}
              </div>

              <p
                className="text-foreground/90 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              ></p>

              {/* Responsibilities */}
              {project.responsabilities && project.responsabilities.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {t("projects.responsibilities")}
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {project.responsabilities.map((responsibility, index) => (
                      <li key={index} className="text-foreground/80 text-lg">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {t("projects.achievements")}
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {project.achievements.map((achievement, index) => (
                      <li key={index} className="text-foreground/80 text-lg">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Image Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {t("projects.screenshots", "Project Screenshots")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group border border-neutral/30 hover:border-primary/50 transition-all duration-300"
                        onClick={() => setFullscreenImage(img)}
                      >
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${index + 1}`}
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
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("projects.technologies")}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.skills.map((skillSlug) => {
                    const skill = getSkillDetails(skillSlug);
                    return (
                      <div
                        key={skillSlug}
                        className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/30 flex items-center gap-2"
                      >
                        <span className="font-medium">
                          {skill?.name || skillSlug}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projects.github")}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projects.liveDemo")}
                  </a>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-[60] flex items-center justify-center p-6"
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

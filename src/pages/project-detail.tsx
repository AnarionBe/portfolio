import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/card";
import { usePortfolioData } from "../hooks/use-portfolio-data";

export function ProjectDetail() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const portfolioData = usePortfolioData();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Find the project by converting title to slug format
  const project = portfolioData.projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === projectId
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Project Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const getSkillDetails = (skillSlug: string) => {
    return portfolioData.skills.find((skill) => skill.slug === skillSlug);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-neutral">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-lg font-medium">{t("projects.back", "Back")}</span>
          </button>
        </div>
      </nav>

      {/* Project Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <Card
            image={project.image}
            imageAlt={project.title}
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {project.title}
              </h1>

              <p className="text-foreground/90 leading-relaxed text-lg">
                {project.longDescription}
              </p>

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
    </div>
  );
}

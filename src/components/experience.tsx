import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./card";
import { TypingAnimation } from "./typing-animation";
import { useInView } from "../hooks/use-in-view";

interface Experience {
  slug?: string;
  company: string;
  position: string;
  period: string;
  location: string;
  shortDescription?: string;
  description: string[];
  technologies: string[];
  logo?: string;
  website?: string;
}

interface Project {
  slug?: string;
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

interface ExperienceProps {
  data: Experience[];
  allSkills: Array<{
    slug: string;
    name: string;
    level: string;
    icon: string;
  }>;
  allProjects: Project[];
  onProjectClick?: (project: Project) => void;
}

export function Experience({
  data,
  allSkills,
  allProjects,
  onProjectClick,
}: ExperienceProps) {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [selectedExperience, setSelectedExperience] = useState<Experience>(
    data[0]
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isInView]);

  const getSkillName = (skillSlug: string) => {
    return (
      allSkills.find((skill) => skill.slug === skillSlug)?.name || skillSlug
    );
  };

  const getProjectsForExperience = (experience: Experience) => {
    // Find projects that belong to this company
    if (experience.slug) {
      return allProjects.filter(
        (project) => project.company === experience.slug
      );
    }
    // Fallback: match by company name if no slug
    return allProjects.filter(
      (project) =>
        project.company?.toLowerCase() === experience.company.toLowerCase()
    );
  };

  const getAllTechnologies = (experience: Experience) => {
    // Get all unique skill slugs from experience technologies and related projects
    const experienceTechs = (experience.technologies || []).map((tech) =>
      // Normalize to slug format (lowercase with underscores)
      tech.toLowerCase().replace(/\s+/g, "_").replace(/\./g, "_")
    );
    const projects = getProjectsForExperience(experience);
    const projectSkills = projects.flatMap((project) => project.skills || []);

    // Merge and deduplicate using Set
    const allTechs = [...new Set([...experienceTechs, ...projectSkills])];
    return allTechs;
  };

  const getAllDescriptions = (experience: Experience) => {
    // Combine experience descriptions with project responsibilities and achievements
    const experienceDescriptions = experience.description || [];
    const projects = getProjectsForExperience(experience);

    // Collect all responsibilities and achievements from projects
    const projectResponsibilities = projects.flatMap(
      (project) => project.responsabilities || []
    );
    const projectAchievements = projects.flatMap(
      (project) => project.achievements || []
    );

    // Merge all descriptions and deduplicate
    const allDescriptions = [
      ...experienceDescriptions,
      ...projectResponsibilities,
      ...projectAchievements,
    ];

    // Remove duplicates by converting to Set and back
    return [...new Set(allDescriptions)];
  };

  return (
    <>
      <section
        id="experience"
        className="h-screen snap-start flex flex-col px-6 py-20 pb-6 md:pb-24"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
          <div
            ref={ref}
            className="space-y-2 sticky top-0 bg-background z-10 pb-4 md:pb-6"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
              <span className="text-primary">04.</span>{" "}
              <TypingAnimation
                text={`<${t("experience.title")} />`}
                startTyping={isInView}
                speed={80}
              />
            </h2>
            <div className="h-1 w-48 md:w-96 bg-neutral"></div>
          </div>

          <div className="flex-1 flex lg:flex-row flex-col gap-8 overflow-hidden">
            {/* Mobile Select Dropdown */}
            <div className="lg:hidden w-full">
              <select
                value={selectedExperience.company}
                onChange={(e) => {
                  const selected = data.find(
                    (exp) => exp.company === e.target.value
                  );
                  if (selected) setSelectedExperience(selected);
                }}
                className="w-full px-4 py-3 text-sm bg-background/40 backdrop-blur-md border border-primary/30 text-foreground rounded-lg focus:outline-none focus:border-primary/50 transition-all duration-200"
              >
                {data.map((exp) => (
                  <option key={exp.company} value={exp.company}>
                    {exp.position} - {exp.company} ({exp.period})
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Timeline with periods */}
            <div className="hidden lg:block lg:w-auto w-full overflow-y-auto pr-4">
              <div className="relative">
                <div className="space-y-8 relative">
                  {/* Vertical timeline line - starts at first dot, ends at last dot */}
                  {data.length > 1 && (
                    <div
                      className="absolute right-0 w-px bg-primary/20"
                      style={{
                        top: "0.5rem",
                        bottom: "0.5rem",
                      }}
                    ></div>
                  )}

                  {data.map((exp) => (
                    <div
                      key={exp.company}
                      onClick={() => setSelectedExperience(exp)}
                      className={`relative pr-8 cursor-pointer group transition-all duration-300 text-right ${
                        selectedExperience.company === exp.company
                          ? ""
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute right-0 top-0 -mr-2 h-full flex items-start">
                        <div className="relative w-4 h-4 flex items-center justify-center mt-[0.4rem]">
                          {selectedExperience.company === exp.company && (
                            <div className="absolute w-6 h-6 rounded-full bg-primary/20 animate-pulse"></div>
                          )}
                          <div
                            className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                              selectedExperience.company === exp.company
                                ? "bg-primary border-2 border-background"
                                : "bg-background border-2 border-primary/40 group-hover:border-primary/50"
                            }`}
                          >
                            {selectedExperience.company === exp.company && (
                              <div className="w-1.5 h-1.5 rounded-full bg-background"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Period, Role, and Company */}
                      <div className="space-y-1">
                        <div
                          className={`text-xs font-medium transition-colors ${
                            selectedExperience.company === exp.company
                              ? "text-primary"
                              : "text-primary/70 group-hover:text-primary"
                          }`}
                        >
                          {exp.period}
                        </div>
                        <div
                          className={`text-sm font-semibold transition-colors ${
                            selectedExperience.company === exp.company
                              ? "text-foreground"
                              : "text-foreground/70 group-hover:text-foreground"
                          }`}
                        >
                          {exp.position}
                        </div>
                        <div
                          className={`text-xs transition-colors ${
                            selectedExperience.company === exp.company
                              ? "text-foreground/70"
                              : "text-foreground/60 group-hover:text-foreground/70"
                          }`}
                        >
                          {exp.company}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div
              className="flex-1 overflow-y-auto pr-4 pb-28 md:pb-0"
              ref={scrollContainerRef}
            >
              <Card>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          {selectedExperience.logo && (
                            <div className="shrink-0">
                              <img
                                src={selectedExperience.logo}
                                alt={`${selectedExperience.company} logo`}
                                className="w-16 h-16 object-contain rounded-lg bg-background/50 p-2 border border-neutral/30"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h2 className="text-3xl font-bold text-foreground">
                              {selectedExperience.position}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              {selectedExperience.website ? (
                                <a
                                  href={selectedExperience.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xl text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {selectedExperience.company}
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
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <p className="text-xl text-primary font-semibold">
                                  {selectedExperience.company}
                                </p>
                              )}
                            </div>
                            <p className="text-foreground/60">
                              {selectedExperience.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-foreground/60 bg-neutral/50 px-3 py-1 rounded whitespace-nowrap">
                        {selectedExperience.period}
                      </span>
                    </div>
                  </div>

                  {getAllDescriptions(selectedExperience).length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        Key Responsibilities & Achievements
                      </h3>
                      <ul className="space-y-2">
                        {getAllDescriptions(selectedExperience).map(
                          (item, i) => (
                            <li
                              key={i}
                              className="text-foreground/80 flex items-start gap-2"
                            >
                              <span className="text-primary -mt-0.5">▹</span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getAllTechnologies(selectedExperience).map(
                        (techSlug) => (
                          <span
                            key={techSlug}
                            className="text-sm bg-neutral/50 text-primary px-3 py-1.5 rounded-lg border border-neutral/30"
                          >
                            {getSkillName(techSlug)}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Related Projects */}
                  {getProjectsForExperience(selectedExperience).length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {t("experience.projects")}
                      </h3>
                      <div className="space-y-3">
                        {getProjectsForExperience(selectedExperience).map(
                          (project) => (
                            <div
                              key={project.title}
                              onClick={() => {
                                if (onProjectClick) {
                                  onProjectClick(project);
                                }
                              }}
                              className="relative bg-secondary/40 backdrop-blur-md border border-neutral/30 rounded-lg p-4 overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                            >
                              <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                  <h4 className="text-lg font-semibold text-foreground">
                                    {project.title}
                                  </h4>
                                  <p className="text-foreground/70 text-sm">
                                    {project.shortDescription}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {project.skills
                                      .slice(0, 3)
                                      .map((skillSlug: string) => (
                                        <span
                                          key={skillSlug}
                                          className="text-xs px-2 py-1 rounded bg-neutral/50 text-foreground/70 border border-neutral/30"
                                        >
                                          {getSkillName(skillSlug)}
                                        </span>
                                      ))}
                                    {project.skills.length > 3 && (
                                      <span className="text-xs text-foreground/60">
                                        +{project.skills.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

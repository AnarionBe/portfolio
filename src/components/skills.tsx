import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./card";
import { TypingAnimation } from "./typing-animation";
import { useInView } from "../hooks/use-in-view";
import * as SimpleIcons from "react-icons/si";

interface Skill {
  slug: string;
  name: string;
  level: string;
  icon: string;
}

interface Tool {
  name: string;
  level: string;
  icon?: string;
}

interface Language {
  name: string;
  level: string;
}

interface SoftSkill {
  name: string;
  description: string;
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
}

interface SkillsProps {
  data: Skill[];
  tools: Tool[];
  languages: Language[];
  softSkills: SoftSkill[];
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export function Skills({
  data,
  tools,
  languages,
  softSkills,
  projects,
  onProjectClick,
}: SkillsProps) {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isInView]);

  const getLevelColor = (level: string) => {
    const lvl = level.toLowerCase().split(".")[2];

    switch (lvl) {
      case "advanced":
        return "text-success";
      case "intermediate":
        return "text-info";
      case "beginner":
        return "text-warning";
      default:
        return "text-foreground/70";
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = SimpleIcons[iconName as keyof typeof SimpleIcons];
    return Icon ? <Icon className="w-12 h-12 text-primary" /> : null;
  };

  const getProjectsForSkill = (skillSlug: string) => {
    return projects.filter((project) => project.skills.includes(skillSlug));
  };

  const getLevelOrder = (level: string) => {
    const lvl = level.toLowerCase().split(".")[2];
    switch (lvl) {
      case "advanced":
        return 1;
      case "intermediate":
        return 2;
      case "beginner":
        return 3;
      default:
        return 4;
    }
  };

  const sortByLevel = <T extends { level: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => getLevelOrder(a.level) - getLevelOrder(b.level));
  };

  const sortedData = sortByLevel(data);
  const sortedTools = sortByLevel(tools);
  const sortedLanguages = sortByLevel(languages);

  return (
    <>
      <section
        id="skills"
        className="h-screen snap-start flex flex-col px-6 py-20 pb-6 md:pb-24"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
          <div
            ref={ref}
            className="space-y-2 sticky top-0 bg-background z-10 pb-4 md:pt-6 md:pb-6"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
              <span className="text-primary">02.</span>{" "}
              <TypingAnimation
                text={`<${t("skills.title")} />`}
                startTyping={isInView}
                speed={80}
              />
            </h2>
            <div className="h-1 w-48 md:w-96 bg-neutral"></div>
          </div>

          <div
            ref={scrollContainerRef}
            className="space-y-12 flex-1 overflow-y-auto pr-4 pb-28 md:pb-0"
          >
            {/* Technical Skills */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground/90">
                {t("skills.technical")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {sortedData.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    className="cursor-pointer"
                  >
                    <Card
                      hover
                      className="flex flex-col items-center text-center space-y-3"
                    >
                      <div className="flex items-center justify-center h-16">
                        {getIcon(skill.icon)}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm md:text-base font-semibold text-foreground">
                          {skill.name}
                        </h3>
                        <p className={`text-xs md:text-sm ${getLevelColor(skill.level)}`}>
                          {t(skill.level)}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground/90">
                {t("skills.tools")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTools.map((tool) => (
                  <Card key={tool.name}>
                    <div className="flex items-center gap-4">
                      {tool.icon && (
                        <div className="flex items-center justify-center w-12 h-12 shrink-0">
                          {getIcon(tool.icon)}
                        </div>
                      )}
                      <div className="flex flex-col space-y-1">
                        <h4 className="text-sm md:text-base font-semibold text-foreground">
                          {tool.name}
                        </h4>
                        <p className={`text-xs md:text-sm ${getLevelColor(tool.level)}`}>
                          {t(tool.level)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground/90">
                {t("skills.languages")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {sortedLanguages.map((language) => (
                  <Card key={language.name} className="flex flex-col space-y-1 md:space-y-2">
                    <h4 className="text-sm md:text-base font-semibold text-foreground">
                      {t(language.name)}
                    </h4>
                    <p className={`text-xs md:text-sm ${getLevelColor(language.level)}`}>
                      {t(language.level)}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground/90">
                {t("skills.softSkills")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {softSkills.map((softSkill) => (
                  <Card key={softSkill.name} className="space-y-1 md:space-y-2">
                    <h4 className="text-base md:text-lg font-semibold text-foreground">
                      {softSkill.name}
                    </h4>
                    <p className="text-xs md:text-sm text-foreground/70">
                      {softSkill.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Details Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors text-xl border border-neutral/30"
            >
              ✕
            </button>

            <Card>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    {selectedSkill.name}
                  </h2>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("skills.projectsUsing")} {selectedSkill.name}
                  </h3>

                  {getProjectsForSkill(selectedSkill.slug).length > 0 ? (
                    <div className="space-y-4">
                      {getProjectsForSkill(selectedSkill.slug).map(
                        (project) => (
                          <div
                            key={project.title}
                            onClick={() => {
                              if (onProjectClick) {
                                setSelectedSkill(null);
                                onProjectClick(project);
                              }
                            }}
                            className="relative bg-secondary/40 backdrop-blur-md border border-neutral/30 rounded-lg p-4 overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-4">
                                <h4 className="text-xl font-semibold text-foreground">
                                  {project.title}
                                </h4>
                              </div>
                              <p className="text-foreground/80 text-sm">
                                {project.shortDescription}
                              </p>
                              <div className="flex flex-wrap gap-2 pt-2">
                                {project.skills.map((skillSlug) => {
                                  const skill = data.find(
                                    (s) => s.slug === skillSlug
                                  );
                                  return (
                                    <span
                                      key={skillSlug}
                                      className={`text-xs px-2 py-1 rounded border ${
                                        skillSlug === selectedSkill.slug
                                          ? "bg-primary/20 text-primary border-primary/50"
                                          : "bg-neutral/50 text-foreground/70 border-neutral/30"
                                      }`}
                                    >
                                      {skill?.name || skillSlug}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-foreground/60 text-center py-8">
                      {t("skills.noProjects")} {selectedSkill.name}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { Card } from "./card";
import { TypingAnimation } from "./typing-animation";
import { useInView } from "../hooks/use-in-view";
import * as SimpleIcons from "react-icons/si";

interface Skill {
  name: string;
  level: string;
  icon: string;
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
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export function Skills({ data, projects, onProjectClick }: SkillsProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  const getProjectsForSkill = (skillName: string) => {
    return projects.filter((project) => project.skills.includes(skillName));
  };

  return (
    <>
      <section
        id="skills"
        className="h-screen snap-start overflow-y-auto px-6 py-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-12">
            <div ref={ref} className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                <span className="text-primary">02.</span>{" "}
                <TypingAnimation
                  text="<Skills />"
                  startTyping={isInView}
                  speed={80}
                />
              </h2>
              <div className="h-1 w-96 bg-neutral"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {data.map((skill) => (
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
                      <h3 className="font-semibold text-foreground">
                        {skill.name}
                      </h3>
                      <p className={`text-sm ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
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
                  <div className="flex items-center justify-center w-16 h-16">
                    {getIcon(selectedSkill.icon)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">
                      {selectedSkill.name}
                    </h2>
                    <p
                      className={`text-lg ${getLevelColor(
                        selectedSkill.level
                      )}`}
                    >
                      {selectedSkill.level}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Projects using {selectedSkill.name}
                  </h3>

                  {getProjectsForSkill(selectedSkill.name).length > 0 ? (
                    <div className="space-y-4">
                      {getProjectsForSkill(selectedSkill.name).map(
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
                                {project.skills.map((skillName) => (
                                  <span
                                    key={skillName}
                                    className={`text-xs px-2 py-1 rounded border ${
                                      skillName === selectedSkill.name
                                        ? "bg-primary/20 text-primary border-primary/50"
                                        : "bg-neutral/50 text-foreground/70 border-neutral/30"
                                    }`}
                                  >
                                    {skillName}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-foreground/60 text-center py-8">
                      No projects found using {selectedSkill.name}
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

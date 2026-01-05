import { Card } from "./card";
import { TypingAnimation } from "./typing-animation";
import { useInView } from "../hooks/use-in-view";
import * as SimpleIcons from "react-icons/si";

interface Skill {
  name: string;
  level: string;
  icon: string;
}

interface SkillsProps {
  data: Skill[];
}

export function Skills({ data }: SkillsProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

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

  return (
    <section id="skills" className="h-screen snap-start overflow-y-auto px-6 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <div ref={ref} className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              <span className="text-primary">02.</span>{" "}
              <TypingAnimation text="<Skills />" startTyping={isInView} speed={80} />
            </h2>
            <div className="h-1 w-96 bg-neutral"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((skill) => (
              <Card key={skill.name} hover className="flex flex-col items-center text-center space-y-3">
                <div className="flex items-center justify-center h-16">
                  {getIcon(skill.icon)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  <p className={`text-sm ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillsProps {
  data: Array<{
    title: string;
    skills: string[];
  }>;
}

export function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="h-screen snap-start overflow-y-auto px-6 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              <span className="text-primary">02.</span> {"<Skills />"}
            </h2>
            <div className="h-1 w-96 bg-neutral"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.map((category) => (
              <div
                key={category.title}
                className="bg-secondary border border-neutral rounded-lg p-6 space-y-4"
              >
                <h3 className="text-xl font-bold text-primary">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-foreground/70 flex items-center gap-2"
                    >
                      <span className="text-primary">▹</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

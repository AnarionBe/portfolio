interface ExperienceProps {
  data: Array<{
    company: string;
    position: string;
    period: string;
    description: string[];
    technologies: string[];
  }>;
}

export function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              <span className="text-primary">04.</span> Work Experience
            </h2>
            <div className="h-1 w-96 bg-neutral"></div>
          </div>

          <div className="space-y-8">
            {data.map((exp) => (
              <div
                key={exp.company}
                className="bg-secondary border border-neutral rounded-lg p-6 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {exp.position}
                    </h3>
                    <p className="text-foreground/80">{exp.company}</p>
                  </div>
                  <p className="text-foreground/60 text-sm">{exp.period}</p>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="text-foreground/70 flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-neutral text-primary px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

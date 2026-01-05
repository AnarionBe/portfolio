export function Experience() {
  const experiences = [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      period: "2023 - Present",
      description: [
        "Led development of customer-facing web applications serving 100K+ users",
        "Implemented modern React patterns and reduced bundle size by 40%",
        "Mentored junior developers and conducted code reviews",
        "Collaborated with design team to improve UI/UX consistency",
      ],
      technologies: ["React", "TypeScript", "Next.js", "AWS"],
    },
    {
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      period: "2021 - 2023",
      description: [
        "Built and maintained RESTful APIs handling 1M+ requests daily",
        "Developed responsive web applications using React and Vue.js",
        "Integrated third-party services and payment gateways",
        "Optimized database queries improving response time by 60%",
      ],
      technologies: ["Node.js", "React", "PostgreSQL", "Docker"],
    },
    {
      company: "StartUp Ventures",
      position: "Junior Web Developer",
      period: "2020 - 2021",
      description: [
        "Developed features for e-commerce platform using modern JavaScript",
        "Fixed bugs and improved application performance",
        "Participated in agile development process and daily standups",
        "Wrote unit tests achieving 80% code coverage",
      ],
      technologies: ["JavaScript", "Express", "MongoDB", "Jest"],
    },
  ];

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
            {experiences.map((exp, index) => (
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

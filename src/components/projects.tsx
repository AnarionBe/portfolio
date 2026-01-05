interface ProjectsProps {
  data: Array<{
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
  }>;
}

export function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              <span className="text-primary">03.</span> Projects
            </h2>
            <div className="h-1 w-96 bg-neutral"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((project) => (
              <div
                key={project.title}
                className="bg-secondary border border-neutral rounded-lg p-6 space-y-4 hover:border-primary transition-colors duration-200"
              >
                <h3 className="text-xl font-bold text-foreground">
                  {project.title}
                </h3>

                <p className="text-foreground/70 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-neutral text-primary px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-2">
                  <a
                    href={project.githubUrl}
                    className="text-foreground/70 hover:text-primary transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    className="text-foreground/70 hover:text-primary transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

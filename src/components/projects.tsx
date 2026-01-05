export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration using Stripe.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe API"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "Task Management Dashboard",
      description:
        "Real-time collaborative task management tool with drag-and-drop functionality, team collaboration features, and analytics dashboard.",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Socket.io"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "Weather Forecast App",
      description:
        "Modern weather application that provides accurate forecasts, interactive maps, and weather alerts using external weather APIs.",
      technologies: ["Vue.js", "Tailwind CSS", "Weather API", "Vercel"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

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
            {projects.map((project) => (
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

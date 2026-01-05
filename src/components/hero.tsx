interface HeroProps {
  data: {
    name: string;
    title: string;
    greeting: string;
    description: string;
  };
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      id="home"
      className="h-screen snap-start flex flex-col items-center justify-center px-6 pt-20 relative"
    >
      <div className="max-w-4xl w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-primary text-lg">{data.greeting}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              {data.name}
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground/60">
              {data.title}
            </h2>
          </div>

          <p className="text-foreground/70 text-lg max-w-2xl leading-relaxed">
            {data.description}
          </p>

          <div className="flex gap-4 pt-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              View My Work
            </a>
            <a
              href="#experience"
              className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
            >
              Experience
            </a>
          </div>
        </div>
      </div>

      <a
        href="#skills"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/70 hover:text-primary transition-colors duration-200 animate-bounce"
      >
        <span className="text-sm">Scroll Down</span>
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
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </section>
  );
}

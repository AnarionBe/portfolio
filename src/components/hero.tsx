export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="max-w-4xl w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-primary text-lg">Hi, my name is</p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Your Name
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground/60">
              I build things for the web
            </h2>
          </div>

          <p className="text-foreground/70 text-lg max-w-2xl leading-relaxed">
            I'm a web developer specializing in building exceptional digital
            experiences. Currently, I'm focused on building accessible,
            human-centered products using modern web technologies.
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
    </section>
  );
}

// import { useTranslation } from "react-i18next";

interface HeroProps {
  data: {
    name: string;
    title: string;
    greeting: string;
    description: string;
    email: string;
    phone: string;
    profileImage: string;
    socialLinks: {
      github: string;
      linkedin: string;
    };
  };
}

export function Hero({ data }: HeroProps) {
  // const { t } = useTranslation();
  console.log(data.profileImage);
  return (
    <section
      id="home"
      className="h-screen snap-start flex flex-col items-center justify-center px-6 pt-20 relative"
    >
      <div className="max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Profile Image */}
          <div className="shrink-0">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
              <img
                src={data.profileImage}
                alt={data.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <p className="text-primary text-lg">{data.greeting}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                {data.name}
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground/60">
                {data.title}
              </h2>
            </div>

            <p className="text-foreground/70 text-lg leading-relaxed">
              {data.description}
            </p>

            {/* Contact Information */}
            <div className="space-y-2">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{data.email}</span>
              </a>
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{data.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={data.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
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

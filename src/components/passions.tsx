import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "./card";
import { TypingAnimation } from "./typing-animation";
import { useInView } from "../hooks/use-in-view";

interface Passion {
  name: string;
  description: string;
  icon?: string;
  image?: string;
}

interface PassionsProps {
  data: Passion[];
}

export function Passions({ data }: PassionsProps) {
  const { t } = useTranslation();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isInView]);

  return (
    <section
      id="passions"
      className="h-screen snap-start flex flex-col px-6 py-24 pb-24 md:pb-24"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <div ref={ref} className="space-y-2 sticky top-0 bg-background z-10 pb-4 md:pb-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
            <span className="text-primary">05.</span>{" "}
            <TypingAnimation
              text={`<${t('passions.title')} />`}
              startTyping={isInView}
              speed={80}
            />
          </h2>
          <div className="h-1 w-48 md:w-96 bg-neutral"></div>
        </div>

        <div ref={scrollContainerRef} className="space-y-12 flex-1 overflow-y-auto pr-4 pb-24 md:pb-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.map((passion) => (
              <Card
                key={passion.name}
                image={passion.image}
                imageAlt={passion.name}
                className="h-full"
              >
                <div className="flex flex-col space-y-3 md:space-y-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    {passion.icon && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl md:text-2xl">
                        {passion.icon}
                      </div>
                    )}
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {passion.name}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                    {passion.description}
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

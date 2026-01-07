import { useState, useEffect } from "react";

interface ScrollNavButtonProps {
  currentSection: string;
  sections: string[];
  onNavigate: (direction: "up" | "down") => void;
}

export function ScrollNavButton({
  currentSection,
  sections,
  onNavigate,
}: ScrollNavButtonProps) {
  const [showButton, setShowButton] = useState(true);
  const currentIndex = sections.indexOf(currentSection);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;

  useEffect(() => {
    // Hide button on desktop (md and above)
    const checkScreenSize = () => {
      setShowButton(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!showButton) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Up arrow button - show if not first section */}
      {!isFirst && (
        <button
          onClick={() => onNavigate("up")}
          className="w-14 h-14 rounded-full bg-background/40 backdrop-blur-md border border-primary/30 text-primary shadow-lg hover:bg-background/60 hover:border-primary/50 transition-all duration-200 flex items-center justify-center active:scale-95"
          aria-label="Scroll to previous section"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {/* Down arrow button - show if not last section */}
      {!isLast && (
        <button
          onClick={() => onNavigate("down")}
          className="w-14 h-14 rounded-full bg-background/40 backdrop-blur-md border border-primary/30 text-primary shadow-lg hover:bg-background/60 hover:border-primary/50 transition-all duration-200 flex items-center justify-center active:scale-95"
          aria-label="Scroll to next section"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  useEffect(() => {
    const activeElement = navRefs.current[activeSection];
    if (activeElement) {
      const parent = activeElement.parentElement?.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        setUnderlineStyle({
          left: activeRect.left - parentRect.left,
          width: activeRect.width,
        });
      }
    }
  }, [activeSection]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-neutral">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl font-bold text-primary">
            {"<Anarion />"}
          </a>

          <ul className="flex gap-8 items-center relative">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  ref={(el) => {
                    navRefs.current[item.id] = el;
                  }}
                  href={item.href}
                  className={`inline-block transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-primary text-lg font-semibold scale-110"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {/* Animated underline */}
            <span
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
                transform: "translateY(8px)",
              }}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./language-toggle";

const navItems = [
  { labelKey: "nav.home", href: "#home", id: "home" },
  { labelKey: "nav.skills", href: "#skills", id: "skills" },
  { labelKey: "nav.projects", href: "#projects", id: "projects" },
  { labelKey: "nav.experience", href: "#experience", id: "experience" },
  { labelKey: "nav.passions", href: "#passions", id: "passions" },
];

export function NavBar() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const updateUnderline = () => {
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
    };

    // Update immediately
    updateUnderline();

    // Also update after a small delay to ensure text has rendered with new language
    const timeout = setTimeout(updateUnderline, 50);

    return () => clearTimeout(timeout);
  }, [activeSection, i18n.language]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-neutral">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-lg md:text-xl font-bold text-primary">
            {"<Anarion />"}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <ul className="flex gap-8 items-center relative">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    ref={(el) => {
                      navRefs.current[item.id] = el;
                    }}
                    href={item.href}
                    className={`inline-block transition-all duration-200 text-sm md:text-base ${
                      activeSection === item.id
                        ? "text-primary md:text-lg font-semibold scale-110"
                        : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    {t(item.labelKey)}
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
            <LanguageToggle />
          </div>

          {/* Mobile Language Toggle and Burger Menu */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <button
              className="flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/30 hover:border-primary transition-colors duration-200"
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium text-foreground">
        {i18n.language === "en" ? "EN" : "FR"}
      </span>
      <div className="relative w-10 h-5 bg-neutral rounded-full">
        <div
          className={`absolute top-0.5 w-4 h-4 bg-primary rounded-full transition-transform duration-200 ${
            i18n.language === "fr" ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}

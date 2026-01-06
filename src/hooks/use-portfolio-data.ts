import { useTranslation } from "react-i18next";
import portfolioDataMain from "../../portfolio-data.json";
import portfolioDataEn from "../data/portfolio-en.json";
import portfolioDataFr from "../data/portfolio-fr.json";

export function usePortfolioData() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  // Get language-specific data
  const langData = currentLang === "fr" ? portfolioDataFr : portfolioDataEn;

  // Merge language-specific data with main data (skills, projects, experience, etc.)
  return {
    ...portfolioDataMain,
    hero: langData.hero,
    languages: langData.languages,
    // projects: langData.projects,
    // skills: langData.skills,
    // soft_skills: langData.soft_skills,
    // tools: langData.tools,
    // experience: langData.experience,
  };
}

import { jsPDF } from "jspdf";
import portfolioDataMain from "../../portfolio-data.json";
import portfolioDataEn from "../data/portfolio-en.json";
import portfolioDataFr from "../data/portfolio-fr.json";
import translationsEn from "../locales/en.json";
import translationsFr from "../locales/fr.json";

interface PortfolioData {
  hero: {
    name: string;
    title: string;
    email: string;
    phone: string;
    description: string;
    socialLinks: {
      github: string;
      linkedin: string;
    };
  };
  skills: Array<{
    name: string;
    level: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    location: string;
    description: string[];
    technologies: string[];
  }>;
  projects: Array<{
    title: string;
    company?: string;
    shortDescription: string;
    skills: string[];
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
}

// Translation helper functions
const getTranslation = (language: 'en' | 'fr', key: string): string => {
  const translations = language === 'fr' ? translationsFr : translationsEn;
  const keys = key.split('.');
  let result: unknown = translations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  
  return typeof result === 'string' ? result : key;
};

// Helper function to get skill name from slug
const getSkillName = (slug: string): string => {
  const skill = portfolioDataMain.skills.find(s => s.slug === slug);
  return skill ? skill.name : slug;
};

// Helper function to get company name from slug
const getCompanyName = (slug: string): string => {
  const experience = portfolioDataMain.experience.find(e => e.slug === slug);
  return experience ? experience.company : slug;
};

// Helper function to get language-specific data
const getLanguageData = (language: 'en' | 'fr'): PortfolioData => {
  const langData = language === 'fr' ? portfolioDataFr : portfolioDataEn;
  return {
    ...portfolioDataMain,
    hero: langData.hero,
    projects: langData.projects,
    experience: langData.experience,
    skills: portfolioDataMain.skills,
    languages: portfolioDataMain.languages,
  };
};

export function exportPortfolioAsPDFWithLanguage(language: 'en' | 'fr') {
  const data = getLanguageData(language);
  const t = (key: string) => getTranslation(language, key);
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Portfolio color scheme
  const primaryColor: [number, number, number] = [0, 102, 204]; // Cyan/blue equivalent
  const secondaryColor: [number, number, number] = [0, 51, 102];
  const textColor: [number, number, number] = [0, 0, 0];
  const mutedColor: [number, number, number] = [60, 60, 60];

  // Helper function to add text with word wrap
  const addText = (
    text: string,
    fontSize: number = 10,
    isBold: boolean = false,
    color: [number, number, number] = textColor
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);

    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = fontSize * 0.5;

    // Check if we need a new page
    if (yPosition + lines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      yPosition = margin;
    }

    doc.text(lines, margin, yPosition);
    yPosition += lines.length * lineHeight + 2;
  };

  const addSectionTitle = (title: string) => {
    yPosition += 5;
    addText(title, 14, true, primaryColor);
    // Add underline
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    yPosition += 3;
  };

  const addSpace = (height: number = 5) => {
    yPosition += height;
  };

  // Header - Name and Title
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(data.hero.name, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.hero.title, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 8;

  // Contact Information
  doc.setFontSize(10);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  const contactInfo = `${data.hero.email} | ${data.hero.phone}`;
  doc.text(contactInfo, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 5;

  // Social Links
  const socialLinks = `GitHub: ${data.hero.socialLinks.github} | LinkedIn: ${data.hero.socialLinks.linkedin}`;
  doc.text(socialLinks, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 10;

  // Summary/Description
  if (data.hero.description) {
    addSectionTitle(language === 'fr' ? "RÉSUMÉ PROFESSIONNEL" : "PROFESSIONAL SUMMARY");
    addText(data.hero.description, 10);
    addSpace();
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    addSectionTitle(language === 'fr' ? "EXPÉRIENCE PROFESSIONNELLE" : "PROFESSIONAL EXPERIENCE");

    data.experience.forEach((exp, index) => {
      // Company and Position
      addText(`${exp.position} | ${exp.company}`, 12, true);

      // Period and Location
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(`${exp.period} | ${exp.location}`, margin, yPosition);
      yPosition += 5;

      // Responsibilities/Descriptions
      exp.description.forEach((desc) => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        addText(`• ${desc}`, 10);
      });

      // Technologies
      if (exp.technologies && exp.technologies.length > 0) {
        const techNames = exp.technologies.map(tech => getSkillName(tech));
        const techText = `${t("experience.technologies")}: ${techNames.join(", ")}`;
        doc.setFont("helvetica", "italic");
        doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
        addText(techText, 9);
      }

      if (index < data.experience.length - 1) {
        addSpace(3);
      }
    });
    addSpace();
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    addSectionTitle(language === 'fr' ? "PROJETS CLÉS" : "KEY PROJECTS");

    data.projects.slice(0, 5).forEach((project, index) => {
      // Project Title
      addText(project.title, 11, true);

      // Company (if available)
      if (project.company) {
        doc.setFont("helvetica", "italic");
        doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
        const companyName = getCompanyName(project.company);
        addText(companyName, 9);
      }

      // Description
      addText(project.shortDescription, 10);

      // Technologies
      if (project.skills && project.skills.length > 0) {
        const skillNames = project.skills.slice(0, 8).map(skill => getSkillName(skill));
        const skillsText = `${t("projects.technologies")}: ${skillNames.join(", ")}`;
        doc.setFont("helvetica", "italic");
        doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
        addText(skillsText, 9);
      }

      if (index < Math.min(data.projects.length, 5) - 1) {
        addSpace(2);
      }
    });
    addSpace();
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    addSectionTitle(t("skills.technical"));

    // Group skills by level
    const advanced = data.skills.filter(s => s.level.toLowerCase().includes("advanced"));
    const intermediate = data.skills.filter(s => s.level.toLowerCase().includes("intermediate"));
    const beginner = data.skills.filter(s => s.level.toLowerCase().includes("beginner"));

    if (advanced.length > 0) {
      const advancedText = `${t("skills.levels.advanced")}: ${advanced.map(s => s.name).join(", ")}`;
      addText(advancedText, 10);
    }

    if (intermediate.length > 0) {
      const intermediateText = `${t("skills.levels.intermediate")}: ${intermediate.map(s => s.name).join(", ")}`;
      addText(intermediateText, 10);
    }

    if (beginner.length > 0) {
      const beginnerText = `${t("skills.levels.beginner")}: ${beginner.map(s => s.name).join(", ")}`;
      addText(beginnerText, 10);
    }
  }

  // Languages
  if (data.languages && data.languages.length > 0) {
    addSectionTitle(t("skills.languages"));
    data.languages.forEach((lang) => {
      const translatedLang = t(lang.name);
      const translatedLevel = t(lang.level);
      addText(`${translatedLang}: ${translatedLevel}`, 10);
    });
  }

  // Footer with generation date
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Save the PDF with language-aware filename
  const languageSuffix = language.toUpperCase();
  const fileName = `${data.hero.name.replace(/\s+/g, "_")}_CV_${languageSuffix}.pdf`;
  doc.save(fileName);
}

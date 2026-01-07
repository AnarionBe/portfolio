import { jsPDF } from "jspdf";

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
}

export function exportPortfolioAsPDF(data: PortfolioData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (
    text: string,
    fontSize: number = 10,
    isBold: boolean = false,
    color: [number, number, number] = [0, 0, 0]
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
    addText(title, 14, true, [0, 102, 204]); // Blue color
    // Add underline
    doc.setDrawColor(0, 102, 204);
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
  doc.setTextColor(0, 51, 102);
  doc.text(data.hero.name, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 102, 204);
  doc.text(data.hero.title, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 8;

  // Contact Information
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const contactInfo = `${data.hero.email} | ${data.hero.phone}`;
  doc.text(contactInfo, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 5;

  // Social Links
  const socialLinks = `GitHub: ${data.hero.socialLinks.github} | LinkedIn: ${data.hero.socialLinks.linkedin}`;
  doc.text(socialLinks, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 10;

  // Summary/Description
  if (data.hero.description) {
    addSectionTitle("PROFESSIONAL SUMMARY");
    addText(data.hero.description, 10);
    addSpace();
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    addSectionTitle("PROFESSIONAL EXPERIENCE");

    data.experience.forEach((exp, index) => {
      // Company and Position
      addText(`${exp.position} | ${exp.company}`, 12, true);

      // Period and Location
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(80, 80, 80);
      doc.text(`${exp.period} | ${exp.location}`, margin, yPosition);
      yPosition += 5;

      // Responsibilities/Descriptions
      exp.description.forEach((desc) => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        addText(`• ${desc}`, 10);
      });

      // Technologies
      if (exp.technologies && exp.technologies.length > 0) {
        const techText = `Technologies: ${exp.technologies.join(", ")}`;
        doc.setFont("helvetica", "italic");
        doc.setTextColor(60, 60, 60);
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
    addSectionTitle("KEY PROJECTS");

    data.projects.slice(0, 5).forEach((project, index) => {
      // Project Title
      addText(project.title, 11, true);

      // Company (if available)
      if (project.company) {
        doc.setFont("helvetica", "italic");
        doc.setTextColor(80, 80, 80);
        addText(project.company, 9);
      }

      // Description
      addText(project.shortDescription, 10);

      // Technologies
      if (project.skills && project.skills.length > 0) {
        const skillsText = `Technologies: ${project.skills.slice(0, 8).join(", ")}`;
        doc.setFont("helvetica", "italic");
        doc.setTextColor(60, 60, 60);
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
    addSectionTitle("TECHNICAL SKILLS");

    // Group skills by level
    const advanced = data.skills.filter(s => s.level.toLowerCase().includes("advanced"));
    const intermediate = data.skills.filter(s => s.level.toLowerCase().includes("intermediate"));
    const beginner = data.skills.filter(s => s.level.toLowerCase().includes("beginner"));

    if (advanced.length > 0) {
      const advancedText = `Advanced: ${advanced.map(s => s.name).join(", ")}`;
      addText(advancedText, 10);
    }

    if (intermediate.length > 0) {
      const intermediateText = `Intermediate: ${intermediate.map(s => s.name).join(", ")}`;
      addText(intermediateText, 10);
    }

    if (beginner.length > 0) {
      const beginnerText = `Beginner: ${beginner.map(s => s.name).join(", ")}`;
      addText(beginnerText, 10);
    }
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

  // Save the PDF
  const fileName = `${data.hero.name.replace(/\s+/g, "_")}_CV.pdf`;
  doc.save(fileName);
}

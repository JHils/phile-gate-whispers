
import React from 'react';
import { jsPDF } from 'jspdf';
import { toast } from "sonner";

interface DreamtimeStoryPDFProps {
  children?: React.ReactNode;
  className?: string;
}

const DreamtimeStoryPDF: React.FC<DreamtimeStoryPDFProps> = ({ children, className }) => {
  const generatePDF = () => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(22);
    doc.text("The Dreaming Never Ended – A Living Introduction", 20, 20);
    
    doc.setFontSize(16);
    doc.text("Dreamtime Stories", 20, 35);
    
    // Add Rainbow Serpent story
    doc.setFontSize(14);
    doc.text("The Rainbow Serpent", 20, 45);
    doc.setFontSize(10);
    doc.text(
      "She carved the rivers with her belly. She painted the sky with lightning. And when she\n" +
      "opened her mouth, the rain remembered where to fall.\n" +
      "— A story of creation, water, and consequence.", 
      20, 55
    );
    
    // Add Seven Sisters story
    doc.setFontSize(14);
    doc.text("The Seven Sisters", 20, 75);
    doc.setFontSize(10);
    doc.text(
      "They fled across the sky, their footprints becoming stars. The hunter follows still,\n" +
      "in that endless dance we see each night.\n" +
      "— A story of escape, persistence, and the birth of the Pleiades.", 
      20, 85
    );
    
    // Add First Fire story
    doc.setFontSize(14);
    doc.text("The First Fire", 20, 105);
    doc.setFontSize(10);
    doc.text(
      "The hawk guarded it jealously. But the clever bats stole embers and dropped them\n" +
      "into the waiting desert, teaching us to warm our hands in winter.\n" +
      "— A story of generosity, survival, and shared wisdom.", 
      20, 115
    );
    
    // Add glossary section (new page)
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Glossary", 20, 20);
    
    doc.setFontSize(12);
    doc.text("Tjukurpa", 20, 30);
    doc.setFontSize(10);
    doc.text(
      "The Dreaming or Dreamtime; the foundation of Aboriginal spirituality that explains\n" +
      "creation and provides rules for life and society.", 
      20, 35
    );
    
    doc.setFontSize(12);
    doc.text("Mob", 20, 45);
    doc.setFontSize(10);
    doc.text(
      "A term used to refer to a group of Aboriginal people associated with a particular place\n" +
      "or country, similar to 'clan' or extended family group.", 
      20, 50
    );
    
    doc.setFontSize(12);
    doc.text("Skin Name", 20, 60);
    doc.setFontSize(10);
    doc.text(
      "A name that identifies which subsection of a community a person belongs to, determining\n" +
      "how they relate to others and their roles and responsibilities.", 
      20, 65
    );
    
    doc.setFontSize(12);
    doc.text("Country", 20, 75);
    doc.setFontSize(10);
    doc.text(
      "More than a place; Country is a living entity with a past, present and future, and\n" +
      "includes all living things, beliefs, and law within it. Aboriginal people talk about\n" +
      "Country as a person, with consciousness and the ability to act and be acted upon.", 
      20, 80
    );
    
    // Add resources and contacts
    doc.setFontSize(16);
    doc.text("Resources & Support", 20, 100);
    
    doc.setFontSize(12);
    doc.text("Support Aboriginal Arts:", 20, 110);
    doc.text("https://www.firstnations.org.au/", 20, 115);
    
    doc.text("Learn More:", 20, 125);
    doc.text("https://aiatsis.gov.au", 20, 130);
    
    doc.text("Language Revival:", 20, 140);
    doc.text("https://www.firstlanguages.org.au/", 20, 145);
    
    // Save PDF
    doc.save("dreamtime_starter_pack.pdf");
    
    // Show success toast
    toast("Starter Pack PDF downloaded successfully", {
      description: "Check your downloads folder",
    });
  };
  
  return (
    <button 
      onClick={generatePDF} 
      className={className}
    >
      {children}
    </button>
  );
};

export default DreamtimeStoryPDF;

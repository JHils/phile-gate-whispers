
import React, { useEffect, useState } from 'react';

const SubHeader: React.FC = () => {
  const [subHeaderText, setSubHeaderText] = useState("Soul Not Found");
  const [glitchActive, setGlitchActive] = useState(false);

  // Handle sub-header cycling
  useEffect(() => {
    const alternateTexts = ["Soul Not Found", "Self Not Found", "Code Not Found", "Trace Not Found"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (Math.random() < 0.2) { // 20% chance to change text
        currentIndex = (currentIndex + 1) % alternateTexts.length;
        setSubHeaderText(alternateTexts[currentIndex]);
        
        // Add brief glitch effect when text changes
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`bg-[#212121] text-[#B09066] inline-block px-8 py-2 mb-12 ${glitchActive ? 'animate-text-glitch' : ''}`}
    >
      <h2 className="text-2xl md:text-3xl font-mono">
        404 | {subHeaderText}
      </h2>
    </div>
  );
};

export default SubHeader;

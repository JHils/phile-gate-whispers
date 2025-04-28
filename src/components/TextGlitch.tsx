
import React, { useState, useEffect } from 'react';

interface TextGlitchProps {
  originalText: string;
  glitchText: string;
  className?: string;
}

const TextGlitch: React.FC<TextGlitchProps> = ({ 
  originalText, 
  glitchText,
  className = ""
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Set up random glitching intervals
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to glitch
        setIsGlitching(true);
        
        // Reset after a short time
        setTimeout(() => {
          setIsGlitching(false);
        }, 150);
      }
    }, 3000); // Check every 3 seconds
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <span 
      data-text={glitchText}
      className={`glitch-hover ${className} ${isGlitching ? 'animate-text-glitch' : ''}`}
    >
      {isGlitching ? glitchText : originalText}
    </span>
  );
};

export default TextGlitch;

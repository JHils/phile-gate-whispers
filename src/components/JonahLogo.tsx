
import React, { useState, useEffect } from 'react';

interface JonahLogoProps {
  variant: 'eye' | 'glyph';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
  trustLevel?: string;
}

const JonahLogo: React.FC<JonahLogoProps> = ({ 
  variant, 
  size = 'md', 
  className = '',
  animated = false,
  trustLevel = 'low'
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  
  // Determine size class
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }[size];

  // Determine which logo to display
  // Use glyph as primary, eye as secondary
  const glyphLogoPath = '/lovable-uploads/7e579479-c6f1-4a36-a1b5-020457999470.png';
  const eyeLogoPath = '/lovable-uploads/3782590e-764f-4030-909d-2d1982a726d9.png';
  
  const logoPath = variant === 'eye' 
    ? eyeLogoPath
    : glyphLogoPath;
  
  const altText = variant === 'eye' 
    ? "Jonah Eye of Memory Logo" 
    : "Jonah Glitched Glyph Logo";
    
  // Occasionally trigger glitch effect for animated logos based on trust level
  useEffect(() => {
    if (!animated) return;
    
    // Set up glitch interval based on trust level
    const interval = setInterval(() => {
      const threshold = trustLevel === 'high' ? 0.5 : 
                      trustLevel === 'medium' ? 0.7 : 0.9;
                      
      if (Math.random() > threshold) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [animated, trustLevel]);
  
  // Get glow class based on trust level
  const getGlowClass = () => {
    if (!trustLevel) return '';
    
    switch(trustLevel) {
      case 'high': return 'trust-shadow-high';
      case 'medium': return 'trust-shadow-medium';
      case 'low': return 'trust-shadow-low';
      default: return '';
    }
  };

  return (
    <div className={`flex items-center justify-center ${className} ${getGlowClass()}`}>
      <img 
        src={logoPath}
        alt={altText}
        className={`${sizeClass} object-contain ${glitchActive ? 'animate-pulse' : ''}`}
      />
    </div>
  );
};

export default JonahLogo;

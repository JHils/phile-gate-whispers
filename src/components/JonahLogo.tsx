
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

  // Use the new cleaned transparent PNG images
  // Glitched Glyph as primary, Eye of Memory as secondary
  const glyphLogoPath = '/lovable-uploads/006a6b5c-46bb-47f8-8e0d-afec1e0151c9.png'; // Jonah_Glitched_Glyph_Logo_Cleaned.png
  const eyeLogoPath = '/lovable-uploads/d31b1870-0252-45f0-bedf-e9c9ec6eaaab.png'; // Jonah_Eye_of_Memory_Logo_Cleaned.png
  
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
    <div className={`flex items-center justify-center ${className} ${getGlowClass()}`} style={{ background: 'transparent' }}>
      <img 
        src={logoPath}
        alt={altText}
        className={`${sizeClass} object-contain ${glitchActive ? 'animate-pulse' : ''}`}
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default JonahLogo;

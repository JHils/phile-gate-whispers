
import React, { useState, useEffect } from 'react';

interface JonahLogoProps {
  variant: 'eye' | 'glyph';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
  trustLevel?: string;
  showHoverEffects?: boolean;
}

const JonahLogo: React.FC<JonahLogoProps> = ({ 
  variant, 
  size = 'md', 
  className = '',
  animated = false,
  trustLevel = 'low',
  showHoverEffects = true
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  
  // Determine size class
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }[size];

  // Use the cleaned transparent PNG images
  // Glitched Glyph as primary, Eye of Memory as secondary
  const glyphLogoPath = '/lovable-uploads/006a6b5c-46bb-47f8-8e0d-afec1e0151c9.png'; // Jonah_Glitched_Glyph_Logo_Cleaned.png
  const eyeLogoPath = '/lovable-uploads/d31b1870-0252-45f0-bedf-e9c9ec6eaaab.png'; // Jonah_Eye_of_Memory_Logo_Cleaned.png
  
  // Determine which logo to display based on variant and rare symbol trigger
  const logoPath = (variant === 'eye' || isEyeVisible) 
    ? eyeLogoPath
    : glyphLogoPath;
  
  const altText = (variant === 'eye' || isEyeVisible) 
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
  
  // Rare Eye of Memory symbol trigger for high trust users
  useEffect(() => {
    if (trustLevel !== 'high') return;
    
    // Very small chance to trigger Eye of Memory symbol for high trust users
    const eyeInterval = setInterval(() => {
      // Only 5% chance to trigger
      if (Math.random() > 0.95) {
        setIsEyeVisible(true);
        
        // Dispatch event when eye appears
        document.dispatchEvent(new CustomEvent('jonahEyeSymbolAppears'));
        
        // Show for 5 seconds then revert
        setTimeout(() => {
          setIsEyeVisible(false);
        }, 5000);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(eyeInterval);
  }, [trustLevel]);
  
  // Check for rare path triggers
  useEffect(() => {
    const checkRarePaths = () => {
      const currentPath = window.location.pathname;
      // Special paths that trigger the Eye of Memory
      const rarePaths = ['/testament', '/door', '/mirror-logs', '/legacy'];
      
      if (rarePaths.includes(currentPath) && !isEyeVisible) {
        setIsEyeVisible(true);
        
        // Dispatch event when eye appears
        document.dispatchEvent(new CustomEvent('jonahEyeSymbolAppears'));
        
        // Show for 8 seconds then revert
        setTimeout(() => {
          setIsEyeVisible(false);
        }, 8000);
      }
    };
    
    // Check when component mounts
    checkRarePaths();
    
    // Also set up listener for path changes
    window.addEventListener('popstate', checkRarePaths);
    
    return () => {
      window.removeEventListener('popstate', checkRarePaths);
    };
  }, [isEyeVisible]);
  
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
    <div 
      className={`jonah-logo-container flex items-center justify-center ${className} ${getGlowClass()} 
        ${showHoverEffects ? 'jonah-glyph' : ''}`} 
      style={{ background: 'transparent' }}
    >
      <img 
        src={logoPath}
        alt={altText}
        className={`${sizeClass} object-contain ${glitchActive ? 'animate-pulse' : ''} 
          ${isEyeVisible ? 'eye-transition' : ''} ${variant === 'eye' ? 'jonah-eye' : 'jonah-glyph'}`}
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default JonahLogo;


import React, { useEffect, useState } from 'react';

/**
 * Background overlay with subtle effects
 */
const JonahBackgroundOverlay: React.FC = () => {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  
  // Add subtle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate offset for parallax effect
      const offsetX = (e.clientX / window.innerWidth - 0.5) * 20;
      const offsetY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      setParallaxOffset({ x: offsetX, y: offsetY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <>
      {/* Ghost glyph in corner with parallax effect */}
      <div 
        className="absolute top-8 right-8 ghost-glyph transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
        }}
      >
        <img 
          src="/lovable-uploads/f33548f9-832f-426f-ac18-a6dbbcc8c1b3.png" 
          alt="" 
          className="w-32 h-32 opacity-5 hover:opacity-10 transition-opacity duration-300"
        />
      </div>
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 pointer-events-none"></div>
      
      {/* Animated subtle scanlines effect */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-5"></div>
    </>
  );
};

export default JonahBackgroundOverlay;

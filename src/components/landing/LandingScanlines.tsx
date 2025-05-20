
import React, { useState, useEffect } from 'react';

/**
 * CRT scanline effect component
 */
const LandingScanlines: React.FC = () => {
  const [scanlineOffset, setScanlineOffset] = useState(0);

  // Handle scanline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlineOffset(prev => (prev + 1) % 20);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 opacity-20"
      style={{ 
        backgroundImage: `repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`,
        backgroundPosition: `0 ${scanlineOffset}px`,
        backgroundSize: '100% 4px'
      }}
    />
  );
};

export default LandingScanlines;

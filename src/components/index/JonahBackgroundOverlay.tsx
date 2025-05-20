
import React from 'react';

/**
 * Background overlay with subtle effects
 */
const JonahBackgroundOverlay: React.FC = () => {
  return (
    <>
      {/* Ghost glyph in corner */}
      <div className="absolute top-8 right-8 ghost-glyph">
        <img 
          src="/lovable-uploads/f33548f9-832f-426f-ac18-a6dbbcc8c1b3.png" 
          alt="" 
          className="w-32 h-32 opacity-5"
        />
      </div>
      
      {/* Subtle black overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </>
  );
};

export default JonahBackgroundOverlay;

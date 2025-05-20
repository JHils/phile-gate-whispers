
import React from 'react';

interface JonahLogoProps {
  variant: 'eye' | 'glyph';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const JonahLogo: React.FC<JonahLogoProps> = ({ variant, size = 'md', className = '' }) => {
  // Determine size class
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }[size];

  // Determine which logo to display
  const logoPath = variant === 'eye' 
    ? '/lovable-uploads/78cdb48c-25bd-4f4f-b274-a3d293e99cf2.png' 
    : '/lovable-uploads/f33548f9-832f-426f-ac18-a6dbbcc8c1b3.png';
  
  const altText = variant === 'eye' 
    ? "Jonah Eye of Memory Logo" 
    : "Jonah Glitched Glyph Logo";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={logoPath}
        alt={altText}
        className={`${sizeClass} object-contain`}
      />
    </div>
  );
};

export default JonahLogo;

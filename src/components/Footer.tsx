
import React from 'react';
import JonahLogo from './JonahLogo';

interface FooterProps {
  variant?: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-gray-200' : 'text-gray-600';
  const trustLevel = localStorage.getItem('jonahTrustLevel') || 'low';
  
  return (
    <footer className={`w-full mt-auto py-6 ${textColor}`}>
      <div className="container mx-auto flex flex-col items-center justify-center">
        <JonahLogo 
          variant="glyph" 
          size="sm" 
          className="mb-2 opacity-50" 
          animated={trustLevel === 'high'}
          trustLevel={trustLevel}
        />
        <p className="text-xs font-mono">© {new Date().getFullYear()} Jonah's Philes</p>
      </div>
    </footer>
  );
};

export default Footer;

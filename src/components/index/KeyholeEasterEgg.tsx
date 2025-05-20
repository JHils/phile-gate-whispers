
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface KeyholeEasterEggProps {
  onClick?: () => void;
}

/**
 * A tiny hidden keyhole element for micro-quest
 */
const KeyholeEasterEgg: React.FC<KeyholeEasterEggProps> = ({ 
  onClick 
}) => {
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    console.log("%cYou found something hidden.", "color: #32ff9a;");
    
    // Track keyhole click if ARG system is initialized
    if (window.JonahConsole?.argData) {
      window.JonahConsole.argData.keyholeClicks = 
        (window.JonahConsole.argData.keyholeClicks || 0) + 1;
    }
    
    // Call custom onClick handler if provided
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      className="keyhole absolute h-3 w-3 bg-transparent rounded-full opacity-5 hover:opacity-20 transition-opacity duration-300 cursor-default"
      style={{ 
        top: isMobile ? '15%' : '30%', 
        right: isMobile ? '5%' : '8%' 
      }}
      id="index-keyhole"
      onClick={handleClick}
      title="A tiny anomaly in the code"
    />
  );
};

export default KeyholeEasterEgg;


import React from "react";
import JonahLogo from "../JonahLogo";

interface BotIconProps {
  isOpen: boolean;
  iconVariant: number;
  glitchEffect: boolean;
  toggleChat: () => void;
}

export const BotIcon: React.FC<BotIconProps> = ({
  isOpen,
  iconVariant,
  glitchEffect,
  toggleChat
}) => {
  if (isOpen) return null;
  
  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 ${glitchEffect ? 'animate-pulse' : ''}`}
      onClick={toggleChat}
    >
      <button 
        className={`w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg
          ${glitchEffect ? 'glitch-icon' : ''}
          hover:bg-gray-700 transition-all duration-300`}
      >
        <JonahLogo 
          variant={iconVariant === 2 ? "glyph" : "eye"} 
          size="sm" 
        />
      </button>
    </div>
  );
};

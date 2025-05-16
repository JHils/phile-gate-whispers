
import React from "react";
import { MessageCircle, KeyRound } from "lucide-react";

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
        {iconVariant === 2 ? (
          <KeyRound className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};


import React from "react";
import { BotMessage } from "@/hooks/useBotState/types";
import { getMoodClassName } from "./BotMoodManager";

interface BotContainerProps {
  isOpen: boolean;
  isMinimized: boolean;
  glitchEffect: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  trustLevel: string;
  messages: BotMessage[];
}

const BotContainer: React.FC<BotContainerProps> = ({
  isOpen,
  isMinimized,
  glitchEffect,
  messagesEndRef,
  children,
  trustLevel,
  messages
}) => {
  // Skip rendering if not open
  if (!isOpen) return null;
  
  // Get mood color for high trust users
  const moodColor = getMoodClassName(trustLevel, messages);

  return (
    <div 
      className={`fixed z-50 ${isMinimized ? 'bottom-6 right-6 w-64 h-12' : 'bottom-6 right-6 w-80 md:w-96 h-96'} 
        bg-gray-900 text-white rounded-lg shadow-xl transition-all duration-300
        ${glitchEffect ? 'animate-glitch' : ''}`}
    >
      {children}
      
      {/* Mood indicator - visible during high trust */}
      {!isMinimized && trustLevel === 'high' && (
        <div className={`text-center py-1 text-xs border-b ${moodColor} transition-colors duration-500`}>
          {window.JonahConsole?.sentience?.realTimeMood || "watching"}
        </div>
      )}
      
      {/* Invisible reference for scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default BotContainer;

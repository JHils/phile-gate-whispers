
import React, { PropsWithChildren } from "react";
import { BotMessage } from "@/hooks/useBotState/types";

interface BotContainerProps {
  isOpen: boolean;
  isMinimized: boolean;
  glitchEffect: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  trustLevel: string;
  messages: BotMessage[];
}

const BotContainer: React.FC<PropsWithChildren<BotContainerProps>> = ({
  isOpen,
  isMinimized,
  glitchEffect,
  messagesEndRef,
  trustLevel,
  messages,
  children
}) => {
  // Don't render anything if the bot is closed
  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 sm:w-96 bg-black border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-300 ease-in-out
        ${isMinimized ? 'h-12' : 'h-[500px]'}
        ${glitchEffect ? 'animate-glitch' : ''}
        ${trustLevel === 'high' ? 'border-red-900' : ''}
      `}
      style={{
        boxShadow: trustLevel === 'high' 
          ? '0 0 15px rgba(220, 38, 38, 0.4)' 
          : '0 0 15px rgba(0, 0, 0, 0.4)',
        animation: isOpen ? 'botEnter 0.3s ease-out' : 'botExit 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default BotContainer;

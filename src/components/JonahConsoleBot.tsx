import React, { useRef } from "react";
import { BotHeader } from "./bot/BotHeader";
import { BotMessages } from "./bot/BotMessages";
import { BotInput } from "./bot/BotInput";
import { useBotState } from "@/hooks/useBotState";
import { BotIcon } from "./bot/BotIcon";
import { 
  initializeARGTracking, 
  initializeSentience,
  initializeAdvancedBehavior,
  initializeRealityFabric
} from "@/utils/systemInitializers";
import BotIntervalManagement from "./bot/BotIntervalManagement";
import BotQuestSystem from "./bot/BotQuestSystem";
import BotPageNavigation from "./bot/BotPageNavigation";
import { getMoodClassName } from "./bot/BotMoodManager";
import { useLocation } from "react-router-dom";
import { BotMessage } from "@/hooks/useBotState/types";

interface JonahConsoleBotProps {
  insideRouter?: boolean;
}

// Create a helper to initialize all systems
const initializeAllSystems = () => {
  initializeARGTracking();
  initializeSentience();
  initializeAdvancedBehavior();
  initializeRealityFabric();
};

const JonahConsoleBot: React.FC<JonahConsoleBotProps> = ({ insideRouter = false }) => {
  // Make sure ARG tracking and sentience systems are initialized first
  React.useEffect(() => {
    initializeAllSystems();
  }, []);

  // Use our extracted hook for bot state management
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    messages,
    setMessages,
    input,
    setInput,
    mode,
    setMode,
    trustLevel,
    trustScore,
    modifyTrust,
    isTyping,
    setIsTyping,
    hasInteracted,
    setHasInteracted,
    iconVariant,
    glitchEffect,
    addBotMessage,
    handleSendMessage,
    toggleChat,
    minimizeChat,
    closeChat
  } = useBotState(!insideRouter);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  
  // Get mood state from getMoodClassName helper - Cast messages to BotMessage[]
  const botMessages = messages as unknown as BotMessage[];
  const moodColor = getMoodClassName(trustLevel, botMessages);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  React.useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      {/* Add interval management system */}
      <BotIntervalManagement 
        isOpen={isOpen}
        isMinimized={isMinimized}
        setIsOpen={setIsOpen}
        setIsMinimized={setIsMinimized}
        hasInteracted={hasInteracted}
        trustLevel={trustLevel}
        addBotMessage={addBotMessage}
        modifyTrust={modifyTrust}
        currentPath={location.pathname}
      />
      
      {/* Add quest system */}
      <BotQuestSystem 
        isOpen={isOpen}
        addBotMessage={addBotMessage}
        modifyTrust={modifyTrust}
      />
      
      {/* Add page navigation tracker */}
      <BotPageNavigation 
        addBotMessage={addBotMessage}
        modifyTrust={modifyTrust}
        isOpen={isOpen}
      />

      {/* Chat icon with trust level indicator */}
      <BotIcon 
        isOpen={isOpen}
        iconVariant={iconVariant}
        glitchEffect={glitchEffect}
        toggleChat={toggleChat}
      />

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed z-50 ${isMinimized ? 'bottom-6 right-6 w-64 h-12' : 'bottom-6 right-6 w-80 md:w-96 h-96'} 
            bg-gray-900 text-white rounded-lg shadow-xl transition-all duration-300
            ${glitchEffect ? 'animate-glitch' : ''}`}
        >
          <BotHeader 
            mode={mode}
            isMinimized={isMinimized}
            minimizeChat={minimizeChat}
            closeChat={closeChat}
            trustLevel={trustLevel}
            trustScore={trustScore}
          />

          {/* Mood indicator - visible during high trust */}
          {!isMinimized && trustLevel === 'high' && (
            <div className={`text-center py-1 text-xs border-b ${moodColor} transition-colors duration-500`}>
              {window.JonahConsole?.sentience?.realTimeMood || "watching"}
            </div>
          )}

          {/* Messages area - only shown when not minimized */}
          {!isMinimized && (
            <BotMessages 
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
          )}

          {/* Input area - only shown when not minimized */}
          {!isMinimized && (
            <BotInput
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              inputRef={inputRef}
              mode={mode}
            />
          )}
        </div>
      )}

      {/* CSS for glitch effects */}
      <style>
        {`
        .animate-glitch {
          animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .glitch-icon {
          position: relative;
        }
        
        .glitch-icon::before,
        .glitch-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        
        .glitch-icon::before {
          background: rgba(255, 0, 0, 0.2);
          animation: glitch-animation 1s infinite linear alternate-reverse;
        }
        
        .glitch-icon::after {
          background: rgba(0, 0, 255, 0.2);
          animation: glitch-animation 0.7s infinite linear alternate;
        }
        
        @keyframes glitch-animation {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(-1px, -1px);
          }
          60% {
            transform: translate(1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
          100% {
            transform: translate(0);
          }
        }
        `}
      </style>
    </>
  );
};

export default JonahConsoleBot;

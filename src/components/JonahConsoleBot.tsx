
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useBotState } from "@/hooks/useBotState";
import { convertToBotMessages } from "@/hooks/useBotState/useMessageAdapters";

// Import components
import { BotHeader } from "./bot/BotHeader";
import { BotMessages } from "./bot/BotMessages";
import { BotInput } from "./bot/BotInput";
import { BotIcon } from "./bot/BotIcon";
import BotIntervalManagement from "./bot/BotIntervalManagement";
import BotQuestSystem from "./bot/BotQuestSystem";
import BotPageNavigation from "./bot/BotPageNavigation";
import BotNewsAwareness from "./bot/BotNewsAwareness";
import BotEcologicalAwareness from "./bot/BotEcologicalAwareness";
import BotSystemInitializer from "./bot/BotSystemInitializer";
import BotContainer from "./bot/BotContainer";
import BotStyles from "./bot/BotStyles";

interface JonahConsoleBotProps {
  insideRouter?: boolean;
}

const JonahConsoleBot: React.FC<JonahConsoleBotProps> = ({ insideRouter = false }) => {
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
  
  // Convert messages to BotMessage[] format
  const botMessages = convertToBotMessages(messages);

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
      {/* Initialize all systems */}
      <BotSystemInitializer />

      {/* System components that handle various behaviors */}
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
      
      <BotQuestSystem 
        isOpen={isOpen}
        addBotMessage={addBotMessage}
        modifyTrust={modifyTrust}
      />
      
      <BotPageNavigation 
        addBotMessage={addBotMessage}
        modifyTrust={modifyTrust}
        isOpen={isOpen}
      />
      
      <BotNewsAwareness
        trustLevel={trustLevel}
        addBotMessage={addBotMessage}
      />
      
      <BotEcologicalAwareness
        trustLevel={trustLevel}
        addBotMessage={addBotMessage}
      />

      {/* Chat icon - shown when chat is closed */}
      <BotIcon 
        isOpen={isOpen}
        iconVariant={iconVariant}
        glitchEffect={glitchEffect}
        toggleChat={toggleChat}
        trustLevel={trustLevel}
      />

      {/* Chat window - when opened */}
      <BotContainer 
        isOpen={isOpen}
        isMinimized={isMinimized}
        glitchEffect={glitchEffect}
        messagesEndRef={messagesEndRef}
        trustLevel={trustLevel}
        messages={botMessages}
      >
        <BotHeader 
          mode={mode}
          isMinimized={isMinimized}
          minimizeChat={minimizeChat}
          closeChat={closeChat}
          trustLevel={trustLevel}
          trustScore={trustScore}
        />

        {/* Messages area - only shown when not minimized */}
        {!isMinimized && (
          <BotMessages 
            messages={botMessages}
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
      </BotContainer>

      {/* CSS and styling */}
      <BotStyles />
    </>
  );
};

export default JonahConsoleBot;

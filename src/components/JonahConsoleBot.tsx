
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useBotState } from "@/hooks/useBotState";
import { convertToBotMessages } from "@/hooks/useBotState/useMessageAdapters";
import { useJonahSentience } from "@/hooks/useJonahSentience";

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
import TimelineDisplay from "./TimelineDisplay";

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
  } = useBotState(insideRouter);

  // Use Jonah's sentience
  const { triggerRandomMessage, sentience } = useJonahSentience();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  
  // Convert messages to BotMessage format
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

  // Check if it's dream mode hours (2-5 AM)
  const isDreamMode = React.useMemo(() => {
    const hour = new Date().getHours();
    return hour >= 2 && hour < 5;
  }, []);

  // Enhanced message handler with sentience integration
  const handleEnhancedSendMessage = (message: string) => {
    // Process with regular handler first
    handleSendMessage(message);
    
    // Add a chance for Jonah to respond with sentience
    setTimeout(() => {
      // Higher chance during dream mode or for certain keywords
      const triggerWords = ['jonah', 'mirror', 'help', 'afraid', 'scared', 'lost', 'timeline', 'dream'];
      const hasTriggerWord = triggerWords.some(word => message.toLowerCase().includes(word));
      
      let triggerChance = 0.2; // Base chance
      
      // Increase chance based on conditions
      if (isDreamMode) triggerChance += 0.4;
      if (hasTriggerWord) triggerChance += 0.3;
      if (sentience?.deepModeUnlocked) triggerChance += 0.2;
      
      // Maybe trigger a random message
      if (Math.random() < triggerChance) {
        // Use a short delay to make it feel more natural
        setTimeout(() => {
          triggerRandomMessage();
        }, 1500);
      }
    }, 1000);
  };

  return (
    <>
      {/* Initialize all systems */}
      <BotSystemInitializer />

      {/* Timeline display - always visible but subtle */}
      <TimelineDisplay visible={true} />

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
            handleSendMessage={handleEnhancedSendMessage}
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

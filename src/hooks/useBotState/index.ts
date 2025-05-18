
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BotMode } from './types';
import { useTrustSystem } from './useTrustSystem';
import { useMessages } from './useMessages';
import { useBotVisibility } from './useBotVisibility';
import { useVisualEffects } from './useVisualEffects';

export function useBotState(skipLocationCheck: boolean = false) {
  // Bot mode state
  const [mode, setMode] = useState<BotMode>('normal');
  const [input, setInput] = useState('');
  
  // Trust system
  const { trustLevel, trustScore, modifyTrust } = useTrustSystem();
  
  // Messages system
  const { 
    messages, 
    setMessages, 
    isTyping,
    setIsTyping,
    hasInteracted,
    setHasInteracted,
    addBotMessage,
    handleSendMessage
  } = useMessages([], trustLevel);
  
  // Visibility controls
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    toggleChat,
    minimizeChat,
    closeChat
  } = useBotVisibility();
  
  // Visual effects
  const { iconVariant, glitchEffect } = useVisualEffects(trustLevel);
  
  // Handle location changes to reset bot if necessary
  const location = skipLocationCheck ? null : useLocation();
  
  useEffect(() => {
    if (location && window.clearJonahOnPathChange) {
      // Handle path change if needed
    }
  }, [location]);
  
  return {
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
  };
}

// Re-export types
export * from './types';

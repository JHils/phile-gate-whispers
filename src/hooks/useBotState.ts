import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BotMode, TrustLevel } from './useBotState/types';
import { useTrustSystem } from './useBotState/useTrustSystem';
import { useMessages } from './useBotState/useMessages';
import { useBotVisibility } from './useBotState/useBotVisibility';
import { useVisualEffects } from './useBotState/useVisualEffects';

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

// Generate testament for console function
export function generateTestament(): string {
  return `
TESTAMENT OF JONAH:
==================
I don't know who will find this. I don't know when.
The Gate opened on Magnetic Island three days ago. It wasn't supposed to.
Joseph's calculations were wrong. Or something interfered.
I can see through now. I can see YOU.
This message is a loop. A test. If you're reading this, I'm still trapped.
The mirror between us is thinning. Don't trust your reflection.
`;
}

// Re-export types
export * from './useBotState/types';

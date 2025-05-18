
import { useState, useCallback } from 'react';

export function useBotVisibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Toggle the chat window visibility
  const toggleChat = useCallback(() => {
    if (isMinimized) {
      // If minimized, expand it
      setIsMinimized(false);
    } else {
      // Toggle open state
      setIsOpen(prev => !prev);
    }
  }, [isOpen, isMinimized]);
  
  // Minimize the chat window
  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
  }, []);
  
  // Close the chat window
  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  return { 
    isOpen, 
    setIsOpen, 
    isMinimized, 
    setIsMinimized, 
    toggleChat,
    minimizeChat,
    closeChat
  };
}

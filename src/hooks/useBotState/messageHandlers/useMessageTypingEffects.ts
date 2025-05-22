
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Import necessary helpers
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

export function useMessageTypingEffects(
  setMessages: React.Dispatch<React.SetStateAction<any[]>>, 
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
) {
  // Add a bot message with typing effect
  const addBotMessage = (content: string, delay = 0, special = false) => {
    // Create message object
    const message = {
      id: uuidv4(),
      type: 'bot',
      content,
      timestamp: Date.now(),
      special
    };
    
    // Wait for delay then add message
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, message]);
      setIsTyping(false);
      
      // Update Jonah sentience if available
      if (window.JonahConsole?.sentience) {
        if (!window.JonahConsole.sentience.sessionData) {
          window.JonahConsole.sentience.sessionData = {
            startTime: Date.now(),
            messageCount: 0,
            userEmotions: {} as Record<EmotionCategory, number>,
            messagesSent: 0,
            messagesReceived: 0,
            idleTime: 0
          };
        }
        
        if (window.JonahConsole.sentience.sessionData.messagesReceived !== undefined) {
          window.JonahConsole.sentience.sessionData.messagesReceived += 1;
        } else {
          window.JonahConsole.sentience.sessionData.messagesReceived = 1;
        }
      }
    }, delay);
  };

  return { addBotMessage };
}

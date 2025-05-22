
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from './types';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';
import { modifyTrustLevel } from '@/utils/jonahAdvancedBehavior/trustSystem';
import { checkForTriggerPhrases, processEmotionalInput } from '@/utils/jonahAdvancedBehavior/sentimentAnalysis/analyzer';
import { generateGreeting } from '@/utils/jonahAdvancedBehavior/enhancedEmotionalCore';

export function useMessageHandling() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sessionMemory, setSessionMemory] = useState<string[]>([]);
  const [hasGreeted, setHasGreeted] = useState<boolean>(false);
  
  // Initialize with greeting on first render
  useEffect(() => {
    if (!hasGreeted && messages.length === 0) {
      // Get last interaction time
      const lastInteractionDate = localStorage.getItem('jonahLastInteraction');
      let lastDate = null;
      
      if (lastInteractionDate) {
        try {
          lastDate = new Date(lastInteractionDate);
        } catch (e) {
          console.error("Error parsing last interaction date:", e);
        }
      }
      
      // Generate greeting based on trust level and last interaction
      const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
      const currentMood = localStorage.getItem('jonah_emotion_primary') as EmotionCategory || 'neutral';
      
      // 4. DYNAMIC INTRO LINE + MOOD-BASED GREETING
      const greeting = generateGreeting(trustScore, lastDate, currentMood);
      
      // Add to messages after slight delay
      setTimeout(() => {
        const jonahMessage: ChatMessage = {
          id: uuidv4(),
          content: greeting,
          isJonah: true,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, jonahMessage]);
        setHasGreeted(true);
      }, 500);
    }
  }, [hasGreeted, messages.length]);
  
  const addUserMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      isJonah: false,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add to session memory
    setSessionMemory(prev => [...prev, content]);
    
    // Update last interaction time
    localStorage.setItem('jonahLastInteraction', new Date().toISOString());
    
    // 3. TRUST MODULATION ENGINE - Check for trust phrases
    const triggerCheck = checkForTriggerPhrases(content);
    if (triggerCheck.trustChange !== 0) {
      modifyTrustLevel(triggerCheck.trustChange);
    }
    
    return userMessage;
  }, []);
  
  const addJonahResponse = useCallback((content: string) => {
    // Create message
    const jonahMessage: ChatMessage = {
      id: uuidv4(),
      content,
      isJonah: true,
      timestamp: Date.now()
    };
    
    // Add to chat
    setMessages(prev => [...prev, jonahMessage]);
    setIsTyping(false);
    
    return jonahMessage;
  }, []);
  
  const setTyping = useCallback((typing: boolean) => {
    setIsTyping(typing);
  }, []);
  
  const resetMessages = useCallback(() => {
    setMessages([]);
    setHasGreeted(false);
    setSessionMemory([]);
  }, []);
  
  return {
    messages,
    isTyping,
    addUserMessage,
    addJonahResponse,
    setTyping,
    resetMessages,
    hasGreeted
  };
}


import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from './types';
import { storeConversationMemory, findMemoryReference } from '@/utils/jonahAdvancedBehavior/conversationMemory';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

export function useMessageHandling() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const addUserMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      isJonah: false,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
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
  }, []);
  
  return {
    messages,
    isTyping,
    addUserMessage,
    addJonahResponse,
    setTyping,
    resetMessages
  };
}

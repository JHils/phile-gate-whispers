
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BotMessage, TrustLevel } from './types';
import { toast } from '@/components/ui/use-toast';
import { handleWorldQuery } from '@/utils/jonahNewsAwareness';
import { handleEcologicalQuery } from '@/utils/jonahEcoAwareness';

export function useMessages(initialMessages: BotMessage[] = [], trustLevel: TrustLevel) {
  const [messages, setMessages] = useState<BotMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Add a bot message with typing effect
  const addBotMessage = useCallback((content: string, special: boolean = false) => {
    if (!content) return;
    
    setIsTyping(true);
    
    // Simulate typing delay - longer for longer messages, shorter for higher trust
    const typingSpeed = trustLevel === 'high' ? 10 : 
                        trustLevel === 'medium' ? 15 : 20;
    const minDelay = 500;
    const maxDelay = 2000;
    const typingDelay = Math.min(maxDelay, 
                               Math.max(minDelay, content.length * typingSpeed));
    
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          type: 'bot',
          content,
          timestamp: Date.now(),
          special
        }
      ]);
      setIsTyping(false);
    }, typingDelay);
  }, [trustLevel]);

  // Handle sending a new user message
  const handleSendMessage = useCallback((userMessage: string) => {
    if (!userMessage.trim()) return;
    
    // Set hasInteracted to true
    setHasInteracted(true);
    
    // Add user message
    setMessages(prevMessages => [
      ...prevMessages, 
      {
        id: uuidv4(),
        type: 'user',
        content: userMessage,
        timestamp: Date.now()
      }
    ]);
    
    // First check if it's a news/world/weather related query
    const newsResponse = handleWorldQuery(userMessage, trustLevel);
    if (newsResponse) {
      setTimeout(() => addBotMessage(newsResponse, true), 800);
      return;
    }
    
    // Next, check if it's an ecological or cultural query
    const ecoResponse = handleEcologicalQuery(userMessage, trustLevel);
    if (ecoResponse) {
      setTimeout(() => addBotMessage(ecoResponse, true), 800);
      return;
    }
    
    // Process user input if needed - simulate bot thinking
    if (window.processUserMessage) {
      try {
        const response = window.processUserMessage(userMessage);
        if (response) {
          setTimeout(() => addBotMessage(response), 800);
        }
      } catch (e) {
        console.error('Error processing message:', e);
        toast({
          title: 'Error',
          description: 'Could not process your message',
          variant: 'destructive'
        });
      }
    }
  }, [addBotMessage, trustLevel]);

  return { 
    messages, 
    setMessages, 
    isTyping, 
    setIsTyping, 
    hasInteracted, 
    setHasInteracted,
    addBotMessage,
    handleSendMessage
  };
}

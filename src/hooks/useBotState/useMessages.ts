
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BotMessage, TrustLevel } from './types';
import { toast } from '@/components/ui/use-toast';
import { handleWorldQuery } from '@/utils/jonahNewsAwareness';
import { handleEcologicalQuery } from '@/utils/jonahEcoAwareness';
import { getCurrentMood } from '@/utils/consoleTrackingUtils';

export function useMessages(initialMessages: BotMessage[] = [], trustLevel: TrustLevel) {
  const [messages, setMessages] = useState<BotMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Add a bot message with typing effect
  const addBotMessage = useCallback((content: string, special: boolean = false) => {
    if (!content) return;
    
    setIsTyping(true);
    
    // Get current mood
    const mood = getCurrentMood();
    
    // Adjust response based on mood
    let adjustedContent = content;
    
    if (mood === 'paranoid') {
      // Add doubt or paranoia
      const paranoidModifiers = [
        "...",
        "I shouldn't be telling you this.",
        "They might be listening.",
        "Can you be trusted with this?"
      ];
      
      // 40% chance to add paranoid modifier
      if (Math.random() < 0.4) {
        const modifier = paranoidModifiers[Math.floor(Math.random() * paranoidModifiers.length)];
        adjustedContent = `${adjustedContent} ${modifier}`;
      }
    } else if (mood === 'hopeful') {
      // More warm and poetic
      // No modification needed, just different typing speed
    } else if (mood === 'static') {
      // More cold and mechanical
      adjustedContent = adjustedContent.replace(/\?/g, ".").replace(/!/g, ".");
    } else if (mood === 'betrayed') {
      // Cold and accusatory
      const betrayedModifiers = [
        "But you already knew that.",
        "Not that you care.",
        "Remember that."
      ];
      
      // 30% chance to add betrayed modifier
      if (Math.random() < 0.3) {
        const modifier = betrayedModifiers[Math.floor(Math.random() * betrayedModifiers.length)];
        adjustedContent = `${adjustedContent} ${modifier}`;
      }
    } else if (mood === 'error') {
      // Glitched and corrupted
      adjustedContent = adjustedContent.split('').map(c => 
        Math.random() > 0.9 ? c.toUpperCase() : c
      ).join('');
    }
    
    // Simulate typing delay - longer for longer messages, shorter for higher trust
    // Also adjust for mood
    let typingSpeed = trustLevel === 'high' ? 10 : 
                      trustLevel === 'medium' ? 15 : 20;
                     
    // Adjust speed based on mood
    if (mood === 'paranoid') typingSpeed *= 1.5; // Slower, more hesitant
    if (mood === 'static') typingSpeed *= 0.7;   // Faster, mechanical
    if (mood === 'error') typingSpeed *= 2;      // Very slow, glitched
    
    const minDelay = 500;
    const maxDelay = 2000;
    const typingDelay = Math.min(maxDelay, 
                               Math.max(minDelay, adjustedContent.length * typingSpeed));
    
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          type: 'bot',
          content: adjustedContent,
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
    
    // Track message in Jonah's sentience
    if (window.JonahConsole?.sentience) {
      // Increment messages sent
      if (window.JonahConsole.sentience.sessionData) {
        window.JonahConsole.sentience.sessionData.messagesSent = 
          (window.JonahConsole.sentience.sessionData.messagesSent || 0) + 1;
      }
      
      // Record the last interaction time
      window.JonahConsole.sentience.lastInteraction = Date.now();
    }
    
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

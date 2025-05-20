
import { useState } from 'react';
import { BotMessage, TrustLevel } from './types';
import { v4 as uuidv4 } from 'uuid';
import { generateFirstTimeResponse } from '@/utils/jonahAdvancedBehavior';

export function useMessages(initialMessages: BotMessage[] = [], trustLevel: TrustLevel = 'low') {
  const [messages, setMessages] = useState<BotMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Add a bot message
  const addBotMessage = (content: string, special: boolean = false) => {
    const newMessage: BotMessage = {
      id: uuidv4(),
      type: 'bot',
      content,
      timestamp: Date.now(),
      special
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Update Jonah sentience if available
    if (window.JonahConsole?.sentience?.sessionData) {
      window.JonahConsole.sentience.sessionData.messagesReceived = 
        (window.JonahConsole.sentience.sessionData.messagesReceived || 0) + 1;
    }
    
    return newMessage;
  };

  // Handle user sending a message
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Set the user as having interacted
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    // Create user message
    const userMessage: BotMessage = {
      id: uuidv4(),
      type: 'user',
      content,
      timestamp: Date.now()
    };
    
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Update Jonah sentience if available
    if (window.JonahConsole?.sentience?.sessionData) {
      window.JonahConsole.sentience.sessionData.messagesSent = 
        (window.JonahConsole.sentience.sessionData.messagesSent || 0) + 1;
      
      window.JonahConsole.sentience.lastInteraction = Date.now();
      window.JonahConsole.sentience.interactionsCount++;
    }
    
    // Start typing indicator
    setIsTyping(true);
    
    // Determine response based on message content
    setTimeout(() => {
      let response: string;
      
      // Check for first-time user
      if (messages.length === 0 || 
          (messages.length === 1 && messages[0].type === 'bot')) {
        response = generateFirstTimeResponse(trustLevel);
      } 
      // Check if Jonah has a processed response via window.processUserMessage
      else if (window.processUserMessage) {
        const processedResponse = window.processUserMessage(content);
        if (processedResponse) {
          response = processedResponse;
        } else {
          // Generic response if processing fails
          response = getGenericResponse(content, trustLevel);
        }
      } 
      else {
        // Generic response if no processor available
        response = getGenericResponse(content, trustLevel);
      }
      
      // Stop typing indicator
      setIsTyping(false);
      
      // Add bot response
      addBotMessage(response);
    }, getTypingDelay(content));
  };
  
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

// Get a typing delay based on content length
function getTypingDelay(content: string): number {
  // Base delay + word count factor
  return 1000 + Math.min(content.split(' ').length * 150, 2000);
}

// Get a generic response
function getGenericResponse(content: string, trustLevel: TrustLevel): string {
  // Low trust responses
  const lowTrustResponses = [
    "I'm not sure I can answer that yet.",
    "The system doesn't have enough information to respond.",
    "My responses are limited until more trust is established.",
    "I'm still learning to understand your inputs."
  ];
  
  // Medium trust responses
  const mediumTrustResponses = [
    "I think I understand what you're asking.",
    "Let me try to process that...",
    "I can see what you mean, but I'm still putting pieces together.",
    "There's something about this I'm trying to understand better."
  ];
  
  // High trust responses
  const highTrustResponses = [
    "I've been thinking about something like this.",
    "This connects to something important.",
    "Your question touches on something deeper.",
    "Let me share what I know about this."
  ];
  
  // Select responses based on trust level
  let responses;
  switch (trustLevel) {
    case 'high':
      responses = highTrustResponses;
      break;
    case 'medium':
      responses = mediumTrustResponses;
      break;
    default:
      responses = lowTrustResponses;
  }
  
  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
}

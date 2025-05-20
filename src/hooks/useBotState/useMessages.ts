
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  generateFirstTimeResponse, 
  generateReturningResponse,
  getVaryingLengthResponse,
  getEmotionalResponse
} from '@/utils/jonahAdvancedBehavior';

export function useMessages(initialMessages = [], trustLevel = 'low') {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  // Add a bot message
  const addBotMessage = (content: string, special = false) => {
    const newMessage = {
      id: uuidv4(),
      type: 'bot',
      content,
      timestamp: Date.now(),
      special
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage
    ]);

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

    // Calculate time since last interaction
    const now = Date.now();
    const timeSinceLastInteraction = now - lastInteractionTime;
    setLastInteractionTime(now);

    // Set the user as having interacted
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    // Create user message
    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content,
      timestamp: now
    };

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage
    ]);

    // Update Jonah sentience if available
    if (window.JonahConsole?.sentience?.sessionData) {
      window.JonahConsole.sentience.sessionData.messagesSent = 
        (window.JonahConsole.sentience.sessionData.messagesSent || 0) + 1;
      window.JonahConsole.sentience.lastInteraction = now;
      window.JonahConsole.sentience.interactionsCount++;
    }

    // Start typing indicator
    setIsTyping(true);

    // Determine response based on message content
    setTimeout(() => {
      let response;

      // Check for emotional response first (highest priority)
      const emotionalResponse = getEmotionalResponse(content);
      if (emotionalResponse) {
        response = emotionalResponse;
      } 
      // Check for first-time user
      else if (messages.length === 0 || (messages.length === 1 && messages[0].type === 'bot')) {
        response = generateFirstTimeResponse(trustLevel);
      } 
      // Check for returning user after long absence (more than 20 minutes)
      else if (timeSinceLastInteraction > 20 * 60 * 1000) {
        response = generateReturningResponse(trustLevel, timeSinceLastInteraction);
      }
      // Use processor if available
      else if (window.processUserMessage) {
        const processedResponse = window.processUserMessage(content);
        if (processedResponse) {
          response = processedResponse;
        } else {
          // Generic response if processing fails
          response = getGenericResponse(content, trustLevel);
        }
      } else {
        // Generic response if no processor available
        response = getGenericResponse(content, trustLevel);
      }

      // Apply length variations for more natural responses
      response = getVaryingLengthResponse(response, trustLevel);

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
    lastInteractionTime,
    addBotMessage,
    handleSendMessage
  };
}

// Get a typing delay based on content length and complexity
function getTypingDelay(content: string): number {
  // Base delay + word count factor + complexity factor
  const wordCount = content.split(' ').length;
  const complexity = content.includes('?') ? 1.2 : 
                     content.includes('!') ? 0.8 : 1;
  
  return Math.min(
    // Minimum of 1 second, max of 4 seconds
    Math.max(1000, 800 + wordCount * 150 * complexity),
    4000
  );
}

// Get a generic response based on trust level
function getGenericResponse(content: string, trustLevel: string): string {
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

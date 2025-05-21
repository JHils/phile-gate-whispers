
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  jonah_storeMemoryFragment,
  EmotionCategory
} from '@/utils/jonahAdvancedBehavior';

// Import from newly refactored files
import { useMessageTypingEffects } from './messageHandlers/useMessageTypingEffects';
import { useResponseGeneration } from './messageHandlers/useResponseGeneration';
import { useMemorySystem } from './messageHandlers/useMemorySystem';

export function useMessages(initialMessages = [], trustLevel = 'low') {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [sessionMemory, setSessionMemory] = useState<string[]>([]);
  const [lastUserInput, setLastUserInput] = useState<string>("");

  // Extract functionality to smaller hooks
  const { addBotMessage } = useMessageTypingEffects(setMessages, setIsTyping);
  const { handleResponseGeneration } = useResponseGeneration(addBotMessage, trustLevel);
  const { storeInputInMemory } = useMemorySystem(setLastUserInput, setSessionMemory, sessionMemory);

  // Initialize session memory from localStorage on mount
  useEffect(() => {
    try {
      const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
      if (behavior.sessionMemory) {
        setSessionMemory(behavior.sessionMemory);
      }
    } catch (error) {
      console.error("Error initializing session memory:", error);
    }
  }, []);

  // Store session memory in localStorage whenever it changes
  useEffect(() => {
    if (sessionMemory.length > 0) {
      try {
        const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
        behavior.sessionMemory = sessionMemory;
        localStorage.setItem('jonahBehavior', JSON.stringify(behavior));
      } catch (error) {
        console.error("Error storing session memory:", error);
      }
    }
  }, [sessionMemory]);

  // Handle user sending a message with enhanced emotional awareness
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

    // Store input in memory
    storeInputInMemory(content);

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
    if (window.JonahConsole?.sentience) {
      if (!window.JonahConsole.sentience.sessionData) {
        window.JonahConsole.sentience.sessionData = {
          startTime: Date.now(),
          messageCount: 0,
          userEmotions: {} as Record<EmotionCategory, number>,
          messagesSent: 0,
          messagesReceived: 0
        };
      }
      
      if (window.JonahConsole.sentience.sessionData.messagesSent !== undefined) {
        window.JonahConsole.sentience.sessionData.messagesSent += 1;
      } else {
        window.JonahConsole.sentience.sessionData.messagesSent = 1;
      }
        
      window.JonahConsole.sentience.lastInteraction = now;
      
      if (window.JonahConsole.sentience.interactionsCount !== undefined) {
        window.JonahConsole.sentience.interactionsCount++;
      } else {
        window.JonahConsole.sentience.interactionsCount = 1;
      }
    }

    // Start typing indicator
    setIsTyping(true);

    // Mock implementation for checkForEchoMatch
    const checkForEchoMatch = () => ({ matched: false, echo: "" });

    // Check for echo match unlocks
    const echoMatch = checkForEchoMatch();
    if (echoMatch.matched) {
      // Handle potential ARG unlock if needed
      console.log("Echo matched:", echoMatch.echo);
    }

    // Handle response generation
    setTimeout(() => {
      handleResponseGeneration(content, sessionMemory, timeSinceLastInteraction);
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
    sessionMemory,
    lastUserInput,
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

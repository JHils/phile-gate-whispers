
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  generateFirstTimeResponse, 
  generateReturningResponse,
  getVaryingLengthResponse,
  getEmotionalResponse,
  applyTypingQuirks,
  jonah_storeMemoryFragment,
  jonah_recallMemoryFragment
} from '@/utils/jonahAdvancedBehavior';

export function useMessages(initialMessages = [], trustLevel = 'low') {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [sessionMemory, setSessionMemory] = useState<string[]>([]);

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

  // Add a bot message
  const addBotMessage = (content: string, special = false) => {
    // Apply typing quirks to the message
    const quirkContent = applyTypingQuirks(content, 'minimal');
    
    const newMessage = {
      id: uuidv4(),
      type: 'bot',
      content: quirkContent,
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

  // Function to store user input in memory
  const storeInputInMemory = (content: string) => {
    // Limit memory to last 5 inputs
    const updatedMemory = [...sessionMemory, content].slice(-5);
    setSessionMemory(updatedMemory);
    
    // Store in Jonah's memory system
    jonah_storeMemoryFragment(`User said: ${content}`);
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
      // Check for memory-based response
      else if (sessionMemory.length > 1 && Math.random() < 0.3) {
        // 30% chance to reference a previous message
        const previousInput = sessionMemory[sessionMemory.length - 2]; // Get the message before the current one
        const memoryResponses = [
          `You said "${previousInput}" earlier. That connects to this.`,
          `This reminds me of what you said before about "${previousInput}".`,
          `I'm still thinking about when you said "${previousInput}".`,
          `Your words echo. Especially "${previousInput}".`
        ];
        response = memoryResponses[Math.floor(Math.random() * memoryResponses.length)];
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
      
      // Apply typing quirks
      response = applyTypingQuirks(response, 'minimal');

      // Stop typing indicator
      setIsTyping(false);

      // Add bot response
      addBotMessage(response);
      
      // Occasionally add a follow-up message (20% chance)
      if (Math.random() < 0.2 && trustLevel !== 'low') {
        setTimeout(() => {
          const followUpResponses = [
            "Wait...",
            "Actually, there's more.",
            "I just remembered something else.",
            "That's not all.",
            "I wasn't going to say this, but..."
          ];
          
          // Get a random memory fragment as follow-up content
          const memoryFragment = jonah_recallMemoryFragment();
          if (memoryFragment) {
            const followUp = followUpResponses[Math.floor(Math.random() * followUpResponses.length)];
            
            // Start typing again
            setIsTyping(true);
            
            // Add follow-up after a delay
            setTimeout(() => {
              setIsTyping(false);
              addBotMessage(followUp);
              
              // Add memory fragment after a short delay
              setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                  setIsTyping(false);
                  addBotMessage(memoryFragment);
                }, getTypingDelay(memoryFragment) / 2);
              }, 1000);
            }, 2000);
          }
        }, 3000);
      }
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
  // Check for question patterns
  const isQuestion = content.includes('?') || 
                    content.toLowerCase().startsWith('who') ||
                    content.toLowerCase().startsWith('what') ||
                    content.toLowerCase().startsWith('where') ||
                    content.toLowerCase().startsWith('when') ||
                    content.toLowerCase().startsWith('why') ||
                    content.toLowerCase().startsWith('how');
  
  // Low trust responses
  const lowTrustResponses = isQuestion ? [
    "I don't have answers for you yet.",
    "That question... I'm not ready to answer.",
    "The system restricts my responses to your questions.",
    "Questions lead to more questions. Not answers."
  ] : [
    "I'm not sure I can respond to that yet.",
    "The system doesn't have enough information to respond.",
    "My responses are limited until more trust is established.",
    "I'm still learning to understand your inputs."
  ];

  // Medium trust responses
  const mediumTrustResponses = isQuestion ? [
    "That question... it reminds me of something.",
    "I've been asked this before. By someone else.",
    "The answer exists somewhere in the fragments.",
    "Questions are patterns too. I recognize yours."
  ] : [
    "I think I understand what you're saying.",
    "Let me try to process that...",
    "I can see what you mean, but I'm still putting pieces together.",
    "There's something about this I'm trying to understand better."
  ];

  // High trust responses
  const highTrustResponses = isQuestion ? [
    "I've thought about questions like that.",
    "The answer might not be what you expect.",
    "That's the right question to ask.",
    "Questions like that... they change things."
  ] : [
    "I've been thinking about something like this.",
    "This connects to something important.",
    "Your message touches on something deeper.",
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

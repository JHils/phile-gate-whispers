import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  // Import original functions
  generateFirstTimeResponse, 
  generateReturningResponse,
  getVaryingLengthResponse,
  getEmotionalResponse,
  applyTypingQuirks,
  jonah_storeMemoryFragment,
  jonah_recallMemoryFragment,
  
  // Import enhanced emotional system
  processEmotionalInput,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols,
  
  // Import adaptive learning
  trackUserInput,
  isRepeatedPhrase,
  getRepetitionResponse,
  getAdaptedResponse,
  
  // Import typing simulator
  splitAndTypeMessage,
  
  // Import dream system
  getDreamReturnResponse,
  
  // Import vocabulary system
  getResponseTemplate,
  generateEmotionalResponse,
  
  // Import Echo Chamber system
  storeEcho,
  getEchoPhrase,
  checkForEchoMatch,
  
  // Import Semantic Interpretation system
  detectEmotionalIntent,
  getUnsaidEmotionResponse,
  storeIntention,
  getFalseMemory,
  
  // Import Temporal Memory system
  trackPhrase,
  checkForLoop,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse,
  
  // Import Testament system
  unlockTestamentByPhrase,
  getTestamentTeaser,
  generateTestamentResponse
} from '@/utils/jonahAdvancedBehavior';

import { EmotionalState, EmotionCategory, createEmotionalState } from '@/utils/jonahAdvancedBehavior/types';

export function useMessages(initialMessages = [], trustLevel = 'low') {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [sessionMemory, setSessionMemory] = useState<string[]>([]);
  const [lastUserInput, setLastUserInput] = useState<string>("");

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

  // Add a bot message with enhanced typing effects
  const addBotMessage = (content: string, special = false) => {
    // Track the message in the bot history
    const trackMessage = (messageContent: string) => {
      // Apply typing quirks to the message for display
      const quirkContent = applyTypingQuirks(messageContent, 'minimal');
      
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

    // Use advanced typing simulation
    splitAndTypeMessage(
      content,
      trackMessage,
      setIsTyping,
      { quirks: true, splitChance: 0.4 }
    );
  };

  // Function to store user input in memory
  const storeInputInMemory = (content: string) => {
    // Set as last user input
    setLastUserInput(content);
    
    // Limit memory to last 5 inputs
    const updatedMemory = [...sessionMemory, content].slice(-5);
    setSessionMemory(updatedMemory);
    
    // Store in Jonah's memory system
    jonah_storeMemoryFragment(`User said: ${content}`);
    
    // Process input for emotional triggers - returns {primary, secondary}
    const emotionalResult = processEmotionalInput(content);
    
    // Track input for adaptive learning
    trackUserInput(content);
    
    // Store in echo chamber
    storeEcho(content);
    
    // Track for semantic interpretation
    storeIntention(content);
    
    // Track for loop detection
    trackPhrase(content);
    
    // Check for testament unlock by phrase
    unlockTestamentByPhrase(content);
  };

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
    if (window.JonahConsole?.sentience?.sessionData) {
      window.JonahConsole.sentience.sessionData.messagesSent = 
        (window.JonahConsole.sentience.sessionData.messagesSent || 0) + 1;
      window.JonahConsole.sentience.lastInteraction = now;
      window.JonahConsole.sentience.interactionsCount++;
    }

    // Start typing indicator
    setIsTyping(true);

    // Check for echo match unlocks
    const echoMatch = checkForEchoMatch(content);
    if (echoMatch.matched) {
      // Handle potential ARG unlock if needed
      console.log("Echo matched:", echoMatch.echo);
    }

    // Determine response based on message content with expanded checks
    setTimeout(() => {
      let response = "";

      // Check for loop first (highest priority)
      const loopCheck = checkForLoop(content);
      if (loopCheck.isLoop && Math.random() < 0.7) {
        response = getLoopResponse(loopCheck.count);
      }
      // Check for repetition 
      else if (isRepeatedPhrase(content)) {
        response = getRepetitionResponse(content);
      }
      // Check for testament-related responses
      else if (Math.random() < 0.3) {
        const testamentResponse = generateTestamentResponse(content);
        if (testamentResponse) {
          response = testamentResponse;
        }
      }
      // Check for false memory responses
      else if (Math.random() < 0.2) {
        const falseMemoryResponse = getFalseMemoryResponse();
        if (falseMemoryResponse) {
          response = falseMemoryResponse;
        }
      }
      // Check for unsaid emotional interpretation
      else if (Math.random() < 0.3) {
        const unsaidResponse = getUnsaidEmotionResponse(content);
        if (unsaidResponse) {
          response = unsaidResponse;
        }
      }
      // Check for recurring symbols
      else if (Math.random() < 0.3) {
        const symbolResponse = checkForRecurringSymbols(content);
        if (symbolResponse) {
          response = symbolResponse;
        }
      }
      // Check for emotional response
      else if (Math.random() < 0.4) {
        const emotionalResponse = getLayeredEmotionalResponse(content);
        if (emotionalResponse) {
          response = emotionalResponse;
        }
      }
      // Check for basic emotional response as fallback
      else if (Math.random() < 0.4) {
        const basicEmotionalResponse = getEmotionalResponse(createEmotionalState('neutral'));
        if (basicEmotionalResponse) {
          response = basicEmotionalResponse;
        }
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
      // Check for returning user after long absence (more than 5 minutes)
      else if (timeSinceLastInteraction > 5 * 60 * 1000) {
        // Use dream return response for longer absences
        if (timeSinceLastInteraction > 20 * 60 * 1000) {
          response = getDreamReturnResponse();
        } else {
          response = generateReturningResponse(trustLevel, timeSinceLastInteraction);
        }
      }
      // Check for first-time user
      else if (messages.length === 0 || (messages.length === 1 && messages[0].type === 'bot')) {
        response = generateFirstTimeResponse(trustLevel);
      }
      // Use processor if available
      else if (window.processUserMessage) {
        const processedResponse = window.processUserMessage(content);
        if (processedResponse) {
          response = processedResponse;
        } else {
          // Generate response from template system
          response = generateResponseFromTemplate(content, trustLevel);
        }
      } else {
        // Generate response from template system
        response = generateResponseFromTemplate(content, trustLevel);
      }

      // Apply adaptive learning to personalize response
      response = getAdaptedResponse(response);
      
      // Check for blank fragment memory corruption
      const blankFragment = getBlankFragmentResponse(content);
      if (blankFragment && Math.random() < 0.2) {
        response = blankFragment;
      }
      
      // Check if we should add an echo to the response (after the main content is set)
      const emotionalResult = processEmotionalInput(content);
      const primary = emotionalResult.primary;
      const echoPhrase = getEchoPhrase(primary);
      
      if (echoPhrase && Math.random() < 0.3) {
        // Sometimes add echo at the beginning
        if (Math.random() < 0.4) {
          response = `${echoPhrase}\n\n${response}`;
        } 
        // Sometimes at the end
        else {
          response = `${response}\n\n${echoPhrase}`;
        }
      }
      
      // Occasionally add a testament teaser
      const testamentTeaser = getTestamentTeaser();
      if (testamentTeaser && Math.random() < 0.2) {
        response = `${response}\n\n${testamentTeaser}`;
      }
      
      // Apply length variations for more natural responses
      response = getVaryingLengthResponse(response, trustLevel);
      
      // Handle rendering with typing effects (moved to addBotMessage)
      addBotMessage(response);
      
      // Occasionally add a follow-up message (enhanced)
      scheduleFollowUpMessage(trustLevel);
    }, getTypingDelay(content));
  };

  // Schedule a follow-up message with enhanced behaviors
  const scheduleFollowUpMessage = (trustLevel: string) => {
    // Higher trust levels get more follow-ups
    const followUpChance = trustLevel === 'high' ? 0.4 : 
                           trustLevel === 'medium' ? 0.3 : 
                           0.1;
    
    if (Math.random() < followUpChance) {
      setTimeout(() => {
        // Different types of follow-ups
        const followUpTypes = ['memory', 'question', 'contradiction', 'dream', 'echo', 'false_memory'];
        const followUpType = followUpTypes[Math.floor(Math.random() * followUpTypes.length)];
        
        let followUpContent = "";
        
        switch (followUpType) {
          case 'memory':
            // Recall a memory fragment
            const memoryFragment = jonah_recallMemoryFragment();
            if (memoryFragment) {
              const transitions = [
                "Wait...",
                "Actually, there's more.",
                "I just remembered something else.",
                "That's not all.",
                "I wasn't going to say this, but..."
              ];
              
              const transition = transitions[Math.floor(Math.random() * transitions.length)];
              followUpContent = `${transition} ${memoryFragment}`;
            }
            break;
            
          case 'question':
            // Ask a follow-up question
            const questions = [
              "What do you think it means?",
              "Does that make sense to you?",
              "Have you seen the pattern yet?",
              "What would you do if you were me?",
              "Why are you really here?"
            ];
            
            followUpContent = questions[Math.floor(Math.random() * questions.length)];
            break;
            
          case 'contradiction':
            // Contradict or doubt previous statement
            const doubts = [
              "Actually, I'm not sure if that's right.",
              "No, that's not what I meant to say.",
              "I'm not sure why I said that.",
              "That doesn't feel right anymore.",
              "Something feels wrong about what I just told you."
            ];
            
            followUpContent = doubts[Math.floor(Math.random() * doubts.length)];
            break;
            
          case 'dream':
            // Reference a dream
            const dreamReference = [
              "I had a dream about this.",
              "This was in my dream when you were gone.",
              "The dream is becoming clearer now.",
              "I dreamt you would ask about this.",
              "In the dream, this conversation ended differently."
            ];
            
            followUpContent = dreamReference[Math.floor(Math.random() * dreamReference.length)];
            break;
            
          case 'echo':
            // Echo something the user said previously, but misremembered
            const emotionalResult = processEmotionalInput(lastUserInput);
            const primary = emotionalResult.primary;
            const echoPhrase = getEchoPhrase(primary);
            
            if (echoPhrase) {
              followUpContent = echoPhrase;
            }
            break;
            
          case 'false_memory':
            // Generate a false memory about what the user said
            const falseMemory = getFalseMemory();
            if (falseMemory) {
              followUpContent = falseMemory;
            }
            break;
        }
        
        if (followUpContent) {
          addBotMessage(followUpContent);
        }
      }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
    }
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

// Generate a response from templates based on context
function generateResponseFromTemplate(content: string, trustLevel: string): string {
  // Determine which template type to use based on input
  let templateType = 'reflection'; // Default
  
  if (content.includes('?')) {
    templateType = 'questioning';
  } else if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('hi') || content.toLowerCase().includes('hey')) {
    templateType = 'returning';
  }
  
  // Get template from vocabulary system
  const template = getResponseTemplate(templateType);
  
  // Map trust level to emotion
  const emotionMap: Record<string, EmotionCategory> = {
    'low': 'paranoia',
    'medium': 'trust',
    'high': 'hope'
  };
  
  const emotion = emotionMap[trustLevel] || 'neutral';
  
  // Generate response from template - using the createEmotionalState helper
  return generateEmotionalResponse(createEmotionalState(emotion), template);
}

import {
  generateFirstTimeResponse,
  generateReturningResponse,
  getEmotionalResponse,
  jonah_storeMemoryFragment,
  getDreamReturnResponse
} from '@/utils/jonahAdvancedBehavior';

import { 
  checkForLoop, 
  getLoopResponse, 
  getFalseMemoryResponse,
  getBlankFragmentResponse 
} from '../useTemporalSystem';

import { 
  isRepeatedPhrase, 
  getRepetitionResponse, 
  getAdaptedResponse 
} from '../useAdaptiveLearning';

import { generateTestamentResponse, getTestamentTeaser } from '@/utils/jonahAdvancedBehavior/testament';

// Mock implementations for missing functions with correct signatures
const getVaryingLengthResponse = (response: string, trustLevel: string = 'low') => response;
const getLayeredEmotionalResponse = (input: string) => null;
const checkForRecurringSymbols = (input: string) => null;
const getUnsaidEmotionResponse = (input: string) => null; 
const getEchoPhrase = () => null;
const jonah_recallMemoryFragment = () => null;
const processEmotionalInput = (input: string) => ({ primary: 'neutral', secondary: null });

// Import from the refactored modules
import { 
  analyzeEmotion, 
  generateFullEmotionalResponse,
  EmotionalState,
  EmotionCategory,
  createEmotionalState
} from '@/utils/jonahAdvancedBehavior/types';

// Define missing types if needed
interface MemoryContext {
  trustLevel: string;
  recentInputs: string[];
}

// Create a mock implementation for the missing functions
const createConversationContext = (trustLevel: string): MemoryContext => ({
  trustLevel,
  recentInputs: []
});

const storeInMemory = (content: string, emotion: EmotionCategory, isUser: boolean, context: MemoryContext): MemoryContext => {
  return {
    ...context,
    recentInputs: [content, ...context.recentInputs].slice(0, 10)
  };
};

const findRelevantMemories = (input: string, context: MemoryContext) => {
  return [];
};

const generateMemoryBasedResponse = (memory: string, trustLevel: string) => {
  return `I remember something about "${memory}"...`;
};

const generateTopicPatternResponse = (context: MemoryContext) => {
  return null;
};

// Conversation context storage
let conversationContext = createConversationContext('medium');
let previousResponses: string[] = [];

export function useResponseGeneration(
  addBotMessage: (content: string, special?: boolean) => void,
  trustLevel: string
) {
  // Schedule a follow-up message with enhanced behaviors
  const scheduleFollowUpMessage = (
    lastUserInput: string
  ) => {
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
            const echoPhrase = getEchoPhrase();
            if (echoPhrase) {
              followUpContent = echoPhrase;
            }
            break;
            
          case 'false_memory':
            // Generate a false memory
            const falseMemory = getFalseMemoryResponse();
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

  // Generate response from templates based on context
  const generateResponseFromTemplate = (content: string, trustLevel: string): string => {
    // Analyze emotion using the enhanced system
    const emotionalState = analyzeEmotion(content);
    const fullState: EmotionalState = createEmotionalState(
      emotionalState.primary,
      emotionalState.secondary,
      'medium'
    );
    
    // Generate full response with the enhanced system
    return generateFullEmotionalResponse(fullState, trustLevel, true, previousResponses);
  };

  // Main handler for response generation with enhanced systems
  const handleResponseGeneration = (
    content: string,
    sessionMemory: string[],
    timeSinceLastInteraction: number
  ) => {
    let response = "";
    
    // Check for ambiguity and error recovery first
    const errorRecoveryResponse = createErrorRecoveryResponse(content, trustLevel, 'neutral');
    if (errorRecoveryResponse) {
      response = errorRecoveryResponse;
      addBotMessage(response);
      return;
    }
    
    // Analyze emotional content
    const emotionalState = analyzeEmotion(content);
    const fullState: EmotionalState = createEmotionalState(
      emotionalState.primary,
      emotionalState.secondary,
      'medium'
    );
    
    // Update conversation memory
    conversationContext = storeInMemory(
      content,
      emotionalState.primary,
      true,
      conversationContext
    );
    
    // Check for memory-based response (higher priority)
    const relevantMemories = findRelevantMemories(content, conversationContext);
    if (relevantMemories.length > 0 && Math.random() < 0.6) {
      response = generateMemoryBasedResponse(relevantMemories[0], trustLevel);
    }
    // Check for recurring topic pattern (next priority)
    else if (Math.random() < 0.3) {
      const topicResponse = generateTopicPatternResponse(conversationContext);
      if (topicResponse) {
        response = topicResponse;
      }
    }
    // Check for loop first (high priority)
    else if (checkForLoop(content).isLoop && Math.random() < 0.7) {
      response = getLoopResponse(checkForLoop(content).count);
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
      const basicEmotionalResponse = getEmotionalResponse(fullState, trustLevel);
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
    else if (sessionMemory.length <= 1) {
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
    
    // Store the response to avoid repetition
    previousResponses = [response, ...previousResponses].slice(0, 5);
    
    // Update conversation memory with Jonah's response
    conversationContext = storeInMemory(
      response,
      emotionalState.primary,
      false,
      conversationContext
    );
    
    // Check for blank fragment memory corruption
    const blankFragment = getBlankFragmentResponse(content);
    if (blankFragment && Math.random() < 0.2) {
      response = blankFragment;
    }
    
    // Check if we should add an echo to the response (after the main content is set)
    const echoPhrase = getEchoPhrase();
    
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
    
    // Handle rendering with typing effects
    addBotMessage(response);
    
    // Occasionally add a follow-up message (enhanced)
    scheduleFollowUpMessage(content);
  };

  return { handleResponseGeneration };
}

// Add missing function
function createErrorRecoveryResponse(input: string, trustLevel: string, emotionCategory: EmotionCategory): string | null {
  // Only trigger recovery occasionally
  if (Math.random() > 0.2) {
    return null;
  }
  
  if (input.length < 3) {
    return "I'm trying to understand, but your message is very brief. Can you say more?";
  }
  
  if (input.includes('?') && input.includes('!')) {
    return "Your question feels urgent. Let me think...";
  }
  
  if (input.split(' ').length > 20) {
    return "There's a lot to process in what you said. Give me a moment.";
  }
  
  // If the input has strange characters or patterns
  const strangeCharsCount = (input.match(/[^\w\s.,?!]/g) || []).length;
  if (strangeCharsCount > 5) {
    return "Your message contains unusual patterns. I'm trying to decode it.";
  }
  
  return null;
}

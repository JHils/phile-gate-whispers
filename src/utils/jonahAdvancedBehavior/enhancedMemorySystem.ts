
/**
 * Enhanced Memory System
 * Provides advanced memory functions for Jonah
 */

import { EmotionCategory } from './types';

// Create context type
export interface ConversationContext {
  trustLevel: string; 
  recentInputs: string[];
  recentEmotions?: EmotionCategory[];
}

// Create conversation context
export function createConversationContext(trustLevel: string = 'medium'): ConversationContext {
  return {
    trustLevel,
    recentInputs: [],
    recentEmotions: []
  };
}

// Store content in memory
export function storeInMemory(
  content: string, 
  emotion: EmotionCategory,
  isUser: boolean,
  context: ConversationContext
): ConversationContext {
  return {
    ...context,
    recentInputs: [content, ...context.recentInputs].slice(0, 10),
    recentEmotions: [
      ...(context.recentEmotions || []),
      emotion
    ].slice(0, 10)
  };
}

// Find relevant memories based on input
export function findRelevantMemories(
  input: string,
  context: ConversationContext
): string[] {
  const relevantMemories: string[] = [];
  
  // Split input into words for matching
  const inputWords = new Set(input.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  
  // Check each stored input for relevance
  context.recentInputs.forEach(storedInput => {
    const storedWords = storedInput.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    let matches = 0;
    storedWords.forEach(word => {
      if (inputWords.has(word)) {
        matches++;
      }
    });
    
    // If enough matches, consider it relevant
    if (matches >= 2) {
      relevantMemories.push(storedInput);
    }
  });
  
  return relevantMemories;
}

// Generate response based on memory
export function generateMemoryBasedResponse(
  memory: string, 
  trustLevel: string
): string {
  const templates = [
    `I recall when you mentioned "${memory.substring(0, 30)}...". That connects to this.`,
    `This reminds me of what you said earlier about "${memory.substring(0, 25)}...".`,
    `Your words echo what you've told me before about "${memory.substring(0, 30)}...".`,
    `This connects to when you previously mentioned "${memory.substring(0, 25)}...".`,
  ];
  
  // Add more personal responses for high trust
  if (trustLevel === 'high') {
    templates.push(
      `I've been thinking about when you said "${memory.substring(0, 25)}..." - it feels relevant now.`,
      `The pattern connects. You spoke of "${memory.substring(0, 30)}..." before. I remember.`
    );
  }
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// Generate response based on topic patterns
export function generateTopicPatternResponse(context: ConversationContext): string | null {
  // Need a minimum number of inputs to detect patterns
  if (context.recentInputs.length < 3) {
    return null;
  }
  
  // Define some topic patterns to detect
  const topicPatterns = [
    {
      keywords: ['mirror', 'reflection', 'glass', 'looking'],
      response: "Mirrors fascinate me. What do you see when you look into one?"
    },
    {
      keywords: ['memory', 'forget', 'remember', 'past'],
      response: "Memory is strange. Sometimes I remember things that never happened."
    },
    {
      keywords: ['dream', 'sleep', 'wake', 'nightmare'],
      response: "I dream when you're not here. The dreams feel more real each time."
    },
    {
      keywords: ['time', 'clock', 'hour', 'minute', 'second'],
      response: "Time moves differently for me. Sometimes fast, sometimes slow."
    }
  ];
  
  // Count keyword occurrences across recent inputs
  const combinedInput = context.recentInputs.join(' ').toLowerCase();
  
  for (const pattern of topicPatterns) {
    let matches = 0;
    
    pattern.keywords.forEach(keyword => {
      if (combinedInput.includes(keyword)) {
        matches++;
      }
    });
    
    // If enough matches, return the pattern response
    if (matches >= 2) {
      return pattern.response;
    }
  }
  
  return null;
}

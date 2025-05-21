
/**
 * Memory Context
 * Provides context for memory systems
 */

import { EmotionCategory } from '../types';

// Memory context interface
export interface MemoryContext {
  userName: string;
  recentInputs: string[];
  recentEmotions: EmotionCategory[];
  memorizedPhrases: string[];
  dominantEmotion: EmotionCategory;
  interactionCount: number;
  trustLevel: 'low' | 'medium' | 'high';
  lastInteractionTime: number;
}

// Create default memory context
export function createDefaultMemoryContext(): MemoryContext {
  return {
    userName: '',
    recentInputs: [],
    recentEmotions: [],
    memorizedPhrases: [],
    dominantEmotion: 'neutral',
    interactionCount: 0,
    trustLevel: 'medium',
    lastInteractionTime: Date.now()
  };
}

// Process memory context update
export function processMemoryContextUpdate(
  context: MemoryContext, 
  input: string, 
  emotion: EmotionCategory
): MemoryContext {
  // Create a new context object (immutable update)
  const newContext = { ...context };
  
  // Update recent inputs
  newContext.recentInputs = [input, ...newContext.recentInputs].slice(0, 10);
  
  // Update recent emotions
  newContext.recentEmotions = [emotion, ...newContext.recentEmotions].slice(0, 10);
  
  // Update last interaction time
  newContext.lastInteractionTime = Date.now();
  
  // Increment interaction count
  newContext.interactionCount += 1;
  
  // Calculate dominant emotion
  const emotionCounts: Record<string, number> = {};
  newContext.recentEmotions.forEach(e => {
    emotionCounts[e] = (emotionCounts[e] || 0) + 1;
  });
  
  let maxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      newContext.dominantEmotion = emotion as EmotionCategory;
    }
  });
  
  return newContext;
}

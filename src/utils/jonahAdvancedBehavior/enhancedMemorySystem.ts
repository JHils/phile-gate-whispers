/**
 * Enhanced Memory System
 * Advanced memory functionality for Jonah
 */

import { EmotionCategory } from './types';
import { MemoryContext, createDefaultMemoryContext } from './memory/memoryContext';

// Create initial conversation context
export function createConversationContext(trustLevel: 'low' | 'medium' | 'high'): MemoryContext {
  return {
    ...createDefaultMemoryContext(),
    trustLevel
  };
}

// Store input in memory
export function storeInMemory(
  input: string,
  emotion: EmotionCategory,
  isUser: boolean,
  context: MemoryContext
): MemoryContext {
  // Clone context to avoid mutation
  const newContext = { ...context };
  
  // Only store user inputs in recentInputs
  if (isUser) {
    // Add to recent inputs, keep last 5
    newContext.recentInputs = [...newContext.recentInputs, input].slice(-5);
    
    // Increment interaction count
    newContext.interactionCount++;
  }
  
  // Always record emotions
  newContext.recentEmotions = [...newContext.recentEmotions, emotion].slice(-5);
  
  // Update dominant emotion based on frequency
  const emotionCounts: Record<EmotionCategory, number> = {};
  newContext.recentEmotions.forEach(e => {
    emotionCounts[e] = (emotionCounts[e] || 0) + 1;
  });
  
  let maxCount = 0;
  let dominantEmotion: EmotionCategory = 'neutral';
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantEmotion = emotion as EmotionCategory;
    }
  });
  
  newContext.dominantEmotion = dominantEmotion;
  
  // Update last interaction time
  newContext.lastInteractionTime = Date.now();
  
  return newContext;
}

// Find relevant memories based on input
export function findRelevantMemories(input: string, context: MemoryContext): string[] {
  const relevantMemories: string[] = [];
  
  // Simple keyword matching for now
  context.memorizedPhrases.forEach(phrase => {
    const words = input.toLowerCase().split(/\s+/);
    const phraseWords = phrase.toLowerCase().split(/\s+/);
    
    // Check for word overlap
    const overlap = words.filter(word => phraseWords.includes(word));
    if (overlap.length > 0) {
      relevantMemories.push(phrase);
    }
  });
  
  return relevantMemories;
}

// Generate response based on a memory
export function generateMemoryBasedResponse(memory: string, intensity: 'low' | 'medium' | 'high'): string {
  const responseTemplates = [
    "I remember you mentioned {memory} before.",
    "That reminds me of something you said earlier about {memory}.",
    "I haven't forgotten about {memory} that you told me.",
    "You're circling back to {memory} again, I notice."
  ];
  
  const template = responseTemplates[Math.floor(Math.random() * responseTemplates.length)];
  return template.replace('{memory}', memory);
}

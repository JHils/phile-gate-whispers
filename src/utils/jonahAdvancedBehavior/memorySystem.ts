
/**
 * Memory System
 * Core functionality for Jonah's memory capabilities
 */

import { MemoryContext, createDefaultMemoryContext } from './memory/memoryContext';
import { EmotionCategory } from './types';

// Current memory context
let memoryContext: MemoryContext = createDefaultMemoryContext();

// Initialize memory system
export function initializeMemorySystem(): void {
  // Try to load memory context from localStorage
  try {
    const savedContext = localStorage.getItem('jonah_memory_context');
    if (savedContext) {
      memoryContext = { ...memoryContext, ...JSON.parse(savedContext) };
      console.log('Memory context loaded from storage');
    }
  } catch (e) {
    console.error('Error loading memory context:', e);
  }
}

// Save memory context
export function saveMemoryContext(): void {
  try {
    localStorage.setItem('jonah_memory_context', JSON.stringify(memoryContext));
  } catch (e) {
    console.error('Error saving memory context:', e);
  }
}

// Update memory with user input
export function updateMemoryWithInput(input: string): void {
  // Add to recent inputs
  memoryContext.recentInputs.unshift(input);
  if (memoryContext.recentInputs.length > 10) {
    memoryContext.recentInputs.pop();
  }
  
  // Increment interaction count
  memoryContext.interactionCount++;
  
  // Update last interaction time
  memoryContext.lastInteractionTime = Date.now();
  
  // Save updated context
  saveMemoryContext();
}

// Update memory with emotion
export function updateMemoryWithEmotion(emotion: EmotionCategory): void {
  // Add to recent emotions
  memoryContext.recentEmotions.unshift(emotion);
  if (memoryContext.recentEmotions.length > 10) {
    memoryContext.recentEmotions.pop();
  }
  
  // Calculate dominant emotion
  const emotionCounts: Record<string, number> = {};
  memoryContext.recentEmotions.forEach(e => {
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
  
  memoryContext.dominantEmotion = dominantEmotion;
  
  // Save updated context
  saveMemoryContext();
}

// Get current memory context
export function getMemoryContext(): MemoryContext {
  return { ...memoryContext };
}

// Set user name in memory
export function setUserName(name: string): void {
  memoryContext.userName = name;
  saveMemoryContext();
}

// Update trust level in memory
export function updateMemoryTrustLevel(trustLevel: 'low' | 'medium' | 'high'): void {
  memoryContext.trustLevel = trustLevel;
  saveMemoryContext();
}

// Memorize important phrase
export function memorizePhrase(phrase: string): void {
  if (!memoryContext.memorizedPhrases.includes(phrase)) {
    memoryContext.memorizedPhrases.push(phrase);
    if (memoryContext.memorizedPhrases.length > 20) {
      memoryContext.memorizedPhrases.shift();
    }
    saveMemoryContext();
  }
}

// Check if phrase is memorized
export function isPhraseMemorized(phrase: string): boolean {
  return memoryContext.memorizedPhrases.includes(phrase);
}

// Get a random memorized phrase
export function getRandomMemorizedPhrase(): string | null {
  if (memoryContext.memorizedPhrases.length === 0) {
    return null;
  }
  return memoryContext.memorizedPhrases[
    Math.floor(Math.random() * memoryContext.memorizedPhrases.length)
  ];
}

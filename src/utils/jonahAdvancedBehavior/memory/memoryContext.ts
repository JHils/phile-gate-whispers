
/**
 * Memory Context System
 * Manages the context and state of Jonah's memory
 */

import { EmotionCategory } from '../types';

// Memory Context interface
export interface MemoryContext {
  userName: string | null;
  interactionCount: number;
  recentInputs: string[];
  recentEmotions: EmotionCategory[];
  trustLevel: 'low' | 'medium' | 'high';
  dominantEmotion: EmotionCategory;
  memorizedPhrases: string[];
  lastInteractionTime: number;
}

// Create default memory context
export function createDefaultMemoryContext(): MemoryContext {
  return {
    userName: null,
    interactionCount: 0,
    recentInputs: [],
    recentEmotions: [],
    trustLevel: 'low',
    dominantEmotion: 'neutral',
    memorizedPhrases: [],
    lastInteractionTime: Date.now()
  };
}

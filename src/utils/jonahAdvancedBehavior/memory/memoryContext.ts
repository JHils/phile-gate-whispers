
/**
 * Memory Context Type Definitions
 */

import { EmotionCategory } from '../types';

// Memory context type
export interface MemoryContext {
  userName?: string;
  recentInputs: string[];
  dominantEmotion: EmotionCategory;
  seed?: string;
  trustLevel: number;
  personality: 'PRIME' | 'RESIDUE' | 'STATIC' | 'WITNESS';
  keywords: string[];
  visitedPages: string[];
  loopCounter?: Record<string, number>; // Track repetitive behaviors
}

// Default memory context
export const createDefaultMemoryContext = (): MemoryContext => ({
  recentInputs: [],
  dominantEmotion: 'neutral',
  trustLevel: 10,
  personality: 'PRIME',
  keywords: [],
  visitedPages: [],
  loopCounter: {}
});

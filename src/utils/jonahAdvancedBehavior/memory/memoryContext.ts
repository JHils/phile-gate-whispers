/**
 * Memory Context System
 * Provides memory context structure and utilities
 */

export interface MemoryContext {
  memoryLevel: 'low' | 'medium' | 'high';
  lastInteractions: Array<{
    content: string;
    isUser: boolean;
    mood?: string;
    timestamp: number;
  }>;
  personalInfo: Record<string, string>;
  keywords: string[];
  seeds: string[];
  trustScore: number;
  // Adding additional properties required by enhancedMemorySystem.ts
  recentInputs?: string[];
  dominantEmotion?: string;
  seed?: string;
  loopCounter?: Record<string, number>;
  trustLevel?: number;
  loopIndex?: number;
}

/**
 * Create default memory context
 */
export function createDefaultMemoryContext(memoryLevel: 'low' | 'medium' | 'high' = 'medium'): MemoryContext {
  return {
    memoryLevel,
    lastInteractions: [],
    personalInfo: {},
    keywords: [],
    seeds: [],
    trustScore: 50,
    recentInputs: [],
    dominantEmotion: "neutral",
    seed: "",
    loopCounter: {},
    trustLevel: 50,
    loopIndex: 0
  };
}

/**
 * Create memory context from existing data
 */
export function createMemoryContextFromData(
  memoryLevel: 'low' | 'medium' | 'high',
  interactions: Array<{content: string; isUser: boolean; mood?: string}>,
  personalInfo: Record<string, string>,
  keywords: string[],
  seeds: string[],
  trustScore: number
): MemoryContext {
  return {
    memoryLevel,
    lastInteractions: interactions.map(interaction => ({
      ...interaction,
      timestamp: Date.now()
    })),
    personalInfo,
    keywords,
    seeds,
    trustScore,
    recentInputs: [],
    dominantEmotion: "neutral",
    seed: "",
    loopCounter: {},
    trustLevel: 50,
    loopIndex: 0
  };
}


/**
 * Enhanced Emotional Core for Jonah AI
 * Integrates sentiment analysis with memory and mood-driven behavior
 */

// Import directly from the analyzer module, not the top-level export
import { analyzeEmotion } from './sentimentAnalysis/analyzer';
import { EmotionalState } from './types';

// Export from refactored memory modules
export type { MemoryContext } from './memory/memoryContext';
export { createDefaultMemoryContext } from './memory/memoryContext';
export { generateFullEmotionalResponse } from './memory/emotionalResponseGenerator';
export { generateResponseWithMemory } from './memory/memoryProcessor';

// Re-export analyzeEmotion from analyzer directly
export { analyzeEmotion };

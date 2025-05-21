
/**
 * Enhanced Emotional Core for Jonah AI
 * Integrates sentiment analysis with memory and mood-driven behavior
 */

import { analyzeEmotion } from './sentimentAnalysis';
import { EmotionalState } from './types';

// Export from refactored memory modules
export { MemoryContext, createDefaultMemoryContext } from './memory/memoryContext';
export { generateFullEmotionalResponse } from './memory/emotionalResponseGenerator';
export { generateResponseWithMemory } from './memory/memoryProcessor';

// Re-export analyzeEmotion from sentiment analysis
export { analyzeEmotion };

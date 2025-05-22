
/**
 * Sentiment Analysis - Main Export File
 */

import { 
  analyzeEmotion,
  getEmotionalResponse,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols,
  processEmotionalInput,
  generateGreeting,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse
} from './analyzer';
import { EmotionCategory, EmotionalState, EmotionalTrend, ResponseStyle } from '../types';

// Re-export functions with explicit naming
export const analyze = analyzeEmotion;
export { 
  analyzeEmotion,
  getEmotionalResponse,
  getLayeredEmotionalResponse,
  generateGreeting,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse,
  checkForRecurringSymbols,
  processEmotionalInput
};

// Export types properly
export type { 
  EmotionCategory, 
  EmotionalState, 
  EmotionalTrend,
  ResponseStyle
};

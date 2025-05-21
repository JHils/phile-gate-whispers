
/**
 * Temporal System
 * Compatibility layer for the new typing system
 */

import { 
  trackPhrase as typeSystemTrackPhrase,
  getFalseMemoryResponse as typeSystemGetFalseMemoryResponse,
  getLoopResponse as typeSystemGetLoopResponse,
  getBlankFragmentResponse as typeSystemGetBlankFragmentResponse
} from './typingSystem';

// Re-export functions with compatibility layer
export const trackPhrase = typeSystemTrackPhrase;
export const getFalseMemoryResponse = typeSystemGetFalseMemoryResponse;
export const getLoopResponse = typeSystemGetLoopResponse;
export const getBlankFragmentResponse = typeSystemGetBlankFragmentResponse;

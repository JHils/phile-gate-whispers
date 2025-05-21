
/**
 * Loop Awareness System
 * This is now a compatibility layer over the new typing system
 */

import { trackPhrase as typeSystemTrackPhrase } from './typingSystem';

// Export the function for backward compatibility
export function trackPhrase(phrase: string): {isLoop: boolean, count: number} {
  // Use the new implementation
  typeSystemTrackPhrase(phrase);
  
  // Mock the return value to maintain compatibility
  return { isLoop: false, count: 1 };
}

// Export dummy functions for backward compatibility 
export function checkForRepeatPatterns() {
  return null;
}

export function extractKeywords() {
  return [];
}

export function recordSignificantEcho() {
  // compatibility function
}

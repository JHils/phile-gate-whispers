
/**
 * Sentiment Analysis - Main Export File
 */

import { analyze } from './analyzer';
import { generateEmotionalResponse } from './responseGenerator';

// Re-export analyze as analyzeEmotion for backward compatibility
export const analyzeEmotion = analyze;

export { analyze, generateEmotionalResponse };

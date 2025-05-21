
/**
 * Sentiment Analysis - Main Export File
 */

import { analyze } from './analyzer';
import { generateEmotionalResponse } from './responseGenerator';
import { analyzeEmotion } from '../types';

// Re-export analyze as analyzeEmotion for backward compatibility
export { analyze, generateEmotionalResponse, analyzeEmotion };


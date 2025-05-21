
/**
 * Sentiment Analysis - Main Export File
 */

import { analyzeEmotion } from './analyzer';
import { generateEmotionalResponse } from './responseGenerator';
import { analyze } from './analyzer';
import { EmotionCategory, EmotionalState, EmotionalTrend, ResponseStyle } from '../types';

// Re-export everything needed by other modules
export { 
  analyze,
  analyzeEmotion, 
  generateEmotionalResponse, 
  EmotionCategory, 
  EmotionalState, 
  EmotionalTrend,
  ResponseStyle
};

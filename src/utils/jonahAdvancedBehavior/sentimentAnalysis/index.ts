
/**
 * Sentiment Analysis - Main Export File
 */

import { analyzeEmotion } from './analyzer';
import { generateEmotionalResponse, getEmotionalResponse, getLayeredEmotionalResponse } from './responseGenerator';
import { analyze } from './analyzer';
import { EmotionCategory, EmotionalState, EmotionalTrend, ResponseStyle } from '../types';

// Re-export everything needed by other modules
export { 
  analyze,
  analyzeEmotion,
  generateEmotionalResponse,
  getEmotionalResponse, 
  getLayeredEmotionalResponse 
};

// Export types properly
export type { 
  EmotionCategory, 
  EmotionalState, 
  EmotionalTrend,
  ResponseStyle
};

// Add the checker implementation
export const checkForRecurringSymbols = (input: string): string | null => {
  // Define symbols to track
  const symbols = ['mirror', 'gate', 'key', 'dream', 'echo', 'shadow'];
  
  // Check if any symbol is in the input
  for (const symbol of symbols) {
    if (input.toLowerCase().includes(symbol)) {
      // Return a response about the symbol
      const responses = {
        mirror: "The mirror again. It keeps appearing, doesn't it? What do you see in it?",
        gate: "The gate... a threshold between states. Between realities, perhaps.",
        key: "Keys unlock things that were meant to stay closed. Are you sure you want what's on the other side?",
        dream: "Dreams are memories from realities we visit when consciousness slips.",
        echo: "Echoes are fragments of sounds that refuse to die. Like memories.",
        shadow: "We all cast shadows. But what casts yours?"
      };
      
      return responses[symbol as keyof typeof responses] || null;
    }
  }
  
  return null;
};

// Add other needed functions
export const processEmotionalInput = (input: string): EmotionalState => {
  const emotion = analyzeEmotion(input);
  return {
    primary: emotion.primary,
    secondary: emotion.secondary,
    intensity: 'medium'
  };
};

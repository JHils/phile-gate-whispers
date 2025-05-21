
/**
 * Sentiment Analysis - Main Export File
 */

import { analyzeEmotion } from './analyzer';
import { EmotionCategory, EmotionalState, EmotionalTrend, ResponseStyle } from '../types';
import { generateEmotionalResponse as genEmotionalResponse, 
         getEmotionalResponse as getEmoResponse, 
         getLayeredEmotionalResponse as getLayeredEmoResponse } from './responseGenerator';
import { analyze as analyzeInput } from './analyzer';

// Re-export everything needed by other modules
export const analyzeEmotion = analyzeInput;
export const analyze = analyzeInput;
export const generateEmotionalResponse = genEmotionalResponse;
export const getEmotionalResponse = getEmoResponse;
export const getLayeredEmotionalResponse = getLayeredEmoResponse;

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


/**
 * Core type definitions for Jonah's emotional systems
 */

// Emotion categories
export type EmotionCategory = 
  | 'fear' 
  | 'sadness' 
  | 'anger' 
  | 'joy' 
  | 'confusion'
  | 'curiosity' 
  | 'hope' 
  | 'anxiety' 
  | 'paranoia' 
  | 'trust'
  | 'neutral';

// Emotion intensity levels
export type EmotionIntensity = 'low' | 'medium' | 'high';

// Emotional trends
export type EmotionalTrend = 
  | 'stable' 
  | 'intensifying' 
  | 'diminishing' 
  | 'fixated' 
  | 'volatile'
  | 'improving'
  | 'deteriorating';

// Response style options
export type ResponseStyle = 
  | 'direct'
  | 'poetic'
  | 'technical'
  | 'elaborate';

// Core emotional state structure
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
  timestamp: number;
}

// Helper function to create an emotional state
export function createEmotionalState(
  primary: EmotionCategory = 'neutral',
  secondary: EmotionCategory | null = null,
  intensity: EmotionIntensity = 'medium'
): EmotionalState {
  return {
    primary,
    secondary,
    intensity,
    timestamp: Date.now()
  };
}

// Additional types for the console and system
export interface SentienceData {
  level: number;
  awareness: boolean;
  lastUpdate: number;
}

export type StoryFlag = string;
export type BookCode = string;

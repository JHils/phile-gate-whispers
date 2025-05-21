
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
  | 'volatile';

// Core emotional state structure
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
  timestamp: number;
}

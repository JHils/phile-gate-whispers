
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

// Emotional trends - updating to include 'improving' and 'deteriorating'
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

// Expanded SentienceData interface to include all required properties
export interface SentienceData {
  level: number;
  awareness: boolean;
  lastUpdate: number;
  // Add all missing properties
  interactionsCount?: number;
  deepModeUnlocked?: boolean;
  dreamModeTriggered?: boolean;
  lastInteraction?: number;
  temporalStates?: any[];
  memories?: any[];
  sessionData?: {
    messagesReceived?: number;
    messagesSent?: number;
    startTime?: number;
    idleTime?: number;
  };
  microQuests?: {
    active: string[];
    completed: string[];
  };
  memoryParanoia?: {
    visitedPages: Record<string, string>;
    consoleCommands: Record<string, number>;
    pageDuration: {
      shortStay: string;
      longStay: string;
    };
  };
  ecoAwareness?: any;
  realityFabric?: {
    moodChangeTime?: number;
  };
  predictionResponses?: string[];
  usedPredictionResponses?: string[];
}

// Define StoryFlag interface
export interface StoryFlag {
  id: string;
  name: string;
  discovered: boolean;
  description: string;
}

// Define BookCode interface
export interface BookCode {
  id: string;
  name: string;
  unlocked: boolean;
}

// Export StoryFlag and BookCode as types as well (for backward compatibility)
export type StoryFlagType = string;
export type BookCodeType = string;


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

// NewsAwareness interface
export interface NewsAwareness {
  lastChecked: number;
  currentResponses: Array<{
    topic: string;
    headline: string;
    response: string;
    timestamp: number;
  }>;
  weatherCondition: string;
  weatherResponse: string | null;
  moodShift: 'normal' | 'anxious' | 'somber' | 'agitated';
}

// Expanded SentienceData interface with all required properties
export interface SentienceData {
  level: number;
  awareness: boolean;
  lastUpdate: number;
  interactionsCount?: number;
  deepModeUnlocked?: boolean;
  dreamModeTriggered?: boolean;
  lastInteraction?: number;
  temporalStates?: any[];
  memories?: any[];
  memoryFragments?: string[];
  rememberedName?: string;
  audio?: {
    lastPlayed?: number;
    count?: number;
    triggers?: Record<string, number>;
    playedSounds?: string[];
    unlockedVoiceLogs?: string[];
    volumeLevel?: number;
  };
  pageVisits?: Record<string, string[]>;
  tabSwitches?: number;
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
    pageVisits?: Record<string, string[]>;
  };
  mirrorLogs?: Array<{
    timestamp: number;
    path: string;
    notes: string;
  }>;
  ecoAwareness?: any;
  realityFabric?: {
    moodChangeTime?: number;
    currentMood?: string;
    moodHistory?: Array<{mood: string, timestamp: number}>;
    anomalyCount?: number;
    anomalies?: string[];
    journal?: Array<{entryId: number, timestamp: number, content: string}>;
    crossSiteWhispers?: string[];
    mood?: string;
  };
  predictionResponses?: string[];
  usedPredictionResponses?: string[];
  newsAwareness?: NewsAwareness;
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


/**
 * Core Types for Advanced Behavior System
 */

// Emotional categories
export type EmotionCategory = 
  | 'joy'
  | 'sadness'
  | 'anger'
  | 'fear'
  | 'surprise'
  | 'disgust'
  | 'neutral'
  | 'confused'
  | 'hope'
  | 'anxiety'
  | 'paranoia'
  | 'trust'
  | 'curiosity'
  | 'confusion';

// Emotional response intensity
export type EmotionIntensity = 'low' | 'medium' | 'high';

// Emotional state interface
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
}

// Response style types
export type ResponseStyle = 'normal' | 'cryptic' | 'direct' | 'poetic' | 'technical';

// Emotional trend types
export type EmotionalTrend = 'stable' | 'improving' | 'worsening' | 'fluctuating' | 'unknown';

// Book code interface
export interface BookCode {
  code: string;
  unlocked?: boolean;
  pageNumber?: number;
  name?: string;
  timestamp?: number;
}

// Story flag for console clue system
export type StoryFlag = string;

// Eco-awareness state interface
export interface EcoAwarenessState {
  level: number;
  lastInteraction: number;
  topics: string[];
  lastChecked: number;
  previousResponses: string[];
  biomeResponses: Record<string, string[]>;
  knownBiomes: string[];
  dreamtimeActive: boolean;
  woodsResponses: string[];
  connectionStrength: number;
  lastBiomeCheck: number;
  currentBiome: string;
}

// Sentience data interface
export interface SentienceData {
  messages?: string[];
  awareness?: number;
  dreams?: {
    content: string;
    timestamp: number;
  }[];
  lastInteraction?: number;
  trustLevel?: string;
  emotionalState?: EmotionalState;
  emotionalHistory?: EmotionalState[];
  memorizedPhrases?: string[];
  ecoAwareness?: EcoAwarenessState;
  mirrorLogs?: {
    id: string;
    timestamp: number;
    event: string;
    response?: string;
  }[];
  newsAwareness?: NewsAwareness;
  sessionData?: {
    messagesSent: number;
    messagesReceived: number;
    startTime: number;
    idleTime: number;
  };
  interactionsCount?: number;
  deepModeUnlocked?: boolean;
  realityFabric?: {
    moodChangeTime: number;
  };
  microQuests?: {
    active: string[];
    completed: string[];
  };
}

// Memory context interface
export interface MemoryContext {
  recentInputs: string[];
  recentEmotions?: EmotionCategory[];
  trustLevel: string;
  lastInteractionTime?: number;
  trustScore?: number;
  userPreferences?: Record<string, any>;
}

// Emotional keywords interface
export interface EmotionKeywords {
  fear: string[];
  sadness: string[];
  anger: string[];
  joy: string[];
  confusion: string[];
  curiosity: string[];
  hope: string[];
  anxiety: string[];
  paranoia: string[];
  trust: string[];
  neutral: string[];
  surprise: string[];
  disgust: string[];
  confused: string[];
}

// Emotion responses interface
export interface EmotionResponses {
  [key: string]: {
    low: string[];
    medium: string[];
    high: string[];
  };
}

// Clarifying questions interface
export interface ClarifyingQuestions {
  [key: string]: string[];
}

// News awareness interface
export interface NewsAwareness {
  level: number;
  lastChecked: number;
  topics: string[];
  knownStories: string[];
  storyResponses: Record<string, string[]>;
  lastNewsTopic?: string;
  currentStory?: string;
}

// Helper function to create an emotional state
export function createEmotionalState(
  primary: EmotionCategory,
  secondary: EmotionCategory | null = null,
  intensity: EmotionIntensity = 'medium'
): EmotionalState {
  return {
    primary,
    secondary,
    intensity
  };
}

// Confession entry type
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  emotionalContext: string;
  isCorrupted?: boolean;
  recursive?: boolean;
  originalId?: string;
  version?: string;
}

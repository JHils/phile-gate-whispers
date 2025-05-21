
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

// Book code interface
export interface BookCode {
  code: string;
  unlocked?: boolean;
  pageNumber?: number;
  name?: string;
  timestamp?: number;
}

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
  connectionStrength?: number;
  lastBiomeCheck?: number;
  currentBiome?: string;
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

// Memory context interface
export interface MemoryContext {
  recentInputs: string[];
  recentEmotions?: EmotionCategory[];
  trustLevel: string;
  lastInteractionTime?: number;
  userPreferences?: Record<string, any>;
}

// Emotional keywords interface
export interface EmotionKeywords {
  [key: string]: string[];
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

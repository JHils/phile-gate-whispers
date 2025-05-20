
/**
 * Type definitions for Jonah Advanced Behavior System
 */

// SentienceData interface - core data structure
export interface SentienceData {
  interactionsCount: number;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  temporalStates: any[];
  memories: any[];
  microQuests?: {
    active: any[];
    completed: any[];
  };
  sessionData?: {
    messagesSent: number;
    messagesReceived: number;
    startTime: number;
    idleTime: number;
  };
  realityFabric?: {
    anomalies: any[];
    currentMood?: string;
    mood?: string;
    dreamState: boolean;
    moodChangeTime: number;
    lastDreamTime: number;
    crossSiteWhispers: any[];
    hiddenMessages: any[];
    moodHistory?: Array<{mood: string, timestamp: number}>;
    anomalyCount?: number;
    journal?: any[]; 
    dreamParables?: any[];
    usedDreamParables?: any[];
  };
  audio?: {
    lastPlayed: number;
    playedSounds: string[];
    unlockedVoiceLogs: string[];
    volumeLevel?: number;
  };
  // New properties for improved conversation
  memoryParanoia?: {
    visitedPages: Record<string, string>;
    consoleCommands: Record<string, number>;
    pageDuration: {
      shortStay: string;
      longStay: string;
    };
    pageVisits?: string[];
    tabSwitches?: number;
  };
  memoryFragments?: string[];
  predictionResponses?: Record<string, string[]>;
  usedPredictionResponses?: string[];
  conversationMemory?: {
    recentInputs: string[];
    detectedEmotions: string[];
    repeatPatterns: string[];
    conversationTopics: string[];
    lastResponseType: string;
  };
  personalityAdaptation?: {
    userVocabulary: string[];
    preferredTone: string;
    responseComplexity: number;
    userInterestAreas: string[];
    adaptationLevel: number;
  };
  rememberedName?: string;
  pageVisits?: string[];
  tabSwitches?: number;
  ecoAwareness?: {
    lastChecked: number;
    biomeResponses: any[];
    knownBiomes: string[];
    dreamtimeActive: boolean;
    woodsResponses: string[];
    lastBiomeCheck?: number;
    connectionStrength?: number;
    currentBiome?: string;
    previousResponses?: string[]; // Added this property to ensure type consistency
  };
  newsAwareness?: {
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
  };
}

// Story Flag interface
export interface StoryFlag {
  id: string;
  name: string;
  discovered?: boolean;
  description?: string;
}

// Book Code interface
export interface BookCode {
  id: string;
  name: string;
  unlocked?: boolean;
}

// Define conversational response type
export interface ConversationalResponse {
  content: string;
  emotion: string;
  followUp: string | null;
  memoryReference: string | null;
  responseType: 'direct' | 'reflective' | 'clarifying' | 'memory' | 'emotional';
}

// Define emotion detection levels
export type EmotionIntensity = 'low' | 'medium' | 'high';

// Define emotion categories
export type EmotionCategory = 
  'fear' | 'sadness' | 'anger' | 'joy' | 
  'confusion' | 'curiosity' | 'hope' | 'anxiety' |
  'paranoia' | 'trust' | 'neutral';

// Define emotional state interface
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
  timestamp: number;
}

// Define conversation memory
export interface ConversationMemory {
  inputs: string[];
  emotions: EmotionalState[];
  topics: string[];
  timestamp: number;
}

// Define response style
export type ResponseStyle = 'direct' | 'elaborate' | 'poetic' | 'technical';

// Define emotional trend
export type EmotionalTrend = 'improving' | 'deteriorating' | 'fluctuating' | 'stable';

// Create a utility function to convert string to EmotionalState
export function createEmotionalState(emotion: EmotionCategory): EmotionalState {
  return {
    primary: emotion as EmotionCategory,
    secondary: null,
    intensity: 'medium',
    timestamp: Date.now()
  };
}

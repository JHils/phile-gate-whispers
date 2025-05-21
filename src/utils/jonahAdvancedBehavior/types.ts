
/**
 * Jonah Advanced Behavior Type Definitions
 */

// Sentience Data Interface
export interface SentienceData {
  level: number;
  awareness: boolean;
  lastUpdate: number;
  interactionsCount?: number;
  deepModeUnlocked?: boolean;
  dreamModeTriggered?: boolean;
  lastInteraction?: number;
  temporalStates?: Array<{
    input: string;
    timestamp: number;
    emotion: string;
  }>;
  memories?: Array<{
    content: string;
    timestamp: number;
    category?: string;
  }>;
  sessionData?: {
    messagesReceived: number;
    messagesSent: number;
    startTime: number;
    idleTime: number;
  };
  microQuests?: {
    active: string[];
    completed: string[];
  };
  ecoAwareness?: {
    level: number;
    lastInteraction: number;
    topics: string[];
  };
  memoryParanoia?: {
    level: number;
    triggers: string[];
    lastIncident: number;
  };
  realityFabric?: {
    moodChangeTime?: number;
    currentMood?: string;
    moodHistory?: Array<{
      mood: string;
      timestamp: number;
    }>;
    anomalyCount?: number;
    anomalies?: string[];
    journal?: Array<{
      entryId: number;
      timestamp: number;
      content: string;
    }>;
    crossSiteWhispers?: string[];
    mood?: string;
    dreamState?: boolean;
    lastDreamTime?: number;
    hiddenMessages?: string[];
    emotionalState?: {
      primary: string;
      secondary: string | null;
      intensity: string;
    };
  };
}

// Story Flag Interface
export interface StoryFlag {
  id: string;
  discovered: boolean;
  timestamp?: number;
}

// Book Code Interface
export interface BookCode {
  code: string;
  unlocked: boolean;
  pageNumber?: number;
  timestamp?: number;
}

// Extended emotion categories
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

// Emotion intensity levels
export type EmotionIntensity = 'low' | 'medium' | 'high';

// Emotional trend types
export type EmotionalTrend = 
  | 'stable' 
  | 'improving' 
  | 'deteriorating' 
  | 'fluctuating'
  | 'intensifying'
  | 'diminishing';

// Response style types
export type ResponseStyle = 
  | 'direct'
  | 'poetic'
  | 'technical'
  | 'elaborate'
  | 'fragmented';

// Emotional state interface
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
}

// Helper function to create emotional state
export function createEmotionalState(
  primary: EmotionCategory = 'neutral',
  secondary: EmotionCategory | null = null,
  intensity: EmotionIntensity = 'medium'
): EmotionalState {
  return {
    primary,
    secondary,
    intensity
  };
}

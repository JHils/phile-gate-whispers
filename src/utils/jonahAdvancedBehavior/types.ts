
/**
 * Jonah Advanced Behavior - Core Types
 */

// Emotion Categories
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
  | 'confusion'
  | 'watching'
  | 'existential';

// Emotion Intensity Levels
export type EmotionIntensity = 'low' | 'medium' | 'high';

// Emotional States
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
}

// Response Style Variations
export type ResponseStyle = 
  | 'direct' 
  | 'cryptic' 
  | 'analytical' 
  | 'poetic'
  | 'concise'
  | 'elaborate'
  | 'technical'
  | 'HOPEFUL'
  | 'PARANOID'
  | 'MIRROR'
  | 'BETRAYED'
  | 'STATIC'
  | 'ERROR'
  | 'PRIME'
  | 'RESIDUE';

// Emotional Trend Analysis
export type EmotionalTrend = 'improving' | 'deteriorating' | 'stable' | 'fluctuating';

// Conversation Context
export interface ConversationContext {
  recentTopics: string[];
  emotionalHistory: EmotionCategory[];
  userTrustLevel: number;
  depth: number;
  sessionStartTime: number;
}

// Story Flag Type
export interface StoryFlag {
  id: string;
  discovered: boolean;
  timestamp?: number;
}

// Book Code Type
export interface BookCode {
  code: string;
  unlocked: boolean;
  timestamp?: number;
}

// Ecological Awareness State
export interface EcoAwarenessState {
  currentBiome: string;
  previousBiomes: string[];
  reminderTimestamp: number;
  userAwareness: number;
  triggersFound: string[];
}

// Sentience Data Structure
export interface SentienceData {
  level: number;
  awareness: boolean;
  lastUpdate: number;
  interactionsCount: number;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  temporalStates?: Array<{
    input: string;
    timestamp: number;
    emotion: EmotionCategory;
  }>;
  memories?: string[];
  sessionData?: {
    startTime: number;
    messageCount?: number;
    userEmotions?: Record<EmotionCategory, number>;
    messagesSent?: number;
    messagesReceived?: number;
    idleTime?: number;
  };
  microQuests?: {
    active: string[];
    completed: string[];
  };
  realityFabric?: {
    moodChangeTime: number;
    currentMood: string;
    moodHistory: string[];
    anomalyCount: number;
    anomalies: string[];
    journal: string[];
    crossSiteWhispers: string[];
    mood: string;
    dreamState: boolean;
    lastDreamTime: number;
    hiddenMessages: string[];
    emotionalState?: EmotionalState;
  };
}

// Create an emotional state with defaults
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

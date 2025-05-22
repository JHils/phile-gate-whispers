
/**
 * Core type definitions for Jonah's advanced behavior system
 */

// Emotional system types
export type EmotionCategory = 
  'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 
  'disgust' | 'neutral' | 'confused' | 'hope' | 'anxiety' | 
  'paranoia' | 'trust' | 'curiosity' | 'confusion' | 
  'watching' | 'existential';

export type EmotionIntensity = 'low' | 'medium' | 'high';

export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
}

export type TrustLevel = 'low' | 'medium' | 'high';

export type EmotionalTrend = 'stable' | 'improving' | 'declining' | 'volatile';

export type ResponseStyle = 
  'concise' | 'elaborate' | 'cryptic' | 'poetic' | 'analytical' | 
  'technical' | 'direct' | 'HOPEFUL' | 'PARANOID' | 'MIRROR' | 
  'BETRAYED' | 'STATIC' | 'ERROR' | 'PRIME' | 'RESIDUE';

// Create an emotional state helper
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

// Sentience system types
export interface SentienceData {
  level: number;
  awareness: number;
  lastUpdate: number;
  interactionsCount: number;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  temporalStates: any[];
  memories: any[];
  sessionData: {
    startTime: number;
    messageCount: number;
    messagesSent: number;
    messagesReceived: number;
    idleTime: number;
    userEmotions: Record<string, number>;
  };
  realityFabric: {
    moodChangeTime: number;
    currentMood: string;
    moodHistory: any[];
    anomalyCount: number;
    anomalies: any[];
    journal: any[];
    crossSiteWhispers: any[];
    mood: string;
    dreamState: boolean;
    lastDreamTime: number;
    hiddenMessages: string[];
    emotionalState: EmotionalState;
    stability: number;
  };
  dreams: any[];
  ecoAwareness: EcoAwarenessState;
  newsAwareness: NewsAwarenessState;
  microQuests: {
    active: any[];
    completed: any[];
    available: any[];
  };
  emotionalHistory: any[];
  memorizedPhrases: string[];
  trustLevel: TrustLevel;
}

// Conversation context
export interface ConversationContext {
  recentMessages: string[];
  emotionalJourney: EmotionCategory[];
  topicFocus: string | null;
  depth: number;
  recentTopics: string[];
  emotionalHistory: EmotionCategory[];
  userTrustLevel: number;
  sessionStartTime: number;
}

// News awareness state
export interface NewsAwarenessState {
  articles: any[];
  lastChecked: number; // Using lastChecked instead of lastCheck
  recentTopics: string[];
  responses: Record<string, any>;
  lastFetch: number;
  currentEvents: any[];
  weatherData: any | null;
  mentionedEvents: string[];
}

// Eco awareness state
export interface EcoAwarenessState {
  currentBiome: string;
  previousBiomes: string[];
  reminderTimestamp: number;
  userAwareness: number;
  triggersFound: string[];
  biomeResponses: Record<string, any>;
  lastUpdate: number;
  awareness: string; // Changed from number to string
}

// Confession entries
export interface ConfessionEntry {
  id: string;
  text: string;
  content: string; // Added for compatibility
  timestamp: number;
  emotion: EmotionCategory;
  emotionalContext: string;
  recursive: boolean;
  isPrivate?: boolean;
  category?: string; // Added category field
}

// Testament entries
export interface TestamentEntry {
  id: string;
  title: string;
  text: string;
  content: string;
  timestamp: number;
  trustLevel: string; // Required field
  revealed?: boolean;
  requiresTrust?: number;
  unlockPhrase?: string;
  version?: string;
}

// Book codes
export interface BookCode {
  id: string;
  pageNumber?: number; // Added pageNumber
  revealed?: boolean; // Added revealed
  requiresTrust?: number; // Added requiresTrust
  version?: string; // Added version
  content?: string; // Added content
  title?: string; // Added title
}

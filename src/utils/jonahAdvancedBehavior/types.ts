
/**
 * Core types for Jonah's advanced behavior
 */

// Helper function to generate unique IDs
export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Testament system types
export interface TestamentEntry {
  id: string;
  title: string;
  content: string;
  revealed: boolean;
  timestamp: number;
  requiresTrust?: number;
  unlockPhrase?: string;
  corrupted?: boolean;
  version?: string;
}

// Confession system types
export interface ConfessionEntry {
  id: string;
  content?: string;
  text?: string;
  timestamp: number;
  emotionalContext?: string;
  sentiment?: string;
  isCorrupted?: boolean;
  recursive?: boolean;
  version?: string;
  revealed?: boolean;
  title?: string;
  author?: string;
  isAnonymous?: boolean;
}

// Micro Quest system types
export interface MicroQuest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  reward: number;
  type: "exploration" | "conversation" | "discovery" | "puzzle";
  difficulty: "easy" | "medium" | "hard";
  timestamp: number;
}

// Story and book codes
export type StoryFlag = string;
export type BookCode = {
  id: string;
  code: string;
  name: string;
  unlocked: boolean;
  timestamp?: number;
  discovered?: boolean;
  pageNumber?: number;
};

// Trust level type
export type TrustLevel = 'high' | 'medium' | 'low' | 'none';

// Emotional and Sentience types
export type EmotionCategory = 
  | 'curious' | 'analytical' | 'protective' | 'melancholic' | 'suspicious'
  | 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' 
  | 'neutral' | 'confused' | 'hope' | 'anxiety' | 'paranoia' 
  | 'trust' | 'curiosity' | 'confusion' | 'watching' | 'existential';

export type EmotionIntensity = 'low' | 'medium' | 'high';

export type EmotionalTrend = 'stable' | 'increasing' | 'decreasing' | 'volatile' | 'declining';

export type ResponseStyle = 
  | 'analytical' | 'cryptic' | 'direct' | 'poetic' | 'technical' 
  | 'elaborate' | 'concise' | 'PRIME' | 'RESIDUE' | 'HOPEFUL' 
  | 'PARANOID' | 'BETRAYED' | 'MIRROR' | 'STATIC' | 'ERROR';

export type ConversationContext = 'neutral' | 'personal' | 'informational' | 'philosophical';

export interface EmotionalState {
  primary: EmotionCategory;
  secondary?: EmotionCategory;
  intensity: number | EmotionIntensity; // 0-100 or string intensity
  trend?: EmotionalTrend;
}

// Define the structure for conversation context
export interface ConversationContextData {
  recentMessages: string[];
  emotionalJourney: EmotionCategory[];
  topicFocus: string[] | null;
  depth: number;
  recentTopics: string[];
  emotionalHistory: EmotionalState[];
  userTrustLevel: number;
  sessionStartTime: number;
}

export interface SentienceData {
  emotionalState: EmotionalState;
  userPerception: {
    trustLevel: number; // 0-100
    familiarity: number; // 0-100
    interactionCount: number;
  };
  conversationContext: {
    style: ResponseStyle;
    context: ConversationContext;
    depth: number; // 0-100
  };
  temporalContext: {
    startTime: number;
    messageCount: number;
    topicFocus: string[];
    emotionalJourney: EmotionCategory[];
    lastInteraction: number;
    messagesSent: number;
    messagesReceived: number;
  };
  // Additional properties needed in the codebase
  deepModeUnlocked?: boolean;
  microQuests?: MicroQuest[];
  sessionData?: Record<string, any>;
  ecoAwareness?: EcoAwarenessState;
  dreams?: string[];
  mirrorLogs?: string[];
  realityFabric?: RealityFabric;
  level?: number;
  awareness?: number | boolean;
  interactionsCount?: number;
  dreamModeTriggered?: boolean;
  trustLevel?: string;
  lastInteraction?: number;
  temporalStates?: any[];
  memories?: any[];
  lastUpdate?: number;
  newsAwareness?: NewsAwarenessState;
  emotionalHistory?: EmotionalState[];
  memorizedPhrases?: string[];
}

// Eco-awareness types
export interface EcoAwarenessState {
  active: boolean;
  topicSensitivity: number; // 0-100
  lastMentioned: number; // timestamp
  mentionCount: number;
  topicKeywords: string[];
  currentBiome?: string;
  previousBiomes?: string[];
  reminderTimestamp?: number;
  userAwareness?: number;
  triggersFound?: string[];
  biomeResponses?: Record<string, any>;
  lastUpdate?: number;
  awareness?: string | number;
}

// News awareness state
export interface NewsAwarenessState {
  articles: any[];
  lastChecked: number;
  recentTopics: string[];
  responses: Record<string, any>;
  lastFetch: number;
  currentEvents: any[];
  weatherData: any;
  mentionedEvents: string[];
}

// Reality Fabric interface
export interface RealityFabric {
  stability: number; // 0-100
  corruptionLevel: number; // 0-100
  lastGlitch: number; // timestamp
  glitchCount: number;
  anomalies: string[];
  anomalyCount: number;
  memoryFragments: string[];
  unstableAreas: string[];
  lastDetection?: number;
  mood?: string;
  moodChangeTime?: number;
  moodHistory?: string[];
  dreamState?: boolean;
  lastDreamTime?: number;
  hiddenMessages?: string[];
  journal?: any[];
  crossSiteWhispers?: any[];
  currentMood?: string;
  emotionalState?: EmotionalState;
}

// BookCode interface
export interface BookCodeData {
  id: string;
  code: string;
  name: string;
  unlocked: boolean;
  timestamp?: number;
  discovered?: boolean;
  pageNumber?: number;
}

// Clue interface
export interface ClueData {
  id: string;
  name: string;
  discovered: boolean;
  timestamp?: number;
  description?: string;
}

// Function to create a default emotional state
export function createEmotionalState(primary: EmotionCategory = 'curious', secondary?: EmotionCategory, intensity: EmotionIntensity = 'medium'): EmotionalState {
  // Map intensity string to numeric value
  const intensityValue = intensity === 'high' ? 80 : intensity === 'medium' ? 50 : 20;
  
  return {
    primary,
    secondary,
    intensity: intensityValue,
    trend: 'stable'
  };
}

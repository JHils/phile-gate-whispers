
/**
 * Types for Jonah Advanced Behavior System
 */

// Basic emotion types
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
  | 'watching';

export type EmotionIntensity = 'low' | 'medium' | 'high';

// Emotional state structure
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
}

// Helper function to create an EmotionalState object
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

// Trend of emotional states over time
export type EmotionalTrend = 
  | 'stable' 
  | 'escalating' 
  | 'deescalating' 
  | 'fluctuating' 
  | 'shifting'
  | 'improving'
  | 'deteriorating'
  | 'intensifying'
  | 'diminishing';

// Response styling for different moods
export type ResponseStyle = 
  | 'HOPEFUL' 
  | 'PARANOID' 
  | 'MIRROR' 
  | 'BETRAYED' 
  | 'STATIC' 
  | 'ERROR' 
  | 'PRIME'
  | 'RESIDUE'
  | 'poetic'
  | 'technical'
  | 'elaborate'
  | 'concise';

// System for conversation context tracking
export interface ConversationContext {
  recentMessages: string[];
  emotionalJourney: EmotionCategory[];
  topicFocus: string | null;
  depth: number;
}

// Type for temporal state snapshots
export interface TemporalState {
  input: string;
  timestamp: number;
  emotion: EmotionCategory;
}

// Structure for session data
export interface SessionData {
  messagesReceived: number;
  messagesSent: number;
  startTime: number;
  idleTime: number;
  messageCount?: number; // Added to fix compatibility issues
}

// Structure for micro quests
export interface MicroQuest {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  progress?: number;
  goal?: number;
  reward?: string;
}

// Interface for reality fabric data
export interface RealityFabric {
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
  emotionalState: EmotionalState;
  stability?: number; // Added to fix compatibility issues
}

// Interface for sentience data
export interface SentienceData {
  level: number;
  awareness: boolean | number; // Allow number for compatibility
  lastUpdate: number;
  interactionsCount: number;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  temporalStates: TemporalState[];
  memories: string[];
  sessionData: SessionData;
  microQuests: {
    active: MicroQuest[];
    completed: MicroQuest[];
    available?: MicroQuest[]; // Added to fix compatibility issues
  };
  realityFabric?: RealityFabric;
  ecoAwareness?: EcoAwarenessState;
  newsAwareness?: NewsAwarenessState; // Added to fix compatibility issues
  dreams?: string[]; // Added for dream storage
}

// Interface for eco-awareness state
export interface EcoAwarenessState {
  biomeResponses: Record<string, string[]>;
  currentBiome: string;
  lastUpdate: number;
  awareness: number;
  ecoThoughts: string[];
  level: number;
}

// Interface for news-awareness state
export interface NewsAwarenessState {
  articles: string[];
  lastCheck: number;
  recentTopics: string[];
  responses: Record<string, string[]>;
}

// Interface for confession entries
export interface ConfessionEntry {
  id: string;
  text: string;
  timestamp: number;
  sentiment: EmotionCategory;
  isPrivate: boolean;
}


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
  | 'concise'
  | 'cryptic'
  | 'direct'
  | 'analytical';

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
  messageCount?: number;
  userEmotions?: Record<EmotionCategory, number>;
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
  stability?: number;
}

// Interface for sentience data
export interface SentienceData {
  level: number;
  awareness: boolean | number;
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
    available?: MicroQuest[];
  };
  realityFabric?: RealityFabric;
  ecoAwareness?: EcoAwarenessState;
  newsAwareness?: NewsAwarenessState;
  dreams?: string[];
  emotionalHistory?: EmotionCategory[];
  memorizedPhrases?: string[];
  trustLevel?: string;
  emotionalState?: EmotionalState;
  mirrorLogs?: any[];
}

// Interface for eco-awareness state
export interface EcoAwarenessState {
  biomeResponses: Record<string, string[]>;
  currentBiome: string;
  lastUpdate: number;
  awareness: number;
  ecoThoughts: string[];
  level: number;
  lastBiomeCheck?: number;
  connectionStrength?: number;
}

// Interface for news-awareness state
export interface NewsAwarenessState {
  articles: string[];
  lastCheck: number;
  recentTopics: string[];
  responses: Record<string, string[]>;
  lastFetch?: number;
  currentEvents?: any[];
  weatherData?: any;
  mentionedEvents?: string[];
  currentResponses?: Array<{
    topic: string;
    headline: string;
    response: string;
    timestamp: number;
  }>;
  weatherCondition?: string;
  weatherResponse?: string | null;
  moodShift?: 'normal' | 'anxious' | 'somber' | 'agitated';
}

// Interface for confession entries
export interface ConfessionEntry {
  id: string;
  text: string;
  timestamp: number;
  sentiment: EmotionCategory;
  isPrivate: boolean;
  content: string;
  emotionalContext: EmotionCategory | string;
  isCorrupted?: boolean;
  recursive?: boolean;
  version?: string | number;
  revealed?: boolean;
  category?: string;
}

// Testament entry interface
export interface TestamentEntry {
  id: string;
  text: string;
  timestamp: number;
  corrupted?: boolean;
  version?: number;
  title?: string;
  content?: string;
  revealed?: boolean;
  requiresTrust?: number;
  unlockPhrase?: string;
}

// Story flag interface
export interface StoryFlag {
  id: string;
  name: string;
  discovered: boolean;
  timestamp: number;
  description?: string;
}

// Book code interface
export interface BookCode {
  code: string;
  name: string;
  discovered: boolean;
  timestamp?: number;
  unlocked?: boolean;
  id?: string;
  pageNumber?: number;
}

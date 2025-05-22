
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
export type EmotionalTrend = 'improving' | 'deteriorating' | 'stable' | 'fluctuating' | 'intensifying' | 'diminishing';

// Conversation Context
export interface ConversationContext {
  recentTopics: string[];
  emotionalHistory: EmotionCategory[];
  userTrustLevel: number;
  depth: number;
  sessionStartTime: number;
  recentMessages?: string[];
  emotionalJourney?: EmotionCategory[];
  topicFocus?: string | null;
}

// Story Flag Type
export interface StoryFlag {
  id: string;
  name: string;
  discovered: boolean;
  timestamp?: number;
  description: string;
}

// Book Code Type
export interface BookCode {
  id: string;
  code: string;
  name: string;
  unlocked: boolean;
  timestamp?: number;
  discovered: boolean;
  pageNumber?: number;
}

// Ecological Awareness State
export interface EcoAwarenessState {
  currentBiome: string;
  previousBiomes: string[];
  reminderTimestamp: number;
  userAwareness: number;
  triggersFound: string[];
  biomeResponses?: Record<string, string[]>;
  lastUpdate?: number;
  awareness?: string; // Changed to string from number
}

// MicroQuest type for BotQuestSystem
export interface MicroQuest {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  unlocked?: boolean;
  reward: number;
}

// Confession Entry type - Updated with additional fields
export interface ConfessionEntry {
  id: string;
  text: string;
  timestamp: number;
  emotion?: EmotionCategory;
  trust?: number;
  content?: string;
  emotionalContext?: string;
  sentiment?: string;
  isCorrupted?: boolean;
  recursive?: boolean;
  version?: string;
  isPrivate?: boolean;
  revealed?: boolean;
  category?: string; // Added missing field
}

// Testament Entry type - Updated with additional fields
export interface TestamentEntry {
  id: string;
  text: string;
  timestamp: number;
  trustLevel: number;
  emotion?: EmotionCategory;
  title?: string;
  content?: string;
  revealed?: boolean;
  unlockPhrase?: string;
  corrupted?: boolean;
  requiresTrust?: number;
  version?: string;
}

// News awareness types
export interface NewsAwarenessState {
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
  articles?: any[];
  recentTopics?: string[];
  responses?: Record<string, string>;
}

// Reality Fabric type
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
  emotionalState?: EmotionalState;
  stability?: number;
}

// Mirror Event type
export interface MirrorEvent {
  id: string;
  timestamp: number;
  event: string;
  response?: string;
}

// Journal Entry type
export interface JournalEntry {
  entryId: number;
  timestamp: number;
  content: string;
}

// Sentience Data Structure
export interface SentienceData {
  level: number;
  awareness: boolean | string; // Updated to allow string
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
    active: MicroQuest[];
    completed: MicroQuest[];
    available?: MicroQuest[];
  };
  realityFabric?: RealityFabric;
  ecoAwareness?: EcoAwarenessState;
  newsAwareness?: boolean | NewsAwarenessState; // Updated to allow the object
  dreams?: any[];
  mirrorLogs?: string[];
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

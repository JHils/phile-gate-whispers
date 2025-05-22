
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
  recentMessages?: string[]; // Add this to fix the enhancedMemorySystem error
}

// Story Flag Type - Updated to include the name and description fields
export interface StoryFlag {
  id: string;
  name?: string; // Added to fix errors in consoleClueSystem.ts
  discovered: boolean;
  timestamp?: number;
  description?: string; // Added to fix errors in consoleClueSystem.ts
}

// Book Code Type - Updated to include the name and discovered fields
export interface BookCode {
  code: string;
  name?: string; // Added to fix errors
  unlocked: boolean;
  timestamp?: number;
  discovered?: boolean; // Added to fix errors in consoleBookCommands.ts
}

// Ecological Awareness State
export interface EcoAwarenessState {
  currentBiome: string;
  previousBiomes: string[];
  reminderTimestamp: number;
  userAwareness: number;
  triggersFound: string[];
  biomeResponses?: Record<string, string[]>; // Added to fix error in useJonahEcoAwareness.ts
  lastUpdate?: number; // Added to fix error in conversationMemory.ts
}

// MicroQuest type for BotQuestSystem
export interface MicroQuest {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  unlocked?: boolean;
  reward?: number; // Changed from string to number
}

// Confession Entry type - Updated with additional fields
export interface ConfessionEntry {
  id: string;
  text: string;
  timestamp: number;
  emotion?: EmotionCategory;
  trust?: number;
  content?: string; // Added to fix ConfessionListItem and ConfessionDetail
  emotionalContext?: string; // Added to fix ConfessionListItem and ConfessionDetail
  sentiment?: string; // Added to fix ConfessionListItem and ConfessionDetail
  isCorrupted?: boolean; // Added to fix ConfessionDetail
  recursive?: boolean; // Added to fix ConfessionDetail
  version?: string; // Added to fix ConfessionDetail
}

// Testament Entry type - Updated with additional fields
export interface TestamentEntry {
  id: string;
  text: string;
  timestamp: number;
  trustLevel: number;
  emotion?: EmotionCategory;
  title?: string; // Added to fix TestamentPage
  content?: string; // Added to fix TestamentPage
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
  stability?: number; // Added to fix error in conversationMemory.ts
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
    active: MicroQuest[]; // Changed from string[] to MicroQuest[]
    completed: MicroQuest[]; // Changed from string[] to MicroQuest[]
    available?: MicroQuest[]; // Changed from string[] to MicroQuest[]
  };
  realityFabric?: RealityFabric;
  ecoAwareness?: EcoAwarenessState; // Added to fix BotEcologicalAwareness.tsx error
  newsAwareness?: boolean; // Added to fix BotNewsAwareness.tsx error
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

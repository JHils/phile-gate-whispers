
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

// Trend of emotional states over time
export type EmotionalTrend = 'stable' | 'escalating' | 'deescalating' | 'fluctuating' | 'shifting';

// Response styling for different moods
export type ResponseStyle = 
  | 'HOPEFUL' 
  | 'PARANOID' 
  | 'MIRROR' 
  | 'BETRAYED' 
  | 'STATIC' 
  | 'ERROR' 
  | 'PRIME'
  | 'RESIDUE';

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
}

// Interface for sentience data
export interface SentienceData {
  level: number;
  awareness: boolean;
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
  };
  realityFabric?: RealityFabric;
  ecoAwareness?: EcoAwarenessState;
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

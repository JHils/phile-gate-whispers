
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

// Emotional and Sentience types
export type EmotionCategory = 
  | 'curious' | 'analytical' | 'protective' | 'melancholic' | 'suspicious'
  | 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' 
  | 'neutral' | 'confused' | 'hope' | 'anxiety' | 'paranoia' 
  | 'trust' | 'curiosity' | 'confusion' | 'watching';

export type EmotionIntensity = 'low' | 'medium' | 'high';

export type EmotionalTrend = 'stable' | 'increasing' | 'decreasing' | 'volatile' | 'declining';

export type ResponseStyle = 
  | 'analytical' | 'cryptic' | 'direct' | 'poetic' | 'technical' 
  | 'elaborate' | 'concise' | 'PRIME' | 'RESIDUE' | 'HOPEFUL' 
  | 'PARANOID' | 'BETRAYED';

export type ConversationContext = 'neutral' | 'personal' | 'informational' | 'philosophical';

export interface EmotionalState {
  primary: EmotionCategory;
  secondary?: EmotionCategory;
  intensity: number; // 0-100
  trend: EmotionalTrend;
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
  // Additional properties to fix errors
  deepModeUnlocked?: boolean;
  microQuests?: MicroQuest[];
  sessionData?: Record<string, any>;
  ecoAwareness?: EcoAwarenessState;
  dreams?: string[];
  mirrorLogs?: string[];
  realityFabric?: RealityFabric;
}

// Eco-awareness types
export interface EcoAwarenessState {
  active: boolean;
  topicSensitivity: number; // 0-100
  lastMentioned: number; // timestamp
  mentionCount: number;
  topicKeywords: string[];
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

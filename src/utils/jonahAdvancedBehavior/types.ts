
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

// Emotional and Sentience types
export type EmotionCategory = 'curious' | 'analytical' | 'protective' | 'melancholic' | 'suspicious';
export type EmotionalTrend = 'stable' | 'increasing' | 'decreasing' | 'volatile';
export type ResponseStyle = 'analytical' | 'cryptic' | 'direct';
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
export function createEmotionalState(primary: EmotionCategory = 'curious'): EmotionalState {
  return {
    primary,
    intensity: 50,
    trend: 'stable'
  };
}

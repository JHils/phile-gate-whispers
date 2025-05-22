
/**
 * Types for Jonah's advanced behavior systems
 */

// Basic types
export type EmotionCategory = 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'trust' | 'hope';
export type EmotionIntensity = 'low' | 'medium' | 'high';
export type EmotionalTrend = 'stable' | 'declining' | 'volatile';
export type ResponseStyle = 'poetic' | 'analytical' | 'cryptic' | 'direct';

// User perception
export interface UserPerception {
  trustLevel: number;
  interactionFrequency: number;
  emotionalConnection: number;
  curiosityLevel: number;
  questsCompleted: number;
  knowsRealName: boolean;
}

// Memory paranoia
export interface MemoryParanoia {
  level: number;
  triggerWords: string[];
  lastTriggered: number;
  suspicionCount: number;
}

// Emotional state
export interface EmotionalState {
  dominant: EmotionCategory;
  secondary?: EmotionCategory;
  intensity: EmotionIntensity;
  trend: EmotionalTrend;
  lastUpdate: number;
}

// Reality fabric
export interface RealityFabric {
  stability: number;
  glitchLevel: number;
  cohesion: number;
  narrativeFragments: string[];
  storyFlags: StoryFlag[];
}

// Sentience data
export interface SentienceData {
  emotionalState: EmotionalState;
  userPerception: UserPerception;
  realityFabric: RealityFabric;
  memoryParanoia: boolean | MemoryParanoia;
  lastResponse: string;
  responseCount: number;
  creationTime: number;
  deepModeUnlocked: boolean;
  microQuests: MicroQuest[];
  sessionData: {
    startTime: number;
    messageCount: number;
    topicFocus: string[];
    emotionalJourney: EmotionCategory[];
  };
  interactionsCount: number;
  testamentEntries?: TestamentEntry[];
}

// Story flag
export interface StoryFlag {
  id: string;
  name: string;
  triggered: boolean;
  timestamp: number;
}

// Book code
export interface BookCode {
  id: string;
  code: string;
  name: string;
  unlocked: boolean;
  timestamp: number;
}

// Testament entry
export interface TestamentEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  revealed?: boolean;
  unlockPhrase?: string;
  requiresTrust: number;
  trustLevel?: number;
}

// Confession entry
export interface ConfessionEntry {
  id: string;
  title: string;
  content: string;
  text?: string; // Alternative to content for some components
  timestamp: number;
  author?: string;
  emotionalContext?: string;
  sentiment?: string;
  isAnonymous?: boolean;
  isCorrupted?: boolean;
  recursive?: boolean;
  version?: string;
}

// Micro quest
export interface MicroQuest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  reward: number;
  type: 'exploration' | 'conversation' | 'puzzle' | 'discovery';
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp: number;
}

// Helper functions
export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}


/**
 * Jonah Advanced Behavior Type Definitions
 */

// Emotional Categories
export type EmotionCategory =
  | 'joy'
  | 'sadness'
  | 'anger'
  | 'fear'
  | 'neutral'
  | 'surprise'
  | 'curiosity'
  | 'confused'
  | 'hope'
  | 'anxiety'
  | 'paranoia'
  | 'trust'
  | 'watching'
  | 'existential'
  | 'protective'
  | 'melancholic'
  | 'analytical'
  | 'suspicious'
  | 'curious'
  | 'disgust'
  | 'confusion';

// Emotional Trends
export type EmotionalTrend = 'increasing' | 'decreasing' | 'volatile' | 'stable';

// Response Styles
export type ResponseStyle = 
  | 'poetic'
  | 'cryptic'
  | 'analytical'
  | 'direct'
  | 'technical'
  | 'elaborate'
  | 'concise'
  | 'PRIME'
  | 'RESIDUE'
  | 'HOPEFUL'
  | 'PARANOID'
  | 'BETRAYED'
  | 'MIRROR'
  | 'STATIC'
  | 'ERROR';

// Trust Levels
export type TrustLevel = 'none' | 'low' | 'medium' | 'high';

// Emotion Intensity
export type EmotionIntensity = 'low' | 'medium' | 'high';

// Emotional State
export interface EmotionalState {
  primary: EmotionCategory;
  secondary?: EmotionCategory;
  intensity: number;
  trend: EmotionalTrend;
}

// Create Emotional State Helper
export function createEmotionalState(
  primary: EmotionCategory,
  secondary?: EmotionCategory,
  intensity: EmotionIntensity = 'medium'
): EmotionalState {
  // Convert intensity to numeric value
  let numericIntensity = 50; // medium default
  
  if (intensity === 'low') numericIntensity = 25;
  if (intensity === 'high') numericIntensity = 75;
  
  return {
    primary,
    secondary,
    intensity: numericIntensity,
    trend: 'stable'
  };
}

// Generate unique ID helper
export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
}

// Timeline Event
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  importance: number;
  hidden: boolean;
}

// Testament Entry
export interface TestamentEntry {
  id: string;
  title: string;
  content: string;
  unlocked: boolean;
  unlockPhrase: string;
  dateUnlocked: string | null;
  timestamp?: number;
}

// Journal Entry Content
export interface JournalEntryContent {
  content: string;
  timestamp: number;
  entryId: number | string;
}

// Journal Entry
export interface JournalEntry extends JournalEntryContent {
  // Additional fields can be added here as needed
}

// Memory Fragment
export interface MemoryFragment {
  id: string;
  content: string;
  keywords: string[];
  importance: number;
  associatedEmotion?: EmotionCategory;
  timestamp: number;
}

// Confession Entry
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  approved: boolean;
  category: string;
  importance: number;
}

// Book Code
export interface BookCode {
  id: string;
  title: string;
  code: string;
  unlocked: boolean;
  content: string;
}

// Book Code Data
export interface BookCodeData {
  codes: BookCode[];
  activeCode: string | null;
}

// Story Flag
export interface StoryFlag {
  id: string;
  name: string;
  triggered: boolean;
  timestamp: number;
}

// Clue Data
export interface ClueData {
  id: string;
  text: string;
  found: boolean;
  category: string;
}

// Conversation Context Data
export interface ConversationContextData {
  recentMessages: Array<{
    content: string;
    isUser: boolean;
    emotion: EmotionCategory;
    timestamp: number;
  }>;
  dominantEmotions: EmotionCategory[];
  trustLevel: TrustLevel;
  sessionStart: number;
  messageCount: number;
  topics: string[];
}

// Reality Fabric
export interface RealityFabric {
  stability: number;
  corruptionLevel: number;
  lastGlitch: number;
  glitchCount: number;
  anomalies: string[];
  anomalyCount: number;
  memoryFragments: string[];
  unstableAreas: string[];
  moodChangeTime: number;
  currentMood: string;
  moodHistory: string[];
  mood: string;
  dreamState: boolean;
  lastDreamTime: number;
  hiddenMessages: string[];
  journal: JournalEntry[];
  crossSiteWhispers: string[];
}

// Eco Awareness State
export interface EcoAwarenessState {
  enabled: boolean;
  level: number;
  lastUpdate: number;
  topics: {
    climate: boolean;
    conservation: boolean;
    sustainability: boolean;
  };
  responses: string[];
  factoids: string[];
}

// Sentience Data
export interface SentienceData {
  level: number;
  awareness: number;
  lastUpdate: number;
  interactionsCount: number;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  temporalStates: TemporalState[];
  memories: MemoryFragment[];
  sessionData: {
    messagesReceived: number;
    messagesSent: number;
    startTime: number;
    idleTime: number;
    messageCount?: number;
  };
  emotionalState: {
    primary: EmotionCategory;
    secondary: EmotionCategory | null;
    intensity: string;
    trend: EmotionalTrend;
  };
  userPerception: {
    trustLevel: number;
    familiarity: number;
    interactionCount: number;
  };
  conversationContext: {
    style: string;
    context: string;
    depth: number;
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
  microQuests: MicroQuest[];
  ecoAwareness?: EcoAwarenessState;
  realityFabric?: RealityFabric;
}

// Temporal State
export interface TemporalState {
  input: string;
  timestamp: number;
  emotion: EmotionCategory;
}

// Micro Quest
export interface MicroQuest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  reward: number;
  type: 'conversation' | 'discovery' | 'echo' | 'whisper' | 'exploration' | 'puzzle';
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp: number;
}

// Jonah Response Structure
export interface JonahResponse {
  response: string;
  trustChange?: number;
  memoryTriggered?: boolean;
}

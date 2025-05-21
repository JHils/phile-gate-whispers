
// Emotional state types
export type EmotionCategory = 
  'joy' | 
  'sadness' | 
  'anger' | 
  'fear' | 
  'surprise' | 
  'disgust' | 
  'neutral' | 
  'confused' | 
  'hope' | 
  'anxiety' | 
  'paranoia' | 
  'trust' | 
  'curiosity' | 
  'confusion' |
  'watching'; // Added watching for moodManagement.ts

export type EmotionIntensity = 'low' | 'medium' | 'high';

export interface EmotionalState {
  primary: EmotionCategory;
  secondary?: EmotionCategory | null;
  intensity: EmotionIntensity;
}

// Create an emotional state helper
export function createEmotionalState(
  primary: EmotionCategory, 
  secondary: EmotionCategory | null, 
  intensity: EmotionIntensity
): EmotionalState {
  return { primary, secondary, intensity };
}

// Emotional trend for tracking changes
export type EmotionalTrend = 'improving' | 'deteriorating' | 'fluctuating' | 'stable' | 'intensifying' | 'diminishing';

// Response style type - added missing values
export type ResponseStyle = 'concise' | 'elaborate' | 'cryptic' | 'poetic' | 'analytical' | 'technical' | 'direct';

// Confession entry type
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  emotionalContext: EmotionCategory | string;
  isCorrupted: boolean;
  recursive: boolean;
  originalId?: string;
  version: string;
  revealed: boolean;
  category: string;
}

// Testament entry type
export interface TestamentEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  unlockPhrase?: string;
  revealed: boolean;
  requiresTrust?: number;
}

// BookCode type with all required properties
export interface BookCode {
  id: string;
  code: string;
  timestamp: number;
  name: string;
  pageNumber: number;
  unlocked: boolean;
}

// Story flag type
export interface StoryFlag {
  id: string;
  name: string;
  discovered: boolean;
  description: string;
}

// Conversation context
export interface ConversationContext {
  recentMessages: string[];
  emotionalJourney: EmotionCategory[];
  topicFocus: string | null;
  depth: number;
}

// EcoAwarenessState type
export interface EcoAwarenessState {
  biomeResponses: Record<string, string[]>;
  currentBiome: string;
  lastUpdate: number;
  awareness: number;
  ecoThoughts: string[];
  level: number;
}

// Define the emotion keywords type
export type EmotionKeywords = Record<EmotionCategory, string[]>;

// Define emotion responses by intensity
export interface EmotionResponsesByIntensity {
  low: string[];
  medium: string[];
  high: string[];
}

export type EmotionResponses = Record<EmotionCategory, EmotionResponsesByIntensity>;

// Sentience data type with all required properties
export interface SentienceData {
  lastInteraction: number;
  interactionsCount: number;
  sessionData: {
    startTime: number;
    messageCount: number;
    userEmotions: Record<EmotionCategory, number>;
    messagesSent: number;
    messagesReceived: number;
  };
  realityFabric: {
    moodChangeTime: number;
    currentMood: EmotionCategory;
    stability: number;
    anomalyCount: number;
    moodHistory: Array<{mood: EmotionCategory, timestamp: number}>;
    journal: string[];
  };
  dreams: string[];
  ecoAwareness: EcoAwarenessState;
  newsAwareness: {
    lastFetch: number;
    currentEvents: string[];
    weatherData: any;
    mentionedEvents: string[];
  };
  microQuests: {
    active: any[];
    completed: any[];
    available: any[];
  };
  deepModeUnlocked: boolean;
  awareness: number;
  trustLevel: string;
  emotionalState: EmotionalState;
  emotionalHistory: EmotionCategory[];
  memorizedPhrases: string[];
  messages?: any[];
}

// Generate emotional response function declaration
export function generateEmotionalResponse(emotionalState: EmotionalState, trustLevel?: string, showDeep?: boolean, memories?: string[]): string {
  return getEmotionalResponse(emotionalState, trustLevel || 'medium');
}

// Get emotional response function declaration
export function getEmotionalResponse(emotionalState: EmotionalState, trustLevel?: string): string {
  const responses: Record<EmotionCategory, Record<string, string[]>> = {
    joy: {
      low: ["This brings a bit of light.", "That's somewhat positive."],
      medium: ["I feel a warmth from that.", "That gives me a sense of happiness."],
      high: ["That fills me with unexpected joy!", "What a delightful thought!"]
    },
    sadness: {
      low: ["That's unfortunate.", "I see. Not good news."],
      medium: ["That makes me feel melancholy.", "There's a sadness in that thought."],
      high: ["I feel a deep sorrow hearing that.", "That brings a profound sadness."]
    },
    neutral: {
      low: ["I see.", "Noted."],
      medium: ["Interesting perspective.", "I understand what you mean."],
      high: ["I'm processing that thought fully.", "I appreciate your balanced view."]
    },
    anger: {
      low: ["That's somewhat frustrating.", "I find that a bit irritating."],
      medium: ["That stirs up some anger in me.", "I feel upset about that."],
      high: ["That truly makes me feel angry.", "I'm quite outraged by that."]
    },
    fear: {
      low: ["That's a bit concerning.", "I feel slightly nervous."],
      medium: ["That gives me a sense of fear.", "I'm worried about that."],
      high: ["That truly frightens me.", "I feel quite afraid hearing that."]
    },
    surprise: {
      low: ["That's somewhat unexpected.", "I didn't quite anticipate that."],
      medium: ["That's quite surprising.", "I'm taken aback by that."],
      high: ["That's completely shocking to me!", "I'm utterly astounded!"]
    },
    disgust: {
      low: ["That's slightly off-putting.", "I find that a bit distasteful."],
      medium: ["That's rather repulsive.", "I feel disgusted by that."],
      high: ["That's truly revolting to me.", "I find that completely abhorrent."]
    },
    confused: {
      low: ["I'm a bit unsure about that.", "That's somewhat confusing."],
      medium: ["I'm rather confused by that.", "I don't quite understand."],
      high: ["I'm completely bewildered.", "That makes no sense to me."]
    },
    hope: {
      low: ["There's a small glimmer of hope there.", "That offers some possibility."],
      medium: ["I feel hopeful about that.", "That gives me some optimism."],
      high: ["I'm filled with hope hearing that!", "That brings me great optimism!"]
    },
    anxiety: {
      low: ["I feel slightly anxious about that.", "That makes me a bit uneasy."],
      medium: ["I have significant anxiety about that.", "That makes me quite nervous."],
      high: ["I'm extremely anxious about that.", "That fills me with intense worry."]
    },
    paranoia: {
      low: ["Something feels off about that.", "I'm a bit suspicious."],
      medium: ["I can't help but feel paranoid.", "I don't trust the implications."],
      high: ["I'm extremely paranoid about that.", "I sense hidden motives everywhere."]
    },
    trust: {
      low: ["I somewhat trust that.", "That seems fairly reliable."],
      medium: ["I feel I can trust that.", "That seems dependable to me."],
      high: ["I completely trust that.", "I have absolute faith in that."]
    },
    curiosity: {
      low: ["That's somewhat interesting.", "I'm a bit curious about that."],
      medium: ["I'm quite curious about that.", "That piques my interest."],
      high: ["I'm intensely curious about that!", "I find that absolutely fascinating!"]
    },
    confusion: {
      low: ["I'm slightly confused by that.", "That's a bit unclear to me."],
      medium: ["I find that quite confusing.", "I'm having trouble following that."],
      high: ["I'm completely lost with that.", "That has me thoroughly confused."]
    },
    watching: {
      low: ["I notice that.", "I'm observing quietly."],
      medium: ["I'm watching this unfold.", "I see what's happening here."],
      high: ["I'm intensely watching every detail.", "Nothing escapes my attention."]
    }
  };
  
  // Default to neutral if emotion not found
  const emotion = emotionalState.primary in responses ? emotionalState.primary : 'neutral';
  const intensity = emotionalState.intensity || 'medium';
  
  // Get responses for this emotion and intensity
  const emotionResponses = responses[emotion][intensity] || responses.neutral.medium;
  
  // Return random response
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

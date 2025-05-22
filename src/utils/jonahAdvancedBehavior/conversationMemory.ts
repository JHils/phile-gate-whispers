
import { SentienceData, EmotionalState, EmotionCategory } from './types';

// Simple in-memory store for conversation history
let conversationHistory: { user: string; jonah: string; timestamp: number }[] = [];
let emotionalMemory: EmotionalState[] = [];

// Initialize default sentience data
const initializeSentienceData = (): SentienceData => {
  return {
    level: 1,
    awareness: 0,
    lastUpdate: Date.now(),
    interactionsCount: 0,
    deepModeUnlocked: false,
    dreamModeTriggered: false,
    lastInteraction: Date.now(),
    temporalStates: [],
    memories: [],
    sessionData: {
      startTime: Date.now(),
      messageCount: 0,
      messagesSent: 0,
      messagesReceived: 0,
      idleTime: 0,
      userEmotions: {
        joy: 0,
        sadness: 0,
        anger: 0,
        fear: 0,
        surprise: 0,
        disgust: 0,
        neutral: 0,
        confused: 0,
        curiosity: 0,
        confusion: 0,
        hope: 0,
        anxiety: 0,
        paranoia: 0,
        trust: 0,
        watching: 0,
        existential: 0
      }
    },
    realityFabric: {
      moodChangeTime: Date.now(),
      currentMood: "neutral",
      moodHistory: [],
      anomalyCount: 0,
      anomalies: [],
      journal: [],
      crossSiteWhispers: [],
      mood: "neutral",
      dreamState: false,
      lastDreamTime: Date.now(),
      hiddenMessages: [],
      emotionalState: {
        primary: "neutral",
        secondary: null,
        intensity: "medium"
      },
      stability: 0.5
    },
    dreams: [],
    ecoAwareness: {
      biomeResponses: {},
      currentBiome: "none",
      lastUpdate: Date.now(),
      awareness: 0,
      ecoThoughts: [],
      level: 0
    },
    newsAwareness: {
      articles: [],
      lastCheck: Date.now(),
      recentTopics: [],
      responses: {},
      lastFetch: Date.now(),
      currentEvents: [],
      weatherData: null,
      mentionedEvents: []
    },
    microQuests: {
      active: [],
      completed: [],
      available: []
    },
    emotionalHistory: [],
    memorizedPhrases: [],
    trustLevel: "medium"
  };
};

// Add a message to the conversation history
export function recordConversation(userMessage: string, jonahResponse: string): void {
  conversationHistory.push({
    user: userMessage,
    jonah: jonahResponse,
    timestamp: Date.now()
  });

  // Limit history size
  if (conversationHistory.length > 50) {
    conversationHistory = conversationHistory.slice(-50);
  }
}

// Get the conversation history
export function getConversationHistory(): { user: string; jonah: string; timestamp: number }[] {
  return conversationHistory;
}

// Record an emotional state
export function recordEmotionalState(emotionalState: EmotionalState): void {
  emotionalMemory.push(emotionalState);

  // Limit memory size
  if (emotionalMemory.length > 20) {
    emotionalMemory = emotionalMemory.slice(-20);
  }
}

// Get the emotional memory
export function getEmotionalMemory(): EmotionalState[] {
  return emotionalMemory;
}

// Clear conversation history (e.g. on logout or reset)
export function clearConversationHistory(): void {
  conversationHistory = [];
  emotionalMemory = [];
}

// Add the missing exported functions for useMessageHandling.ts
export function storeConversationMemory(user: string, jonah: string): void {
  recordConversation(user, jonah);
}

export function findMemoryReference(input: string): string | null {
  // Simple implementation to find references to previous conversations
  const relevantHistory = conversationHistory.filter(entry => 
    entry.user.toLowerCase().includes(input.toLowerCase()) || 
    entry.jonah.toLowerCase().includes(input.toLowerCase())
  );
  
  if (relevantHistory.length > 0) {
    const randomEntry = relevantHistory[Math.floor(Math.random() * relevantHistory.length)];
    return `Earlier we discussed something similar when you said: "${randomEntry.user}"`;
  }
  
  return null;
}

// Example usage (for testing/debugging)
if (typeof window !== 'undefined') {
  (window as any).getJonahMemory = () => {
    console.log("Conversation History:", getConversationHistory());
    console.log("Emotional Memory:", getEmotionalMemory());
  };
}

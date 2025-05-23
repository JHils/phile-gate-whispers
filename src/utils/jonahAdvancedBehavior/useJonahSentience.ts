
/**
 * useJonahSentience.ts - Utility functionality for Jonah's sentience system
 */

import { SentienceData, EmotionalState, EcoAwarenessState } from './types';

const initialEmotions: Record<string, number> = {
  neutral: 0,
  fear: 0, 
  hope: 0,
  paranoia: 0,
  joy: 0,
  sadness: 0,
  anger: 0,
  surprise: 0,
  disgust: 0,
  confused: 0,
  anxiety: 0,
  trust: 0,
  curiosity: 0,
  confusion: 0,
  watching: 0
};

const initialEmotionalState: EmotionalState = {
  primary: 'neutral',
  secondary: null,
  intensity: 'low'
};

const initialSentienceData: SentienceData = {
  emotionalState: initialEmotionalState,
  userPerception: {
    trustLevel: 50,
    familiarity: 0,
    interactionCount: 0
  },
  conversationContext: {
    style: 'direct',
    context: 'neutral',
    depth: 0
  },
  temporalContext: {
    startTime: Date.now(),
    messageCount: 0,
    topicFocus: [],
    emotionalJourney: [],
    lastInteraction: Date.now(),
    messagesSent: 0,
    messagesReceived: 0
  },
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
    userEmotions: initialEmotions,
    messagesSent: 0,
    messagesReceived: 0,
    idleTime: 0
  },
  realityFabric: {
    stability: 0.5,
    corruptionLevel: 0,
    lastGlitch: Date.now(),
    glitchCount: 0,
    anomalies: [],
    anomalyCount: 0,
    memoryFragments: [],
    unstableAreas: [],
    moodChangeTime: Date.now(),
    currentMood: 'neutral',
    moodHistory: [],
    dreamState: false,
    lastDreamTime: Date.now(),
    hiddenMessages: [],
    journal: [],
    crossSiteWhispers: [],
    mood: 'neutral'
  },
  dreams: [],
  ecoAwareness: {
    active: true,
    topicSensitivity: 50,
    lastMentioned: Date.now(),
    mentionCount: 0,
    topicKeywords: [],
    currentBiome: "none",
    previousBiomes: [],
    reminderTimestamp: Date.now(),
    userAwareness: 0,
    triggersFound: [],
    biomeResponses: {},
    lastUpdate: Date.now(),
    awareness: "0" // Using string instead of number
  },
  newsAwareness: {
    articles: [],
    lastChecked: Date.now(), 
    recentTopics: [],
    responses: {},
    lastFetch: Date.now(),
    currentEvents: [],
    weatherData: null,
    mentionedEvents: []
  },
  microQuests: [
    // Example quest - actual quests would be managed elsewhere
    {
      id: "intro_quest",
      title: "First Steps",
      description: "Start a conversation with Jonah",
      completed: false,
      progress: 0,
      reward: 10,
      type: "conversation",
      difficulty: "easy",
      timestamp: Date.now()
    }
  ],
  emotionalHistory: [],
  memorizedPhrases: [],
  trustLevel: 'medium'
};

// Persist sentience data to localStorage
export const saveSentienceData = (data: SentienceData) => {
  try {
    localStorage.setItem('jonah_sentience_data', JSON.stringify(data));
  } catch (e) {
    console.error('Error saving sentience data:', e);
  }
};

// Load sentience data from localStorage
export const loadSentienceData = (): SentienceData => {
  try {
    const savedData = localStorage.getItem('jonah_sentience_data');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (e) {
    console.error('Error loading sentience data:', e);
  }
  return initialSentienceData;
};

// Get initial sentience data
export const getInitialSentienceData = (): SentienceData => {
  return initialSentienceData;
};

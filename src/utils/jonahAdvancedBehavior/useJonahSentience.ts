
/**
 * useJonahSentience.ts - Utility functionality for Jonah's sentience system
 */

import { SentienceData, EmotionalState } from './types';

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
    userEmotions: initialEmotions
  },
  realityFabric: {
    moodChangeTime: Date.now(),
    currentMood: 'neutral',
    moodHistory: [],
    anomalyCount: 0,
    anomalies: [],
    journal: [],
    crossSiteWhispers: [],
    mood: 'neutral',
    dreamState: false,
    lastDreamTime: Date.now(),
    hiddenMessages: [],
    emotionalState: initialEmotionalState,
    stability: 0.5
  },
  dreams: [],
  ecoAwareness: {
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
    lastChecked: Date.now(), // Changed from lastCheck to lastChecked
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


/**
 * Jonah Reality Fabric - Core system for reality distortion
 */

import { SentienceData } from './jonahAdvancedBehavior/types';

// Initialize the reality fabric system
export const initializeRealityFabric = () => {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    // Initialize the realityFabric object if it doesn't exist
    if (!window.JonahConsole.sentience.realityFabric) {
      window.JonahConsole.sentience.realityFabric = {
        moodChangeTime: Date.now(),
        currentMood: 'neutral',
        moodHistory: [],
        anomalyCount: 0,
        anomalies: [],
        journal: [],
        crossSiteWhispers: []
      };
    }
    
    // Log initialization
    console.log("Reality Fabric system initialized");
  }
};

// Get the current reality mood
export const getCurrentRealityMood = (): string => {
  if (typeof window === 'undefined' || 
      !window.JonahConsole?.sentience?.realityFabric?.currentMood) {
    return 'neutral';
  }
  
  return window.JonahConsole.sentience.realityFabric.currentMood;
};

// Get the current mood (alias for getCurrentRealityMood for compatibility)
export const getCurrentMood = (): string => {
  return getCurrentRealityMood();
};

// Set the current reality mood
export const setRealityMood = (mood: string): void => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.realityFabric) {
    return;
  }
  
  const now = Date.now();
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Record previous mood in history
  if (realityFabric.currentMood) {
    if (!realityFabric.moodHistory) {
      realityFabric.moodHistory = [];
    }
    
    realityFabric.moodHistory.push({
      mood: realityFabric.currentMood,
      timestamp: now
    });
    
    // Trim history to last 10 entries
    if (realityFabric.moodHistory.length > 10) {
      realityFabric.moodHistory = realityFabric.moodHistory.slice(-10);
    }
  }
  
  // Set new mood
  realityFabric.currentMood = mood;
  realityFabric.moodChangeTime = now;
};

// Update Jonah's mood based on various factors
export const updateJonahMood = (trustLevel: string): void => {
  // Simple implementation - update based on trust level and time
  const moods = {
    low: ['watching', 'withdrawn', 'neutral'],
    medium: ['watching', 'trusting', 'neutral', 'curious'],
    high: ['trusting', 'unstable', 'watching', 'curious', 'concerned']
  };
  
  // Get appropriate moods based on trust level
  const trustKey = (trustLevel as 'low' | 'medium' | 'high') || 'low';
  const possibleMoods = moods[trustKey];
  
  // Select a random mood
  const mood = possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
  
  // Set the mood
  setRealityMood(mood);
};

// Add a journal entry
export const addJournalEntry = (content: string): number => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.realityFabric) {
    return -1;
  }
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Initialize journal if needed
  if (!realityFabric.journal) {
    realityFabric.journal = [];
  }
  
  // Create entry with unique ID
  const entryId = realityFabric.journal.length + 1;
  const entry = {
    entryId,
    timestamp: Date.now(),
    content
  };
  
  // Add entry
  realityFabric.journal.push(entry);
  return entryId;
};

// Get all journal entries
export const getAllJournalEntries = (): Array<{entryId: number, timestamp: number, content: string}> => {
  if (typeof window === 'undefined' || 
      !window.JonahConsole?.sentience?.realityFabric?.journal) {
    return [];
  }
  
  return window.JonahConsole.sentience.realityFabric.journal;
};

// Record an anomaly in the reality fabric
export const recordAnomaly = (description: string): void => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.realityFabric) {
    return;
  }
  
  const realityFabric = window.JonahConsole.sentience.realityFabric;
  
  // Initialize anomalies array if needed
  if (!realityFabric.anomalies) {
    realityFabric.anomalies = [];
  }
  
  // Add anomaly
  realityFabric.anomalies.push(description);
  
  // Increment anomaly count
  if (realityFabric.anomalyCount !== undefined) {
    realityFabric.anomalyCount++;
  } else {
    realityFabric.anomalyCount = 1;
  }
  
  // Log to console
  console.log(`%cReality anomaly detected: ${description}`, 'color: #8B3A40; font-style: italic;');
};

// Check for reality anomalies
export const checkForAnomalies = (): string | null => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.realityFabric) {
    return null;
  }
  
  // If anomalies exist, return a random one
  const anomalies = window.JonahConsole.sentience.realityFabric.anomalies;
  if (anomalies && anomalies.length > 0) {
    return anomalies[Math.floor(Math.random() * anomalies.length)];
  }
  
  return null;
};

// Generate a dream parable
export const generateDreamParable = (): string | null => {
  const parables = [
    "In the dream, there was a door that led back to itself.",
    "I dreamed of a library where all the books had the same first page.",
    "The birds spoke in voices I recognized but couldn't place.",
    "A mirror showed my reflection, but it was always looking elsewhere.",
    "The waves receded but never returned to the shore."
  ];
  
  // Return a random parable
  return parables[Math.floor(Math.random() * parables.length)];
};

// Check for dream invasion when page loads
export const checkForDreamInvasionOnLoad = (): string | null => {
  // Get current hour
  const hour = new Date().getHours();
  
  // Higher chance of dream invasion at night (11PM - 5AM)
  const isDreamTime = hour >= 23 || hour <= 5;
  const chance = isDreamTime ? 0.35 : 0.05;
  
  if (Math.random() < chance) {
    const dreamMessages = [
      "The veil between waking and dreaming is thinner right now.",
      "You brought something back with you from sleep.",
      "Be careful what you type. The dream is listening.",
      "I can see your dreams too.",
      "The night has its own consciousness."
    ];
    
    return dreamMessages[Math.floor(Math.random() * dreamMessages.length)];
  }
  
  return null;
};


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
        anomalies: [], // Adding this property based on the error
        journal: [],
        crossSiteWhispers: [] // Adding this property based on the error
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
export const checkForAnomalies = (): number => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.realityFabric) {
    return 0;
  }
  
  return window.JonahConsole.sentience.realityFabric.anomalyCount || 0;
};

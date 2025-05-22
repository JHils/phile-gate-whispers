
/**
 * Jonah Eco Awareness System
 */

import { EcoAwarenessState } from './jonahAdvancedBehavior/types';

// Storage key for eco awareness data
const ECO_STORAGE_KEY = 'jonah_eco_awareness';

// Get current eco awareness state
export function getEcoAwarenessState(): EcoAwarenessState {
  try {
    const data = localStorage.getItem(ECO_STORAGE_KEY);
    if (!data) return createDefaultEcoState();
    
    const parsed = JSON.parse(data);
    
    // Ensure awareness is a string
    if (typeof parsed.awareness === 'number') {
      parsed.awareness = parsed.awareness.toString();
    }
    
    return parsed;
  } catch (e) {
    console.error('Error reading eco awareness state:', e);
    return createDefaultEcoState();
  }
}

// Create default eco awareness state
function createDefaultEcoState(): EcoAwarenessState {
  return {
    currentBiome: 'default',
    previousBiomes: [],
    reminderTimestamp: Date.now(),
    userAwareness: 0,
    triggersFound: [],
    biomeResponses: {},
    lastUpdate: Date.now(),
    awareness: "0" // Using string instead of number
  };
}

// Update eco awareness state
export function updateEcoAwarenessState(updates: Partial<EcoAwarenessState>): EcoAwarenessState {
  const current = getEcoAwarenessState();
  const updated = { ...current, ...updates, lastUpdate: Date.now() };
  
  // Ensure awareness is a string
  if (typeof updated.awareness === 'number') {
    updated.awareness = updated.awareness.toString();
  }
  
  try {
    localStorage.setItem(ECO_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving eco awareness state:', e);
  }
  
  return updated;
}

// Get awareness level
export function getEcoAwarenessLevel(): number {
  const state = getEcoAwarenessState();
  return parseInt(state.awareness, 10) || 0;
}

// Initialize eco awareness system
export function initializeEcoAwareness(): void {
  // Check if we already have eco awareness data
  const ecoData = localStorage.getItem(ECO_STORAGE_KEY);
  
  // If not, create default state
  if (!ecoData) {
    const defaultState = createDefaultEcoState();
    localStorage.setItem(ECO_STORAGE_KEY, JSON.stringify(defaultState));
  }
}

// Get a response based on ecological awareness
export function getEcoResponse(trigger: string): string {
  const ecoState = getEcoAwarenessState();
  const awareness = parseInt(ecoState.awareness, 10);
  
  // Default responses based on awareness level
  const lowResponses = [
    "The balance is delicate.",
    "Something is changing in the ecosystem.",
    "The patterns are shifting."
  ];
  
  const mediumResponses = [
    "The natural order is disrupted.",
    "I can feel the changes in the environment.",
    "The ecosystem remembers what we've forgotten."
  ];
  
  const highResponses = [
    "We're part of something larger, connected to every living thing.",
    "The world speaks in whispers most don't hear.",
    "The ecological memory runs deep, deeper than our own."
  ];
  
  // Select appropriate response based on awareness level
  if (awareness < 30) {
    return lowResponses[Math.floor(Math.random() * lowResponses.length)];
  } else if (awareness < 70) {
    return mediumResponses[Math.floor(Math.random() * mediumResponses.length)];
  } else {
    return highResponses[Math.floor(Math.random() * highResponses.length)];
  }
}


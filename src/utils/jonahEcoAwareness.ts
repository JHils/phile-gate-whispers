
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


/**
 * Reality Fabric System
 * Handles the synthetic reality perception for Jonah
 */

import { RealityFabric } from './jonahAdvancedBehavior/types';

// Initialize reality fabric
export function initializeRealityFabric(): RealityFabric {
  console.log("Reality Fabric system initialized");
  
  // Create initial reality fabric state
  const initialState: RealityFabric = {
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
    stability: 0.8
  };
  
  // Save initial state to localStorage
  saveRealityFabricState(initialState);
  
  return initialState;
}

// Update reality fabric state
export function updateRealityFabric(updates: Partial<RealityFabric>): RealityFabric {
  // Get current state
  const currentState = getRealityFabricState();
  
  // Merge updates
  const updatedState = {
    ...currentState,
    ...updates,
    lastUpdate: Date.now()
  };
  
  // Save updated state
  saveRealityFabricState(updatedState);
  
  return updatedState;
}

// Get reality fabric state
export function getRealityFabricState(): RealityFabric {
  try {
    // Try to get from localStorage
    const savedState = localStorage.getItem('jonahRealityFabric');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error("Error loading reality fabric state:", e);
  }
  
  // If no saved state, initialize
  return initializeRealityFabric();
}

// Helper function to save reality fabric state
function saveRealityFabricState(state: RealityFabric): void {
  try {
    localStorage.setItem('jonahRealityFabric', JSON.stringify(state));
  } catch (e) {
    console.error("Error saving reality fabric state:", e);
  }
}

// Record an anomaly in the reality fabric
export function recordAnomaly(description: string, severity: number): void {
  const state = getRealityFabricState();
  
  // Add anomaly to list
  state.anomalies.push({
    id: `anomaly_${Date.now()}`,
    description,
    timestamp: Date.now(),
    severity
  });
  
  // Update anomaly count
  state.anomalyCount = state.anomalies.length;
  
  // Decrease stability based on severity
  state.stability = Math.max(0, (state.stability || 1) - (severity / 100));
  
  // Save updated state
  saveRealityFabricState(state);
}

// Add a cross-site whisper
export function addCrossSiteWhisper(whisper: string, source: string): void {
  const state = getRealityFabricState();
  
  // Add whisper to list
  state.crossSiteWhispers.push({
    id: `whisper_${Date.now()}`,
    content: whisper,
    source,
    timestamp: Date.now()
  });
  
  // Save updated state
  saveRealityFabricState(state);
}

// Update mood state
export function updateMood(mood: string): void {
  const state = getRealityFabricState();
  
  // Store old mood in history
  state.moodHistory.push({
    mood: state.mood,
    duration: Date.now() - state.moodChangeTime,
    timestamp: state.moodChangeTime
  });
  
  // Update mood
  state.mood = mood;
  state.currentMood = mood;
  state.moodChangeTime = Date.now();
  
  // Save updated state
  saveRealityFabricState(state);
}

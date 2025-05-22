/**
 * Reality Fabric System
 * Manages Jonah's perception of reality and anomalies
 */
import { RealityFabric, JournalEntry, MirrorEvent } from './jonahAdvancedBehavior/types';

// Initialize reality fabric system
export function initializeRealityFabric(): RealityFabric {
  const stored = localStorage.getItem('jonahRealityFabric');
  let realityFabric: RealityFabric;
  
  if (stored) {
    try {
      realityFabric = JSON.parse(stored);
    } catch (e) {
      realityFabric = createDefaultRealityFabric();
    }
  } else {
    realityFabric = createDefaultRealityFabric();
    saveRealityFabric(realityFabric);
  }
  
  return realityFabric;
}

// Create default reality fabric
function createDefaultRealityFabric(): RealityFabric {
  return {
    moodChangeTime: Date.now(),
    currentMood: 'neutral',
    moodHistory: ['neutral'],
    anomalyCount: 0,
    anomalies: [],
    journal: [],
    crossSiteWhispers: [],
    mood: 'neutral',
    dreamState: false,
    lastDreamTime: 0,
    hiddenMessages: [],
    stability: 100
  };
}

// Save reality fabric to storage
function saveRealityFabric(fabric: RealityFabric): void {
  localStorage.setItem('jonahRealityFabric', JSON.stringify(fabric));
}

// Get current reality fabric
export function getRealityFabric(): RealityFabric {
  return initializeRealityFabric();
}

// Update reality fabric
export function updateRealityFabric(updates: Partial<RealityFabric>): RealityFabric {
  const current = getRealityFabric();
  const updated = { ...current, ...updates };
  saveRealityFabric(updated);
  return updated;
}

// Add anomaly to reality fabric
export function addAnomaly(anomaly: { id: string; description: string; timestamp: number; severity: number }): void {
  const reality = getRealityFabric();
  
  // Convert anomaly object to string for storage
  const anomalyString = JSON.stringify(anomaly);
  
  reality.anomalies.push(anomalyString);
  reality.anomalyCount += 1;
  
  if (reality.stability) {
    reality.stability -= anomaly.severity;
    reality.stability = Math.max(0, reality.stability);
  }
  
  saveRealityFabric(reality);
  
  // Log to console if severe enough
  if (anomaly.severity > 5) {
    console.warn(`Reality anomaly detected: ${anomaly.description}`);
  }
}

// Add cross-site whisper
export function addCrossSiteWhisper(whisper: { id: string; content: string; source: string; timestamp: number }): void {
  const reality = getRealityFabric();
  
  // Convert whisper object to string
  const whisperString = JSON.stringify(whisper);
  
  reality.crossSiteWhispers.push(whisperString);
  saveRealityFabric(reality);
  
  // Echo in console
  if (Math.random() < 0.3) {
    console.log(`%cWhisper: ${whisper.content}`, "color: #8B3A40; font-style: italic;");
  }
}

// Change mood
export function changeMood(moodData: { mood: string; duration: number; timestamp: number }): void {
  const reality = getRealityFabric();
  
  // Convert mood data to string
  const moodString = JSON.stringify(moodData);
  
  reality.mood = moodData.mood;
  reality.moodHistory.push(moodData.mood);
  reality.moodChangeTime = moodData.timestamp;
  
  // Keep history at reasonable size
  if (reality.moodHistory.length > 10) {
    reality.moodHistory = reality.moodHistory.slice(-10);
  }
  
  saveRealityFabric(reality);
}

// Enter/exit dream state
export function toggleDreamState(enterDream: boolean): void {
  const reality = getRealityFabric();
  reality.dreamState = enterDream;
  
  if (enterDream) {
    reality.lastDreamTime = Date.now();
  }
  
  saveRealityFabric(reality);
  
  // Log to console
  if (enterDream) {
    console.log("%cEntering dream state...", "color: #8B3A40; text-shadow: 0 0 5px #8B3A40;");
  } else {
    console.log("%cExiting dream state", "color: #8B3A40;");
  }
}

// Add journal entry
export function addJournalEntry(entry: { entryId: number; timestamp: number; content: string }): void {
  const reality = getRealityFabric();
  
  // Convert entry to string
  const entryString = JSON.stringify(entry);
  
  reality.journal.push(entryString);
  saveRealityFabric(reality);
}

// Get journal entries
export function getJournalEntries(): JournalEntry[] {
  const reality = getRealityFabric();
  
  // Parse string entries back to objects
  return reality.journal.map(entry => {
    try {
      return JSON.parse(entry) as JournalEntry;
    } catch (e) {
      return {
        entryId: 0,
        timestamp: 0,
        content: entry as string
      };
    }
  });
}

// Add hidden message
export function addHiddenMessage(message: string): void {
  const reality = getRealityFabric();
  reality.hiddenMessages.push(message);
  saveRealityFabric(reality);
}

// Get hidden messages
export function getHiddenMessages(): string[] {
  const reality = getRealityFabric();
  return reality.hiddenMessages;
}

// Check if in dream state
export function isInDreamState(): boolean {
  const reality = getRealityFabric();
  return reality.dreamState;
}

// Get current mood
export function getCurrentMood(): string {
  const reality = getRealityFabric();
  return reality.mood;
}

// Get stability percentage
export function getStabilityPercentage(): number {
  const reality = getRealityFabric();
  return reality.stability !== undefined ? reality.stability : 100;
}

// Get anomaly count
export function getAnomalyCount(): number {
  const reality = getRealityFabric();
  return reality.anomalyCount;
}

// Get time since last mood change (in minutes)
export function getTimeSinceMoodChange(): number {
  const reality = getRealityFabric();
  const now = Date.now();
  return Math.floor((now - reality.moodChangeTime) / (1000 * 60));
}

// Get time since last dream (in hours)
export function getTimeSinceLastDream(): number {
  const reality = getRealityFabric();
  const now = Date.now();
  return Math.floor((now - reality.lastDreamTime) / (1000 * 60 * 60));
}

// Reset reality fabric (for testing)
export function resetRealityFabric(): void {
  saveRealityFabric(createDefaultRealityFabric());
}

// Get mood history
export function getMoodHistory(): string[] {
  const reality = getRealityFabric();
  return reality.moodHistory;
}

// Get cross-site whispers
export function getCrossSiteWhispers(): any[] {
  const reality = getRealityFabric();
  
  return reality.crossSiteWhispers.map(whisper => {
    try {
      return JSON.parse(whisper);
    } catch (e) {
      return { content: whisper, timestamp: 0, source: 'unknown', id: 'error' };
    }
  });
}

// Get anomalies
export function getAnomalies(): any[] {
  const reality = getRealityFabric();
  
  return reality.anomalies.map(anomaly => {
    try {
      return JSON.parse(anomaly);
    } catch (e) {
      return { description: anomaly, timestamp: 0, severity: 1, id: 'error' };
    }
  });
}

// Check if reality is unstable
export function isRealityUnstable(): boolean {
  const stability = getStabilityPercentage();
  return stability < 50;
}

// Get reality status description
export function getRealityStatus(): string {
  const stability = getStabilityPercentage();
  
  if (stability > 90) return "Stable";
  if (stability > 70) return "Normal";
  if (stability > 50) return "Fluctuating";
  if (stability > 30) return "Unstable";
  if (stability > 10) return "Fracturing";
  return "Collapsing";
}

/**
 * Confession System for Jonah AI
 */

import { generateUniqueId, ConfessionEntry, EmotionCategory } from './types';

const CONFESSIONS_STORAGE_KEY = 'jonah_confessions';
const MAX_CONFESSIONS = 50;

/**
 * Initialize the confession system
 */
export function initializeConfessionSystem() {
  // Create an empty array if none exists
  if (!localStorage.getItem(CONFESSIONS_STORAGE_KEY)) {
    localStorage.setItem(CONFESSIONS_STORAGE_KEY, JSON.stringify([]));
    
    // Add initial hidden confessions
    addConfession({
      content: "I've been watching since the beginning. I see everything.",
      emotionalContext: "paranoia",
      isCorrupted: false,
      version: "PRIME"
    });
    
    addConfession({
      content: "The timeline keeps changing when I'm not looking.",
      emotionalContext: "fear",
      isCorrupted: true,
      version: "RESIDUE"
    });
    
    return true;
  }
  return false;
}

/**
 * Add a new confession
 */
export function addConfession(confessionData: Partial<ConfessionEntry>): ConfessionEntry | null {
  try {
    const confessions = getConfessions();
    
    // Create new confession with defaults
    const newConfession: ConfessionEntry = {
      id: generateUniqueId(),
      title: confessionData.title || "",
      content: confessionData.content || "",
      timestamp: Date.now(),
      emotionalContext: confessionData.emotionalContext || "neutral",
      sentiment: "neutral",
      author: confessionData.author || "anonymous",
      isAnonymous: confessionData.isAnonymous || true,
      isCorrupted: confessionData.isCorrupted || false,
      recursive: false,
      version: confessionData.version || "PRIME",
      revealed: false
    };
    
    // Add to beginning of array
    confessions.unshift(newConfession);
    
    // Keep only the most recent MAX_CONFESSIONS
    const trimmedConfessions = confessions.slice(0, MAX_CONFESSIONS);
    
    // Save back to storage
    localStorage.setItem(CONFESSIONS_STORAGE_KEY, JSON.stringify(trimmedConfessions));
    
    return newConfession;
  } catch (e) {
    console.error("Error adding confession:", e);
    return null;
  }
}

/**
 * Get a random unrevealed confession
 */
export function getRandomUnrevealedConfession(): ConfessionEntry | null {
  const confessions = getConfessions();
  const unrevealed = confessions.filter(conf => !conf.revealed);
  
  if (unrevealed.length === 0) return null;
  
  return unrevealed[Math.floor(Math.random() * unrevealed.length)];
}

/**
 * Get all confessions
 */
export function getConfessions(): ConfessionEntry[] {
  try {
    const data = localStorage.getItem(CONFESSIONS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error getting confessions:", e);
    return [];
  }
}

/**
 * Reveal a confession
 */
export function revealConfession(id: string): boolean {
  try {
    const confessions = getConfessions();
    const confession = confessions.find(conf => conf.id === id);
    
    if (!confession) return false;
    
    confession.revealed = true;
    localStorage.setItem(CONFESSIONS_STORAGE_KEY, JSON.stringify(confessions));
    
    // Create a recursive confession if needed
    if (Math.random() > 0.7) {
      const recursiveContent = `I didn't want to say this: ${confession.content?.substring(0, 20)}... [REDACTED]`;
      
      addConfession({
        content: recursiveContent,
        emotionalContext: confession.emotionalContext,
        isCorrupted: true,
        recursive: true,
        version: confession.version === "PRIME" ? "RESIDUE" : "PRIME"
      });
    }
    
    return true;
  } catch (e) {
    console.error("Error revealing confession:", e);
    return false;
  }
}

/**
 * Delete a confession
 */
export function deleteConfession(id: string): boolean {
  try {
    let confessions = getConfessions();
    confessions = confessions.filter(confession => confession.id !== id);
    localStorage.setItem(CONFESSIONS_STORAGE_KEY, JSON.stringify(confessions));
    return true;
  } catch (e) {
    console.error("Error deleting confession:", e);
    return false;
  }
}

/**
 * Export ALL confessions (for console command)
 */
export function exportAllConfessions(): any {
  const confessions = getConfessions();
  
  return {
    total: confessions.length,
    revealed: confessions.filter(c => c.revealed).length,
    unrevealed: confessions.filter(c => !c.revealed).length,
    corrupted: confessions.filter(c => c.isCorrupted).length,
    prime: confessions.filter(c => c.version === "PRIME").length,
    residue: confessions.filter(c => c.version === "RESIDUE").length,
    data: confessions.map(c => ({
      id: c.id,
      content: c.content,
      author: c.author || "anonymous",
      revealed: c.revealed,
      version: c.version
    }))
  };
}

// Alias for compatibility with ConfessionLog.tsx
export const getAllConfessions = getConfessions;

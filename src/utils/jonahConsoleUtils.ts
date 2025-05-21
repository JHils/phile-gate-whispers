
/**
 * Jonah Console Utilities
 * Provides helper functions for console interactions
 */

import { generateDreamParable, addJournalEntry } from './jonahRealityFabric';
import { getTrustLevel } from './jonahAdvancedBehavior/trustSystem';

// Log a dream to the console
export function logDream(): string {
  const dream = generateDreamParable();
  
  // Log to console
  console.log(`%c${dream}`, "color: #8B3A40; font-style: italic;");
  
  // Add to journal
  addJournalEntry(`Dream shared: ${dream}`);
  
  return dream;
}

// Echo a message back to the console
export function echoMessage(message: string): string {
  // Log to console
  console.log(`%c${message}`, "color: #8B3A40;");
  
  return message;
}

// Show status in the console
export function showStatus(): void {
  const trustLevel = getTrustLevel();
  
  // Log status
  console.log("%cJONAH STATUS:", "color: #8B3A40; font-weight: bold;");
  console.log(`%cTrust Level: ${trustLevel}`, "color: #8B3A40;");
  console.log(`%cMood: ${localStorage.getItem('jonah_mood') || 'PRIME'}`, "color: #8B3A40;");
  console.log(`%cEmotion: ${localStorage.getItem('jonah_emotion_primary') || 'neutral'}`, "color: #8B3A40;");
  
  // Get dreams
  const dreams = JSON.parse(localStorage.getItem('jonah_dreams') || '[]');
  console.log(`%cDreams: ${dreams.length}`, "color: #8B3A40;");
}

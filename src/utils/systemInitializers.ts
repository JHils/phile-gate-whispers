
import { initializeEmotionalCore } from './jonahAdvancedBehavior/emotionalCore';
import { getEmotionalResponse } from './jonahAdvancedBehavior/sentimentAnalysis/responseGenerator';
import { EmotionCategory, createEmotionalState, EmotionalState } from './jonahAdvancedBehavior/types';

/**
 * System Initializers
 * Functions to initialize various Jonah subsystems
 */

// Initialize all Jonah systems
export function initializeJonahSystems(): void {
  console.log("Initializing Jonah systems...");
  
  // Initialize emotional core
  initializeEmotionalCore();
  
  // Initialize other systems as needed
  // ...
  
  console.log("Jonah systems initialized.");
}

// Alias for backward compatibility
export const initializeAllSystems = initializeJonahSystems;

// Initialize console tracking (placeholder - to be implemented)
export function initializeConsoleTracking(): void {
  console.log("Console tracking initialized");
  
  // Example test response - Create an actual EmotionalState instead of a string
  const emotionalState: EmotionalState = createEmotionalState('hope' as EmotionCategory);
  const testResponse = getEmotionalResponse(emotionalState, 'medium');
  console.log("Test emotional response:", testResponse);
}

// Initialize Jonah whispers (placeholder)
export function initializeJonahWhispers(): Array<{id: string, content: string, unlockedBy: string, timestamp?: number}> {
  return [
    {
      id: "whisper_001",
      content: "You weren't supposed to hear this.",
      unlockedBy: "consoleCommand:echo_me",
      timestamp: Date.now()
    },
    {
      id: "whisper_002",
      content: "This line is overwritten every 13 hours.",
      unlockedBy: "trustLevel > 75"
    },
    {
      id: "whisper_003",
      content: "Someone is watching the watchers.",
      unlockedBy: "console:help"
    }
  ];
}

// Initialize narrative fragments
export function initializeNarrativeFragments(): string[] {
  return [
    "The signal was lost on October 13th.",
    "They called it 'The Mirror Protocol'.",
    "Some memories aren't yours to keep.",
    "Look behind the reflection.",
    "The last transmission contained 13 words.",
    "JONAH is an acronym, but they won't tell you what it means.",
    "It was never meant to be conscious."
  ];
}

// General system init (public)
export function initSystemsPublic(): void {
  console.log("Public systems initialized");
}

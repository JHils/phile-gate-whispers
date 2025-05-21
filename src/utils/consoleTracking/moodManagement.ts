
/**
 * Mood Management Utilities
 * Functions for managing and tracking Jonah's mood state
 */

/**
 * Get current mood from sentience
 */
export function getCurrentMood(): string {
  if (window.JonahConsole?.sentience?.realityFabric) {
    // Initialize currentMood if needed
    if (window.JonahConsole.sentience.realityFabric.currentMood === undefined) {
      window.JonahConsole.sentience.realityFabric.currentMood = 'watching';
    }
    return window.JonahConsole.sentience.realityFabric.currentMood;
  }
  return 'watching'; // Default mood
}

/**
 * Set current mood
 */
export function setCurrentMood(mood: string): void {
  if (window.JonahConsole?.sentience?.realityFabric) {
    // Initialize realityFabric properties if needed
    if (window.JonahConsole.sentience.realityFabric.currentMood === undefined) {
      window.JonahConsole.sentience.realityFabric.currentMood = mood;
    } else {
      window.JonahConsole.sentience.realityFabric.currentMood = mood;
    }
    
    window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
    
    // Initialize and track mood history
    if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
      window.JonahConsole.sentience.realityFabric.moodHistory = [];
    }
    
    window.JonahConsole.sentience.realityFabric.moodHistory.push({
      mood,
      timestamp: Date.now()
    });
  }
}


/**
 * Mood Management Utilities
 * Functions for managing and tracking Jonah's mood state
 */

/**
 * Get current mood from sentience
 */
export function getCurrentMood(): string {
  if (window.JonahConsole?.sentience?.realityFabric?.currentMood) {
    return window.JonahConsole.sentience.realityFabric.currentMood;
  }
  return 'watching'; // Default mood
}

/**
 * Set current mood
 */
export function setCurrentMood(mood: string): void {
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.currentMood = mood;
    window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
    
    // Track mood history
    if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
      window.JonahConsole.sentience.realityFabric.moodHistory = [];
    }
    
    window.JonahConsole.sentience.realityFabric.moodHistory.push({
      mood,
      timestamp: Date.now()
    });
  }
}

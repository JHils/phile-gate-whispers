
/**
 * Jonah Advanced Behavior - Main Index File
 * 
 * This file re-exports the key functionality from the advanced behavior system
 */

// Export the main types
export * from './types';

// Export from each subsystem
export * from './emotionalCore';

// Export from sentiment analysis
export {
  analyzeEmotion,
  checkForTriggerPhrases,
  processEmotionalInput,
  getEmotionalResponse,
  getLayeredEmotionalResponse,
  generateGreeting
} from './sentimentAnalysis/analyzer';

// Export helper functions
export function jonah_storeMemoryFragment(text: string) {
  try {
    if (!window.JonahConsole) window.JonahConsole = {};
    if (!window.JonahConsole.argData) window.JonahConsole.argData = {};
    if (!window.JonahConsole.argData.memoryFragments) window.JonahConsole.argData.memoryFragments = [];
    
    window.JonahConsole.argData.memoryFragments.push(text);
    return true;
  } catch (e) {
    console.error("Error storing memory fragment", e);
    return false;
  }
}

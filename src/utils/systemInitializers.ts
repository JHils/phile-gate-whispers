
/**
 * System Initializers
 * Centralized initialization for Jonah's systems
 */

// Import individual initializers
import { initializeJonahSystems } from './jonahAdvancedBehavior/initializeBehavior';
import { initializeConsoleCommands } from './consoleCommands';
import { initializeConsoleTracking } from './consoleTracking';
import { initializeJonahWhispers } from './jonahCrossSiteWhisper';
import { initializeFuzzyStoryMatching } from './fuzzyStoryMatching';
import { initializeGlitchAwakening } from './jonahAdvancedBehavior/GlitchAwakening';

/**
 * Initialize all Jonah systems at once
 */
export function initializeAllSystems(): void {
  // Core systems
  initializeJonahSystems();
  initializeConsoleCommands();
  initializeConsoleTracking();
  initializeJonahWhispers();
  initializeFuzzyStoryMatching();
  initializeGlitchAwakening();
  
  // Set global initialization flag
  if (typeof window !== 'undefined') {
    window.JonahInitialized = true;
  }
  
  console.log('Jonah systems initialized');
}

// Re-export individual initializers for granular control
export {
  initializeJonahSystems,
  initializeConsoleCommands,
  initializeConsoleTracking,
  initializeJonahWhispers,
  initializeGlitchAwakening
};

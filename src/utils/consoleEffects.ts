/**
 * Central export file for all console effects
 * This maintains compatibility with existing imports while providing a more modular structure
 */

// Re-export all functionality from the new modular files
export { typewriterLog, flickerLog, delayedLog, glitchText, glitchEffectLog } from './consoleTextEffects';
export { speak } from './consoleAudioEffects';
export { trackCommand } from './consoleTrackingUtils';
export { displayRandomJoke } from './consoleJokes';
export { playMagneticTentStory } from './consoleStories';
export { initializeWhisperMaster } from './consoleWhisperMaster';

// This ensures backward compatibility by re-exporting all the functionality
// from the original consoleEffects.ts file

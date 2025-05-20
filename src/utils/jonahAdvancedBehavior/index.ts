
/**
 * Jonah Advanced Behavior System - Main export file
 */

// Export from subsystems
export { processEmotionalInput, getCompoundEmotionalState, getLayeredEmotionalResponse, checkForRecurringSymbols, storeEmotionalMemory } from './emotionalCore';
export { applyTypingQuirks } from './quirks/typingQuirks';
export { addConfession, getAllConfessions, getConfessionsByEmotion, ConfessionEntry } from './confessionSystem';
export { checkTestamentUnlock, getNextTestamentEntry, getRevealedEntries } from './testament';
export { getMostRecentBroadcast, rebootAfterBroadcast, BroadcastType } from './lastBroadcast';

// Initialize the behavior system
export const initializeAdvancedBehavior = () => {
  // Import and initialize all subsystems
  const { initializeTestament } = require('./testament');
  const { initializeConfessions } = require('./confessionSystem');
  const { initializeDreamSystem } = require('./dreamSystem');
  const { initializeEchoSystem } = require('./echoSystem');
  
  // Initialize each subsystem
  initializeTestament();
  initializeConfessions();
  initializeDreamSystem();
  initializeEchoSystem();
  
  console.log('Jonah Advanced Behavior System initialized');
};

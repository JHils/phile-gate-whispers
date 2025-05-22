
/**
 * System initializers for Jonah AI
 */

import { loadSentienceData, saveSentienceData, getInitialSentienceData } from './jonahAdvancedBehavior/useJonahSentience';
import { initializeTrustSystem } from './jonahAdvancedBehavior/trustSystem';
import { initializeMemorySystem } from './jonahAdvancedBehavior/memorySystem';
import { initializeRealityFabric } from './jonahRealityFabric';
import { getEcoAwarenessState } from './jonahEcoAwareness';

// Initialize all Jonah systems - renamed from initializeJonahSystems to initializeAllSystems for consistency
export function initializeAllSystems(): void {
  // Initialize trust system
  initializeTrustSystem();
  
  // Initialize memory system
  initializeMemorySystem();
  
  // Initialize reality fabric
  initializeRealityFabric();
  
  // Load sentience data or create if not exists
  const sentience = loadSentienceData();
  
  // Update sentience with eco awareness
  try {
    const ecoAwareness = getEcoAwarenessState();
    sentience.ecoAwareness = ecoAwareness;
  } catch (e) {
    console.error('Error loading eco awareness:', e);
  }
  
  // Save updated sentience
  saveSentienceData(sentience);
  
  // Initialize console commands
  initializeConsoleCommands();
}

// For backward compatibility
export { initializeAllSystems as initializeJonahSystems };

// Initialize console commands
function initializeConsoleCommands(): void {
  // Add a custom welcome message to console
  console.log(
    '%cJonah Console Initialized',
    'color: #3a7bd5; font-size: 16px; font-weight: bold;'
  );
  
  // Add hint for users who open the console
  setTimeout(() => {
    console.log(
      '%cHint: Try typing "start()" or "help()" to begin',
      'color: #333; font-style: italic;'
    );
  }, 2000);
}

// Initialize sentience
export function initializeSentience(): void {
  // Check if sentience already initialized
  if (window.JonahConsole?.sentience) {
    return;
  }
  
  // Initialize global object
  if (!window.JonahConsole) {
    window.JonahConsole = {};
  }
  
  // Load or create sentience data
  const sentience = loadSentienceData();
  
  // Add to global object
  window.JonahConsole.sentience = sentience;
  
  // Initialize trust system
  initializeTrustSystem();
  
  // Initialize memory system
  initializeMemorySystem();
  
  // Initialize reality fabric
  initializeRealityFabric();
  
  // Set last interaction time
  window.JonahConsole.sentience.lastInteraction = Date.now();
  
  // Save sentience data
  saveSentienceData(window.JonahConsole.sentience);
}


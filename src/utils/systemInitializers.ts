
/**
 * System Initializers - Main import/export file
 * This file centralizes all initialization functions
 */

// Import from our refactored modules
import { initializeConsoleTracking } from './consoleTracking/initialization';
import { initializeInteractiveCommands } from './consoleTracking/interactiveCommands';
import { initializeAdvancedBehavior } from './jonahAdvancedBehavior';
import { initializeRealityFabric } from './jonahRealityFabric';
import { initializeSentience, setupJonahMessageSystem } from './jonahSentience';
import { initializeTestament } from './jonahAdvancedBehavior/testament';
import { checkLastBroadcastConditions, triggerLastBroadcast } from './jonahAdvancedBehavior/testament';

// Import our centralized types
import './types/globalConsoleTypes';

// Initialize all console tracking systems
export const initializeAllSystems = () => {
  // Initialize console tracking
  initializeConsoleTracking();
  
  // Initialize commands
  initializeInteractiveCommands();
  
  // Initialize Jonah systems
  initializeSentience();
  setupJonahMessageSystem();
  initializeAdvancedBehavior();
  initializeRealityFabric();
  initializeTestament();
  
  // Check for last broadcast conditions
  if (checkLastBroadcastConditions()) {
    console.log("%cInitiating last broadcast...", "color: #8B3A40; font-size:16px;");
    
    setTimeout(() => {
      const message = triggerLastBroadcast();
      
      if (window.triggerJonahMessage) {
        window.triggerJonahMessage(message);
      } else {
        console.log(`%c${message}`, "color: #8B3A40; font-size:16px;");
      }
    }, 5000);
  }
  
  console.log("All systems initialized");
};

// Export for individual access
export { initializeConsoleTracking } from './consoleTracking/initialization';
export { initializeInteractiveCommands } from './consoleTracking/interactiveCommands';
export { initializeAdvancedBehavior } from './jonahAdvancedBehavior';
export { initializeRealityFabric } from './jonahRealityFabric';
export { initializeSentience, setupJonahMessageSystem } from './jonahSentience';
export { initializeTestament } from './jonahAdvancedBehavior/testament';

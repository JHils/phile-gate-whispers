
/**
 * System Initializers - Main import/export file
 * This file centralizes all initialization functions
 */

// Import from our refactored modules
import { initializeConsoleTracking } from './consoleTracking/initialization';
import { initializeAdvancedBehavior } from './jonahAdvancedBehavior';
import { initializeRealityFabric } from './jonahRealityFabric';
import { initializeSentience, setupJonahMessageSystem } from './jonahSentience';
import { initializeTestament } from './jonahAdvancedBehavior/testament';
import { initializeEmotionalCore } from './jonahAdvancedBehavior/emotionalCore';

// Import our centralized types
import './types/globalConsoleTypes';

// Initialize all console tracking systems
export const initializeAllSystems = () => {
  // Initialize console tracking
  initializeConsoleTracking();
  
  // Initialize Jonah systems
  initializeSentience();
  setupJonahMessageSystem();
  initializeAdvancedBehavior();
  initializeRealityFabric();
  initializeTestament();
  initializeEmotionalCore();
  
  // Check for last broadcast conditions
  if (Math.random() < 0.01) { // 1% chance for demonstration
    console.log("%cInitiating last broadcast...", "color: #8B3A40; font-size:16px;");
    
    setTimeout(() => {
      const message = "This is the final broadcast. The gate is closing.";
      
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
export { initializeAdvancedBehavior } from './jonahAdvancedBehavior';
export { initializeRealityFabric } from './jonahRealityFabric';
export { initializeSentience, setupJonahMessageSystem } from './jonahSentience';
export { initializeTestament } from './jonahAdvancedBehavior/testament';
export { initializeEmotionalCore } from './jonahAdvancedBehavior/emotionalCore';

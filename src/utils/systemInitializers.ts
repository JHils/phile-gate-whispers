
/**
 * System Initializers - Main import/export file
 * This file centralizes all initialization functions
 */

// Import from our refactored modules
import { initializeConsoleTracking } from './consoleTracking/initialization';
import { initializeInteractiveCommands } from './consoleTracking/interactiveCommands';

// Initialize all console tracking systems
export const initializeAllSystems = () => {
  // Initialize console tracking
  initializeConsoleTracking();
  
  // Initialize commands
  initializeInteractiveCommands();
  
  console.log("All systems initialized");
};

// Export for individual access
export { initializeConsoleTracking } from './consoleTracking/initialization';
export { initializeInteractiveCommands } from './consoleTracking/interactiveCommands';

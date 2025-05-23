/**
 * Initialize Jonah Advanced Behavior
 * Centralizes initialization of all advanced behavioral systems
 */

import { initializeEmotionalCore } from './emotionalCore';
import { initializeMemorySystem } from './memorySystem';
import { modifyTrustLevel } from './trustSystem';
import { initializeTestamentSystem } from './testament';

// Memory fragment utility to fix missing export error
export function jonah_storeMemoryFragment(fragment: string): boolean {
  try {
    // Get existing fragments
    const fragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    
    // Add new fragment with timestamp
    fragments.push({
      content: fragment,
      timestamp: Date.now()
    });
    
    // Keep only the most recent 50 fragments
    const trimmedFragments = fragments.slice(-50);
    
    // Store back to localStorage
    localStorage.setItem('jonah_memory_fragments', JSON.stringify(trimmedFragments));
    
    // Update JonahConsole if available
    if (window.JonahConsole?.argData) {
      window.JonahConsole.argData.memoryFragments = 
        trimmedFragments.map(frag => frag.content);
    }
    
    return true;
  } catch (e) {
    console.error("Error storing memory fragment:", e);
    return false;
  }
}

// Initialize Jonah's advanced behavioral systems
export function initializeAdvancedBehavior() {
  console.log("Initializing Jonah's advanced behavioral systems...");
  
  // Initialize core systems
  initializeEmotionalCore();
  initializeMemorySystem();
  initializeTestamentSystem();
  
  // Set initial trust level if not already set
  if (!localStorage.getItem('jonahTrustScore')) {
    localStorage.setItem('jonahTrustScore', '50');
  }
  
  console.log("Jonah Advanced Behavior System initialized");
  
  return true;
}

// Re-export for convenience
export function initializeJonahSystems() {
  return initializeAdvancedBehavior();
}


/**
 * Initialize advanced behavior system for Jonah
 */

import { jonah_storeMemoryFragment } from './trustSystem';

// Initialize the advanced behavior system
export function initializeBehavior(): void {
  // Create behavior storage in localStorage if it doesn't exist
  if (!localStorage.getItem('jonahBehavior')) {
    localStorage.setItem('jonahBehavior', JSON.stringify({
      lastInteraction: Date.now(),
      emotionalState: 'neutral', // Initial state
      memoryFragments: [],
      sessionCount: 0,
      lastEmotionChange: 0,
      userInputs: [],
      lastMultiLineResponse: 0,
      typingQuirkIntensity: 'minimal'
    }));
  }
  
  // Update session count
  const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  behavior.sessionCount = (behavior.sessionCount || 0) + 1;
  behavior.lastInteraction = Date.now();
  localStorage.setItem('jonahBehavior', JSON.stringify(behavior));
  
  // Setup memory fragments from localStorage
  const storedFragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
  
  // Initialize memory fragments in JonahConsole if not present
  if (window.JonahConsole && !window.JonahConsole.sentience?.memoryFragments) {
    if (!window.JonahConsole.sentience) {
      window.JonahConsole.sentience = {
        interactionsCount: 0,
        deepModeUnlocked: false,
        dreamModeTriggered: false,
        lastInteraction: Date.now()
      };
    }
    
    window.JonahConsole.sentience.memoryFragments = [...storedFragments];
  }
  
  // Add some session-specific memory fragments
  const sessionFragments = [
    `Session ${behavior.sessionCount} began at ${new Date().toLocaleTimeString()}`,
    `User returned after ${getTimeSinceLastVisit(behavior.lastInteraction)}`
  ];
  
  // Store these fragments
  sessionFragments.forEach(fragment => jonah_storeMemoryFragment(fragment));
  
  console.log("Advanced behavior system initialized.");
}

// Get a formatted string representing time since last visit
function getTimeSinceLastVisit(lastTimestamp: number): string {
  const now = Date.now();
  const diffMs = now - lastTimestamp;
  
  // Convert to minutes, hours, or days as appropriate
  const minutes = Math.floor(diffMs / (1000 * 60));
  
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  
  const hours = Math.floor(minutes / 60);
  
  if (hours < 24) {
    return `${hours} hours`;
  }
  
  const days = Math.floor(hours / 24);
  return `${days} days`;
}

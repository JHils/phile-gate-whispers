
/**
 * Initialize advanced behavior system for Jonah
 */

import { jonah_storeMemoryFragment } from './trustSystem';
import { initializeEnhancedConsole } from './consoleEmotionalEffects';
import { generateDream } from './dreamSystem';
import { initializeTestament } from './testament';
import throttle from 'lodash/throttle';

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
      typingQuirkIntensity: 'minimal',
      sessionMemory: [],
      primaryMood: 'neutral',
      secondaryMood: null,
      emotionalIntensity: 0.5,
      dreams: [],
      interactionPattern: {
        repeatedPhrases: {},
        responsePreferences: {},
        sentimentTrends: [],
        interactionFrequency: {
          timestamps: [],
          averageGap: 0
        },
        personalTags: [],
        lastAnalyzed: Date.now()
      },
      // Echo chamber system
      echoVault: [],
      lastEchoTime: 0,
      // Unsaid archive system
      unsaidArchive: [],
      // Memory systems
      loopCounters: [],
      falseMemories: [],
      memoryCorruption: 0,
      lastMemoryConflict: 0,
      // Testament system
      testament: [],
      testamentLastView: 0,
      testamentUnlocked: false
    }));
  }
  
  // Update session count - throttled to prevent history.replaceState errors
  const throttledUpdateSession = throttle(() => {
    const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    behavior.sessionCount = (behavior.sessionCount || 0) + 1;
    behavior.lastInteraction = Date.now();
    
    // Initialize session memory if not present
    if (!behavior.sessionMemory) {
      behavior.sessionMemory = [];
    }
    
    localStorage.setItem('jonahBehavior', JSON.stringify(behavior));
  }, 1000, { leading: true, trailing: false }); // Only execute once per second at most
  
  // Call the throttled function instead of direct update
  throttledUpdateSession();
  
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
    `Session ${getBehaviorValue('sessionCount')} began at ${new Date().toLocaleTimeString()}`,
    `User returned after ${getTimeSinceLastVisit(getBehaviorValue('lastInteraction'))}`
  ];
  
  // Store these fragments using a throttled approach
  const throttledStoreMemory = throttle((fragment: string) => {
    jonah_storeMemoryFragment(fragment);
  }, 500); // Only store one fragment every 500ms
  
  // Store memory fragments with throttling
  sessionFragments.forEach(fragment => throttledStoreMemory(fragment));
  
  // Initialize enhanced console with emotional effects
  initializeEnhancedConsole();
  
  // Initialize testament system
  initializeTestament();
  
  // Generate a dream if it's been a while since the last session
  const lastInteraction = getBehaviorValue('lastInteraction');
  const now = Date.now();
  if (lastInteraction && (now - lastInteraction > 3 * 60 * 60 * 1000)) { // 3 hours
    // Generate a dream about the absence
    setTimeout(() => {
      const dream = generateDream();
      
      // Log the dream to console for discovery
      if (typeof window.logJonahDream === 'function') {
        window.logJonahDream(dream.content);
      }
    }, 5000); // Wait 5 seconds before generating dream
  }
  
  console.log("Advanced behavior system initialized. Emotional depth enhanced.");
}

// Helper function to safely get a value from jonahBehavior
function getBehaviorValue(key: string): any {
  try {
    const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return behavior[key];
  } catch (error) {
    console.error("Error retrieving behavior value:", error);
    return null;
  }
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

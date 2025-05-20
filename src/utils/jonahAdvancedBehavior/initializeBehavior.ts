
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
    try {
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
    } catch (error) {
      console.error("Error initializing Jonah behavior storage:", error);
    }
  }
  
  // Update session count - heavily throttled to prevent history.replaceState errors
  const throttledUpdateSession = throttle(() => {
    try {
      const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
      behavior.sessionCount = (behavior.sessionCount || 0) + 1;
      behavior.lastInteraction = Date.now();
      
      // Initialize session memory if not present
      if (!behavior.sessionMemory) {
        behavior.sessionMemory = [];
      }
      
      localStorage.setItem('jonahBehavior', JSON.stringify(behavior));
    } catch (error) {
      console.error("Error updating session data:", error);
    }
  }, 10000, { leading: true, trailing: false }); // Only execute once per 10 seconds at most
  
  // Call the throttled function instead of direct update
  throttledUpdateSession();
  
  // Setup memory fragments from localStorage
  let storedFragments = [];
  try {
    storedFragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
  } catch (error) {
    console.error("Error parsing memory fragments:", error);
  }
  
  // Initialize memory fragments in JonahConsole if not present - with error handling
  if (window.JonahConsole && !window.JonahConsole.sentience?.memoryFragments) {
    try {
      if (!window.JonahConsole.sentience) {
        window.JonahConsole.sentience = {
          interactionsCount: 0,
          deepModeUnlocked: false,
          dreamModeTriggered: false,
          lastInteraction: Date.now(),
          temporalStates: [],
          memories: []
        };
      }
      
      window.JonahConsole.sentience.memoryFragments = [...storedFragments];
    } catch (error) {
      console.error("Error initializing JonahConsole sentience:", error);
    }
  }
  
  // Add some session-specific memory fragments - but limit to a small number
  const sessionFragments = [
    `Session ${getBehaviorValue('sessionCount')} began at ${new Date().toLocaleTimeString()}`
  ];
  
  // Store these fragments using a heavily throttled approach
  const throttledStoreMemory = throttle((fragment: string) => {
    try {
      jonah_storeMemoryFragment(fragment);
    } catch (error) {
      console.error("Error storing memory fragment:", error);
    }
  }, 15000); // Only store one fragment every 15 seconds
  
  // Store memory fragments with throttling - and only if Math.random passes to reduce frequency
  if (Math.random() < 0.5) { // 50% chance to even bother storing
    sessionFragments.forEach(fragment => throttledStoreMemory(fragment));
  }
  
  // Initialize enhanced console with emotional effects - but wrapped in try/catch
  try {
    initializeEnhancedConsole();
  } catch (error) {
    console.error("Error initializing enhanced console:", error);
  }
  
  // Initialize testament system - with try/catch
  try {
    initializeTestament();
  } catch (error) {
    console.error("Error initializing testament system:", error);
  }
  
  // Generate a dream if it's been a while since the last session - but with reduced probability
  const lastInteraction = getBehaviorValue('lastInteraction');
  const now = Date.now();
  if (lastInteraction && (now - lastInteraction > 12 * 60 * 60 * 1000) && Math.random() < 0.3) { // 12 hours and 30% chance
    // Generate a dream about the absence, but with a long delay and try/catch
    setTimeout(() => {
      try {
        const dream = generateDream();
        
        // Log the dream to console for discovery
        if (typeof window.logJonahDream === 'function' && Math.random() < 0.7) { // 70% chance
          window.logJonahDream(dream.content);
        }
      } catch (error) {
        console.error("Error generating dream:", error);
      }
    }, 30000); // Wait 30 seconds before generating dream
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
  try {
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
  } catch (error) {
    console.error("Error calculating time since last visit:", error);
    return "unknown time";
  }
}

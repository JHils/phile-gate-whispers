
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
  // Add try/catch to everything to prevent cascading errors
  try {
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
  
    // Update session count - ultra-throttled to prevent history.replaceState errors
    // Use an IIFE with a very low probability of execution
    (function() {
      try {
        // Only run this 20% of the time to reduce frequency further
        if (Math.random() > 0.8) return;
        
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
        }, 120000, { leading: true, trailing: false }); // Only execute once per 2 minutes at most
      
        // Call the throttled function instead of direct update
        throttledUpdateSession();
      } catch (error) {
        console.error("Error in session count update:", error);
      }
    })();
  
    // Setup memory fragments from localStorage
    try {
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
              level: 1,
              awareness: false,
              lastUpdate: Date.now(),
              interactionsCount: 0,
              deepModeUnlocked: false,
              dreamModeTriggered: false,
              lastInteraction: Date.now(),
              temporalStates: [],
              memories: [],
              memoryFragments: []
            };
          }
          
          if (!window.JonahConsole.sentience.memoryFragments) {
            window.JonahConsole.sentience.memoryFragments = [...storedFragments];
          }
        } catch (error) {
          console.error("Error initializing JonahConsole sentience:", error);
        }
      }
    } catch (error) {
      console.error("Error setting up memory fragments:", error);
    }
  
    // Add some session-specific memory fragments - but limit to a small number and with low probability
    try {
      // Only attempt this 10% of the time
      if (Math.random() < 0.1) {
        const sessionFragments = [`Session ${getBehaviorValue('sessionCount')} began at ${new Date().toLocaleTimeString()}`];
      
        // Store these fragments using an extremely throttled approach
        const throttledStoreMemory = throttle((fragment: string) => {
          try {
            jonah_storeMemoryFragment(fragment);
          } catch (error) {
            console.error("Error storing memory fragment:", error);
          }
        }, 300000); // Only store one fragment every 5 minutes
        
        // Store memory fragments with extreme throttling and randomness
        if (Math.random() < 0.2) { // 20% chance
          sessionFragments.forEach(fragment => {
            setTimeout(() => {
              throttledStoreMemory(fragment);
            }, 30000); // 30 second delay before storing
          });
        }
      }
    } catch (error) {
      console.error("Error adding session fragments:", error);
    }
  
    // Initialize enhanced console with emotional effects - but wrapped in try/catch and with delay
    try {
      setTimeout(() => {
        try {
          initializeEnhancedConsole();
        } catch (error) {
          console.error("Error in delayed console initialization:", error);
        }
      }, 5000); // 5 second delay
    } catch (error) {
      console.error("Error scheduling enhanced console:", error);
    }
  
    // Initialize testament system - with try/catch and probability
    try {
      if (Math.random() < 0.5) { // Only 50% chance to initialize
        setTimeout(() => {
          try {
            initializeTestament();
          } catch (error) {
            console.error("Error initializing testament system:", error);
          }
        }, 15000); // 15 second delay
      }
    } catch (error) {
      console.error("Error scheduling testament initialization:", error);
    }
  
    // Generate a dream if it's been a while - with extremely low probability
    try {
      const lastInteraction = getBehaviorValue('lastInteraction');
      const now = Date.now();
      if (lastInteraction && 
          (now - lastInteraction > 24 * 60 * 60 * 1000) && // 24 hours since last interaction
          Math.random() < 0.1) { // Only 10% chance
        // Generate a dream about the absence, with a very long delay
        setTimeout(() => {
          try {
            const dream = generateDream();
            
            // Log the dream to console for discovery - with even lower probability
            if (typeof window.logJonahDream === 'function' && Math.random() < 0.3) { // 30% chance
              window.logJonahDream(dream.content);
            }
          } catch (error) {
            console.error("Error generating dream:", error);
          }
        }, 60000); // 60 seconds delay
      }
    } catch (error) {
      console.error("Error checking for dream generation:", error);
    }
    
    // Log initialization
    console.log("Advanced behavior system initialized with enhanced throttling and error handling.");
  } catch (error) {
    console.error("Critical error in behavior initialization:", error);
  }
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

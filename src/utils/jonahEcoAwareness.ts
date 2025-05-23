
import { EcoAwarenessState } from '@/utils/jonahAdvancedBehavior/types';

/**
 * Initializes the eco-awareness system for Jonah
 */
export function initializeEcoAwareness() {
  if (typeof window === 'undefined' || !window.JonahConsole) return;
  
  // Check if eco-awareness is already initialized
  if (!window.JonahConsole.sentience?.ecoAwareness) {
    // Create default eco-awareness state
    const defaultEcoState: EcoAwarenessState = {
      active: true,
      topicSensitivity: 30,
      lastMentioned: 0,
      mentionCount: 0,
      topicKeywords: ['nature', 'environment', 'ecosystem', 'climate', 'earth', 'forest', 'ocean'],
      currentBiome: 'none',
      userAwareness: 0,
      triggersFound: [],
      awareness: '0'
    };
    
    // Initialize in window object
    if (window.JonahConsole.sentience) {
      window.JonahConsole.sentience.ecoAwareness = defaultEcoState;
    }
    
    // Also initialize in localStorage for persistence
    localStorage.setItem('jonah_eco_awareness', JSON.stringify(defaultEcoState));
  }
}

/**
 * Get an ecological response based on the current biome
 */
export function getEcoResponse(biome: string): string {
  const biomeResponses = getBiomeResponses();
  
  // Get responses for the specified biome, or default to 'none'
  const responses = biomeResponses[biome as keyof typeof biomeResponses] || 
                   biomeResponses['none'];
  
  // Return a random response from the available ones
  return responses[Math.floor(Math.random() * responses.length)];
}

// Add the biome responses function
export function getBiomeResponses() {
  return {
    forest: [
      "The trees have memories longer than yours or mine.",
      "Each leaf is a solar panel designed by evolution.",
      "The forest watches, breathes, and waits with ancient patience."
    ],
    ocean: [
      "More unknown than space, we've mapped more of Mars than our own deep oceans.",
      "Water remembers everything it touches.",
      "The ocean never sleeps, its currents are thoughts passing through a vast mind."
    ],
    desert: [
      "Even in apparent emptiness, life persists.",
      "Time moves differently here, erosion is just a slow-motion waterfall.",
      "Ancient riverbeds lie beneath the sand, memories of water."
    ],
    mountains: [
      "Some of these stones were once seafloors. Now they touch the sky.",
      "They rise a few millimeters each year. Patience made manifest.",
      "The oldest living things on Earth hide in mountain shadows."
    ],
    city: [
      "Concrete forests with their own ecosystems and weather patterns.",
      "The buildings breathe with the people inside them.",
      "City lights are our constellation on the surface of the Earth."
    ],
    none: [
      "We're all connected to something larger than ourselves.",
      "The world continues whether we observe it or not.",
      "Patterns exist everywhere if you know how to look for them."
    ]
  };
}

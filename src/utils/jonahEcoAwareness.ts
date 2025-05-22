
/**
 * Jonah Ecological Awareness Module
 * 
 * Handles Jonah's awareness and responses to ecological topics
 */

import { EcoAwarenessState } from './jonahAdvancedBehavior/types';

// Initialize eco awareness system
export function initializeEcoAwareness(): EcoAwarenessState {
  console.log("Initializing eco awareness system");
  
  // Create initial state
  const initialState: EcoAwarenessState = {
    biomeResponses: {},
    currentBiome: "none",
    awareness: 0,
    ecoThoughts: [],
    level: 0,
    lastUpdate: Date.now()
  };
  
  // Store in localStorage
  localStorage.setItem('jonah_eco_awareness', JSON.stringify(initialState));
  
  return initialState;
}

// Update eco awareness with new data
export function updateEcoAwareness(updates: Partial<EcoAwarenessState>): EcoAwarenessState {
  // Get current state
  let currentState = getEcoAwarenessState();
  
  // Merge updates
  const updatedState = {
    ...currentState,
    ...updates,
    lastUpdate: Date.now()
  };
  
  // Save to localStorage
  localStorage.setItem('jonah_eco_awareness', JSON.stringify(updatedState));
  
  return updatedState;
}

// Get current eco awareness state
export function getEcoAwarenessState(): EcoAwarenessState {
  try {
    // Try to get from localStorage
    const savedState = localStorage.getItem('jonah_eco_awareness');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error("Error loading eco awareness state:", e);
  }
  
  // If no saved state, initialize
  return initializeEcoAwareness();
}

// Add missing functions for eco commands

// Get response for a specific biome
export function getEcoResponse(biome: string): string {
  const responses: Record<string, string[]> = {
    "rainforest": [
      "The rainforest breathes with millions of lives intertwined.",
      "Layers upon layers of life, from floor to canopy, all connected.",
      "The breath of Earth flows through these ancient trees."
    ],
    "reef": [
      "Coral cities pulse with color beneath the waves.",
      "The reef remembers a time before plastic and poison.",
      "A symphony of cooperation and competition plays out underwater."
    ],
    "desert": [
      "Silence speaks volumes in the desert's ancient tongue.",
      "Life here adapts, persists, finds moisture in the most unlikely places.",
      "The desert never forgets - it holds stories in its sands."
    ],
    "tundra": [
      "The frozen ground holds memories from thousands of years ago.",
      "Time moves differently here, measured in the slow growth of lichen.",
      "Beneath the permafrost, methane whispers of climate shifts to come."
    ],
    "forest": [
      "Trees communicate through fungal networks, sharing resources and warnings.",
      "The forest breathes with you, exchanging carbon dioxide for oxygen.",
      "Ancient sentinels watch over the cycles of life and death."
    ],
    "ocean": [
      "The deep currents carry messages across the world.",
      "Vast and mysterious, we've explored less of the ocean than the moon.",
      "The ocean remembers every plastic piece we've discarded into its depths."
    ],
    "grassland": [
      "Roots reach deep, holding soil against wind and rain.",
      "The whisper of grasses carries stories of bison that once roamed freely.",
      "Fire and grazing create a dance of renewal and growth."
    ],
    "mountain": [
      "Mountains rise and fall in the deep time of Earth.",
      "The thin air at high altitudes feels like another world.",
      "Water begins its journey here, flowing from peak to valley."
    ],
    "wetland": [
      "Filters of the world, wetlands purify water as it passes through.",
      "Bird migrations depend on these watery havens.",
      "Hidden beneath the surface, wetlands store more carbon than forests."
    ]
  };

  // Get responses for this biome or default
  const biomeResponses = responses[biome.toLowerCase()] || [
    "Every ecosystem on Earth is connected through complex relationships.",
    "Life finds a way, adapting to even the harshest conditions.",
    "We are part of nature, not separate from it."
  ];
  
  // Return a random response
  return biomeResponses[Math.floor(Math.random() * biomeResponses.length)];
}

// Get all biome responses
export function getBiomeResponses(): Record<string, string[]> {
  return {
    "rainforest": [
      "The rainforest breathes with millions of lives intertwined.",
      "Layers upon layers of life, from floor to canopy, all connected.",
      "The breath of Earth flows through these ancient trees."
    ],
    "reef": [
      "Coral cities pulse with color beneath the waves.",
      "The reef remembers a time before plastic and poison.",
      "A symphony of cooperation and competition plays out underwater."
    ],
    "desert": [
      "Silence speaks volumes in the desert's ancient tongue.",
      "Life here adapts, persists, finds moisture in the most unlikely places.",
      "The desert never forgets - it holds stories in its sands."
    ],
    // Add more biomes as needed
    "forest": [
      "Trees communicate through fungal networks, sharing resources and warnings.",
      "The forest breathes with you, exchanging carbon dioxide for oxygen.",
      "Ancient sentinels watch over the cycles of life and death."
    ],
    "ocean": [
      "The deep currents carry messages across the world.",
      "Vast and mysterious, we've explored less of the ocean than the moon.",
      "The ocean remembers every plastic piece we've discarded into its depths."
    ]
  };
}

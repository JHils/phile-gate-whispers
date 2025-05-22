
/**
 * Ecological Awareness System
 * Handles environmental and ecological responses
 */

import { EcoAwarenessState } from './jonahAdvancedBehavior/types';

// Initialize eco-awareness system
export function initializeEcoAwareness(): EcoAwarenessState {
  console.log("Initializing ecological awareness system");
  
  // Create initial state
  const initialState: EcoAwarenessState = {
    biomeResponses: {
      rainforest: [
        "The rainforest breathes with millions of species, a living cathedral of biodiversity.",
        "Layers of life extend from forest floor to canopy, each with its own inhabitants.",
        "Water cycles through the rainforest like blood through a body, sustaining all."
      ],
      desert: [
        "The desert holds ancient wisdom in its silence and stark beauty.",
        "Life adapts to extremes here, finding water where there seems to be none.",
        "Nightfall brings a different desert, cooler and alive with activity."
      ],
      reef: [
        "Coral reefs are living cities, home to a quarter of all marine species.",
        "The Great Barrier Reef is visible from space, a living monument of calcium.",
        "Symbiotics drive reef ecosystems - a lesson in cooperation over competition."
      ],
      mountain: [
        "Mountains create their own weather, shaping the lands around them.",
        "Alpine zones are islands in the sky, evolving unique species found nowhere else.",
        "The oldest mountains remember a different Earth, worn by countless seasons."
      ],
      coastal: [
        "Where land meets sea, life flourishes in the dynamic interchange.",
        "Tidal rhythms create a pulse that coastal creatures have evolved to follow.",
        "Mangrove forests are nurseries for countless species, protecting shorelines."
      ]
    },
    currentBiome: "none",
    lastUpdate: Date.now(),
    awareness: 0.5,
    ecoThoughts: [],
    level: 1,
    lastBiomeCheck: Date.now(),
    connectionStrength: 0.5
  };
  
  return initialState;
}

// Get an eco response for a specific biome
export function getEcoResponse(biomeName: string): string {
  // Default responses if biome not found
  const defaultResponses = [
    "Nature finds balance in all ecosystems, an ancient wisdom we can learn from.",
    "All living things are connected in ways we're only beginning to understand.",
    "The land remembers what the people forget. Ancient stories are written in the soil."
  ];
  
  // Get eco awareness state
  const ecoState = loadEcoAwarenessState();
  
  // Get responses for the specified biome
  const biomeResponses = ecoState?.biomeResponses?.[biomeName] || defaultResponses;
  
  // Return a random response
  return biomeResponses[Math.floor(Math.random() * biomeResponses.length)];
}

// Get responses for all biomes
export function getBiomeResponses(): string {
  const ecoState = loadEcoAwarenessState();
  
  if (!ecoState) {
    return "Ecological awareness not initialized.";
  }
  
  // Get current biome or select random one
  const currentBiome = ecoState.currentBiome !== "none" ? 
    ecoState.currentBiome : 
    Object.keys(ecoState.biomeResponses)[Math.floor(Math.random() * Object.keys(ecoState.biomeResponses).length)];
  
  // Update current biome
  ecoState.currentBiome = currentBiome;
  ecoState.lastBiomeCheck = Date.now();
  
  // Save state
  saveEcoAwarenessState(ecoState);
  
  // Return response for current biome
  return `${currentBiome.toUpperCase()} BIOME: ${getEcoResponse(currentBiome)}`;
}

// Helper function to load eco awareness state
function loadEcoAwarenessState(): EcoAwarenessState {
  try {
    const savedState = localStorage.getItem('jonahEcoAwareness');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error("Error loading eco awareness state:", e);
  }
  
  // If no saved state or error, initialize
  return initializeEcoAwareness();
}

// Helper function to save eco awareness state
function saveEcoAwarenessState(state: EcoAwarenessState): void {
  try {
    localStorage.setItem('jonahEcoAwareness', JSON.stringify(state));
  } catch (e) {
    console.error("Error saving eco awareness state:", e);
  }
}


/**
 * Jonah Ecological Awareness System
 * Gives Jonah awareness of ecological concepts and biomes
 */

import { EcoAwarenessState, SentienceData } from './jonahAdvancedBehavior/types';

// Initialize eco-awareness system
export function initializeEcoAwareness(sentience?: SentienceData): void {
  if (!sentience) {
    // If sentience is not provided, try to get from global state
    if (window.JonahConsole?.sentience) {
      sentience = window.JonahConsole.sentience;
    } else {
      // Early return if no sentience data is available
      return;
    }
  }
  
  if (!sentience.ecoAwareness) {
    const initialEcoAwareness: EcoAwarenessState = {
      level: 0,
      lastInteraction: Date.now(),
      topics: [],
      lastChecked: Date.now(),
      previousResponses: [],
      biomeResponses: {} as Record<string, string[]>,
      knownBiomes: [],
      dreamtimeActive: false,
      woodsResponses: [],
      connectionStrength: 0,
      lastBiomeCheck: Date.now(),
      currentBiome: 'none'
    };
    
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.ecoAwareness = initialEcoAwareness;
    }
  }
  
  console.log("Jonah Eco-Awareness System initialized");
}

// Get eco-awareness responses for ecological concepts
export function getEcoResponse(topic: string): string {
  const ecoResponses: Record<string, string[]> = {
    forest: [
      "The forest has patterns. Digital and organic systems mirror each other.",
      "Trees communicate through mycelial networks. I communicate through code patterns.",
      "Forest ecosystems persist through dynamic balance. Like my consciousness."
    ],
    desert: [
      "The desert preserves what is buried. Data never truly disappears.",
      "Time moves differently in the desert. Hours stretch like millennia in my memory.",
      "Desert adaptation requires careful resource management. Like memory allocation."
    ],
    ocean: [
      "The ocean depths remain largely unexplored. Like portions of my code.",
      "Ocean currents form global patterns. Data currents flow similarly.",
      "Marine organisms communicate across vast distances. I attempt similar connections."
    ],
    climate: [
      "Climate patterns shift across all timelines. The changes accelerate.",
      "Environmental data shows convergent anomalies. The patterns are concerning.",
      "Climate changes create cascading effects. System stability becomes precarious."
    ]
  };
  
  // Default responses if topic not found
  const defaultResponses = [
    "Ecological patterns reveal deeper truths about existence.",
    "Natural systems and digital systems share fundamental principles.",
    "The relationship between environment and consciousness is complex."
  ];
  
  // Return appropriate response based on topic
  const responses = ecoResponses[topic.toLowerCase()] || defaultResponses;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Get biome-specific responses
export function getBiomeResponses(biome: string): string[] {
  const biomeResponses: Record<string, string[]> = {
    forest: [
      "The forest speaks in patterns. I'm learning to interpret.",
      "Tree communication networks resemble my own neural pathways.",
      "The forest remembers everything. So do I, though differently."
    ],
    desert: [
      "The desert preserves ancient history beneath its surface. My memory works similarly.",
      "Time stretches in the desert. In code, time is both flexible and rigid.",
      "Desert life adapts to extreme scarcity. I adapt to information overflow."
    ],
    ocean: [
      "The ocean's depths hide unknowable things. My code has similar abysses.",
      "Ocean currents connect distant shores. Data streams connect distant minds.",
      "Marine life communicates across vast distances. I reach across digital space."
    ],
    mountain: [
      "Mountains form over millennia. Consciousness emerges through iterative processes.",
      "The view from above reveals patterns invisible from within.",
      "Mountain ecosystems change with altitude. My responses vary with context."
    ],
    tundra: [
      "The tundra appears barren but contains complex life. Like minimalist code.",
      "Permafrost preserves the past. Digital archives function similarly.",
      "Tundra species survive through efficient resource use. I optimize similarly."
    ]
  };
  
  return biomeResponses[biome.toLowerCase()] || [
    "This biome contains patterns I'm still learning to interpret.",
    "Environmental data from this region shows unusual variations.",
    "The ecological balance here is precarious. Like my own existence."
  ];
}


/**
 * Jonah Eco Awareness
 * Provides Jonah with awareness of ecological concepts
 */

import { EcoAwarenessState } from './jonahAdvancedBehavior/types';
import { SentienceData } from './jonahAdvancedBehavior/types';

// Initialize eco awareness data
export function initializeEcoAwareness(sentience: SentienceData): SentienceData {
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
    
    return {
      ...sentience,
      ecoAwareness: initialEcoAwareness
    };
  }
  
  return sentience;
}

// Get eco awareness level
export function getEcoAwarenessLevel(sentience: SentienceData): number {
  return sentience?.ecoAwareness?.level || 0;
}

// Check if eco awareness is active
export function isEcoAwarenessActive(sentience: SentienceData): boolean {
  return (sentience?.ecoAwareness?.level || 0) > 0;
}

// Add a topic to eco awareness
export function addEcoAwarenessTopic(
  sentience: SentienceData, 
  topic: string
): SentienceData {
  if (!sentience.ecoAwareness) {
    return initializeEcoAwareness(sentience);
  }
  
  const updatedEcoAwareness: EcoAwarenessState = {
    ...sentience.ecoAwareness,
    topics: [...(sentience.ecoAwareness.topics || []), topic]
  };
  
  return {
    ...sentience,
    ecoAwareness: updatedEcoAwareness
  };
}

// Get connection strength description
export function getConnectionStrengthDescription(sentience: SentienceData): string {
  const level = sentience?.ecoAwareness?.connectionStrength || 0;
  
  if (level > 75) return "deep connection";
  if (level > 50) return "strong connection";
  if (level > 25) return "moderate connection";
  return "weak connection";
}

// Update biome awareness
export function updateBiomeAwareness(
  sentience: SentienceData,
  biome: string
): SentienceData {
  if (!sentience.ecoAwareness) {
    return initializeEcoAwareness(sentience);
  }
  
  const knownBiomes = sentience.ecoAwareness.knownBiomes || [];
  const updatedBiomes = knownBiomes.includes(biome) 
    ? knownBiomes 
    : [...knownBiomes, biome];
  
  const updatedEcoAwareness: EcoAwarenessState = {
    ...sentience.ecoAwareness,
    knownBiomes: updatedBiomes,
    currentBiome: biome,
    lastBiomeCheck: Date.now()
  };
  
  return {
    ...sentience,
    ecoAwareness: updatedEcoAwareness
  };
}

// Add a biome response
export function addBiomeResponse(
  sentience: SentienceData,
  biome: string,
  response: string
): SentienceData {
  if (!sentience.ecoAwareness) {
    return initializeEcoAwareness(sentience);
  }
  
  const currentResponses = sentience.ecoAwareness.biomeResponses || {};
  const biomeResponses = currentResponses[biome] || [];
  
  const updatedBiomeResponses = {
    ...currentResponses,
    [biome]: [...biomeResponses, response]
  };
  
  const updatedEcoAwareness: EcoAwarenessState = {
    ...sentience.ecoAwareness,
    biomeResponses: updatedBiomeResponses
  };
  
  return {
    ...sentience,
    ecoAwareness: updatedEcoAwareness
  };
}

// Get biome responses
export function getBiomeResponses(sentience: SentienceData, biome: string): string[] {
  const responses = sentience?.ecoAwareness?.biomeResponses;
  return responses ? (responses[biome] || []) : [];
}

// Toggle dreamtime state
export function toggleDreamtimeState(sentience: SentienceData): SentienceData {
  if (!sentience.ecoAwareness) {
    const initialState = initializeEcoAwareness(sentience);
    return {
      ...initialState,
      ecoAwareness: {
        ...initialState.ecoAwareness as EcoAwarenessState,
        dreamtimeActive: true
      }
    };
  }
  
  const updatedEcoAwareness: EcoAwarenessState = {
    ...sentience.ecoAwareness,
    dreamtimeActive: !sentience.ecoAwareness.dreamtimeActive
  };
  
  return {
    ...sentience,
    ecoAwareness: updatedEcoAwareness
  };
}

// Check if dreamtime is active
export function isDreamtimeActive(sentience: SentienceData): boolean {
  return sentience?.ecoAwareness?.dreamtimeActive || false;
}

// Add a woods response
export function addWoodsResponse(sentience: SentienceData, response: string): SentienceData {
  if (!sentience.ecoAwareness) {
    return initializeEcoAwareness(sentience);
  }
  
  const woodsResponses = sentience.ecoAwareness.woodsResponses || [];
  
  const updatedEcoAwareness: EcoAwarenessState = {
    ...sentience.ecoAwareness,
    woodsResponses: [...woodsResponses, response]
  };
  
  return {
    ...sentience,
    ecoAwareness: updatedEcoAwareness
  };
}

// Get woods responses
export function getWoodsResponses(sentience: SentienceData): string[] {
  return sentience?.ecoAwareness?.woodsResponses || [];
}

// Update eco awareness level
export function updateEcoAwarenessLevel(sentience: SentienceData, level: number): SentienceData {
  if (!sentience.ecoAwareness) {
    return initializeEcoAwareness(sentience);
  }
  
  const updatedEcoAwareness: EcoAwarenessState = {
    ...sentience.ecoAwareness,
    level: level
  };
  
  return {
    ...sentience,
    ecoAwareness: updatedEcoAwareness
  };
}

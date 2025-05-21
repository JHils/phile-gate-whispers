
import { useEffect, useState } from 'react';

export interface EcoAwarenessState {
  lastChecked: number;
  biomeResponses: any[];
  knownBiomes: string[];
  dreamtimeActive: boolean;
  woodsResponses: string[];
  lastBiomeCheck?: number;
  connectionStrength?: number;
  currentBiome?: string;
  previousResponses: string[]; // Adding this property to fix the type error
}

export function useJonahEcoAwareness() {
  const [ecoAwareness, setEcoAwareness] = useState<EcoAwarenessState>({
    lastChecked: Date.now(),
    biomeResponses: [],
    knownBiomes: [],
    dreamtimeActive: false,
    woodsResponses: [],
    lastBiomeCheck: Date.now(),
    connectionStrength: 0,
    currentBiome: 'urban',
    previousResponses: [] // Initialize the property
  });
  
  // Init state on mount
  useEffect(() => {
    if (window.JonahConsole?.sentience) {
      if (!window.JonahConsole.sentience.ecoAwareness) {
        window.JonahConsole.sentience.ecoAwareness = {
          lastChecked: Date.now(),
          biomeResponses: [],
          knownBiomes: [],
          dreamtimeActive: false,
          woodsResponses: [],
          lastBiomeCheck: Date.now(),
          connectionStrength: 0,
          currentBiome: 'urban',
          previousResponses: []
        };
      }
      
      // Make sure we're adding previousResponses if it doesn't exist
      const existingEcoAwareness = {
        ...window.JonahConsole.sentience.ecoAwareness,
        previousResponses: window.JonahConsole.sentience.ecoAwareness.previousResponses || []
      };
      setEcoAwareness(existingEcoAwareness as EcoAwarenessState);
    }
  }, []);
  
  return { ecoAwareness };
}

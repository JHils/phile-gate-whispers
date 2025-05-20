
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
  previousResponses?: string[];
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
    previousResponses: []
  });
  
  // Init state on mount
  useEffect(() => {
    if (window.JonahConsole?.sentience?.ecoAwareness) {
      setEcoAwareness(window.JonahConsole.sentience.ecoAwareness);
    }
  }, []);
  
  return { ecoAwareness };
}

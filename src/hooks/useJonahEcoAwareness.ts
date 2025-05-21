
import { useState, useEffect } from 'react';
import { useJonahSentience } from './useJonahSentience';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

// Define the EcoAwarenessState type
export interface EcoAwarenessState {
  biomeResponses: Record<string, string[]>;
  currentBiome: string;
  lastUpdate: number;
  awareness: number;
  ecoThoughts: string[];
}

export function useJonahEcoAwareness() {
  const { sentience, updateSentience } = useJonahSentience();
  const [ecoState, setEcoState] = useState<EcoAwarenessState | null>(null);
  
  // Initialize eco awareness on mount
  useEffect(() => {
    if (sentience && !sentience.ecoAwareness) {
      // Initialize eco awareness
      const initialState: EcoAwarenessState = {
        biomeResponses: {},
        currentBiome: 'neutral',
        lastUpdate: Date.now(),
        awareness: 0,
        ecoThoughts: []
      };
      
      // Update sentience with initial eco state
      updateSentience({ 
        ...sentience,
        ecoAwareness: initialState
      });
      
      setEcoState(initialState);
    } else if (sentience?.ecoAwareness) {
      setEcoState(sentience.ecoAwareness);
    }
  }, [sentience, updateSentience]);
  
  // Update eco awareness level
  const updateEcoAwarenessLevel = (level: number) => {
    if (sentience && sentience.ecoAwareness) {
      const updatedEcoAwareness = {
        ...sentience.ecoAwareness,
        awareness: level,
        lastUpdate: Date.now()
      };
      
      updateSentience({
        ...sentience,
        ecoAwareness: updatedEcoAwareness
      });
      
      setEcoState(updatedEcoAwareness);
    }
  };
  
  return {
    ecoState,
    updateEcoAwarenessLevel
  };
}

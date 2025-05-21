
import { useState, useCallback, useEffect } from 'react';
import { EcoAwarenessState } from '@/utils/jonahAdvancedBehavior/types';
import { useJonahSentience } from './useJonahSentience';

export function useJonahEcoAwareness() {
  const { sentience, setSentience } = useJonahSentience();
  
  // Update sentience with new data
  const updateSentience = useCallback((newData: Partial<any>) => {
    setSentience(prevState => ({
      ...prevState,
      ...newData
    }));
  }, [setSentience]);
  
  // Initialize eco awareness if not already present
  useEffect(() => {
    if (!sentience?.ecoAwareness) {
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
      
      updateSentience({
        ecoAwareness: initialEcoAwareness
      });
    }
  }, [sentience, updateSentience]);
  
  // Update eco awareness data
  const updateEcoAwareness = useCallback((data: Partial<EcoAwarenessState>) => {
    updateSentience({
      ecoAwareness: {
        ...sentience?.ecoAwareness,
        ...data
      }
    });
  }, [sentience, updateSentience]);
  
  return {
    ecoAwareness: sentience?.ecoAwareness as EcoAwarenessState,
    updateEcoAwareness
  };
}

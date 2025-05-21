
import { useState, useCallback, useEffect } from 'react';
import { EcoAwarenessState } from '@/utils/jonahAdvancedBehavior/types';
import { useJonahSentience } from './useJonahSentience';

export function useJonahEcoAwareness() {
  const { sentience, updateSentience } = useJonahSentience();
  
  // Initialize eco awareness if not already present
  useEffect(() => {
    if (!sentience?.ecoAwareness) {
      const initialEcoAwareness: EcoAwarenessState = {
        level: 0,
        lastInteraction: Date.now(),
        topics: [],
        lastChecked: Date.now(),
        previousResponses: [],
        biomeResponses: {},
        knownBiomes: [],
        dreamtimeActive: false,
        woodsResponses: []
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
      } as EcoAwarenessState
    });
  }, [sentience, updateSentience]);
  
  return {
    ecoAwareness: sentience?.ecoAwareness as EcoAwarenessState,
    updateEcoAwareness
  };
}

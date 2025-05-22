import { useState, useEffect } from 'react';
import { EcoAwarenessState } from '@/utils/jonahAdvancedBehavior/types';

export function useJonahEcoAwareness() {
  const [ecoAwareness, setEcoAwareness] = useState<EcoAwarenessState>({
    currentBiome: 'default',
    previousBiomes: [],
    reminderTimestamp: Date.now(),
    userAwareness: 0,
    triggersFound: [],
    biomeResponses: {},
    lastUpdate: Date.now(),
    awareness: '0' // Set as string instead of number
  });

  useEffect(() => {
    // Load eco awareness from localStorage on mount
    const storedEcoAwareness = localStorage.getItem('jonahEcoAwareness');
    if (storedEcoAwareness) {
      try {
        const parsedEcoAwareness: EcoAwarenessState = JSON.parse(storedEcoAwareness);
        
        // Ensure awareness is a string
        if (typeof parsedEcoAwareness.awareness === 'number') {
          parsedEcoAwareness.awareness = parsedEcoAwareness.awareness.toString();
        }
        
        setEcoAwareness(parsedEcoAwareness);
      } catch (e) {
        console.error("Error parsing eco awareness from localStorage:", e);
      }
    }
  }, []);

  // Update eco awareness state
  const updateEcoAwareness = (updates: Partial<EcoAwarenessState>) => {
    const updatedEcoAwareness: EcoAwarenessState = {
      ...ecoAwareness,
      ...updates,
      lastUpdate: Date.now()
    };
    
    // Ensure awareness is a string
    if (typeof updatedEcoAwareness.awareness === 'number') {
      updatedEcoAwareness.awareness = updatedEcoAwareness.awareness.toString();
    }
    
    setEcoAwareness(updatedEcoAwareness);
    
    // Update localStorage
    localStorage.setItem('jonahEcoAwareness', JSON.stringify(updatedEcoAwareness));
  };

  return { ecoAwareness, updateEcoAwareness };
}

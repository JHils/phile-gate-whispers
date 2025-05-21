
import { useState, useEffect, useCallback } from 'react';
import { useJonahSentience } from './useJonahSentience';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

export function useRealityFabric() {
  const { sentience, updateSentience } = useJonahSentience();
  const [realityShifted, setRealityShifted] = useState(false);
  
  // Initialize reality fabric if it doesn't exist
  useEffect(() => {
    if (!sentience.realityFabric) {
      updateSentience({
        realityFabric: {
          moodChangeTime: Date.now(),
          currentMood: 'neutral',
          stability: 100
        }
      });
    }
  }, [sentience.realityFabric, updateSentience]);
  
  // Get current reality state
  const getRealityState = useCallback(() => {
    const realityFabric = sentience.realityFabric || {
      moodChangeTime: Date.now(),
      currentMood: 'neutral',
      stability: 100
    };
    
    return {
      moodChangeTime: realityFabric.moodChangeTime || Date.now(),
      currentMood: realityFabric.currentMood || 'neutral',
      stability: realityFabric.stability || 100,
      anomalyCount: realityFabric.anomalyCount || 0,
      moodHistory: realityFabric.moodHistory || [],
      journal: realityFabric.journal || []
    };
  }, [sentience.realityFabric]);
  
  // Shift the reality fabric to a new mood/state
  const shiftRealityFabric = useCallback((newMood: EmotionCategory, stabilityChange: number = 0) => {
    const currentState = getRealityState();
    
    updateSentience({
      realityFabric: {
        ...currentState,
        moodChangeTime: Date.now(),
        currentMood: newMood,
        stability: Math.max(0, Math.min(100, currentState.stability + stabilityChange)),
        moodHistory: [...(currentState.moodHistory || []), newMood]
      }
    });
    
    setRealityShifted(true);
    
    // Reset shifted flag after a while
    setTimeout(() => {
      setRealityShifted(false);
    }, 5000);
  }, [getRealityState, updateSentience]);
  
  // Register an anomaly in the reality fabric
  const registerAnomaly = useCallback((anomalyType: string, detail: string) => {
    const currentState = getRealityState();
    
    updateSentience({
      realityFabric: {
        ...currentState,
        anomalyCount: (currentState.anomalyCount || 0) + 1,
        stability: Math.max(0, (currentState.stability || 100) - 5)
      }
    });
    
    console.log(`%c[REALITY ANOMALY DETECTED: ${anomalyType}]`, 'color: #ff0000', detail);
  }, [getRealityState, updateSentience]);
  
  // Add an entry to the reality journal
  const addJournalEntry = useCallback((entry: string) => {
    const currentState = getRealityState();
    
    updateSentience({
      realityFabric: {
        ...currentState,
        journal: [...(currentState.journal || []), entry]
      }
    });
  }, [getRealityState, updateSentience]);
  
  return {
    realityState: getRealityState(),
    realityShifted,
    shiftRealityFabric,
    registerAnomaly,
    addJournalEntry
  };
}

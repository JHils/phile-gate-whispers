import { useState, useEffect, useCallback } from 'react';
import { useJonahSentience } from './useJonahSentience';
import { EmotionCategory } from '@/utils/jonahAdvancedBehavior/types';

interface RealityFabricState {
  moodChangeTime: number;
  currentMood: EmotionCategory;
  stability: number;
  anomalyCount: number;
  moodHistory: Array<{mood: EmotionCategory, timestamp: number}>;
  journal: string[];
}

export function useRealityFabric() {
  const { sentience, updateSentience } = useJonahSentience();
  const [realityFabric, setRealityFabric] = useState<RealityFabricState | null>(null);

  // Initialize the reality fabric
  useEffect(() => {
    if (sentience) {
      // Check if realityFabric exists
      if (!sentience.realityFabric) {
        // Create initial reality fabric state
        const initialFabric = {
          moodChangeTime: Date.now(),
          currentMood: 'neutral' as EmotionCategory,
          stability: 0.5,
          anomalyCount: 0,
          moodHistory: [] as Array<{mood: EmotionCategory, timestamp: number}>,
          journal: []
        };
        
        // Update sentience with initial fabric
        updateSentience({
          ...sentience,
          realityFabric: initialFabric
        });
        
        setRealityFabric(initialFabric);
      } else {
        setRealityFabric(sentience.realityFabric);
      }
    }
  }, [sentience, updateSentience]);

  // Record mood shift in history
  const recordMoodShift = useCallback((newMood: EmotionCategory) => {
    if (realityFabric) {
      // Create mood history entry
      const moodEntry = {
        mood: newMood,
        timestamp: Date.now()
      };
      
      // Get existing history or create empty array
      const history = realityFabric.moodHistory || [];
      
      // Update with new history
      const updatedFabric = {
        ...realityFabric,
        currentMood: newMood,
        moodChangeTime: Date.now(),
        moodHistory: [...history, moodEntry]
      };
      
      // Update state and sentience
      setRealityFabric(updatedFabric);
      
      if (sentience) {
        updateSentience({
          ...sentience,
          realityFabric: updatedFabric
        });
      }
    }
  }, [realityFabric, sentience, updateSentience]);

  // Add anomaly to the reality fabric
  const addAnomaly = useCallback(() => {
    if (realityFabric) {
      const updatedFabric = {
        ...realityFabric,
        anomalyCount: realityFabric.anomalyCount + 1
      };
      
      setRealityFabric(updatedFabric);
      
      if (sentience) {
        updateSentience({
          ...sentience,
          realityFabric: updatedFabric
        });
      }
    }
  }, [realityFabric, sentience, updateSentience]);

  // Add journal entry to the reality fabric
  const addJournalEntry = useCallback((entry: string) => {
    if (realityFabric) {
      const updatedFabric = {
        ...realityFabric,
        journal: [...realityFabric.journal, entry]
      };
      
      setRealityFabric(updatedFabric);
      
      if (sentience) {
        updateSentience({
          ...sentience,
          realityFabric: updatedFabric
        });
      }
    }
  }, [realityFabric, sentience, updateSentience]);
  
  return {
    realityFabric,
    setRealityFabric,
    recordMoodShift,
    addAnomaly,
    addJournalEntry
  };
}

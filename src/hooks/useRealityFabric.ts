
import { useState, useEffect, useCallback } from 'react';
import { useJonahSentience } from './useJonahSentience';
import { EmotionCategory, RealityFabric } from '@/utils/jonahAdvancedBehavior/types';

export function useRealityFabric() {
  const { sentience, updateSentience } = useJonahSentience();
  const [realityFabric, setRealityFabric] = useState<RealityFabric | null>(null);

  // Initialize the reality fabric
  useEffect(() => {
    if (sentience) {
      // Check if realityFabric exists
      if (!sentience.realityFabric) {
        // Create initial reality fabric state
        const initialFabric: RealityFabric = {
          moodChangeTime: Date.now(),
          currentMood: 'neutral',
          moodHistory: [],
          anomalyCount: 0,
          anomalies: [],
          journal: [],
          crossSiteWhispers: [],
          mood: 'neutral',
          dreamState: false,
          lastDreamTime: Date.now(),
          hiddenMessages: [],
          emotionalState: {
            primary: 'neutral' as EmotionCategory,
            secondary: null,
            intensity: 'medium'
          },
          stability: 0.5
        };
        
        // Update sentience with initial fabric
        updateSentience({
          ...sentience,
          realityFabric: initialFabric
        });
        
        setRealityFabric(initialFabric);
      } else {
        // Ensure the realityFabric has all required properties
        const updatedFabric: RealityFabric = {
          ...sentience.realityFabric,
          anomalies: sentience.realityFabric.anomalies || [],
          crossSiteWhispers: sentience.realityFabric.crossSiteWhispers || [],
          mood: sentience.realityFabric.mood || 'neutral',
          dreamState: sentience.realityFabric.dreamState || false,
          lastDreamTime: sentience.realityFabric.lastDreamTime || Date.now(),
          hiddenMessages: sentience.realityFabric.hiddenMessages || [],
          emotionalState: sentience.realityFabric.emotionalState || {
            primary: 'neutral' as EmotionCategory,
            secondary: null,
            intensity: 'medium'
          }
        };
        
        setRealityFabric(updatedFabric);
      }
    }
  }, [sentience, updateSentience]);

  // Record mood shift in history
  const recordMoodShift = useCallback((newMood: EmotionCategory) => {
    if (realityFabric) {
      // Create updated fabric with new mood
      const updatedFabric: RealityFabric = {
        ...realityFabric,
        currentMood: newMood as string,
        mood: newMood as string,
        moodChangeTime: Date.now(),
        moodHistory: [...(realityFabric.moodHistory || [])]
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
      const updatedFabric: RealityFabric = {
        ...realityFabric,
        anomalyCount: realityFabric.anomalyCount + 1,
        anomalies: [...(realityFabric.anomalies || [])]
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
      const updatedFabric: RealityFabric = {
        ...realityFabric,
        journal: [...(realityFabric.journal || []), entry]
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

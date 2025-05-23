import { useState, useEffect } from 'react';
import { EcoAwarenessState } from '@/utils/jonahAdvancedBehavior/types';

export function useJonahEcoAwareness() {
  const [ecoState, setEcoState] = useState<EcoAwarenessState>({
    active: false,
    topicSensitivity: 30,
    lastMentioned: 0,
    mentionCount: 0,
    topicKeywords: [],
    currentBiome: "none",
    userAwareness: 0,
    awareness: "0" // Using string to match the type definition
  });

  // Initialize from localStorage if available
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('jonah_eco_awareness');
      if (savedState) {
        setEcoState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Failed to load eco awareness state:", error);
    }
  }, []);

  // Helper to increase awareness
  const increaseAwareness = () => {
    setEcoState(prev => {
      // Convert awareness to number, increase, then back to string
      const currentAwareness = parseInt(prev.awareness as string) || 0;
      const newAwareness = Math.min(100, currentAwareness + 5);
      
      const updated = {
        ...prev,
        mentionCount: prev.mentionCount + 1,
        lastUpdate: Date.now(),
        lastMentioned: Date.now(),
        awareness: String(newAwareness) // Convert back to string
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_eco_awareness', JSON.stringify(updated));
      
      return updated;
    });
  };

  // Helper to decrease sensitivity
  const decreaseSensitivity = () => {
    setEcoState(prev => {
      const newSensitivity = Math.max(0, prev.topicSensitivity - 5);
      const updated = {
        ...prev,
        topicSensitivity: newSensitivity,
        lastUpdate: Date.now()
      };
      localStorage.setItem('jonah_eco_awareness', JSON.stringify(updated));
      return updated;
    });
  };

  // Helper to add a topic keyword
  const addTopicKeyword = (keyword: string) => {
    setEcoState(prev => {
      const updated = {
        ...prev,
        topicKeywords: [...prev.topicKeywords, keyword],
        lastUpdate: Date.now()
      };
      localStorage.setItem('jonah_eco_awareness', JSON.stringify(updated));
      return updated;
    });
  };

  // Helper to set current biome
  const setCurrentBiome = (biome: string) => {
    setEcoState(prev => {
      const updated = {
        ...prev,
        currentBiome: biome,
        previousBiomes: prev.currentBiome ? [...prev.previousBiomes, prev.currentBiome] : prev.previousBiomes,
        lastUpdate: Date.now()
      };
      localStorage.setItem('jonah_eco_awareness', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    ecoState,
    increaseAwareness,
    decreaseSensitivity,
    addTopicKeyword,
    setCurrentBiome
  };
}

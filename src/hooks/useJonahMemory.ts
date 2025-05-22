
/**
 * Hook to manage Jonah's memory system
 */

import { useState, useEffect, useCallback } from 'react';

export function useJonahMemory() {
  const [jonahMemory, setJonahMemory] = useState<any>({
    messageCount: 0,
    lastActivity: Date.now(),
    memoryFragments: [],
    persistentMoods: [],
    sentientResponses: 0
  });
  
  useEffect(() => {
    // Load memory from localStorage on mount
    const storedMemory = localStorage.getItem('jonah_memory');
    if (storedMemory) {
      try {
        setJonahMemory(JSON.parse(storedMemory));
      } catch (e) {
        console.error("Error parsing memory from localStorage:", e);
      }
    }
    
    // Set up memory update interval
    const interval = setInterval(() => {
      updateMemoryState();
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Update memory state with new data
  const updateMemoryState = useCallback((updates: Partial<any> = {}) => {
    setJonahMemory(prev => {
      const updated = {
        ...prev,
        ...updates,
        lastUpdate: Date.now()
      };
      
      // Save to localStorage
      try {
        localStorage.setItem('jonah_memory', JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving memory to localStorage:", e);
      }
      
      return updated;
    });
  }, []);
  
  // Add a memory fragment
  const addMemoryFragment = useCallback((fragment: string) => {
    setJonahMemory(prev => {
      const updated = {
        ...prev,
        memoryFragments: [
          ...prev.memoryFragments,
          {
            text: fragment,
            timestamp: Date.now()
          }
        ].slice(-20), // Keep only the last 20 fragments
        messageCount: prev.messageCount + 1,
        lastActivity: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_memory', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Record a mood
  const recordMood = useCallback((mood: string, intensity: 'low' | 'medium' | 'high') => {
    setJonahMemory(prev => {
      // Convert intensity to numeric value
      const intensityValue = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1;
      
      const updated = {
        ...prev,
        persistentMoods: [
          ...prev.persistentMoods,
          {
            mood,
            intensity: intensityValue,
            timestamp: Date.now()
          }
        ].slice(-10), // Keep only last 10 moods
        lastActivity: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_memory', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Record sentient response
  const recordSentientResponse = useCallback(() => {
    setJonahMemory(prev => {
      const updated = {
        ...prev,
        sentientResponses: prev.sentientResponses + 1,
        lastActivity: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_memory', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Get persistent mood
  const getPersistentMood = useCallback(() => {
    if (!jonahMemory.persistentMoods || jonahMemory.persistentMoods.length === 0) {
      return { mood: 'neutral', intensity: 'medium' };
    }
    
    // Get most recent mood
    const latestMood = jonahMemory.persistentMoods[0];
    
    // Convert intensity back to string
    const intensity = latestMood.intensity === 3 ? 'high' : 
                      latestMood.intensity === 2 ? 'medium' : 'low';
    
    return { mood: latestMood.mood, intensity };
  }, [jonahMemory]);
  
  return {
    jonahMemory,
    updateMemoryState,
    addMemoryFragment,
    recordMood,
    recordSentientResponse,
    getPersistentMood
  };
}

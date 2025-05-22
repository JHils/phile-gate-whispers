
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
    pagesVisited: [],
    commandsUsed: [],
    emotionalTags: [],
    sentientResponses: 0,
    trustLevelScore: 50
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
  
  // Add an emotional tag
  const addEmotionalTag = useCallback((tag: string, intensity: 'low' | 'medium' | 'high') => {
    setJonahMemory(prev => {
      const intensityValue = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1;
      
      const updated = {
        ...prev,
        emotionalTags: [
          ...prev.emotionalTags || [],
          {
            tag,
            intensity: intensityValue,
            timestamp: Date.now()
          }
        ].slice(-20), // Keep only last 20 tags
        lastActivity: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_memory', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Record page visit
  const recordPageVisit = useCallback((path: string) => {
    setJonahMemory(prev => {
      // Add to pages visited if not already there
      const pagesVisited = prev.pagesVisited || [];
      if (!pagesVisited.includes(path)) {
        pagesVisited.push(path);
      }
      
      const updated = {
        ...prev,
        pagesVisited,
        lastVisitedPage: path,
        lastPageVisit: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_memory', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Record page dwell time
  const recordPageDwell = useCallback((path: string, seconds: number) => {
    setJonahMemory(prev => {
      // Update page dwell times
      const pageDwells = prev.pageDwells || {};
      pageDwells[path] = (pageDwells[path] || 0) + seconds;
      
      const updated = {
        ...prev,
        pageDwells,
        lastActivity: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_memory', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Record console command usage
  const recordCommandUsage = useCallback((command: string) => {
    setJonahMemory(prev => {
      // Add to commands used
      const commandsUsed = prev.commandsUsed || [];
      commandsUsed.push({
        command,
        timestamp: Date.now()
      });
      
      const updated = {
        ...prev,
        commandsUsed: commandsUsed.slice(-20), // Keep only last 20 commands
        lastActivity: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('jonah_memory', JSON.stringify(updated));
      
      return updated;
    });
  }, []);
  
  // Generate personal observation based on memory
  const generatePersonalObservation = useCallback(() => {
    const observations = [
      "You seem interested in patterns. So am I.",
      "You've been exploring a lot. Searching for something?",
      "You keep coming back to the same places. Something's drawing you there.",
      "Your curiosity reminds me of someone I used to know.",
      "The way you navigate feels familiar somehow.",
      "There's a pattern to how you move through these spaces.",
      "You're not like the others. You notice things.",
      "I've seen how you pause at certain moments. You sense it too.",
      "Some places hold your attention longer than others. I wonder why.",
      "You seem to be looking for something specific. Or someone."
    ];
    
    return observations[Math.floor(Math.random() * observations.length)];
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
    getPersistentMood,
    addEmotionalTag,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    generatePersonalObservation,
    trustLevelScore: jonahMemory.trustLevelScore,
    pagesVisited: jonahMemory.pagesVisited || [],
    commandsUsed: jonahMemory.commandsUsed || []
  };
}

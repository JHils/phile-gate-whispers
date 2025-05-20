
import { useState, useEffect, useCallback } from 'react';

// Define the structure of Jonah's memory
export interface JonahMemory {
  firstVisitTimestamp: number;
  lastVisitTimestamp: number;
  pagesVisited: string[];
  commandsUsed: string[];
  dwellTimePerPage: Record<string, number>;
  trustLevelScore: number;
  emotionalTags: string[];
  recordPageVisit: (path: string) => void;
  recordPageDwell: (path: string, timeSeconds: number) => void;
  recordCommandUsage: (command: string) => void;
  memory: {
    pagesVisited: string[];
    commandsUsed: string[];
    trustLevelScore: number;
  };
}

export function useJonahMemory() {
  // Initialize memory state
  const [memory, setMemory] = useState<JonahMemory>({
    firstVisitTimestamp: Date.now(),
    lastVisitTimestamp: Date.now(),
    pagesVisited: [],
    commandsUsed: [],
    dwellTimePerPage: {},
    trustLevelScore: 0,
    emotionalTags: [],
    recordPageVisit: () => {},
    recordPageDwell: () => {},
    recordCommandUsage: () => {},
    memory: {
      pagesVisited: [],
      commandsUsed: [],
      trustLevelScore: 0
    }
  });

  // Load memory from localStorage on component mount
  useEffect(() => {
    try {
      const savedMemory = localStorage.getItem('jonahMemory');
      if (savedMemory) {
        const parsedMemory = JSON.parse(savedMemory);
        setMemory(prev => ({
          ...prev,
          ...parsedMemory,
          lastVisitTimestamp: Date.now(),
        }));
      } else {
        // First visit, initialize
        setMemory(prev => ({
          ...prev,
          firstVisitTimestamp: Date.now(),
          lastVisitTimestamp: Date.now(),
        }));
      }
    } catch (error) {
      console.error('Error loading Jonah memory:', error);
    }
  }, []);

  // Save memory to localStorage whenever it changes
  useEffect(() => {
    try {
      const memoryToSave = {
        firstVisitTimestamp: memory.firstVisitTimestamp,
        lastVisitTimestamp: memory.lastVisitTimestamp,
        pagesVisited: memory.pagesVisited,
        commandsUsed: memory.commandsUsed,
        dwellTimePerPage: memory.dwellTimePerPage,
        trustLevelScore: memory.trustLevelScore,
        emotionalTags: memory.emotionalTags,
      };
      
      localStorage.setItem('jonahMemory', JSON.stringify(memoryToSave));
    } catch (error) {
      console.error('Error saving Jonah memory:', error);
    }
  }, [memory]);

  // Record a page visit
  const recordPageVisit = useCallback((path: string) => {
    setMemory(prev => {
      // Only add if not already in the list
      if (!prev.pagesVisited.includes(path)) {
        return {
          ...prev,
          pagesVisited: [...prev.pagesVisited, path],
          lastVisitTimestamp: Date.now(),
          memory: {
            ...prev.memory,
            pagesVisited: [...prev.memory.pagesVisited, path]
          }
        };
      }
      return prev;
    });
  }, []);

  // Record time spent on a page
  const recordPageDwell = useCallback((path: string, timeSeconds: number) => {
    setMemory(prev => {
      const currentDwell = prev.dwellTimePerPage[path] || 0;
      return {
        ...prev,
        dwellTimePerPage: {
          ...prev.dwellTimePerPage,
          [path]: currentDwell + timeSeconds
        },
        lastVisitTimestamp: Date.now()
      };
    });
  }, []);

  // Record command usage
  const recordCommandUsage = useCallback((command: string) => {
    setMemory(prev => {
      // Only add if not already in the list
      if (!prev.commandsUsed.includes(command)) {
        return {
          ...prev,
          commandsUsed: [...prev.commandsUsed, command],
          lastVisitTimestamp: Date.now(),
          memory: {
            ...prev.memory,
            commandsUsed: [...prev.memory.commandsUsed, command]
          }
        };
      }
      return prev;
    });
  }, []);

  // Add emotional tag
  const addEmotionalTag = useCallback((tag: string) => {
    setMemory(prev => {
      // Only add if not already in the list
      if (!prev.emotionalTags.includes(tag)) {
        return {
          ...prev,
          emotionalTags: [...prev.emotionalTags, tag],
          lastVisitTimestamp: Date.now()
        };
      }
      return prev;
    });
  }, []);

  // Generate a personal observation based on memory
  const generatePersonalObservation = useCallback(() => {
    const observations = [
      `You've visited ${memory.pagesVisited.length} different pages. But not the one that matters most.`,
      `You seem to linger on ${Object.keys(memory.dwellTimePerPage).sort((a, b) => memory.dwellTimePerPage[b] - memory.dwellTimePerPage[a])[0] || 'pages'} longer than others. I wonder why.`,
      `You've used ${memory.commandsUsed.length} commands. Still searching.`,
      `Every time you return, something in me remembers a little more.`,
      `Your pattern is different from the others. More ${memory.emotionalTags[0] || 'curious'}.`
    ];
    
    return observations[Math.floor(Math.random() * observations.length)];
  }, [memory]);

  // Update functions in the memory object
  useEffect(() => {
    setMemory(prev => ({
      ...prev,
      recordPageVisit,
      recordPageDwell,
      recordCommandUsage,
      memory: {
        pagesVisited: prev.pagesVisited,
        commandsUsed: prev.commandsUsed,
        trustLevelScore: prev.trustLevelScore
      }
    }));
  }, [recordPageVisit, recordPageDwell, recordCommandUsage]);

  return {
    memory,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    addEmotionalTag,
    generatePersonalObservation
  };
}

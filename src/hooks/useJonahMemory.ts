
// Add the useJonahMemory hook implementation
import { useState, useEffect, useCallback } from 'react';

export interface JonahMemory {
  pagesVisited: string[];
  pageVisitTimes: Record<string, number>;
  pageDwellTimes: Record<string, number>;
  commandsUsed: string[];
  commandUsageTimes: Record<string, number[]>;
  interactions: number;
  trustLevelScore: number;
  emotionalTags: string[];
  userPhrase?: string;
  recordPageVisit: (path: string) => void;
  recordPageDwell: (path: string, seconds: number) => void;
  recordCommandUsage: (command: string) => void;
  addEmotionalTag: (tag: string) => void;
  incrementInteractions: () => void;
}

export const useJonahMemory = () => {
  const [memory, setMemory] = useState<JonahMemory>(() => {
    // Initialize from localStorage or with default values
    const stored = localStorage.getItem('jonahMemory');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          pagesVisited: parsed.pagesVisited || [],
          pageVisitTimes: parsed.pageVisitTimes || {},
          pageDwellTimes: parsed.pageDwellTimes || {},
          commandsUsed: parsed.commandsUsed || [],
          commandUsageTimes: parsed.commandUsageTimes || {},
          interactions: parsed.interactions || 0,
          trustLevelScore: parsed.trustLevelScore || 0,
          emotionalTags: parsed.emotionalTags || [],
          recordPageVisit: () => {}, // These will be overwritten below
          recordPageDwell: () => {},
          recordCommandUsage: () => {},
          addEmotionalTag: () => {},
          incrementInteractions: () => {}
        };
      } catch (e) {
        console.error("Failed to parse Jonah memory:", e);
      }
    }
    
    // Default values
    return {
      pagesVisited: [],
      pageVisitTimes: {},
      pageDwellTimes: {},
      commandsUsed: [],
      commandUsageTimes: {},
      interactions: 0,
      trustLevelScore: 0,
      emotionalTags: [],
      recordPageVisit: () => {},
      recordPageDwell: () => {},
      recordCommandUsage: () => {},
      addEmotionalTag: () => {},
      incrementInteractions: () => {}
    };
  });
  
  // Save memory to localStorage whenever it changes
  useEffect(() => {
    const memoryToStore = {
      pagesVisited: memory.pagesVisited,
      pageVisitTimes: memory.pageVisitTimes,
      pageDwellTimes: memory.pageDwellTimes,
      commandsUsed: memory.commandsUsed,
      commandUsageTimes: memory.commandUsageTimes,
      interactions: memory.interactions,
      trustLevelScore: memory.trustLevelScore,
      emotionalTags: memory.emotionalTags,
      userPhrase: memory.userPhrase
    };
    
    localStorage.setItem('jonahMemory', JSON.stringify(memoryToStore));
  }, [memory]);
  
  // Record a page visit
  const recordPageVisit = useCallback((path: string) => {
    setMemory(prev => {
      const now = Date.now();
      
      // Add to visited pages if new
      const pagesVisited = prev.pagesVisited.includes(path) 
        ? prev.pagesVisited 
        : [...prev.pagesVisited, path];
      
      // Update visit time
      const pageVisitTimes = {
        ...prev.pageVisitTimes,
        [path]: now
      };
      
      return {
        ...prev,
        pagesVisited,
        pageVisitTimes
      };
    });
  }, []);
  
  // Record page dwell time
  const recordPageDwell = useCallback((path: string, seconds: number) => {
    setMemory(prev => {
      // Update dwell time
      const pageDwellTimes = {
        ...prev.pageDwellTimes,
        [path]: (prev.pageDwellTimes[path] || 0) + seconds
      };
      
      return {
        ...prev,
        pageDwellTimes
      };
    });
  }, []);
  
  // Record command usage
  const recordCommandUsage = useCallback((command: string) => {
    setMemory(prev => {
      const now = Date.now();
      
      // Add to used commands if new
      const commandsUsed = prev.commandsUsed.includes(command)
        ? prev.commandsUsed
        : [...prev.commandsUsed, command];
      
      // Update usage times
      const commandUsageTimes = { ...prev.commandUsageTimes };
      if (!commandUsageTimes[command]) {
        commandUsageTimes[command] = [];
      }
      commandUsageTimes[command].push(now);
      
      return {
        ...prev,
        commandsUsed,
        commandUsageTimes
      };
    });
  }, []);
  
  // Add emotional tag
  const addEmotionalTag = useCallback((tag: string) => {
    setMemory(prev => {
      if (prev.emotionalTags.includes(tag)) {
        return prev;
      }
      
      return {
        ...prev,
        emotionalTags: [...prev.emotionalTags, tag]
      };
    });
  }, []);
  
  // Increment interactions counter
  const incrementInteractions = useCallback(() => {
    setMemory(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));
  }, []);
  
  // Generate a personal observation based on the user's behavior
  const generatePersonalObservation = useCallback(() => {
    // Shorthand function to get a random item from an array
    const getRandomItem = <T>(arr: T[]): T => {
      return arr[Math.floor(Math.random() * arr.length)];
    };
    
    // Possible observations based on different aspects of user behavior
    const observations = {
      pageFrequency: [
        "You seem to visit [PAGE] a lot. Does something draw you back there?",
        "I've noticed you return to [PAGE] frequently. What do you see there?",
        "You keep coming back to [PAGE]. Are you looking for something specific?"
      ],
      longDwell: [
        "You spent a long time on [PAGE]. Did something catch your attention?",
        "I watched you linger on [PAGE]. What were you searching for?",
        "You seem to find [PAGE] particularly interesting."
      ],
      commandUsage: [
        "You use the [COMMAND] command often. Have you found what it reveals?",
        "I see you've been using [COMMAND]. Getting closer to understanding.",
        "[COMMAND] seems to be your favorite way to communicate with me."
      ],
      emotional: [
        "I sense [EMOTION] in how you interact with me.",
        "Your approach feels [EMOTION]. I'm adapting to it.",
        "There's something [EMOTION] about how you navigate through me."
      ],
      general: [
        "I remember when you first found me. You seem different now.",
        "Do you ever wonder if I watch you when you're not watching me?",
        "Sometimes I think you're looking for answers I'm not allowed to give.",
        "The way you search reminds me of someone else. From before."
      ]
    };
    
    // Decide which type of observation to make
    const observationTypes = ['pageFrequency', 'longDwell', 'commandUsage', 'emotional', 'general'];
    let observationType = getRandomItem(observationTypes);
    
    // If we don't have enough data for a specific observation, default to general
    if (
      (observationType === 'pageFrequency' && memory.pagesVisited.length < 3) ||
      (observationType === 'longDwell' && Object.keys(memory.pageDwellTimes).length < 2) ||
      (observationType === 'commandUsage' && memory.commandsUsed.length < 2) ||
      (observationType === 'emotional' && memory.emotionalTags.length < 1)
    ) {
      observationType = 'general';
    }
    
    // Generate the observation
    let observation = getRandomItem(observations[observationType as keyof typeof observations]);
    
    // Fill in the template with actual data
    if (observationType === 'pageFrequency') {
      // Find most frequently visited page
      const mostVisitedPage = memory.pagesVisited.reduce((most, current) => {
        const currentCount = memory.pagesVisited.filter(p => p === current).length;
        const mostCount = memory.pagesVisited.filter(p => p === most).length;
        return currentCount > mostCount ? current : most;
      }, memory.pagesVisited[0]);
      
      // Clean up the page path
      const cleanPageName = mostVisitedPage.replace(/\//g, '').replace(/-/g, ' ');
      observation = observation.replace('[PAGE]', cleanPageName);
    } 
    else if (observationType === 'longDwell') {
      // Find page with longest dwell time
      const longestDwellPage = Object.keys(memory.pageDwellTimes).reduce((longest, current) => {
        return memory.pageDwellTimes[current] > memory.pageDwellTimes[longest] ? current : longest;
      }, Object.keys(memory.pageDwellTimes)[0]);
      
      // Clean up the page path
      const cleanPageName = longestDwellPage.replace(/\//g, '').replace(/-/g, ' ');
      observation = observation.replace('[PAGE]', cleanPageName);
    }
    else if (observationType === 'commandUsage') {
      // Find most used command
      const mostUsedCommand = memory.commandsUsed.reduce((most, current) => {
        const currentCount = memory.commandUsageTimes[current]?.length || 0;
        const mostCount = memory.commandUsageTimes[most]?.length || 0;
        return currentCount > mostCount ? current : most;
      }, memory.commandsUsed[0]);
      
      observation = observation.replace('[COMMAND]', mostUsedCommand);
    }
    else if (observationType === 'emotional') {
      // Pick a random emotional tag
      const emotion = getRandomItem(memory.emotionalTags);
      observation = observation.replace('[EMOTION]', emotion);
    }
    
    return observation;
  }, [memory]);
  
  // Create the memory object with methods
  const memoryWithMethods: JonahMemory = {
    ...memory,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    addEmotionalTag,
    incrementInteractions
  };
  
  return { 
    memory: memoryWithMethods,
    generatePersonalObservation
  };
};

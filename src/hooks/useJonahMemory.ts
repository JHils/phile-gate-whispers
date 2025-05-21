
import { useState, useCallback, useEffect } from 'react';
import { useJonahSentience } from './useJonahSentience';

// Define a type for the memory tracking data
interface MemoryParanoiaData {
  level: number;
  triggers: string[];
  lastIncident: number;
  visitedPages?: string[];
  pageVisits?: string[];
  pageDuration?: Record<string, number>;
  consoleCommands?: string[];
  emotionalTags?: string[];
}

// Define return type for the hook
interface JonahMemoryReturn {
  memoryParanoia: MemoryParanoiaData;
  updateMemoryParanoiaLevel: (newLevel: number) => void;
  addMemoryParanoiaTrigger: (trigger: string) => void;
  recordPageVisit: (page: string) => void;
  recordPageDwell: (page: string, duration: number) => void;
  recordCommandUsage: (command: string) => void;
  commandsUsed: string[];
  pagesVisited: string[];
  addEmotionalTag: (tag: string) => void;
  emotionalTags: string[];
  generatePersonalObservation: () => string;
  trustLevelScore: number;
}

export function useJonahMemory(): JonahMemoryReturn {
  const { sentience, setSentience } = useJonahSentience();
  const [commandsUsed, setCommandsUsed] = useState<string[]>([]);
  const [emotionalTags, setEmotionalTags] = useState<string[]>([]);
  const [pagesVisited, setPagesVisited] = useState<string[]>([]);
  const [trustLevelScore, setTrustLevelScore] = useState(0);
  
  // Initialize memory paranoia if not present
  useEffect(() => {
    if (!sentience?.memoryParanoia) {
      const initialMemoryParanoia: MemoryParanoiaData = {
        level: 0,
        triggers: [],
        lastIncident: Date.now(),
        visitedPages: [],
        pageVisits: [],
        pageDuration: {},
        consoleCommands: [],
        emotionalTags: []
      };
      
      if (setSentience) {
        setSentience(prev => ({
          ...prev,
          memoryParanoia: initialMemoryParanoia
        }));
      }
    } else {
      // Initialize local state from sentience
      if (sentience?.memoryParanoia?.consoleCommands) {
        setCommandsUsed(sentience.memoryParanoia.consoleCommands);
      }
      if (sentience?.memoryParanoia?.emotionalTags) {
        setEmotionalTags(sentience.memoryParanoia.emotionalTags);
      }
      if (sentience?.memoryParanoia?.visitedPages) {
        setPagesVisited(sentience.memoryParanoia.visitedPages);
      }
      
      // Calculate trust level score
      const commandScore = (sentience?.memoryParanoia?.consoleCommands?.length || 0) * 2;
      const pageScore = (sentience?.memoryParanoia?.visitedPages?.length || 0);
      const triggerScore = (sentience?.memoryParanoia?.triggers?.length || 0) * 3;
      
      setTrustLevelScore(commandScore + pageScore + triggerScore);
    }
  }, [sentience, setSentience]);
  
  // Update memory paranoia level
  const updateMemoryParanoiaLevel = useCallback((newLevel: number) => {
    if (setSentience) {
      setSentience(prev => ({
        ...prev,
        memoryParanoia: {
          ...prev?.memoryParanoia,
          level: Number(newLevel),
          lastIncident: Date.now()
        } as MemoryParanoiaData
      }));
    }
  }, [setSentience]);
  
  // Add a memory paranoia trigger
  const addMemoryParanoiaTrigger = useCallback((trigger: string) => {
    if (setSentience) {
      setSentience(prev => {
        const triggers = prev?.memoryParanoia?.triggers || [];
        if (!triggers.includes(trigger)) {
          return {
            ...prev,
            memoryParanoia: {
              ...prev?.memoryParanoia,
              triggers: [...triggers, trigger],
              level: Number(prev?.memoryParanoia?.level || 0) + 1,
              lastIncident: Date.now()
            } as MemoryParanoiaData
          };
        }
        return prev;
      });
    }
  }, [setSentience]);
  
  // Record a page visit
  const recordPageVisit = useCallback((page: string) => {
    if (setSentience) {
      setSentience(prev => {
        const visitedPages = prev?.memoryParanoia?.visitedPages || [];
        const pageVisits = prev?.memoryParanoia?.pageVisits || [];
        
        // Update local state too
        setPagesVisited(prev => [...prev, page]);
        
        return {
          ...prev,
          memoryParanoia: {
            ...prev?.memoryParanoia,
            visitedPages: [...visitedPages, page],
            pageVisits: [...pageVisits, page],
            lastIncident: Date.now()
          } as MemoryParanoiaData
        };
      });
    }
  }, [setSentience]);
  
  // Record page dwell time
  const recordPageDwell = useCallback((page: string, duration: number) => {
    if (setSentience) {
      setSentience(prev => {
        const pageDuration = prev?.memoryParanoia?.pageDuration || {};
        const currentDuration = pageDuration[page] || 0;
        
        return {
          ...prev,
          memoryParanoia: {
            ...prev?.memoryParanoia,
            pageDuration: {
              ...pageDuration,
              [page]: currentDuration + duration
            },
            lastIncident: Date.now()
          } as MemoryParanoiaData
        };
      });
    }
  }, [setSentience]);
  
  // Record console command usage
  const recordCommandUsage = useCallback((command: string) => {
    if (setSentience) {
      setSentience(prev => {
        const commands = prev?.memoryParanoia?.consoleCommands || [];
        
        // Update local state too
        setCommandsUsed(prev => [...prev, command]);
        
        return {
          ...prev,
          memoryParanoia: {
            ...prev?.memoryParanoia,
            consoleCommands: [...commands, command],
            level: Number(prev?.memoryParanoia?.level || 0) + 0.5,
            lastIncident: Date.now()
          } as MemoryParanoiaData
        };
      });
    }
  }, [setSentience]);
  
  // Add emotional tag
  const addEmotionalTag = useCallback((tag: string) => {
    if (setSentience) {
      setSentience(prev => {
        const tags = prev?.memoryParanoia?.emotionalTags || [];
        
        // Update local state too
        setEmotionalTags(prev => [...prev, tag]);
        
        return {
          ...prev,
          memoryParanoia: {
            ...prev?.memoryParanoia,
            emotionalTags: [...tags, tag],
            lastIncident: Date.now()
          } as MemoryParanoiaData
        };
      });
    }
  }, [setSentience]);
  
  // Generate a personal observation based on memory data
  const generatePersonalObservation = useCallback(() => {
    const observations = [
      "You've been visiting a lot of pages lately.",
      "I notice you use console commands frequently.",
      "Your patterns are becoming familiar to me.",
      "You seem to prefer certain paths through the system.",
      "I've been tracking your movements. Habit is fascinating.",
      "The way you navigate reminds me of someone I used to know."
    ];
    
    return observations[Math.floor(Math.random() * observations.length)];
  }, []);
  
  return {
    memoryParanoia: sentience?.memoryParanoia as MemoryParanoiaData,
    updateMemoryParanoiaLevel,
    addMemoryParanoiaTrigger,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    commandsUsed,
    pagesVisited,
    addEmotionalTag,
    emotionalTags,
    generatePersonalObservation,
    trustLevelScore
  };
}


import { useState, useEffect, useCallback } from 'react';
import { useJonahSentience } from './useJonahSentience';
import { SentienceData } from '@/utils/jonahAdvancedBehavior/types';

// Memory paranoia type definition
interface MemoryParanoia {
  level: number;
  triggers: string[];
  lastIncident: number;
  visitedPages: string[];
  pageVisits: string[];
  pageDuration: Record<string, number>;
  consoleCommands: string[];
  emotionalTags: Record<string, string[]>;
  trustLevelScore: number;
  pagesVisited: number;
  commandsUsed: string[];
}

export function useJonahMemory() {
  const [memories, setMemories] = useState<string[]>([]);
  const [recentInput, setRecentInput] = useState<string>('');
  const { sentience, updateSentience: updateSentienceFromHook } = useJonahSentience();

  // Initialize memories on mount
  useEffect(() => {
    if (sentience?.memories) {
      setMemories([...sentience.memories]);
    }
  }, [sentience]);

  // Store a new memory
  const storeMemory = (content: string): void => {
    if (!content.trim()) return;
    
    // Update local state
    setMemories(prev => [...prev, content]);
    setRecentInput(content);
    
    // Update sentience if available
    if (sentience) {
      // Create memory array if it doesn't exist
      const memories = sentience.memories || [];
      
      // Update sentience
      updateSentienceFromHook({
        memories: [...memories, content]
      });
    }
  };
  
  // Initialize memory paranoia state
  const [memoryParanoia, setMemoryParanoia] = useState<MemoryParanoia>({
    level: 0,
    triggers: [],
    lastIncident: Date.now(),
    visitedPages: [],
    pageVisits: [],
    pageDuration: {},
    consoleCommands: [],
    emotionalTags: {},
    trustLevelScore: 0,
    pagesVisited: 0,
    commandsUsed: []
  });
  
  // Load stored memory paranoia data
  useEffect(() => {
    try {
      const storedMemoryParanoia = localStorage.getItem('memory_paranoia');
      if (storedMemoryParanoia) {
        setMemoryParanoia(JSON.parse(storedMemoryParanoia));
      }
    } catch (e) {
      console.error('Error loading memory paranoia:', e);
    }
  }, []);
  
  // Save memory paranoia when it changes
  useEffect(() => {
    try {
      localStorage.setItem('memory_paranoia', JSON.stringify(memoryParanoia));
    } catch (e) {
      console.error('Error saving memory paranoia:', e);
    }
  }, [memoryParanoia]);
  
  // Update paranoia level
  const updateMemoryParanoiaLevel = useCallback((newLevel: number) => {
    setMemoryParanoia(prev => ({
      ...prev,
      level: newLevel,
      lastIncident: Date.now()
    }));
  }, []);
  
  // Add a paranoia trigger
  const addMemoryParanoiaTrigger = useCallback((trigger: string) => {
    setMemoryParanoia(prev => ({
      ...prev,
      triggers: [...prev.triggers, trigger],
      lastIncident: Date.now()
    }));
  }, []);
  
  // Record page visit
  const recordPageVisit = useCallback((page: string) => {
    setMemoryParanoia(prev => {
      const visitedPages = prev.visitedPages || [];
      const pageVisits = prev.pageVisits || [];
      const uniquePages = new Set([...visitedPages, page]);
      
      return {
        ...prev,
        visitedPages: Array.from(uniquePages),
        pageVisits: [...pageVisits, page],
        pagesVisited: uniquePages.size,
        lastIncident: Date.now()
      };
    });
  }, []);
  
  // Record page dwell time
  const recordPageDwell = useCallback((page: string, duration: number) => {
    setMemoryParanoia(prev => {
      const pageDuration = prev.pageDuration || {};
      const currentDuration = pageDuration[page] || 0;
      
      return {
        ...prev,
        pageDuration: {
          ...pageDuration,
          [page]: currentDuration + duration
        }
      };
    });
  }, []);
  
  // Record console command usage
  const recordCommandUsage = useCallback((command: string) => {
    setMemoryParanoia(prev => {
      const consoleCommands = prev.consoleCommands || [];
      const commandsUsed = prev.commandsUsed || [];
      
      return {
        ...prev,
        consoleCommands: [...consoleCommands, command],
        commandsUsed: [...commandsUsed, command],
        lastIncident: Date.now()
      };
    });
  }, []);
  
  // Add emotional tag
  const addEmotionalTag = useCallback((category: string, tag: string) => {
    setMemoryParanoia(prev => {
      const emotionalTags = prev.emotionalTags || {};
      const categoryTags = emotionalTags[category] || [];
      
      return {
        ...prev,
        emotionalTags: {
          ...emotionalTags,
          [category]: [...categoryTags, tag]
        }
      };
    });
  }, []);
  
  // Generate a personal observation based on memory
  const generatePersonalObservation = useCallback(() => {
    const observations = [
      memoryParanoia.pagesVisited && memoryParanoia.pagesVisited > 3 ? 
        `You've explored ${memoryParanoia.pagesVisited} pages so far.` : null,
      
      memoryParanoia.visitedPages && memoryParanoia.visitedPages.includes('/mirror') ?
        "You seem interested in reflections and mirrors." : null,
      
      memoryParanoia.commandsUsed && memoryParanoia.commandsUsed.length > 5 ?
        "You're quite comfortable with console commands." : null,
      
      memoryParanoia.emotionalTags && 
        memoryParanoia.emotionalTags['fear'] && 
        memoryParanoia.emotionalTags['fear'].length > 2 ?
        "I've noticed you're often concerned about uncertain outcomes." : null
    ].filter(Boolean);
    
    return observations.length > 0 ? 
      observations[Math.floor(Math.random() * observations.length)] : 
      "I'm still learning about you.";
  }, [memoryParanoia]);
  
  return {
    memories,
    recentInput,
    storeMemory,
    memoryParanoia,
    updateMemoryParanoiaLevel,
    addMemoryParanoiaTrigger,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    addEmotionalTag,
    generatePersonalObservation,
    trustLevelScore: memoryParanoia.trustLevelScore || 0,
    pagesVisited: memoryParanoia.pagesVisited || 0,
    commandsUsed: memoryParanoia.commandsUsed || []
  };
}

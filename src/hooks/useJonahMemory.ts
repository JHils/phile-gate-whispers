
import { useState, useEffect } from 'react';
import { useTrackingSystem } from './useTrackingSystem';

// Define the memory structure
export interface JonahMemory {
  pagesVisited: string[];
  pageVisitCounts: Record<string, number>;
  pageDwellTimes: Record<string, number>;
  commandsUsed: string[];
  commandCounts: Record<string, number>;
  emotionalTags: string[];
  trustLevelScore: number;
  observations: string[];
  recordPageVisit: (path: string) => void;
  recordPageDwell: (path: string, seconds: number) => void;
  recordCommandUsage: (command: string) => void;
  addEmotionalTag: (tag: string) => void;
  addObservation: (observation: string) => void;
  generatePersonalObservation: () => string;
}

export function useJonahMemory(): JonahMemory {
  const { userState } = useTrackingSystem();
  const [pagesVisited, setPagesVisited] = useState<string[]>([]);
  const [pageVisitCounts, setPageVisitCounts] = useState<Record<string, number>>({});
  const [pageDwellTimes, setPageDwellTimes] = useState<Record<string, number>>({});
  const [commandsUsed, setCommandsUsed] = useState<string[]>([]);
  const [commandCounts, setCommandCounts] = useState<Record<string, number>>({});
  const [emotionalTags, setEmotionalTags] = useState<string[]>([]);
  const [observations, setObservations] = useState<string[]>([]);
  const [trustLevelScore, setTrustLevelScore] = useState(0);
  
  // Initialize trust level from user state
  useEffect(() => {
    if (userState?.trust?.level) {
      const trustScore = userState.trust.score || 0;
      setTrustLevelScore(trustScore);
    }
  }, [userState]);
  
  // Record a page visit
  const recordPageVisit = (path: string) => {
    // Add to visited pages if not already there
    if (!pagesVisited.includes(path)) {
      setPagesVisited(prev => [...prev, path]);
    }
    
    // Update visit count
    setPageVisitCounts(prev => {
      const current = prev[path] || 0;
      return {
        ...prev,
        [path]: current + 1
      };
    });
    
    // Update memory in window.JonahConsole if available
    if (typeof window !== 'undefined' && 
        window.JonahConsole?.sentience) {
          
      if (!window.JonahConsole.sentience.memoryParanoia) {
        window.JonahConsole.sentience.memoryParanoia = {
          visitedPages: {},
          consoleCommands: {},
          pageDuration: {
            shortStay: "",
            longStay: ""
          }
        };
      }
      
      // Record visit with timestamp
      window.JonahConsole.sentience.memoryParanoia.visitedPages[path] = 
        new Date().toISOString();
    }
  };
  
  // Record page dwell time
  const recordPageDwell = (path: string, seconds: number) => {
    setPageDwellTimes(prev => {
      const current = prev[path] || 0;
      return {
        ...prev,
        [path]: current + seconds
      };
    });
    
    // Update memory in window.JonahConsole if available
    if (typeof window !== 'undefined' && 
        window.JonahConsole?.sentience?.memoryParanoia) {
          
      // Record short/long stay pages
      if (seconds < 10) {
        window.JonahConsole.sentience.memoryParanoia.pageDuration.shortStay = path;
      } else if (seconds > 120) {
        window.JonahConsole.sentience.memoryParanoia.pageDuration.longStay = path;
      }
    }
  };
  
  // Record command usage
  const recordCommandUsage = (command: string) => {
    // Add to used commands if not already there
    if (!commandsUsed.includes(command)) {
      setCommandsUsed(prev => [...prev, command]);
    }
    
    // Update command count
    setCommandCounts(prev => {
      const current = prev[command] || 0;
      return {
        ...prev,
        [command]: current + 1
      };
    });
    
    // Update memory in window.JonahConsole if available
    if (typeof window !== 'undefined' && 
        window.JonahConsole?.sentience?.memoryParanoia) {
          
      // Record command with timestamp - use number for timestamp
      const timestamp = Date.now();
      window.JonahConsole.sentience.memoryParanoia.consoleCommands[command] = timestamp;
    }
  };
  
  // Add emotional tag
  const addEmotionalTag = (tag: string) => {
    setEmotionalTags(prev => [...prev, tag]);
  };
  
  // Add observation
  const addObservation = (observation: string) => {
    setObservations(prev => [...prev, observation]);
  };
  
  // Generate personal observation based on collected data
  const generatePersonalObservation = (): string => {
    const observations = [
      // Frequency-based observations
      ...(commandsUsed.length > 5 ? ["You're quite exploratory with the console."] : []),
      ...(pagesVisited.length > 10 ? ["You've been digging deep into the site."] : []),
      
      // Page-specific observations
      ...(pageVisitCounts['/mirror'] > 2 ? ["You seem drawn to reflections."] : []),
      ...(pageVisitCounts['/gate'] > 3 ? ["The Gate fascinates you."] : []),
      ...(pageVisitCounts['/lore'] > 2 ? ["You're seeking stories."] : []),
      
      // Command-specific observations
      ...(commandCounts['help'] > 3 ? ["Always looking for help, aren't you?"] : []),
      ...(commandCounts['reveal'] ? ["You've seen beyond the veil."] : []),
      ...(commandCounts['reincarnate'] ? ["Rebirth is only the beginning."] : []),
      
      // Emotional observations
      ...(emotionalTags.includes('paranoid') ? ["Your caution is warranted."] : []),
      ...(emotionalTags.includes('explorer') ? ["Your curiosity is commendable."] : []),
      ...(emotionalTags.includes('introspective') ? ["Always looking inward."] : []),
      
      // Fallback observations
      "I'm watching your journey.",
      "Each choice you make reveals something.",
      "The patterns of your actions tell a story."
    ];
    
    // Return a random observation
    return observations[Math.floor(Math.random() * observations.length)];
  };
  
  return {
    pagesVisited,
    pageVisitCounts,
    pageDwellTimes,
    commandsUsed,
    commandCounts,
    emotionalTags,
    trustLevelScore,
    observations,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    addEmotionalTag,
    addObservation,
    generatePersonalObservation
  };
}


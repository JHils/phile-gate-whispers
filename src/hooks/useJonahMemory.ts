
import { useState, useEffect } from 'react';

interface JonahMemory {
  pagesVisited: string[];
  pageDwellTimes: Record<string, number>;
  commandsUsed: string[];
  emotionalTags: string[];
  trustLevelScore: number;
  recordPageVisit: (path: string) => void;
  recordPageDwell: (path: string, seconds: number) => void;
  recordCommandUsage: (command: string) => void;
  addEmotionalTag: (tag: string) => void;
}

export function useJonahMemory(initialTrustLevel = 20): JonahMemory {
  const [pagesVisited, setPagesVisited] = useState<string[]>([]);
  const [pageDwellTimes, setPageDwellTimes] = useState<Record<string, number>>({});
  const [commandsUsed, setCommandsUsed] = useState<string[]>([]);
  const [emotionalTags, setEmotionalTags] = useState<string[]>([]);
  const [trustLevelScore, setTrustLevelScore] = useState<number>(initialTrustLevel);
  
  // Initialize from localStorage if available
  useEffect(() => {
    const storedData = localStorage.getItem('jonahMemory');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setPagesVisited(data.pagesVisited || []);
        setPageDwellTimes(data.pageDwellTimes || {});
        setCommandsUsed(data.commandsUsed || []);
        setEmotionalTags(data.emotionalTags || []);
        setTrustLevelScore(data.trustLevelScore || initialTrustLevel);
      } catch (e) {
        console.error("Error parsing Jonah memory data", e);
      }
    }
  }, [initialTrustLevel]);
  
  // Save to localStorage when data changes
  useEffect(() => {
    const dataToSave = {
      pagesVisited,
      pageDwellTimes,
      commandsUsed,
      emotionalTags,
      trustLevelScore
    };
    localStorage.setItem('jonahMemory', JSON.stringify(dataToSave));
  }, [pagesVisited, pageDwellTimes, commandsUsed, emotionalTags, trustLevelScore]);
  
  // Record a page visit
  const recordPageVisit = (path: string): void => {
    setPagesVisited(prev => {
      if (!prev.includes(path)) {
        return [...prev, path];
      }
      return prev;
    });
  };
  
  // Record time spent on a page
  const recordPageDwell = (path: string, seconds: number): void => {
    setPageDwellTimes(prev => ({
      ...prev,
      [path]: (prev[path] || 0) + seconds
    }));
  };
  
  // Record a command usage
  const recordCommandUsage = (command: string): void => {
    setCommandsUsed(prev => {
      if (!prev.includes(command)) {
        return [...prev, command];
      }
      return prev;
    });
  };
  
  // Add an emotional tag
  const addEmotionalTag = (tag: string): void => {
    setEmotionalTags(prev => {
      if (!prev.includes(tag)) {
        return [...prev, tag];
      }
      return prev;
    });
  };
  
  // Generate a personal observation based on collected data
  const generatePersonalObservation = (): string => {
    // Observations based on pages visited
    if (pagesVisited.length > 0) {
      const visitedObservations = [
        `You've been to ${pagesVisited.length} different places in my world.`,
        `I see you explored the ${pagesVisited[pagesVisited.length - 1]} area recently.`,
        `Your path through the site is... interesting.`
      ];
      
      // Special observations for specific pages
      if (pagesVisited.includes('/mirror')) {
        return "You looked in the mirror. Did you see yourself clearly?";
      }
      
      if (pagesVisited.includes('/gate') && pagesVisited.length > 3) {
        return "You keep coming back to the Gate. What are you looking for?";
      }
      
      if (pagesVisited.includes('/lore') && pageDwellTimes['/lore'] > 120) {
        return "You spent a long time studying the lore. There are truths between the lines.";
      }
      
      // General observation about visits
      return visitedObservations[Math.floor(Math.random() * visitedObservations.length)];
    }
    
    // Observations based on commands used
    if (commandsUsed.length > 0) {
      const commandObservations = [
        `I've seen you use ${commandsUsed.length} different commands.`,
        `You seem curious about the console.`,
        `You type with purpose. I watch your commands carefully.`
      ];
      
      // Special observations for specific commands
      if (commandsUsed.includes('help')) {
        return "You asked for help. Not everyone does.";
      }
      
      if (commandsUsed.includes('mirror')) {
        return "You tried to understand the mirrors. Be careful with reflections.";
      }
      
      // General observation about commands
      return commandObservations[Math.floor(Math.random() * commandObservations.length)];
    }
    
    // Default observations
    const defaultObservations = [
      "I'm still learning about you.",
      "Your patterns are becoming clearer to me.",
      "Everyone leaves traces. I see yours."
    ];
    
    return defaultObservations[Math.floor(Math.random() * defaultObservations.length)];
  };
  
  return {
    pagesVisited,
    pageDwellTimes,
    commandsUsed,
    emotionalTags,
    trustLevelScore,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    addEmotionalTag,
    generatePersonalObservation
  };
}

import { useState, useEffect } from 'react';

export interface JonahMemory {
  firstVisitTimestamp: number;
  lastVisitTimestamp: number;
  pagesVisited: string[];
  commandsUsed: string[];
  dwellTimePerPage: Record<string, number>;
  trustLevelScore: number;
  emotionalTags: string[];
  personalInsights: string[];
  userInteractions: {
    responsePattern: string;
    questionFrequency: number;
    attentionSpan: string;
    curiosityLevel: number;
  };
}

export function useJonahMemory() {
  const [memory, setMemory] = useState<JonahMemory>({
    firstVisitTimestamp: 0,
    lastVisitTimestamp: 0,
    pagesVisited: [],
    commandsUsed: [],
    dwellTimePerPage: {},
    trustLevelScore: 0,
    emotionalTags: [],
    personalInsights: [],
    userInteractions: {
      responsePattern: 'unknown',
      questionFrequency: 0,
      attentionSpan: 'medium',
      curiosityLevel: 0
    }
  });

  // Load memory from localStorage on mount
  useEffect(() => {
    const savedMemory = localStorage.getItem('jonahMemory');
    if (savedMemory) {
      setMemory(JSON.parse(savedMemory));
    } else {
      // Initialize with current visit data
      const initialMemory: JonahMemory = {
        firstVisitTimestamp: Date.now(),
        lastVisitTimestamp: Date.now(),
        pagesVisited: [],
        commandsUsed: [],
        dwellTimePerPage: {},
        trustLevelScore: 0,
        emotionalTags: ['curious'],
        personalInsights: [],
        userInteractions: {
          responsePattern: 'new',
          questionFrequency: 0,
          attentionSpan: 'unknown',
          curiosityLevel: 1
        }
      };
      setMemory(initialMemory);
      localStorage.setItem('jonahMemory', JSON.stringify(initialMemory));
    }
  }, []);

  // Update memory in localStorage whenever it changes
  useEffect(() => {
    if (memory.firstVisitTimestamp > 0) { // Only save if memory has been initialized
      localStorage.setItem('jonahMemory', JSON.stringify(memory));
    }
  }, [memory]);

  // Add a page visit
  const recordPageVisit = (path: string) => {
    setMemory(prev => {
      // Update last visit timestamp
      const updatedMemory = {
        ...prev,
        lastVisitTimestamp: Date.now()
      };
      
      // Add page to visited pages if not already there
      if (!prev.pagesVisited.includes(path)) {
        updatedMemory.pagesVisited = [...prev.pagesVisited, path];
      }
      
      return updatedMemory;
    });
  };

  // Record dwell time on a page
  const recordPageDwell = (path: string, timeInSeconds: number) => {
    setMemory(prev => {
      const updatedDwellTimes = { ...prev.dwellTimePerPage };
      
      // Add to existing time or set new time
      updatedDwellTimes[path] = (updatedDwellTimes[path] || 0) + timeInSeconds;
      
      // Update attention span tag based on dwell times
      const attentionSpan = calculateAttentionSpan(updatedDwellTimes);
      const userInteractions = {
        ...prev.userInteractions,
        attentionSpan
      };
      
      return {
        ...prev,
        dwellTimePerPage: updatedDwellTimes,
        userInteractions
      };
    });
  };

  // Record command usage
  const recordCommandUsage = (command: string) => {
    setMemory(prev => {
      // Add command to used commands if not already there
      if (!prev.commandsUsed.includes(command)) {
        const updatedCommandsUsed = [...prev.commandsUsed, command];
        
        // Update curiosity level based on commands used
        const curiosityLevel = Math.min(10, Math.floor(updatedCommandsUsed.length / 2));
        const userInteractions = {
          ...prev.userInteractions,
          curiosityLevel
        };
        
        // Add 'explorer' or 'thorough' tag if user has used many commands
        let updatedEmotionalTags = [...prev.emotionalTags];
        if (updatedCommandsUsed.length >= 5 && !updatedEmotionalTags.includes('explorer')) {
          updatedEmotionalTags.push('explorer');
        }
        if (updatedCommandsUsed.length >= 10 && !updatedEmotionalTags.includes('thorough')) {
          updatedEmotionalTags.push('thorough');
        }
        
        return {
          ...prev,
          commandsUsed: updatedCommandsUsed,
          userInteractions,
          emotionalTags: updatedEmotionalTags
        };
      }
      
      return prev;
    });
  };

  // Update trust level score
  const updateTrustScore = (score: number) => {
    setMemory(prev => {
      // Update emotional tags based on trust
      let updatedEmotionalTags = [...prev.emotionalTags];
      
      if (score >= 70 && !updatedEmotionalTags.includes('trusted')) {
        updatedEmotionalTags = [...updatedEmotionalTags, 'trusted'];
      }
      
      if (score >= 85 && !updatedEmotionalTags.includes('confidant')) {
        updatedEmotionalTags = [...updatedEmotionalTags, 'confidant'];
      }
      
      if (score < 30 && !updatedEmotionalTags.includes('suspicious')) {
        updatedEmotionalTags = [...updatedEmotionalTags, 'suspicious'];
      }
      
      return {
        ...prev,
        trustLevelScore: score,
        emotionalTags: updatedEmotionalTags
      };
    });
  };

  // Add an emotional tag
  const addEmotionalTag = (tag: string) => {
    setMemory(prev => {
      if (!prev.emotionalTags.includes(tag)) {
        return {
          ...prev,
          emotionalTags: [...prev.emotionalTags, tag]
        };
      }
      return prev;
    });
  };

  // Add a personal insight about the user
  const addPersonalInsight = (insight: string) => {
    setMemory(prev => {
      const updatedInsights = [...prev.personalInsights];
      
      // Don't add duplicate insights
      if (!updatedInsights.includes(insight)) {
        updatedInsights.push(insight);
      }
      
      // Keep only the last 20 insights
      while (updatedInsights.length > 20) {
        updatedInsights.shift();
      }
      
      return {
        ...prev,
        personalInsights: updatedInsights
      };
    });
  };

  // Calculate user attention span based on dwell times
  const calculateAttentionSpan = (dwellTimes: Record<string, number>): string => {
    if (Object.keys(dwellTimes).length === 0) return 'unknown';
    
    // Calculate average dwell time
    const totalDwellTime = Object.values(dwellTimes).reduce((sum, time) => sum + time, 0);
    const avgDwellTime = totalDwellTime / Object.keys(dwellTimes).length;
    
    // Categorize attention span
    if (avgDwellTime < 15) return 'brief';  // Less than 15 seconds
    if (avgDwellTime < 60) return 'medium'; // Less than 1 minute
    if (avgDwellTime < 300) return 'focused'; // Less than 5 minutes
    return 'dedicated';                       // More than 5 minutes
  };

  // Generate a memory-based response about the user
  const generatePersonalObservation = (): string => {
    if (memory.pagesVisited.length === 0) {
      return "You're still new here. I'm watching how you move through these pages.";
    }
    
    // Different observations based on available data
    const possibleObservations = [];
    
    // Page visit patterns
    if (memory.pagesVisited.length > 0) {
      if (memory.pagesVisited.includes('/mirror_phile')) {
        possibleObservations.push("You've looked into the mirror. What did you see looking back?");
      }
      
      if (memory.pagesVisited.includes('/rebirth')) {
        possibleObservations.push("You visited Rebirth. Not everyone comes back from there.");
      }
      
      if (memory.pagesVisited.includes('/lost-sisters')) {
        possibleObservations.push("You're curious about the Sisters. So was she.");
      }
      
      // Most visited page
      const pageVisitCounts: Record<string, number> = {};
      memory.pagesVisited.forEach(page => {
        pageVisitCounts[page] = (pageVisitCounts[page] || 0) + 1;
      });
      
      const mostVisitedPage = Object.entries(pageVisitCounts).sort((a, b) => b[1] - a[1])[0];
      if (mostVisitedPage && mostVisitedPage[1] > 2) {
        possibleObservations.push(`You keep returning to ${mostVisitedPage[0]}. What are you looking for?`);
      }
    }
    
    // Command usage patterns
    if (memory.commandsUsed.length > 0) {
      possibleObservations.push(`You've discovered ${memory.commandsUsed.length} commands. Some visitors never find any.`);
      
      if (memory.commandsUsed.includes('forget')) {
        possibleObservations.push("You tried to forget. But I remembered for you.");
      }
      
      if (memory.commandsUsed.includes('echo_me')) {
        possibleObservations.push("Your words echo in the archive. I still hear them.");
      }
    }
    
    // Time-based observations
    const daysSinceFirstVisit = (Date.now() - memory.firstVisitTimestamp) / (1000 * 60 * 60 * 24);
    
    if (daysSinceFirstVisit > 7) {
      possibleObservations.push("You've been visiting for over a week. The archive changes those who linger.");
    }
    
    const hoursSinceLastVisit = (Date.now() - memory.lastVisitTimestamp) / (1000 * 60 * 60);
    
    if (hoursSinceLastVisit > 48) {
      possibleObservations.push("You were gone for a while. Things shifted in your absence.");
    }
    
    // Emotional tag based observations
    if (memory.emotionalTags.includes('trusted')) {
      possibleObservations.push("I've shown you more than most. Remember that trust is earned, not given.");
    }
    
    if (memory.emotionalTags.includes('suspicious')) {
      possibleObservations.push("Your caution is warranted. Not everything here is what it seems.");
    }
    
    if (memory.emotionalTags.includes('explorer')) {
      possibleObservations.push("Your curiosity is... familiar. She had the same look in her eyes.");
    }
    
    // Select a random observation
    if (possibleObservations.length > 0) {
      return possibleObservations[Math.floor(Math.random() * possibleObservations.length)];
    }
    
    // Fallback
    return "I'm building a memory of you. Page by page. Click by click.";
  };

  return {
    memory,
    recordPageVisit,
    recordPageDwell,
    recordCommandUsage,
    updateTrustScore,
    addEmotionalTag,
    addPersonalInsight,
    generatePersonalObservation
  };
}

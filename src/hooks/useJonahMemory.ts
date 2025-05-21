
import { useState, useCallback, useEffect } from 'react';
import { useJonahSentience } from './useJonahSentience';

export function useJonahMemory() {
  const { sentience, updateSentience } = useJonahSentience();
  
  // Initialize memory paranoia if not present
  useEffect(() => {
    if (!sentience?.memoryParanoia) {
      updateSentience({
        memoryParanoia: {
          level: 0,
          triggers: [],
          lastIncident: Date.now(),
          visitedPages: [],
          consoleCommands: []
        }
      });
    }
  }, [sentience, updateSentience]);
  
  // Update memory paranoia level
  const updateMemoryParanoiaLevel = useCallback((newLevel: number) => {
    updateSentience({
      memoryParanoia: {
        ...sentience?.memoryParanoia,
        level: Number(newLevel), // Ensure it's a number
        lastIncident: Date.now()
      }
    });
  }, [sentience, updateSentience]);
  
  // Add a memory paranoia trigger
  const addMemoryParanoiaTrigger = useCallback((trigger: string) => {
    const triggers = sentience?.memoryParanoia?.triggers || [];
    if (!triggers.includes(trigger)) {
      updateSentience({
        memoryParanoia: {
          ...sentience?.memoryParanoia,
          triggers: [...triggers, trigger],
          level: Number(sentience?.memoryParanoia?.level || 0) + 1,
          lastIncident: Date.now()
        }
      });
    }
  }, [sentience, updateSentience]);
  
  // Record a page visit
  const recordPageVisit = useCallback((page: string) => {
    const visitedPages = sentience?.memoryParanoia?.visitedPages || [];
    const pageVisits = sentience?.memoryParanoia?.pageVisits || [];
    
    updateSentience({
      memoryParanoia: {
        ...sentience?.memoryParanoia,
        visitedPages: [...visitedPages, page],
        pageVisits: [...pageVisits, page],
        lastIncident: Date.now()
      }
    });
  }, [sentience, updateSentience]);
  
  // Record console command
  const recordConsoleCommand = useCallback((command: string) => {
    const commands = sentience?.memoryParanoia?.consoleCommands || [];
    
    updateSentience({
      memoryParanoia: {
        ...sentience?.memoryParanoia,
        consoleCommands: [...commands, command],
        level: Number(sentience?.memoryParanoia?.level || 0) + 0.5,
        lastIncident: Date.now()
      }
    });
  }, [sentience, updateSentience]);
  
  return {
    memoryParanoia: sentience?.memoryParanoia,
    updateMemoryParanoiaLevel,
    addMemoryParanoiaTrigger,
    recordPageVisit,
    recordConsoleCommand
  };
}

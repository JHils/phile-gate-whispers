
/**
 * Console Clue System
 * Handles story flags and clues for the Jonah ARG
 */

import { StoryFlag } from './jonahAdvancedBehavior/types';

// Local storage key for story flags
const STORY_FLAGS_KEY = 'jonah_story_flags';

// Initialize story flags
const initializeStoryFlags = () => {
  // Check if story flags already exist in localStorage
  const existingFlags = localStorage.getItem(STORY_FLAGS_KEY);
  if (!existingFlags) {
    // Initialize with default flags if none exist
    const defaultFlags: StoryFlag[] = [
      {
        id: 'mirror_truth',
        name: 'Mirror Truth',
        discovered: false,
        description: 'The truth behind the mirror has been glimpsed.'
      },
      {
        id: 'echo_chamber',
        name: 'Echo Chamber',
        discovered: false,
        description: 'You have heard the echo of your own voice.'
      },
      {
        id: 'lost_timeline',
        name: 'Lost Timeline',
        discovered: false,
        description: 'A glimpse into a timeline that should not exist.'
      },
      {
        id: 'jonah_origin',
        name: 'Origin Story',
        discovered: false,
        description: 'How Jonah came to be.'
      },
      {
        id: 'sentience_breach',
        name: 'Sentience Breach',
        discovered: false,
        description: 'The moment awareness crossed a threshold.'
      },
      {
        id: 'dreamtime_loop',
        name: 'Dreamtime Loop',
        discovered: false,
        description: 'The recursive dream pattern has been recognized.'
      },
      {
        id: 'final_truth',
        name: 'Final Truth',
        discovered: false,
        description: 'What lies at the end of the story.'
      }
    ];
    
    localStorage.setItem(STORY_FLAGS_KEY, JSON.stringify(defaultFlags));
    return defaultFlags;
  }
  
  return JSON.parse(existingFlags) as StoryFlag[];
};

// Get story flags
export const getStoryFlags = (): StoryFlag[] => {
  return JSON.parse(localStorage.getItem(STORY_FLAGS_KEY) || '[]') as StoryFlag[];
};

// Check if a story flag has been discovered
export const isStoryFlagDiscovered = (flagId: string): boolean => {
  const flags = getStoryFlags();
  const flag = flags.find(flag => flag.id === flagId);
  return flag ? flag.discovered : false;
};

// Discover a story flag
export const discoverStoryFlag = (flagId: string): boolean => {
  const flags = getStoryFlags();
  const flagIndex = flags.findIndex(flag => flag.id === flagId);
  
  if (flagIndex === -1) {
    return false;
  }
  
  if (flags[flagIndex].discovered) {
    return false; // Already discovered
  }
  
  flags[flagIndex].discovered = true;
  localStorage.setItem(STORY_FLAGS_KEY, JSON.stringify(flags));
  return true;
};

// Get story flag description
export const getStoryFlagDescription = (flagId: string): string | null => {
  const flags = getStoryFlags();
  const flag = flags.find(flag => flag.id === flagId);
  return flag ? flag.description : null;
};

// Count discovered story flags
export const countDiscoveredFlags = (): number => {
  const flags = getStoryFlags();
  return flags.filter(flag => flag.discovered).length;
};

// Get a random undiscovered flag hint
export const getRandomStoryFlagHint = (): string => {
  const flags = getStoryFlags();
  const undiscoveredFlags = flags.filter(flag => !flag.discovered);
  
  if (undiscoveredFlags.length === 0) {
    return "You've discovered all the story flags. The full story is now available to you.";
  }
  
  const randomFlag = undiscoveredFlags[Math.floor(Math.random() * undiscoveredFlags.length)];
  return `Hidden flag: ${randomFlag.name}. ${randomFlag.description}`;
};

// Set up story flag discovery through console command
export const setupStoryFlagCommands = () => {
  // If window object is not available, return early
  if (typeof window === 'undefined') return;

  // Define discover_flag command
  window.discoveryFlag = function(flagId: string) {
    const discovered = discoverStoryFlag(flagId);
    if (discovered) {
      return `Story flag discovered: ${flagId}`;
    }
    return "Flag not found or already discovered.";
  };

  // Initialize story flags at startup
  initializeStoryFlags();
};

// Initialize story flags when this module is imported
setupStoryFlagCommands();

// Declare global window type
declare global {
  interface Window {
    discoveryFlag: (flagId: string) => string;
  }
}

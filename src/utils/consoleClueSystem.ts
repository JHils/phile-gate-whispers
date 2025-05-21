
// Import the StoryFlag interface
import { StoryFlag } from './jonahAdvancedBehavior/types';

// Initialize story flags
export const initializeStoryFlags = () => {
  if (!window.JonahConsole) {
    window.JonahConsole = { 
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: 'drifter',
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date()
      }
    };
  }
  
  if (!window.JonahConsole.storyFlags) {
    window.JonahConsole.storyFlags = [
      { id: 'jonah_origin', name: 'Jonah Origin', discovered: false, description: 'The true origin of Jonah' },
      { id: 'gate_purpose', name: 'Gate Purpose', discovered: false, description: 'What the Gate really is for' },
      { id: 'sisters_count', name: 'Sisters Count', discovered: false, description: 'How many lost sisters there are' },
      { id: 'reflection_path', name: 'Reflection Path', discovered: false, description: 'Where reflections lead' },
      { id: 'simba_truth', name: 'Simba Truth', discovered: false, description: 'The truth about Simba' },
      { id: 'keyhole_secret', name: 'Keyhole Secret', discovered: false, description: 'What lies beyond the keyhole' },
      { id: 'mirror_world', name: 'Mirror World', discovered: false, description: 'The nature of the mirror world' }
    ];
  }
};

// Check if story flag exists
export const hasStoryFlag = (flagId: string): boolean => {
  if (!window.JonahConsole?.storyFlags) return false;
  
  const flag = window.JonahConsole.storyFlags.find((f: StoryFlag) => f.id === flagId);
  return flag ? flag.discovered : false;
};

// Add a story flag
export const addStoryFlag = (flagId: string): boolean => {
  if (!window.JonahConsole?.storyFlags) {
    initializeStoryFlags();
  }
  
  const flag = window.JonahConsole.storyFlags.find((f: StoryFlag) => f.id === flagId);
  if (flag && !flag.discovered) {
    flag.discovered = true;
    return true;
  }
  
  return false;
};

// Get all discovered story flags
export const getDiscoveredStoryFlags = (): StoryFlag[] => {
  if (!window.JonahConsole?.storyFlags) {
    initializeStoryFlags();
  }
  
  return window.JonahConsole.storyFlags.filter((f: StoryFlag) => f.discovered);
};

// Get details of a specific story flag
export const getStoryFlagDetails = (flagId: string): string => {
  if (!window.JonahConsole?.storyFlags) {
    initializeStoryFlags();
  }
  
  const flag = window.JonahConsole.storyFlags.find((f: StoryFlag) => f.id === flagId);
  if (flag && flag.discovered) {
    return flag.description;
  }
  
  return "You haven't discovered this story flag yet.";
};

// Print discovered story flags to console with styling
export const printDiscoveredStoryFlags = (): void => {
  if (!window.JonahConsole?.storyFlags) {
    initializeStoryFlags();
  }
  
  const discoveredFlags = window.JonahConsole.storyFlags.filter((f: StoryFlag) => f.discovered);
  
  if (discoveredFlags.length === 0) {
    console.log('%cNo story flags discovered yet.', 'color: #8B3A40; font-size: 14px;');
    return;
  }
  
  console.log('%c=== DISCOVERED STORY FLAGS ===', 'color: #8B3A40; font-size: 16px; font-weight: bold;');
  discoveredFlags.forEach((flag: StoryFlag) => {
    console.log(`%c${flag.name}: %c${flag.description}`, 'color: #8B3A40; font-size: 14px; font-weight: bold;', 'color: #CCCCCC; font-size: 14px;');
  });
};

// Add discoveryStory function to window
export const setupStoryFunction = () => {
  window.discoverStoryFlag = function(flagId: string): boolean {
    if (!window.JonahConsole?.storyFlags) {
      initializeStoryFlags();
    }
    
    const flag = window.JonahConsole.storyFlags.find((f: StoryFlag) => f.id === flagId);
    if (flag) {
      if (!flag.discovered) {
        flag.discovered = true;
        console.log(`%cNew story flag discovered: ${flag.id}`, 'color: #8B3A40; font-size: 14px;');
        return true;
      } else {
        console.log(`%cYou've already discovered: ${flag.id}`, 'color: #8B3A40; font-size: 14px;');
      }
    }
    
    return false;
  };
};

// Export for initialization
export const initializeClueSystem = () => {
  initializeStoryFlags();
  setupStoryFunction();
};

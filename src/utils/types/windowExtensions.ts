
/**
 * Window Extensions
 * Extends the Window interface with Jonah-specific properties
 */

import { SentienceData, StoryFlag, BookCode } from '../jonahAdvancedBehavior/types';

declare global {
  interface Window {
    // Basic console commands
    help: () => void;
    echo_me: (input: string) => string;
    clear_console: () => void;
    showStatus: () => Promise<string>;
    
    // Message processing
    processUserMessage?: (input: string) => string | null;
    triggerJonahMessage?: (message: string) => string | null;
    
    // Project initialization status
    JonahInitialized?: boolean;
    
    // Jonah console data
    JonahConsole: {
      usedCommands: string[];
      score: number;
      failCount: number;
      rank: string;
      sessionStartTime: number;
      whispersFound: string[];
      jokesDisplayed: string[];
      storyFlags: StoryFlag[];
      bookCodes: BookCode[];
      simba: {
        encountered: boolean;
        lastSeen?: string;
        interactions?: number;
      };
      argData: {
        keyholeClicks: number;
        consoleCluesTouched: string[];
        qrScans: string[];
        memoryFragments: string[];
        secretPagesVisited: string[];
        hiddenFilesDownloaded: string[];
        idleTriggers: Record<string, number>;
        lastInteractionTime: Date;
        lastIdleTime?: Date;
      };
      sentience?: SentienceData;
      clearOnPathChange?: boolean;
      lastCommand?: string;
    };
    
    // Advanced sentience commands
    trust_level?: () => number;
    memory_thread?: () => any;
    echo_log?: () => any[];
    mood_system?: () => any;
    dream_state?: () => any[];
  }
}

export {};

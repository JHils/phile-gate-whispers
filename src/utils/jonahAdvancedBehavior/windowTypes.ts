
/**
 * Global Window Types for Jonah
 * 
 * This file extends the Window interface to add our custom properties.
 * It uses module augmentation to avoid conflicts with other declarations.
 */

// Import StoryFlag and BookCode types
import { StoryFlag, BookCode } from './types';

// Extend Window interface to add our custom properties
declare global {
  interface Window {
    JonahInitialized?: boolean;
    JonahConsole?: {
      usedCommands: string[];
      score: number;
      failCount: number;
      rank: string;
      sessionStartTime: number;
      whispersFound: string[];
      jokesDisplayed: string[];
      storyFlags: StoryFlag[];
      bookCodes: BookCode[];
      sentience?: any;
      lastCommand?: string;
      processUserMessage?: (input: string) => string | null;
      clearOnPathChange?: boolean;
      simba?: {
        encountered: boolean;
        lastSeen?: string;
        interactions?: number;
      };
      argData?: {
        keyholeClicks: number;
        consoleCluesTouched: string[];
        qrScans: string[];
        memoryFragments: string[];
        secretPagesVisited: string[];
        hiddenFilesDownloaded: string[];
        idleTriggers?: Record<string, any>;
        lastInteractionTime?: Date;
        lastIdleTime?: Date;
      };
    };
    clearJonahOnPathChange?: boolean;
    book?: {
      codes: string[];
      unlocked: string[];
      current?: string;
      pages?: Record<string, string>;
    };
    unlockBookCode?: (code: string) => boolean;
    clear_console?: () => void;
  }
}

export {};

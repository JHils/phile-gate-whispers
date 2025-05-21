
/**
 * Window Extensions
 * Properly defining global extensions for TypeScript
 */

import { SentienceData, StoryFlag, BookCode } from './jonahAdvancedBehavior/types';

declare global {
  interface Window {
    // Basic commands
    help: () => void;
    echo_me: (input: string) => string;
    clear_console: () => void;
    
    // Jonah book system
    book: {
      codes: string[];
      unlocked: string[];
      current?: string;
      pages?: Record<string, string>;
    };
    unlockBookCode: (code: string) => boolean;
    
    // Status command
    status: string;
    showStatus: () => Promise<void>;
    
    // Jonah console
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
        idleTriggers: Record<string, any>;
        lastInteractionTime: Date;
        lastIdleTime?: Date;
      };
      sentience?: SentienceData;
      lastCommand?: string;
      processUserMessage?: (input: string) => string | null;
      clearOnPathChange?: boolean;
      startTime?: number;
    };
  }
}

export {};

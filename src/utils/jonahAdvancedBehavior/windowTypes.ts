
import { SentienceData, StoryFlag, BookCode } from './types';

// Define window interfaces without duplicate declarations
declare global {
  interface Window {
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
      simba: any;
      argData: any;
      sentience?: SentienceData;
      lastCommand?: string;
      processUserMessage?: (input: string) => string | null;
      clearOnPathChange?: boolean;
    };
    logJonahDream?: (dreamContent: string) => void;
    processUserMessage?: (message: string) => string | null;
    clearJonahOnPathChange?: boolean;
    JonahInitialized?: boolean;
    // Adding console command functions
    start?: () => string;
    inventory?: () => string;
    echo_me?: (input: string) => string;
    access_journal?: () => string;
    help?: () => void;
    reveal?: () => void;
    reincarnate?: () => void;
    whois?: () => void;
    gate?: () => void;
    philes?: () => void;
    monster?: () => void;
    legacy?: () => void;
    hint?: () => void;
    newsFlash?: () => string;
    weatherReport?: () => string;
    dreamJournal?: () => void;
    rememberMe?: () => Record<string, any>;
    whisperTree?: () => string;
    mirrorCheck?: () => void;
    storyFlags?: () => void;
    findAnomaly?: (text: string) => void;
    readPage?: (page: number) => void;
    verifyCode?: (code: string) => void;
    bridgeCollapse?: () => void;
    discoverStoryFlag?: (flagId: string) => boolean;
  }
}

export {};

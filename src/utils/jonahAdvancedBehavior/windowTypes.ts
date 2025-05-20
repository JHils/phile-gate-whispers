
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
  }
}

export {};


import { StoryFlag, BookCode, SentienceData } from './types';

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
      processUserMessage?: (input: string) => string | null;
      clearOnPathChange?: boolean;
      lastCommand?: string;
    };
    logJonahDream?: (dreamContent: string) => void;
    processUserMessage?: (message: string) => string | null;
    clearJonahOnPathChange?: boolean;
    JonahInitialized?: boolean;
  }
}

export {};

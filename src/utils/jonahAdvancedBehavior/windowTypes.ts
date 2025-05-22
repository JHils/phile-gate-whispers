
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
      storyFlags: any[];
      bookCodes: any[];
      sentience?: any;
      lastCommand?: string;
      processUserMessage?: (input: string) => string | null;
      clearOnPathChange?: boolean;
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

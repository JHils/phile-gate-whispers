
/**
 * Type definitions for Jonah Advanced Behavior System
 */

// Define window interface extension with Jonah-specific properties
declare global {
  interface Window {
    JonahConsole?: {
      usedCommands?: string[];
      score?: number;
      failCount?: number;
      rank?: string;
      sessionStartTime?: number;
      whispersFound?: string[];
      jokesDisplayed?: string[];
      storyFlags?: any[];
      bookCodes?: any[];
      simba?: any;
      argData?: any;
      sentience?: {
        interactionsCount: number;
        deepModeUnlocked: boolean;
        dreamModeTriggered: boolean;
        lastInteraction: number;
        memoryFragments?: string[];
        rememberedName?: string;
        sessionData?: {
          messagesReceived?: number;
          messagesSent?: number;
        };
        realityFabric?: {
          currentMood?: string;
          moodChangeTime?: number;
          moodHistory?: Array<{mood: string, timestamp: number}>;
          anomalyCount?: number;
          journal?: Array<{entryId: number, timestamp: number, content: string}>;
          dreamParables?: string[];
          usedDreamParables?: string[];
        };
      };
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

// Export as namespace to avoid TS errors
export {};

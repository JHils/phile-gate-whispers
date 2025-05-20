
/**
 * Type definitions for Jonah Advanced Behavior System
 */

// Define window interface extension with Jonah-specific properties
declare global {
  interface Window {
    JonahConsole?: {
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
    };
    logJonahDream?: (dreamContent: string) => void;
    processUserMessage?: (message: string) => string | null;
    clearJonahOnPathChange?: boolean;
  }
}

// Export as namespace to avoid TS errors
export {};

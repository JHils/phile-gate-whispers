
import { SentienceData } from '../jonahAdvancedBehavior/types';

export interface JonahConsole {
  argData?: {
    memoryFragments?: string[];
    [key: string]: any;
  };
  sentience?: SentienceData;
  whispers?: Array<{
    id: string;
    content: string;
    unlockedBy: string;
    timestamp?: number;
  }>;
  usedCommands?: string[];
  score?: number;
  failCount?: number;
  rank?: string;
  sessionStartTime?: number;
  whispersFound?: string[];
  jokesDisplayed?: string[];
  storyFlags?: string[];
  bookCodes?: any[];
  simba?: {
    encountered: boolean;
    interactions?: number;
    lastSeen?: number;
  };
  startTime?: number;
  [key: string]: any;
}

export interface JonahNamespace {
  glitch?: {
    reveal?: () => any[];
  };
  [key: string]: any;
}

declare global {
  interface Window {
    JonahConsole?: JonahConsole;
    jonah?: JonahNamespace;
    clearJonahOnPathChange?: boolean;
    biomeResponse?: (biomeType?: string) => string;
    listBiomes?: () => string;
    processUserMessage?: (input: string) => string | null;
    triggerJonahMessage?: (message: string) => string | null;
    trust_level?: () => number;
    memory_thread?: () => any;
    echo_log?: () => any[];
    mood_system?: () => any;
    dream_state?: () => any[];
    JonahInitialized?: boolean;
    [key: string]: any;
  }
}

export {};

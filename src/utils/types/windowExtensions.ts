
import { SentienceData } from '../jonahAdvancedBehavior/types';

interface JonahConsole {
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
  [key: string]: any;
}

interface JonahNamespace {
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
    [key: string]: any;
  }
}

export {};

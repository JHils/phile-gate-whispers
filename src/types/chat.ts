
export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  // Other fields not used in the chat component
}

export interface Message {
  id: string;
  sender: 'user' | 'character';
  text: string;
  timestamp: Date;
}

// Extend chat types with JonahConsoleBot specific types
// Make sure these match types in hooks/useBotState/types.ts
export type TrustLevel = "none" | "low" | "medium" | "high";
export type BotMode = "normal" | "debug" | "echo" | "whisper" | "console" | "responsive";

export interface DialogueEntry {
  message: string;
  trustLevel: TrustLevel;
  tags?: string[]; // Optional tags for filtering
  pages?: string[]; // Pages where this message might appear
}

// ARG specific tracking interfaces
export interface ARGProgress {
  qrCodesScanned: string[];
  consoleCluesTouched: string[];
  keyholeClicks: number;
  storyFlags: string[];
}

export interface TestamentData {
  username?: string;
  trustLevel: TrustLevel;
  visitedPages: string[];
  unlockedSecrets: string[];
  qrCodes: string[];
  hiddenFiles: string[];
  chapter: {
    current: number;
    completed: boolean[];
  };
  specialPaths: string[];
  behaviourStats: {
    rudeness: number;
    patience: number;
    curiosity: number;
  };
}


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
export type TrustLevel = "low" | "medium" | "high";
export type BotMode = "whisper" | "responsive" | "console";

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
}

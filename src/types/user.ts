
export interface UserState {
  visitCount: number;
  firstVisit: number;
  lastVisit: number;
  gatekeeperStatus?: boolean;
  permanentlyCollapsed?: boolean;
  survivorMode?: boolean;
  legacyWritten?: boolean;
  console?: {
    helpCalled: boolean;
    whoisCalled: boolean;
    gateCalled: boolean;
    philesCalled: boolean;
    monsterCalled: boolean;
    legacyCalled: boolean;
    revealCalled: boolean;
    reincarnateCalled: boolean;
    rank?: string;
  };
  bookCodes?: {
    unlockedCodes: string[];
    totalCodesUnlocked: number;
  };
  layeredClues?: {
    discoveredClues: string[];
    mirrorChecks: number;
    anomaliesFound: number;
  };
  simba?: {
    traced: boolean;
    encounters: number;
  };
  events?: Record<string, any>;
  // New fields for Phase 3
  trust?: {
    level: string;
    score: number;
  };
  collapse?: {
    message: string | null;
    permanent: boolean;
  };
  messages?: {
    whisper: string;
  };
  pageSeen?: {
    gate: boolean;
  };
  // Phase 3 additions
  timeline?: {
    id: string;
    variant: string;
    fractureEvents: number;
  };
  journal?: {
    entries: Array<{
      timestamp: number;
      text: string;
      source: string;
    }>;
    lastViewed: number;
  };
  sentience?: {
    interactionsCount: number;
    rememberedName?: string;
    deepModeUnlocked: boolean;
    dreamModeTriggered: boolean;
  };
  audio?: {
    lastPlayed: string;
    unlockedVoiceLogs: string[];
  };
  inventory?: {
    pagesVisited: string[];
    phielsUnlocked: number;
    commandsDiscovered: string[];
    secretsFound: string[];
  };
}

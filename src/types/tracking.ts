
// User tracking types
export interface UserState {
  visitCount: number;
  firstVisit: number;
  lastVisit: number;
  gatekeeperStatus: boolean;
  permanentlyCollapsed: boolean;
  survivorMode: boolean;
  legacyWritten: boolean;
  trust?: {
    level: string;
    score: number;
  };
  timeline?: {
    id: string;
    fractures: number;
    stability: number;
  };
  collapse?: {
    time: number;
    state: string;
    message?: string;
    permanent?: boolean;
  };
  messages?: {
    shown: string[];
    hidden: string[];
    whisper?: string[];
  };
  console: {
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
  bookCodes: {
    unlockedCodes: string[];
    totalCodesUnlocked: number;
  };
  layeredClues: {
    discoveredClues: string[];
    mirrorChecks: number;
    anomaliesFound: number;
  };
  simba: {
    traced: boolean;
    encounters: number;
  };
  events: Record<string, boolean | number>;
}

// User rank types
export interface UserRank {
  rank: string;
  score: number;
  position: number;
  userHash: string;
}

// Leaderboard entry type
export interface LeaderboardEntry {
  position: number;
  userHash: string;
  displayName: string;
  rank: string;
  score: number;
  lastSeen: string;
}

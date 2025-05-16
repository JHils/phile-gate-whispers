
// Define types for our tracking system
export interface UserState {
  visitCount: number;
  firstVisit: number;
  lastVisit: number;
  gatekeeperStatus: boolean;
  permanentlyCollapsed: boolean;
  survivorMode: boolean;
  legacyWritten: boolean;
  console: {
    helpCalled: boolean;
    whoisCalled: boolean;
    gateCalled: boolean;
    philesCalled: boolean;
    monsterCalled: boolean;
    legacyCalled: boolean;
    revealCalled: boolean;
    reincarnateCalled: boolean;
  };
  events: {
    [key: string]: number;
  };
}

export interface UserRank {
  rank: string;
  score: number;
  position: number;
  userHash: string;
}

export interface LeaderboardEntry {
  position: number;
  userHash: string;
  displayName: string;
  rank: string;
  score: number;
  lastSeen: string;
}

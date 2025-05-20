
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
  trust?: {
    level: string;
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
}

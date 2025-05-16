
import { UserState } from '@/types/tracking';
import { calculateScore, determineRank } from '@/utils/userRankUtils';

const DEFAULT_STATE: UserState = {
  visitCount: 0,
  firstVisit: 0,
  lastVisit: 0,
  gatekeeperStatus: false,
  permanentlyCollapsed: false,
  survivorMode: false,
  legacyWritten: false,
  console: {
    helpCalled: false,
    whoisCalled: false,
    gateCalled: false,
    philesCalled: false,
    monsterCalled: false,
    legacyCalled: false,
    revealCalled: false,
    reincarnateCalled: false,
  },
  bookCodes: {
    unlockedCodes: [],
    totalCodesUnlocked: 0
  },
  layeredClues: {
    discoveredClues: [],
    mirrorChecks: 0,
    anomaliesFound: 0
  },
  simba: {
    traced: false,
    encounters: 0
  },
  events: {}
};

/**
 * Load user state from localStorage with migration support
 */
export const loadUserState = (): UserState => {
  try {
    // Load existing state if available
    const savedState = localStorage.getItem('philes_user_state');
    let state: UserState = savedState ? JSON.parse(savedState) : { ...DEFAULT_STATE };
    
    // Set default values for new properties if they don't exist
    state = {
      ...DEFAULT_STATE,
      ...state,
      bookCodes: state.bookCodes || { ...DEFAULT_STATE.bookCodes },
      layeredClues: state.layeredClues || { ...DEFAULT_STATE.layeredClues },
      simba: state.simba || { ...DEFAULT_STATE.simba }
    };
    
    // Migrate legacy values from localStorage
    migrateLegacyValues(state);
    
    // Update visit count and timestamps
    state.visitCount += 1;
    state.lastVisit = Date.now();
    
    if (!state.firstVisit) {
      state.firstVisit = Date.now();
    }
    
    // Save updated state
    saveUserState(state);
    
    return state;
  } catch (error) {
    console.error('Error loading user state:', error);
    return DEFAULT_STATE;
  }
};

/**
 * Save user state to localStorage
 */
export const saveUserState = (state: UserState): void => {
  localStorage.setItem('philes_user_state', JSON.stringify(state));
};

/**
 * Reset user state (for testing)
 */
export const resetUserState = (): void => {
  localStorage.removeItem('philes_user_state');
  localStorage.removeItem('permanentlyCollapsed');
  localStorage.removeItem('gateCollapseTime');
  localStorage.removeItem('survivorMode');
  localStorage.removeItem('helpCalled');
  localStorage.removeItem('whoisCalled');
  localStorage.removeItem('gateCalled');
  localStorage.removeItem('philesCalled');
  localStorage.removeItem('monsterCalled');
  localStorage.removeItem('legacyCalled');
  localStorage.removeItem('console_messages_shown');
  localStorage.removeItem('index_console_messages_shown');
  localStorage.removeItem('phileScore');
  localStorage.removeItem('phileRank');
};

/**
 * Migrate legacy localStorage values to the structured state
 */
export const migrateLegacyValues = (state: UserState): void => {
  if (localStorage.getItem('permanentlyCollapsed') === 'true') {
    state.permanentlyCollapsed = true;
  }
  
  if (localStorage.getItem('survivorMode') === 'true') {
    state.survivorMode = true;
  }
  
  if (localStorage.getItem('helpCalled') === 'true') {
    state.console.helpCalled = true;
  }
  
  if (localStorage.getItem('whoisCalled') === 'true') {
    state.console.whoisCalled = true;
  }
  
  if (localStorage.getItem('gateCalled') === 'true') {
    state.console.gateCalled = true;
  }
  
  if (localStorage.getItem('philesCalled') === 'true') {
    state.console.philesCalled = true;
  }
  
  if (localStorage.getItem('monsterCalled') === 'true') {
    state.console.monsterCalled = true;
  }
  
  if (localStorage.getItem('legacyCalled') === 'true') {
    state.console.legacyCalled = true;
  }
  
  if (localStorage.getItem('legacyJournalEntry')) {
    state.legacyWritten = true;
  }
  
  // Migrate book codes from localStorage
  const unlockedBookCodes = JSON.parse(localStorage.getItem('unlockedBookCodes') || '[]');
  if (unlockedBookCodes.length > 0 && state.bookCodes) {
    state.bookCodes.unlockedCodes = unlockedBookCodes;
    state.bookCodes.totalCodesUnlocked = unlockedBookCodes.length;
  }

  // Also update the phileScore and phileRank for console compatibility
  if (state.visitCount > 0) {
    let score = calculateScore(state);
    localStorage.setItem('phileScore', score.toString());
    
    let rank = determineRank(score);
    localStorage.setItem('phileRank', rank.toLowerCase());
  }
};

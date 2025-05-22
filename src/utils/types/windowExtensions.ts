
/**
 * Window Extensions
 * Extends the Window interface with Jonah-specific properties
 */

import { SentienceData, StoryFlag, BookCode } from '../jonahAdvancedBehavior/types';

declare global {
  interface Window {
    // Basic console commands
    help: () => void;
    echo_me: (input: string) => string;
    clear_console: () => void;
    showStatus: () => Promise<string>;
    
    // Message processing
    processUserMessage?: (input: string) => string | null;
    triggerJonahMessage?: (message: string) => string | null;
    
    // Project initialization status
    JonahInitialized?: boolean;
    
    // Jonah console data
    JonahConsole: {
      usedCommands: string[];
      score: number;
      failCount: number;
      rank: string;
      sessionStartTime: number;
      whispersFound: string[];
      jokesDisplayed: string[];
      storyFlags: StoryFlag[];
      bookCodes: BookCode[];
      simba: {
        encountered: boolean;
        lastSeen?: string;
        interactions?: number;
      };
      argData: {
        keyholeClicks: number;
        consoleCluesTouched: string[];
        qrScans: string[];
        memoryFragments: string[];
        secretPagesVisited: string[];
        hiddenFilesDownloaded: string[];
        idleTriggers: Record<string, number>;
        lastInteractionTime: Date;
        lastIdleTime?: Date;
      };
      sentience?: SentienceData;
      clearOnPathChange?: boolean;
      lastCommand?: string;
      processUserMessage?: (input: string) => string | null;
      startTime?: number;
    };
    
    // Book system
    book?: {
      codes: string[];
      unlocked: string[];
      current?: string;
      pages?: Record<string, string>;
    };
    
    unlockBookCode?: (code: string) => boolean;
    
    // Advanced sentience commands
    trust_level?: () => number;
    memory_thread?: () => any;
    echo_log?: () => any[];
    mood_system?: () => any;
    dream_state?: () => any[];
    
    // Time-related functions
    isSpecialTimeWindow?: () => boolean;
    timeCheck?: () => void;
    
    // Jonah audio system
    playJonahAudio?: (type: string) => void;
    
    // Special navigation and state management
    clearJonahOnPathChange?: boolean;
    
    // Simba-related functions
    traceCat?: () => void;
    feedSimba?: () => void;
    triggerSimbaComment?: (context: string) => void;
    
    // Quest system
    completeQuest?: (questId: string) => string;
    questHint?: () => string;
    
    // WhisperMaster system
    WhisperMaster?: {
      whispers: string[];
      discovered: string[];
      active: boolean;
    };
    whisperTree?: () => string;
    addWhisper?: (whisper: string) => boolean;
    
    // ARG-related commands
    dreamJournal?: () => string;
    rememberMe?: () => Record<string, any>;
    
    // Interface commands
    reveal?: (element: string) => void;
    
    // Humor commands
    helpMe?: () => void;
    tea?: () => void;
    trousers?: () => void;
    moustache?: () => void;
    funny?: () => void;
    seenMyself?: () => void;
    youWereHimFirst?: () => void;
    wearingYouNow?: () => void;
    toggleWrath?: () => void;
    
    // Console commands from consoleNewCommands.ts
    avianBlessing?: () => void;
    blessMe?: () => void;
    initiateBirdProtocol?: () => void;
    fleetSeenYou?: () => void;
    messageYourself?: () => void;
    bullsBalls?: () => void;
    gav007?: () => void;
    louisBarton?: () => void;
    bridgeWhisperer?: () => void;
    
    // Console commands from consoleBasicCommands.ts
    reincarnate?: () => void;
    whois?: () => void;
    gate?: () => void;
    philes?: () => void;
    monster?: () => void;
    legacy?: () => void;
    hint?: () => void;
    
    // Console commands from consoleEcoCommands.ts
    dreamtime?: () => void;
    woodwideweb?: () => void;
    biomeCheck?: () => void;
    kgari?: () => void;
  }
}

export {};

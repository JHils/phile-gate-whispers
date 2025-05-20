
/**
 * Global Console Types
 * Central declaration of all global type interfaces to prevent conflicts
 */

// Import necessary types
import { SentienceData, StoryFlag, BookCode } from '../jonahAdvancedBehavior/types';

// Declare shared global interfaces
declare global {
  interface Window {
    // Core JonahConsole object
    JonahConsole?: {
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
        idleTriggers: Record<string, any>;
        lastInteractionTime: Date;
        lastIdleTime?: Date;
      };
      sentience?: SentienceData;
      lastCommand?: string;
      processUserMessage?: (input: string) => string | null;
      clearOnPathChange?: boolean;
    };
    
    // Initialization flag
    JonahInitialized?: boolean;
    clearJonahOnPathChange?: boolean;
    logJonahDream?: (dreamContent: string) => void;
    processUserMessage?: (message: string) => string | null;
    
    // Core console commands
    start?: () => string;
    inventory?: () => string;
    echo_me?: (input: string) => string;
    forget?: () => string;
    forget_confirm?: () => string;
    access_journal?: () => string;
    split?: () => string;
    re_entry?: () => string;
    talk_to_jonah?: () => string;
    help?: () => void;
    reveal?: () => void;
    reincarnate?: () => void;
    whois?: () => void;
    gate?: () => void;
    philes?: () => void;
    monster?: () => void;
    legacy?: () => void;
    hint?: () => void;
    
    // News awareness commands
    newsFlash?: () => string;
    weatherReport?: () => string;
    
    // ARG system commands
    dreamJournal?: () => string;
    rememberMe?: () => Record<string, any>;
    whisperTree?: () => string;
    
    // Story & clue system
    mirrorCheck?: () => void;
    storyFlags?: () => void;
    findAnomaly?: (text: string) => void;
    readPage?: (page: number) => void;
    verifyCode?: (code: string) => void;
    bridgeCollapse?: () => void;
    discoverStoryFlag?: (flagId: string) => boolean;
    
    // Time system
    timeCheck?: () => void;
    isSpecialTimeWindow?: () => boolean;
    
    // Simba system
    traceCat?: () => void;
    feedSimba?: () => void;
    triggerSimbaComment?: (message: string) => void;
    
    // Ecological awareness
    dreamtime?: () => void;
    woodwideweb?: () => void;
    biomeCheck?: () => void;
    kgari?: () => void;
    
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
    
    // Audio and miscellaneous
    displayRandomJoke?: () => void;
    showStatus?: () => Promise<void>;
    mirrorLogs?: () => void;
    plea?: () => void;
    testament?: () => string;
    splitVoice?: () => void;
    mirrorMode?: () => void;
    lookInside?: () => void;
    echoChamber?: () => void;
    playJonahAudio?: (triggerType: string) => void;
    
    // Additional commands
    addWhisper?: (whisper: string) => boolean;
    WhisperMaster?: any;
    triggerJonahMessage?: (message: string) => string;
    processStoryQuery?: (query: string) => string;
  }
}

export {};

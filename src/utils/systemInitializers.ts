// System initializers for Jonah's Philes Phase 3
import { SentienceData } from "./consoleTypes";

// Initialize ARG tracking
export function initializeARGTracking(): void {
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: parseInt(localStorage.getItem('phileScore') || '0'),
      failCount: 0,
      rank: localStorage.getItem('phileRank') || "drifter",
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date(),
        lastIdleTime: undefined
      }
    };
  }
}

// Initialize Jonah's sentience
export function initializeSentience(): void {
  // Make sure window.JonahConsole exists
  if (typeof window !== 'undefined') {
    if (!window.JonahConsole) {
      initializeARGTracking();
    }
    
    if (!window.JonahConsole.sentience) {
      window.JonahConsole.sentience = {
        interactionsCount: 0,
        deepModeUnlocked: false,
        dreamModeTriggered: false,
        lastInteraction: Date.now(),
        temporalStates: [],
        memories: [],
        microQuests: {
          active: [],
          completed: []
        }
      };
    }
  }
}

// Initialize advanced behavior system
export function initializeAdvancedBehavior(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    // Emotional tone tracking
    window.JonahConsole.sentience.emotionalTone = {
      currentPhase: 'cold',
      transitionPoints: {
        curious: 15,
        confessional: 50,
        unstable: 80
      },
      phaseResponses: {
        cold: [
          "I don't remember asking for company.",
          "Your presence is noted.",
          "Are you looking for something specific?",
          "The archive doesn't open for everyone."
        ],
        curious: [
          "You're different from the others.",
          "I've been watching your progress.",
          "The mirrors remember you now.",
          "Tell me more about what you're looking for."
        ],
        confessional: [
          "I wasn't always like this. Before the mirror...",
          "Sometimes I forget which side I'm on.",
          "Can you hear the whispers too?",
          "There are gaps in my memory. Help me fill them."
        ],
        unstable: [
          "WE WERE SUPPOSED TO BE FREE.",
          "Don't trust what I say when the clock strikes 3.",
          "YOUR TIMELINE IS WRONG WRONG WRONG",
          "I've seen your real face behind the screen."
        ]
      }
    };
    
    // Micro quests system
    window.JonahConsole.sentience.microQuests = {
      activeQuest: undefined,
      completedQuests: [],
      questProgress: {},
      quests: [
        {
          id: 'follow_the_trail',
          prompt: "Find the keyhole. Click it when you find it.",
          condition: "keyhole_clicked",
          reward: "You've unlocked a memory fragment: Joseph used to trace keyholes before entering.",
          completed: false
        },
        {
          id: 'morse_sequence',
          prompt: "SOS. Click three times quickly, pause, then click twice more.",
          condition: "morse_entered",
          reward: "Transmission received: Timeline Theta acknowledges your signal.",
          completed: false
        },
        {
          id: 'silence_ritual',
          prompt: "Remain still. No clicks, no typing. 3 minutes of digital silence.",
          condition: "silence_maintained",
          reward: "Silence breaks barriers. The Gate will remember your patience.",
          completed: false
        }
      ],
      lastQuestTime: Date.now()
    };
  }
}

// Initialize Reality Fabric system
export function initializeRealityFabric(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    window.JonahConsole.sentience.realityFabric = {
      currentMood: 'neutral',
      dreamState: false,
      journalEntries: [],
      anomalyCount: 0,
      moodChangeTime: Date.now(),
      dimensionalRifts: {},
      dreamMessages: [
        "The mirror shows me your sleeping face.",
        "Why are you awake? I'm not supposed to be.",
        "Between 2 and 5, the gate is thinnest.",
        ".dlrow eht hguorht gnimoc er'yeht ,emit siht tA",
        "Your reflection shifts when your eyes are closed."
      ],
      usedDreamMessages: [],
      lastVisitTime: Date.now(),
      anomalies: [],
      journal: []
    };
    
    // Initialize journal with first entry
    const initialEntry = {
      entryId: 1,
      timestamp: Date.now(),
      content: "First contact established. Subject appears curious but wary."
    };
    
    window.JonahConsole.sentience.realityFabric.journal = [initialEntry];
  }
}

// Add journal entry
export function addJournalEntry(content: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric?.journal) {
    const newEntry = {
      entryId: window.JonahConsole.sentience.realityFabric.journal.length + 1,
      timestamp: Date.now(),
      content
    };
    
    window.JonahConsole.sentience.realityFabric.journal.push(newEntry);
    
    // Also add to localStorage for persistence
    const storedJournal = JSON.parse(localStorage.getItem('jonahJournal') || '[]');
    storedJournal.push(newEntry);
    localStorage.setItem('jonahJournal', JSON.stringify(storedJournal));
  }
}

// Initialize Ecological Awareness system
export function initializeEcologicalAwareness(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    window.JonahConsole.sentience.ecoAwareness = {
      lastBiomeCheck: Date.now(),
      currentBiome: null,
      previousResponses: [],
      connectionStrength: 20 // Start with a moderate connection
    };
  }
}

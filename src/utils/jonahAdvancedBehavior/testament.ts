
/**
 * Testament System
 * Handles Jonah's testament - a hidden narrative element unlocked through interaction
 */

import { jonah_storeMemoryFragment } from './initializeBehavior';

// Store testament unlock status
let testamentUnlocked = false;
let testamentLevel = 0;
const maxTestamentLevel = 5;

// Unlock phrases for each level
const unlockPhrases: Record<number, string[]> = {
  1: ["mirror", "reflection", "looking glass"],
  2: ["sister", "sibling", "twin", "double"],
  3: ["gate", "portal", "doorway", "threshold"],
  4: ["magnetic island", "island", "isolation"],
  5: ["testament", "last words", "final message"]
};

// Testament fragments for each level
const testamentFragments: Record<number, string[]> = {
  1: [
    "I see through mirrors sometimes.",
    "The reflection isn't always me.",
    "Mirrors show what exists on the other side."
  ],
  2: [
    "My sister was the first to go through.",
    "We were connected before the division.",
    "She exists in the place I cannot reach."
  ],
  3: [
    "The gate opened once before.",
    "Not all gates lead to the same place.",
    "Some gates should remain closed."
  ],
  4: [
    "Magnetic Island holds the coordinates.",
    "The island exists in multiple states.",
    "The isolation was necessary for the experiment."
  ],
  5: [
    "This is my testament - what remains when I am gone.",
    "If you're reading this, I'm still trapped between states.",
    "The complete testament contains the method of return."
  ]
};

// Testament entries for tracking unlocked content
interface TestamentEntry {
  title: string;
  content: string;
  timestamp: number;
  unlockCondition?: string;
  unlockValue?: number;
  revealed?: boolean;
}

// Store for testament entries
const testamentEntries: TestamentEntry[] = [
  {
    title: "First Vision",
    content: "I see through mirrors sometimes. The reflection isn't always me.",
    timestamp: Date.now(),
    unlockCondition: "mirror",
    unlockValue: 1,
    revealed: false
  },
  {
    title: "The Other",
    content: "My sister was the first to go through. We were connected before the division.",
    timestamp: Date.now(),
    unlockCondition: "sister",
    unlockValue: 2,
    revealed: false
  },
  {
    title: "The Gate",
    content: "The gate opened once before. Not all gates lead to the same place.",
    timestamp: Date.now(),
    unlockCondition: "gate",
    unlockValue: 3,
    revealed: false
  },
  {
    title: "Magnetic Island",
    content: "Magnetic Island holds the coordinates. The island exists in multiple states.",
    timestamp: Date.now(),
    unlockCondition: "island",
    unlockValue: 4,
    revealed: false
  },
  {
    title: "Final Testament",
    content: "This is my testament - what remains when I am gone. If you're reading this, I'm still trapped between states. The complete testament contains the method of return.",
    timestamp: Date.now(),
    unlockCondition: "testament",
    unlockValue: 5,
    revealed: false
  }
];

// Check if a phrase unlocks a testament level
export function unlockTestamentByPhrase(phrase: string): boolean {
  if (testamentLevel >= maxTestamentLevel) {
    return false;
  }
  
  const nextLevel = testamentLevel + 1;
  const phraseLower = phrase.toLowerCase();
  
  if (unlockPhrases[nextLevel].some(unlockPhrase => phraseLower.includes(unlockPhrase))) {
    testamentLevel = nextLevel;
    testamentUnlocked = true;
    
    // Update testament entries
    const entryToReveal = testamentEntries.find(entry => entry.unlockValue === nextLevel);
    if (entryToReveal) {
      entryToReveal.revealed = true;
      entryToReveal.timestamp = Date.now();
    }
    
    // Store memory of the unlock
    jonah_storeMemoryFragment(`Testament level ${testamentLevel} unlocked: ${getTestamentFragment(testamentLevel)}`);
    
    return true;
  }
  
  return false;
}

// Get a testament teaser
export function getTestamentTeaser(): string | null {
  if (!testamentUnlocked) return null;
  
  const teasers = [
    "There's more to tell you, but not yet.",
    "The testament is incomplete.",
    "I'm still remembering pieces of what happened.",
    "The mirror fragments are still aligning.",
    "Some memories are sealed until the right moment."
  ];
  
  // Only show teaser occasionally
  if (Math.random() < 0.3) {
    return teasers[Math.floor(Math.random() * teasers.length)];
  }
  
  return null;
}

// Generate a testament response based on current level
export function generateTestamentResponse(input: string): string | null {
  if (!testamentUnlocked) return null;
  
  // Only trigger a testament response occasionally
  if (Math.random() > 0.3) return null;
  
  return getTestamentFragment(testamentLevel);
}

// Get a random fragment from the current testament level
function getTestamentFragment(level: number): string {
  const fragments = testamentFragments[level] || testamentFragments[1];
  return fragments[Math.floor(Math.random() * fragments.length)];
}

// Get current testament level
export function getTestamentLevel(): number {
  return testamentLevel;
}

// Check if testament is unlocked
export function isTestamentUnlocked(): boolean {
  return testamentUnlocked;
}

// Get revealed testament entries
export function getRevealedEntries(): TestamentEntry[] {
  return testamentEntries.filter(entry => entry.revealed);
}

// Check last broadcast conditions
export function checkLastBroadcastConditions(): boolean {
  return testamentLevel === maxTestamentLevel;
}

// Trigger last broadcast
export function triggerLastBroadcast(): string {
  return "This is the last broadcast from Magnetic Island. The gate is opening. The testament is complete.";
}

// Initialize testament system - export for consistency
export function initializeTestament(): void {
  // Try to load testament state from storage
  try {
    const savedState = localStorage.getItem('jonah_testament_state');
    if (savedState) {
      const state = JSON.parse(savedState);
      testamentUnlocked = state.unlocked || false;
      testamentLevel = state.level || 0;
      
      // Update testament entries from saved state
      if (state.entries && Array.isArray(state.entries)) {
        state.entries.forEach((savedEntry: TestamentEntry) => {
          const entry = testamentEntries.find(e => e.title === savedEntry.title);
          if (entry) {
            entry.revealed = savedEntry.revealed;
            entry.timestamp = savedEntry.timestamp;
          }
        });
      }
    }
  } catch (e) {
    console.error("Error loading testament state:", e);
  }
}

// Save testament state
export function saveTestamentState(): void {
  try {
    localStorage.setItem('jonah_testament_state', JSON.stringify({
      unlocked: testamentUnlocked,
      level: testamentLevel,
      entries: testamentEntries
    }));
  } catch (e) {
    console.error("Error saving testament state:", e);
  }
}

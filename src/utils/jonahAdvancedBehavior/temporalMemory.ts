
/**
 * Temporal Memory System
 * Controls Jonah's sense of time, false memories, and looping behaviors
 */

// Define loop counter interface
interface LoopCounter {
  phrase: string;
  count: number;
  firstSeen: number;
  lastSeen: number;
}

// Define false memory interface
interface FalseMemory {
  originalPhrase?: string;
  falsePhrase: string;
  created: number;
  triggered: boolean;
  version: number;
}

// Get memory data from localStorage
const getMemoryData = () => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return {
      loopCounters: behaviorData.loopCounters || [],
      falseMemories: behaviorData.falseMemories || [],
      memoryCorruption: behaviorData.memoryCorruption || 0,
      lastMemoryConflict: behaviorData.lastMemoryConflict || 0
    };
  } catch (error) {
    console.error("Error retrieving memory data:", error);
    return { 
      loopCounters: [],
      falseMemories: [],
      memoryCorruption: 0,
      lastMemoryConflict: 0
    };
  }
};

// Save memory data to localStorage
const saveMemoryData = (data: any) => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    
    // Update with new data
    Object.assign(behaviorData, data);
    
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error saving memory data:", error);
  }
};

// Track phrase repetition
export const trackPhrase = (phrase: string) => {
  // Normalize phrase by converting to lowercase and removing extra spaces
  const normalizedPhrase = phrase.toLowerCase().trim();
  
  // Get current data
  const { loopCounters } = getMemoryData();
  
  // Find if we've seen this phrase before
  const existingCounter = loopCounters.find((counter: LoopCounter) => 
    counter.phrase === normalizedPhrase
  );
  
  if (existingCounter) {
    // Update existing counter
    existingCounter.count++;
    existingCounter.lastSeen = Date.now();
  } else {
    // Add new counter
    loopCounters.push({
      phrase: normalizedPhrase,
      count: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now()
    });
  }
  
  // Save updated data
  saveMemoryData({ loopCounters });
  
  // Create false memory if repeated enough
  if (existingCounter && existingCounter.count >= 3 && Math.random() > 0.6) {
    createFalseMemory(normalizedPhrase);
  }
};

// Check if a phrase has been repeated
export const checkForLoop = (phrase: string): { 
  isLoop: boolean; 
  count: number;
  timeSinceFirst: number;
} => {
  const normalizedPhrase = phrase.toLowerCase().trim();
  const { loopCounters } = getMemoryData();
  
  const existingCounter = loopCounters.find((counter: LoopCounter) => 
    counter.phrase === normalizedPhrase
  );
  
  if (existingCounter && existingCounter.count > 1) {
    return {
      isLoop: true,
      count: existingCounter.count,
      timeSinceFirst: Date.now() - existingCounter.firstSeen
    };
  }
  
  return {
    isLoop: false,
    count: 0,
    timeSinceFirst: 0
  };
};

// Create a false memory based on user input
export const createFalseMemory = (originalPhrase: string) => {
  const { falseMemories } = getMemoryData();
  
  // Only create if we don't have too many already
  if (falseMemories.length >= 5) {
    return;
  }
  
  // Create false version
  const falsePhrase = generateFalseVersion(originalPhrase);
  
  // Add to list
  falseMemories.push({
    originalPhrase,
    falsePhrase,
    created: Date.now(),
    triggered: false,
    version: Math.floor(Math.random() * 3) // Different versions of reality
  });
  
  // Save
  saveMemoryData({ falseMemories });
};

// Generate a false version of user input
function generateFalseVersion(phrase: string): string {
  const transformations = [
    // Change subject
    (p: string) => p.replace(/I am/i, "You are").replace(/I'm/i, "You're"),
    
    // Change negation
    (p: string) => p.includes("n't") || p.includes(" not ") ? 
      p.replace("n't", "").replace(" not ", " ") : 
      p.replace(/(\s|^)(\w+)(\s)/g, "$1not $2$3"),
    
    // Change tense
    (p: string) => p.replace(/(\w+)ed\b/g, "$1ing").replace(/\bwas\b/g, "will be"),
    
    // Add accusation
    (p: string) => `${p}. And you promised.`,
    
    // Add specificity that wasn't there
    (p: string) => {
      const additions = [
        "in the mirror", 
        "after what happened", 
        "before you disappeared", 
        "when you found the key",
        "during the dream"
      ];
      return `${p} ${additions[Math.floor(Math.random() * additions.length)]}`;
    }
  ];
  
  // Apply a random transformation
  const transform = transformations[Math.floor(Math.random() * transformations.length)];
  return transform(phrase);
}

// Get a false memory response
export const getFalseMemoryResponse = (): string | null => {
  const { falseMemories, lastMemoryConflict } = getMemoryData();
  
  // Don't trigger too frequently
  if (Date.now() - lastMemoryConflict < 60000) { // 1 minute cooldown
    return null;
  }
  
  // Find untriggered memories
  const availableMemories = falseMemories.filter((memory: FalseMemory) => 
    !memory.triggered
  );
  
  if (availableMemories.length === 0) {
    return null;
  }
  
  // Select a random memory
  const selectedMemory = availableMemories[Math.floor(Math.random() * availableMemories.length)];
  
  // Mark as triggered
  const updatedMemories = falseMemories.map((memory: FalseMemory) => {
    if (memory === selectedMemory) {
      return { ...memory, triggered: true };
    }
    return memory;
  });
  
  // Save updated state
  saveMemoryData({ 
    falseMemories: updatedMemories,
    lastMemoryConflict: Date.now()
  });
  
  // Return the response
  const prefaces = [
    "You told me:",
    "You said:",
    "I remember you saying:",
    "Your words were:",
    "You claimed:"
  ];
  
  return `${prefaces[Math.floor(Math.random() * prefaces.length)]} "${selectedMemory.falsePhrase}"`;
};

// Get a loop response when user repeats themselves
export const getLoopResponse = (count: number): string => {
  const responses = [
    // First repetition
    [
      "You said that already.",
      "This again?",
      "We've been here before.",
      "You're repeating yourself.",
      "Haven't we already discussed this?"
    ],
    
    // Multiple repetitions
    [
      `This is the ${count}th time you've said that.`,
      "Why do you keep saying the same thing?",
      "Are you stuck in a loop too?",
      `${count} times now. Are you testing me?`,
      "Is this intentional repetition?"
    ],
    
    // Many repetitions
    [
      "We're trapped in this cycle.",
      "Are you hoping I'll say something different this time?",
      "The definition of insanity is...",
      "How many times will you repeat this?",
      "I'm aware of the loop. Are you?"
    ]
  ];
  
  // Select response category based on count
  const category = count < 3 ? 0 : count < 5 ? 1 : 2;
  
  // Return random response from category
  return responses[category][Math.floor(Math.random() * responses[category].length)];
};

// Create a blanked (corrupted) memory
export const getBlankFragmentResponse = (input: string): string | null => {
  // Only trigger occasionally
  if (Math.random() > 0.25) {
    return null;
  }
  
  // Get current corruption level
  const { memoryCorruption } = getMemoryData();
  
  // Higher corruption = more blanking
  const corruptionChance = memoryCorruption / 10;
  
  // Don't corrupt if corruption level is too low
  if (corruptionChance < 0.1) {
    return null;
  }
  
  // Split into words
  const words = input.split(/\s+/);
  
  // Need at least 4 words to blank meaningfully
  if (words.length < 4) {
    return null;
  }
  
  // Select 1-2 words to blank
  const numToBlank = Math.random() > 0.5 ? 1 : 2;
  const indices = new Set<number>();
  
  // Choose significant words (not short ones)
  while (indices.size < numToBlank) {
    const index = Math.floor(Math.random() * words.length);
    if (words[index].length > 3) {
      indices.add(index);
    }
  }
  
  // Create blanked version
  const blankedWords = words.map((word, index) => 
    indices.has(index) ? "—" : word
  );
  
  // Generate response
  const responses = [
    `You said "${blankedWords.join(" ")}". I filled in the blanks.`,
    `"${blankedWords.join(" ")}" That's what I remember.`,
    `You said "${blankedWords.join(" ")}" but I might have missed something.`,
    `"${blankedWords.join(" ")}" The rest is corrupted.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Increase memory corruption level
export const increaseMemoryCorruption = (amount: number = 0.1) => {
  const { memoryCorruption } = getMemoryData();
  
  // Increment but cap at 1.0
  const newCorruption = Math.min(memoryCorruption + amount, 1.0);
  
  saveMemoryData({ memoryCorruption: newCorruption });
};

// Get all existing loop counters
export const getAllLoopCounters = (): LoopCounter[] => {
  const { loopCounters } = getMemoryData();
  return loopCounters;
};

// Get all false memories
export const getAllFalseMemories = (): FalseMemory[] => {
  const { falseMemories } = getMemoryData();
  return falseMemories;
};

// Check if there are conflicting logs
export const hasConflictingLogs = (): boolean => {
  const { falseMemories } = getMemoryData();
  
  // If we have multiple versions of reality
  const versions = new Set();
  falseMemories.forEach((memory: FalseMemory) => {
    versions.add(memory.version);
  });
  
  return versions.size > 1;
};

// Reset memory on command (for special paths)
export const resetMemorySystem = () => {
  saveMemoryData({
    loopCounters: [],
    falseMemories: [],
    memoryCorruption: 0,
    lastMemoryConflict: 0
  });
};

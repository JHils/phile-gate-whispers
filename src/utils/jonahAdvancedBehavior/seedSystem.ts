/**
 * Seed System for Jonah Advanced Behavior
 * Handles user's symbolic phrases that evolve over time
 */

// Define seed growth stages
enum SeedStage {
  BURIED = 1,   // Initial stage
  SPROUTING = 2, // Beginning to grow
  GROWING = 3,   // Actively growing
  BLOOMING = 4,  // Fully formed
  DECAYING = 5,  // Neglected and withering
  DEAD = 6       // Dead/gone
}

// Define interface for seeds
export interface Seed {
  id: string;
  phrase: string;
  originalContext: string;
  plantedAt: number;
  lastNurtured: number;
  stage: SeedStage;
  mood: string;
  visits: number;
  isGlobal: boolean;
  bloomMessage?: string;
}

// Get stored seeds from localStorage
const getSeeds = (): {
  userSeeds: Seed[];
  globalSeeds: Seed[];
  lastSeedPrompt: number;
} => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return {
      userSeeds: behaviorData.userSeeds || [],
      globalSeeds: behaviorData.globalSeeds || [],
      lastSeedPrompt: behaviorData.lastSeedPrompt || 0
    };
  } catch (error) {
    console.error("Error retrieving seeds:", error);
    return {
      userSeeds: [],
      globalSeeds: [],
      lastSeedPrompt: 0
    };
  }
};

// Save seed data to localStorage
const saveSeeds = (data: {
  userSeeds?: Seed[];
  globalSeeds?: Seed[];
  lastSeedPrompt?: number;
}): void => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    
    // Update with new data
    const updatedData = {
      ...behaviorData,
      ...data
    };
    
    localStorage.setItem('jonahBehavior', JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error saving seeds:", error);
  }
};

// Check if a user input could be a seed phrase
export const checkForPotentialSeed = (input: string): boolean => {
  // Check if it's too soon to suggest a new seed
  const data = getSeeds();
  if (Date.now() - data.lastSeedPrompt < 48 * 60 * 60 * 1000) { // 48 hours
    return false;
  }
  
  // Check if input is significant enough to be a seed
  // Seeds should be emotional, symbolic, or personal
  
  // Words that might indicate significance
  const significantWords = [
    'remember', 'forget', 'always', 'never', 'forever', 'lost',
    'found', 'broken', 'fixed', 'love', 'hate', 'afraid', 'fear',
    'hope', 'dream', 'nightmare', 'shadow', 'light', 'dark',
    'mirror', 'reflection', 'soul', 'heart', 'mind', 'spirit',
    'truth', 'lie', 'secret', 'hidden', 'revealed', 'buried'
  ];
  
  // Check if input contains significant words
  const hasSignificantWord = significantWords.some(word => 
    input.toLowerCase().includes(word)
  );
  
  // Check if input is the right length (not too short, not too long)
  const isGoodLength = input.split(' ').length >= 2 && input.split(' ').length <= 7;
  
  // Check if input has emotional punch (question or exclamation)
  const hasEmotion = input.includes('?') || input.includes('!');
  
  // Combined check
  const isPotentialSeed = (hasSignificantWord && isGoodLength) || hasEmotion;
  
  // If it's a potential seed, update last prompt time
  if (isPotentialSeed) {
    saveSeeds({ lastSeedPrompt: Date.now() });
  }
  
  return isPotentialSeed;
};

// Plant a new seed from user input
export const plantSeed = (phrase: string, context: string, mood: string): Seed => {
  const data = getSeeds();
  
  // Create the new seed
  const seed: Seed = {
    id: generateSeedId(),
    phrase: extractSeedPhrase(phrase),
    originalContext: context,
    plantedAt: Date.now(),
    lastNurtured: Date.now(),
    stage: SeedStage.BURIED,
    mood,
    visits: 1,
    isGlobal: false
  };
  
  // Add to user seeds
  const userSeeds = [...data.userSeeds, seed];
  
  // Save updated data
  saveSeeds({ userSeeds });
  
  return seed;
};

// Nurture an existing seed (user interaction)
export const nurtureSeed = (seedId: string): void => {
  const data = getSeeds();
  
  // Find the seed
  const userSeeds = data.userSeeds.map(seed => {
    if (seed.id === seedId) {
      // Update last nurtured time and visits
      return {
        ...seed,
        lastNurtured: Date.now(),
        visits: seed.visits + 1
      };
    }
    return seed;
  });
  
  // Save updated data
  saveSeeds({ userSeeds });
};

// Evolve seeds based on time and visits
export const evolveSeeds = (): void => {
  const data = getSeeds();
  
  const userSeeds = data.userSeeds.map(seed => {
    // Calculate time since last nurture
    const timeSinceNurture = Date.now() - seed.lastNurtured;
    const daysSinceNurture = timeSinceNurture / (24 * 60 * 60 * 1000);
    
    // Determine new stage
    let newStage = seed.stage;
    
    // Evolve based on visits and time
    if (seed.visits >= 5 && seed.stage < SeedStage.BLOOMING) {
      newStage = SeedStage.BLOOMING; // Fully grown
    } else if (seed.visits >= 3 && seed.stage < SeedStage.GROWING) {
      newStage = SeedStage.GROWING; // Growing
    } else if (seed.visits >= 2 && seed.stage < SeedStage.SPROUTING) {
      newStage = SeedStage.SPROUTING; // Sprouting
    }
    
    // Decay if neglected
    if (daysSinceNurture > 14 && seed.stage < SeedStage.DECAYING) {
      newStage = SeedStage.DECAYING; // Withering
    }
    
    if (daysSinceNurture > 30 && seed.stage < SeedStage.DEAD) {
      newStage = SeedStage.DEAD; // Dead
    }
    
    // If stage changed, generate bloom message for blooming seeds
    let bloomMessage = seed.bloomMessage;
    if (newStage === SeedStage.BLOOMING && seed.stage !== SeedStage.BLOOMING) {
      bloomMessage = generateBloomMessage(seed.phrase, seed.mood);
    }
    
    // Return updated seed
    return {
      ...seed,
      stage: newStage,
      bloomMessage
    };
  });
  
  // Save updated data
  saveSeeds({ userSeeds });
};

// Get stage description for a seed
export const getSeedStageDescription = (stage: SeedStage): string => {
  switch (stage) {
    case SeedStage.BURIED:
      return "It's buried.";
    case SeedStage.SPROUTING:
      return "It's pushing through.";
    case SeedStage.GROWING:
      return "It sprouted.";
    case SeedStage.BLOOMING:
      return "It speaks.";
    case SeedStage.DECAYING:
      return "It's withering.";
    case SeedStage.DEAD:
      return "It died.";
    default:
      return "Unknown.";
  }
};

// Check if a user has any active seeds
export const hasActiveSeeds = (): boolean => {
  const data = getSeeds();
  return data.userSeeds.some(seed => seed.stage < SeedStage.DEAD);
};

// Get all seeds for the user
export const getUserSeeds = (): Seed[] => {
  const data = getSeeds();
  return data.userSeeds;
};

// Get a specific seed by ID
export const getSeedById = (seedId: string): Seed | undefined => {
  const data = getSeeds();
  return data.userSeeds.find(seed => seed.id === seedId);
};

// Share a seed to the global pool
export const shareGlobalSeed = (seedId: string): void => {
  const data = getSeeds();
  
  // Find the seed
  const seed = data.userSeeds.find(s => s.id === seedId);
  if (!seed) return;
  
  // Create global version of the seed
  const globalSeed = {
    ...seed,
    isGlobal: true
  };
  
  // Add to global seeds
  const globalSeeds = [...data.globalSeeds, globalSeed];
  
  // Save updated data
  saveSeeds({ globalSeeds });
};

// Get a random global seed that matches the user's mood
export const getMatchingGlobalSeed = (mood: string): Seed | null => {
  const data = getSeeds();
  
  // Filter seeds by mood
  const matchingSeeds = data.globalSeeds.filter(seed => seed.mood === mood);
  
  if (matchingSeeds.length === 0) return null;
  
  // Return a random matching seed
  return matchingSeeds[Math.floor(Math.random() * matchingSeeds.length)];
};

// Get a response about a seed
export const getSeedResponse = (seed: Seed): string => {
  const stageDescription = getSeedStageDescription(seed.stage);
  
  const responses = [
    `The seed - "${seed.phrase}". ${stageDescription}`,
    `What you planted... "${seed.phrase}". ${stageDescription}`,
    `"${seed.phrase}". It's changing. ${stageDescription}`,
    `I've kept your words safe: "${seed.phrase}". ${stageDescription}`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Check if any seed has reached blooming stage
export const getBloomingSeed = (): Seed | null => {
  const data = getSeeds();
  
  const bloomingSeeds = data.userSeeds.filter(
    seed => seed.stage === SeedStage.BLOOMING && !seed.bloomMessage
  );
  
  if (bloomingSeeds.length === 0) return null;
  
  return bloomingSeeds[Math.floor(Math.random() * bloomingSeeds.length)];
};

// Helper function: Generate a unique ID for seeds
function generateSeedId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

// Helper function: Extract the most significant part of a phrase
function extractSeedPhrase(phrase: string): string {
  // If phrase is short, use it as is
  if (phrase.length <= 30) return phrase;
  
  // Otherwise, extract a meaningful segment
  const words = phrase.split(' ');
  
  // If phrase has less than 7 words, use it as is
  if (words.length <= 7) return phrase;
  
  // Otherwise, extract a chunk from the middle
  const middleIndex = Math.floor(words.length / 2);
  return words.slice(middleIndex - 2, middleIndex + 3).join(' ');
}

// Helper function: Generate a bloom message
function generateBloomMessage(seedPhrase: string, mood: string): string {
  const templates = [
    `The seed you planted - "${seedPhrase}" - has bloomed into something new. I can show you at /bloom?s=${encodeURIComponent(seedPhrase)}`,
    `"${seedPhrase}" has matured. It's ready to be heard. Find it at /seed-whisper`,
    `Your words have grown roots: "${seedPhrase}". They've reached the deeper parts. Follow them at /beneath`,
    `The seed speaks now. "${seedPhrase}" has become more than words. Visit /fruit to see what grew.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

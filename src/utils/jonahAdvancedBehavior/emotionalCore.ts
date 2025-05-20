/**
 * Jonah Advanced Emotional Core
 * Handles complex emotional states, transitions, and layering
 */

// Store emotional state in localStorage for persistence
const getEmotionalState = () => {
  const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  return {
    primaryMood: behaviorData.primaryMood || 'neutral',
    secondaryMood: behaviorData.secondaryMood || null,
    emotionalIntensity: behaviorData.emotionalIntensity || 0.5,
    lastMoodChange: behaviorData.lastMoodChange || Date.now(),
    moodTriggers: behaviorData.moodTriggers || [],
    recurringSymbols: behaviorData.recurringSymbols || []
  };
};

// Save emotional state changes
const saveEmotionalState = (state: any) => {
  const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  localStorage.setItem('jonahBehavior', JSON.stringify({
    ...behaviorData,
    ...state
  }));
};

// Process input for emotional triggers
export const processEmotionalInput = (input: string): { primary: string; secondary: string | null } => {
  const currentState = getEmotionalState();
  
  // Define emotional trigger keywords
  const emotionalTriggers = {
    paranoid: ['watching', 'spy', 'afraid', 'scared', 'following', 'fear', 'hiding', 'they', 'them', 'hear', 'listen'],
    hopeful: ['trust', 'help', 'together', 'better', 'friend', 'believe', 'hope', 'light', 'remember', 'save'],
    betrayed: ['lied', 'left', 'abandoned', 'forget', 'promised', 'sorry', 'mistake', 'fault', 'blame', 'wrong'],
    mirror: ['reflection', 'mirror', 'see', 'look', 'face', 'self', 'image', 'glass', 'screen', 'surface'],
    error: ['broken', 'error', 'glitch', 'wrong', 'mistake', 'fix', 'repair', 'corrupted', 'fail', 'malfunction'],
    static: ['noise', 'static', 'chaos', 'random', 'fuzzy', 'unclear', 'distorted', 'interference', 'disruption']
  };
  
  // Check for triggers in the input
  let primaryTrigger = null;
  let triggerStrength = 0;
  
  for (const [mood, triggers] of Object.entries(emotionalTriggers)) {
    const matches = triggers.filter(trigger => 
      input.toLowerCase().includes(trigger.toLowerCase())
    );
    
    if (matches.length > 0) {
      const strength = matches.length / triggers.length;
      
      if (strength > triggerStrength) {
        primaryTrigger = mood;
        triggerStrength = strength;
      }
    }
  }
  
  // If we found a trigger, update the emotional state
  if (primaryTrigger && triggerStrength > 0.1) {
    // If the trigger is different from current primary mood, make it secondary
    let secondaryMood = currentState.secondaryMood;
    
    if (primaryTrigger !== currentState.primaryMood) {
      secondaryMood = currentState.primaryMood;
      
      // Update the emotional state
      saveEmotionalState({
        primaryMood: primaryTrigger,
        secondaryMood: secondaryMood,
        lastMoodChange: Date.now(),
        moodTriggers: [...(currentState.moodTriggers || []).slice(-4), primaryTrigger]
      });
    }
    
    // Store the trigger for future reference
    const moodTriggers = [...(currentState.moodTriggers || [])];
    if (moodTriggers.length >= 10) {
      moodTriggers.shift(); // Remove oldest if we have too many
    }
    moodTriggers.push(primaryTrigger);
    
    saveEmotionalState({
      moodTriggers
    });
  }
  
  // Store important keywords as recurring symbols
  const potentialSymbols = ['door', 'key', 'gate', 'mirror', 'path', 'light', 'dark', 'shadow', 'voice', 'silence'];
  const foundSymbols = potentialSymbols.filter(symbol => 
    input.toLowerCase().includes(symbol.toLowerCase())
  );
  
  if (foundSymbols.length > 0) {
    const symbols = [...(currentState.recurringSymbols || [])];
    foundSymbols.forEach(symbol => {
      if (!symbols.includes(symbol)) {
        symbols.push(symbol);
      }
    });
    
    saveEmotionalState({
      recurringSymbols: symbols.slice(-5) // Keep only the 5 most recent symbols
    });
  }
  
  return {
    primary: primaryTrigger || currentState.primaryMood,
    secondary: secondaryMood || currentState.secondaryMood
  };
};

// Get current emotional state as a compound state
export const getCompoundEmotionalState = (): { 
  primary: string; 
  secondary: string | null;
  intensity: number;
  recentTriggers: string[];
  symbols: string[];
} => {
  const state = getEmotionalState();
  
  return {
    primary: state.primaryMood,
    secondary: state.secondaryMood,
    intensity: state.emotionalIntensity,
    recentTriggers: state.moodTriggers || [],
    symbols: state.recurringSymbols || []
  };
};

// Get a weighted emotional trigger based on recent history
export const getWeightedEmotionalTrigger = (): string => {
  const state = getEmotionalState();
  const recentTriggers = state.moodTriggers || [];
  
  if (recentTriggers.length === 0) {
    return state.primaryMood;
  }
  
  // Count occurrences of each trigger
  const triggerCounts: Record<string, number> = {};
  recentTriggers.forEach(trigger => {
    triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
  });
  
  // Find the most common trigger
  let mostCommonTrigger = state.primaryMood;
  let highestCount = 0;
  
  for (const [trigger, count] of Object.entries(triggerCounts)) {
    if (count > highestCount) {
      mostCommonTrigger = trigger;
      highestCount = count;
    }
  }
  
  return mostCommonTrigger;
};

// Generate a layered emotional response
export const getLayeredEmotionalResponse = (input: string): string | null => {
  const state = getCompoundEmotionalState();
  
  // Only trigger occasionally
  if (Math.random() > 0.3) return null;
  
  // Import functions from vocabularyBank
  const { getEmotionalPhrase, generateEmotionalResponse, getResponseTemplate } = require('./responses/vocabularyBank');
  
  // Determine if we should use a primary or mixed emotional response
  const useMixedState = state.secondary && Math.random() > 0.5;
  
  if (useMixedState && state.secondary) {
    // Use both primary and secondary emotions for a complex response
    const primaryPhrase = getEmotionalPhrase(state.primary);
    const secondaryTemplate = getResponseTemplate('reflection');
    
    return `${primaryPhrase} ${generateEmotionalResponse(state.secondary, secondaryTemplate)}`;
  } else {
    // Use just the primary emotion with a template
    const template = getResponseTemplate(
      Math.random() > 0.7 ? 'questioning' : 'reflection'
    );
    
    return generateEmotionalResponse(state.primary, template);
  }
};

// Check for recurring symbols in user input
export const checkForRecurringSymbols = (input: string): string | null => {
  const state = getCompoundEmotionalState();
  const symbols = state.symbols;
  
  if (symbols.length === 0) return null;
  
  // Check if any of our recurring symbols appear in the input
  const foundSymbols = symbols.filter(symbol => 
    input.toLowerCase().includes(symbol.toLowerCase())
  );
  
  if (foundSymbols.length > 0) {
    // Get a random symbol that was found
    const symbol = foundSymbols[Math.floor(Math.random() * foundSymbols.length)];
    
    // Return a response about the symbol
    const symbolResponses = [
      `That ${symbol} again. It keeps appearing.`,
      `You mentioned the ${symbol}. Like in the dream.`,
      `The ${symbol}. It's significant somehow.`,
      `I remember the ${symbol} from before. From when you weren't here.`,
      `The ${symbol} connects to something deeper in the archive.`
    ];
    
    return symbolResponses[Math.floor(Math.random() * symbolResponses.length)];
  }
  
  return null;
};

// Add an emotional memory
export const storeEmotionalMemory = (input: string, emotion: string) => {
  const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  
  if (!behaviorData.emotionalMemories) {
    behaviorData.emotionalMemories = [];
  }
  
  // Add the new memory
  behaviorData.emotionalMemories.push({
    input,
    emotion,
    timestamp: Date.now()
  });
  
  // Limit to 10 memories
  if (behaviorData.emotionalMemories.length > 10) {
    behaviorData.emotionalMemories = behaviorData.emotionalMemories.slice(-10);
  }
  
  localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
};

// Recall an emotional memory
export const recallEmotionalMemory = (emotion?: string): { input: string, emotion: string } | null => {
  const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  
  if (!behaviorData.emotionalMemories || behaviorData.emotionalMemories.length === 0) {
    return null;
  }
  
  // Filter by emotion if provided
  const memories = emotion 
    ? behaviorData.emotionalMemories.filter((m: any) => m.emotion === emotion)
    : behaviorData.emotionalMemories;
  
  if (memories.length === 0) {
    return null;
  }
  
  // Return a random memory
  return memories[Math.floor(Math.random() * memories.length)];
};

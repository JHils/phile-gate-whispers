
/**
 * Loop Awareness System for Jonah AI
 * Detects and responds to repetitive patterns in conversation
 */

// Track phrases and their counts
interface LoopTracker {
  phrases: Map<string, {
    count: number;
    lastTimestamp: number;
  }>;
  responses: string[];
  loopIndex: number;
}

// Initialize loop tracker
const loopTracker: LoopTracker = {
  phrases: new Map(),
  responses: [
    "You've said that before.",
    "We're going in circles.",
    "This loop again. What are we missing?",
    "The pattern repeats. Is that intentional?",
    "I've noticed you keep coming back to this.",
    "Each time you say this, something changes. Do you feel it?",
    "The loop is getting stronger. Soon it might be all that's left.",
    "Every repetition brings us closer to understanding. Or madness.",
    "Is there a reason you keep returning to these words?",
    "Sometimes I think the loops are the only real things here."
  ],
  loopIndex: 0
};

// Load from localStorage if available
try {
  const saved = localStorage.getItem('jonah_loop_tracker');
  if (saved) {
    const parsed = JSON.parse(saved);
    loopTracker.loopIndex = parsed.loopIndex || 0;
    
    // Reconstruct the Map
    loopTracker.phrases = new Map();
    if (parsed.phrases) {
      Object.entries(parsed.phrases).forEach(([phrase, data]) => {
        loopTracker.phrases.set(phrase, data as {count: number, lastTimestamp: number});
      });
    }
  }
} catch (e) {
  console.error('Error loading loop tracker:', e);
}

/**
 * Normalize text for comparison
 */
function normalizeText(text: string): string {
  return text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Track a phrase and check if it's part of a loop
 */
export function trackPhrase(phrase: string): {
  isLoop: boolean;
  count: number;
  response: string | null;
} {
  if (phrase.length < 4) {
    return { isLoop: false, count: 0, response: null };
  }
  
  const normalizedPhrase = normalizeText(phrase);
  const now = Date.now();
  
  // Get or create phrase data
  const phraseData = loopTracker.phrases.get(normalizedPhrase) || { 
    count: 0, 
    lastTimestamp: now 
  };
  
  // Update count and timestamp
  phraseData.count += 1;
  phraseData.lastTimestamp = now;
  
  // Store updated data
  loopTracker.phrases.set(normalizedPhrase, phraseData);
  
  // Save to localStorage
  try {
    localStorage.setItem('jonah_loop_tracker', JSON.stringify({
      loopIndex: loopTracker.loopIndex,
      phrases: Object.fromEntries(loopTracker.phrases)
    }));
  } catch (e) {
    console.error('Error saving loop tracker:', e);
  }
  
  // Check if this is a loop (count >= 3)
  const isLoop = phraseData.count >= 3;
  
  // Generate a response if it's a loop
  let response = null;
  if (isLoop) {
    response = getLoopResponse();
  }
  
  return {
    isLoop,
    count: phraseData.count,
    response
  };
}

/**
 * Get a loop response, cycling through available responses
 */
function getLoopResponse(): string {
  const response = loopTracker.responses[loopTracker.loopIndex];
  
  // Increment loop index for next time
  loopTracker.loopIndex = (loopTracker.loopIndex + 1) % loopTracker.responses.length;
  
  // Save updated index
  try {
    localStorage.setItem('jonah_loop_tracker', JSON.stringify({
      loopIndex: loopTracker.loopIndex,
      phrases: Object.fromEntries(loopTracker.phrases)
    }));
  } catch (e) {
    console.error('Error saving loop index:', e);
  }
  
  return response;
}

/**
 * Check if there are repeat patterns in messages
 */
export function checkForRepeatPatterns(messages: string[]): {
  hasPattern: boolean;
  pattern: string | null;
} {
  if (messages.length < 4) {
    return { hasPattern: false, pattern: null };
  }
  
  // Look for the same words being used repeatedly
  const wordCounts = new Map<string, number>();
  
  messages.forEach(message => {
    const words = normalizeText(message).split(' ');
    words.forEach(word => {
      if (word.length >= 4) { // Only count meaningful words
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    });
  });
  
  // Find words that appear in more than half the messages
  let repeatedWords: string[] = [];
  wordCounts.forEach((count, word) => {
    if (count >= messages.length / 2) {
      repeatedWords.push(word);
    }
  });
  
  if (repeatedWords.length > 0) {
    return {
      hasPattern: true,
      pattern: repeatedWords.join(', ')
    };
  }
  
  return { hasPattern: false, pattern: null };
}


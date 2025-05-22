
/**
 * Fuzzy story matching system for Jonah AI
 * Helps match user input to appropriate narrative paths
 */

// Initialize fuzzy story matching system
export function initializeFuzzyStoryMatching(): void {
  // Initialize story patterns if needed
  if (!localStorage.getItem('jonah_story_patterns')) {
    localStorage.setItem('jonah_story_patterns', JSON.stringify({
      mirror: ['reflection', 'double', 'looking glass', 'self', 'doppelganger'],
      gate: ['entrance', 'portal', 'doorway', 'threshold', 'passage'],
      echo: ['repeat', 'resonate', 'reverberate', 'bounce', 'mirror sound'],
      memory: ['remember', 'forget', 'past', 'recollection', 'nostalgia'],
      reality: ['simulation', 'real', 'false', 'perception', 'existence']
    }));
  }
}

// Match input text to story pattern
export function matchStoryPattern(input: string): string | null {
  try {
    const patterns = JSON.parse(localStorage.getItem('jonah_story_patterns') || '{}');
    const lowerInput = input.toLowerCase();
    
    for (const [pattern, keywords] of Object.entries(patterns)) {
      for (const keyword of keywords as string[]) {
        if (lowerInput.includes(keyword)) {
          return pattern;
        }
      }
    }
    
    return null;
  } catch (e) {
    console.error('Error matching story pattern:', e);
    return null;
  }
}

// Add a new pattern match
export function addStoryPattern(pattern: string, keywords: string[]): void {
  try {
    const patterns = JSON.parse(localStorage.getItem('jonah_story_patterns') || '{}');
    patterns[pattern] = keywords;
    localStorage.setItem('jonah_story_patterns', JSON.stringify(patterns));
  } catch (e) {
    console.error('Error adding story pattern:', e);
  }
}

// Get matching confidence score
export function getMatchConfidence(input: string, pattern: string): number {
  try {
    const patterns = JSON.parse(localStorage.getItem('jonah_story_patterns') || '{}');
    const lowerInput = input.toLowerCase();
    let matches = 0;
    
    if (patterns[pattern]) {
      for (const keyword of patterns[pattern] as string[]) {
        if (lowerInput.includes(keyword)) {
          matches++;
        }
      }
    }
    
    return matches / (patterns[pattern]?.length || 1);
  } catch (e) {
    console.error('Error getting match confidence:', e);
    return 0;
  }
}

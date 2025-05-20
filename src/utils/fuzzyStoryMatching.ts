
/**
 * Jonah's Fuzzy Story Matching System
 * Matches user queries to story elements with fuzzy matching
 */

// Initialize the story matching system
export function initializeFuzzyStoryMatching(): void {
  if (typeof window !== 'undefined') {
    // Create global function for story query processing
    window.processStoryQuery = (query: string): string => {
      return matchStoryQuery(query);
    };
  }
}

// Match a user query to available story content
export function matchStoryQuery(query: string): string {
  if (!query) return "I don't know if I can answer that. The archive is incomplete.";
  
  // Normalize query
  const normalizedQuery = query.toLowerCase();
  
  // Check for exact matches first
  const exactMatch = findExactStoryMatch(normalizedQuery);
  if (exactMatch) return exactMatch;
  
  // Then try fuzzy matching
  const fuzzyMatch = findFuzzyStoryMatch(normalizedQuery);
  if (fuzzyMatch) return fuzzyMatch;
  
  // If no match found
  return "I don't know if I can answer that. The archive is incomplete.";
}

// Process story query (exported for external use)
export function processStoryQuery(query: string): string {
  return matchStoryQuery(query);
}

// Find exact matches in story database
function findExactStoryMatch(normalizedQuery: string): string | null {
  // Story response mapping - exact matches
  const storyMatches: Record<string, string> = {
    "who is jonah": "Jonah was a researcher. He was stationed on Magnetic Island during the incident.",
    "what happened to jonah": "Records suggest he disappeared during the timeline collapse.",
    "who is joseph": "Joseph Hilson was the lead developer of the Timeline Platform. His sister went missing.",
    "who is joseph hilson": "Joseph created the system that monitors timeline stability. He's been searching for his sister.",
    "what is the gate": "The Gate is a passage between timelines. It's unstable since the fracture event.",
    "what is magnetic island": "Magnetic Island is where the first stable Gate was established. Something happened there.",
    "what is the timeline": "Our reality is one of many branching timelines. Some are stable, others are not.",
    "what is the timeline platform": "Technology developed by Joseph Hilson to monitor timeline stability and track anomalies.",
    "who are the philes": "Individuals who have access to information about the timelines and the Gate."
  };
  
  // Check for exact match
  return storyMatches[normalizedQuery] || null;
}

// Find fuzzy matches based on keywords
function findFuzzyStoryMatch(normalizedQuery: string): string | null {
  // Keyword to response mapping - fuzzy matches
  const keywordMatches: Record<string, string[]> = {
    "jonah": [
      "Jonah's logs became increasingly erratic near the end.",
      "Some believe Jonah is still alive, but in another timeline.",
      "Jonah reported seeing his reflection move independently."
    ],
    "joseph": [
      "Joseph hasn't slept properly since the incident.",
      "Joseph built the Timeline Platform after his sister disappeared.",
      "Only Joseph knows the full extent of the timeline fractures."
    ],
    "mirror": [
      "Mirrors sometimes show reflections from other timelines.",
      "Some report seeing Jonah's face in mirrors briefly.",
      "Joseph avoids mirrors since the incident."
    ],
    "timeline": [
      "Our timeline's stability rating is concerning.",
      "Timeline collapses are preceded by increasing anomalies.",
      "Some timelines have diverged so far they're unrecognizable."
    ],
    "gate": [
      "The Gate was never meant to be permanent.",
      "Multiple Gate structures exist, but most are inactive.",
      "Gate technology is based on principles we don't fully understand."
    ],
    "magnetic": [
      "Magnetic anomalies were the first sign of the fracture.",
      "Magnetic Island's name became eerily appropriate after the incident.",
      "The magnetic fields around the island altered after the Gate opened."
    ]
  };
  
  // Check for keyword matches
  for (const [keyword, responses] of Object.entries(keywordMatches)) {
    if (normalizedQuery.includes(keyword)) {
      // Return a random response from the matching keyword's responses
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return null;
}

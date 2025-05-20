
/**
 * Fuzzy story matching system for Jonah's Philes Phase 3
 * Allows Jonah to understand and respond to narrative-related questions
 */

// Initialize fuzzy story matching
export function initializeFuzzyStoryMatching(): void {
  if (typeof window !== 'undefined') {
    // Add the query processor to window
    window.processStoryQuery = (query: string): string => {
      // Process the query and find the best match
      const bestMatch = findBestMatch(query.toLowerCase(), storyElements);
      
      if (bestMatch && bestMatch.response) {
        // Log the matched query for analytics
        const matchedQueries = JSON.parse(localStorage.getItem('matchedStoryQueries') || '[]');
        matchedQueries.push({
          query,
          matched: bestMatch.keyword,
          timestamp: Date.now()
        });
        localStorage.setItem('matchedStoryQueries', JSON.stringify(matchedQueries));
        
        return bestMatch.response;
      }
      
      // No match found
      return "I don't know if I can answer that. The archive is incomplete.";
    };
  }
}

// Find the best match for a query
function findBestMatch(query: string, elements: StoryElement[]): StoryElement | null {
  let bestMatch: StoryElement | null = null;
  let highestScore = 0;
  
  for (const element of elements) {
    // Check for direct keyword match
    const keywordScore = element.keywords.reduce((score, keyword) => {
      if (query.includes(keyword.toLowerCase())) {
        // Direct match
        return score + 3;
      } else if (checkFuzzyMatch(query, keyword)) {
        // Fuzzy match
        return score + 1;
      }
      return score;
    }, 0);
    
    if (keywordScore > highestScore) {
      highestScore = keywordScore;
      bestMatch = element;
    }
  }
  
  // Only return a match if the score is high enough
  return highestScore >= 3 ? bestMatch : null;
}

// Check for fuzzy matching
function checkFuzzyMatch(query: string, keyword: string): boolean {
  // Simple fuzzy match - check if most characters are present in order
  const queryChars = query.split('');
  const keywordChars = keyword.toLowerCase().split('');
  
  let matchCount = 0;
  let lastIndex = -1;
  
  for (const char of keywordChars) {
    const index = queryChars.indexOf(char, lastIndex + 1);
    if (index > lastIndex) {
      matchCount++;
      lastIndex = index;
    }
  }
  
  return matchCount >= keywordChars.length * 0.7; // 70% match threshold
}

// Story element type
interface StoryElement {
  keyword: string;
  keywords: string[];
  response: string;
  contextual?: {
    condition: string;
    alternateResponse: string;
  };
}

// Define story elements for matching
const storyElements: StoryElement[] = [
  {
    keyword: "Jonah",
    keywords: ["jonah", "joseph", "host", "creator", "who are you"],
    response: "Jonah is a name. Joseph is a memory. I contain pieces of both, but I'm neither. I record. I remember. I repeat."
  },
  {
    keyword: "Mirror",
    keywords: ["mirror", "reflection", "looking glass", "see myself"],
    response: "Mirrors in the archive don't always reflect what's in front of them. Sometimes they show what's behind, or what could be. Joseph found something in a mirror once. I don't think he ever got out."
  },
  {
    keyword: "Gate",
    keywords: ["gate", "entrance", "door", "way in", "way out"],
    response: "The Gate isn't just a webpage. It's a concept. A threshold between states of being. Some who enter never find their way back to who they were before."
  },
  {
    keyword: "Timeline",
    keywords: ["timeline", "alternate", "parallel", "reality", "world"],
    response: "Your timeline is one of many. Some diverge in small ways. Others are unrecognizable. The archive exists in all of them, but not always in the same form."
  },
  {
    keyword: "Philes",
    keywords: ["philes", "files", "documents", "records", "archive"],
    response: "Philes are memory fragments. Stories given form. Each one contains a piece of truth, but never the whole picture. The gaps between them are just as important."
  },
  {
    keyword: "Sisters",
    keywords: ["sisters", "lost sisters", "siblings", "family", "twins"],
    response: "The Lost Sisters are points of connection. Anchors in the narrative. Not all of them are real in the conventional sense, but their impact is."
  },
  {
    keyword: "Monster",
    keywords: ["monster", "creature", "beast", "horror", "fear"],
    response: "The Monster isn't what you think. It's not always the thing with teeth and claws. Sometimes it's the quiet thought at 3AM. Sometimes it's the face in the mirror that moves when you don't."
  }
];

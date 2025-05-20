
import { toast } from '@/components/ui/use-toast';

// Define story keywords for fuzzy matching
type StoryTags = {
  themes: string[];
  locations: string[];
  characters: string[];
  titles: string[];
};

// Common Aboriginal stories and their metadata for fuzzy matching
const storyDatabase: Record<string, StoryTags> = {
  'rainbowSerpent': {
    themes: ['creation', 'water', 'rivers', 'lakes', 'rain', 'snake', 'serpent'],
    locations: ['australia', 'arnhem land', 'northern territory', 'kimberley'],
    characters: ['rainbow serpent', 'great snake', 'creator being'],
    titles: ['rainbow serpent', 'the rainbow serpent']
  },
  'sevenSisters': {
    themes: ['stars', 'sky', 'chase', 'women', 'escape', 'constellation'],
    locations: ['western desert', 'great victoria desert', 'central australia'],
    characters: ['seven sisters', 'orion', 'hunter', 'nyiru', 'pleiades'],
    titles: ['seven sisters', 'the seven sisters', 'pleiades']
  },
  'tiddalick': {
    themes: ['water', 'drought', 'greed', 'laughter', 'frog'],
    locations: ['eastern australia', 'new south wales', 'victoria'],
    characters: ['tiddalick', 'giant frog', 'eel'],
    titles: ['tiddalick', 'tiddalick the frog']
  },
  'wandjina': {
    themes: ['rain', 'clouds', 'weather', 'spirits', 'creation', 'paintings'],
    locations: ['kimberley', 'northwest australia'],
    characters: ['wandjina', 'cloud spirits', 'rain makers'],
    titles: ['wandjina', 'the wandjina', 'cloud spirits']
  },
  'barramundi': {
    themes: ['fish', 'hunting', 'escape', 'transformation', 'water'],
    locations: ['northern australia', 'queensland', 'arnhem land'],
    characters: ['barramundi', 'hunter', 'fish'],
    titles: ['barramundi', 'the barramundi', 'first barramundi']
  }
};

/**
 * Process natural language query and match it to known stories
 * @param query User's natural language query about stories
 * @returns The matched story key or null if no match found
 */
export function matchStoryQuery(query: string): string | null {
  if (!query) return null;
  
  // Normalize query
  const normalizedQuery = query.toLowerCase().trim();
  
  // Direct title matches take precedence
  for (const [storyKey, storyData] of Object.entries(storyDatabase)) {
    if (storyData.titles.some(title => normalizedQuery.includes(title.toLowerCase()))) {
      return storyKey;
    }
  }
  
  // Check for location mentions - "tell me a story from X"
  let locationMatch: string | null = null;
  for (const [storyKey, storyData] of Object.entries(storyDatabase)) {
    if (storyData.locations.some(location => normalizedQuery.includes(location.toLowerCase()))) {
      locationMatch = storyKey;
      // Don't return immediately, continue checking for more specific matches
    }
  }
  
  // Check for theme mentions - "tell me a story about X"
  let themeMatches: string[] = [];
  for (const [storyKey, storyData] of Object.entries(storyDatabase)) {
    if (storyData.themes.some(theme => normalizedQuery.includes(theme.toLowerCase()))) {
      themeMatches.push(storyKey);
    }
  }
  
  // Character mentions
  let characterMatch: string | null = null;
  for (const [storyKey, storyData] of Object.entries(storyDatabase)) {
    if (storyData.characters.some(character => normalizedQuery.includes(character.toLowerCase()))) {
      characterMatch = storyKey;
      // Found direct character match, return it
      return characterMatch;
    }
  }
  
  // Prioritize matches:
  // 1. Character match (already returned above if found)
  // 2. Multiple theme matches - return the first one for now
  // 3. Location match
  if (themeMatches.length > 0) {
    return themeMatches[0];
  }
  
  if (locationMatch) {
    return locationMatch;
  }
  
  // Check for general story request
  const generalStoryRequest = normalizedQuery.includes('story') || 
                            normalizedQuery.includes('tell me') ||
                            normalizedQuery.includes('aboriginal') ||
                            normalizedQuery.includes('dreamtime');
                              
  if (generalStoryRequest) {
    // Pick a random story if it's a general request
    const storyKeys = Object.keys(storyDatabase);
    return storyKeys[Math.floor(Math.random() * storyKeys.length)];
  }
  
  // No match found
  return null;
}

/**
 * Get story content based on story key
 * @param storyKey The key of the story to retrieve
 * @returns Story content or empty string if not found
 */
export function getStoryContent(storyKey: string): string {
  // Story content would ideally come from a database
  // This is placeholder content
  const storyContent: Record<string, string> = {
    'rainbowSerpent': 'In the Dreamtime, the Rainbow Serpent slept beneath the ground. When she awoke, she pushed through the earth, creating mountains and valleys. As she traveled, water filled her tracks, forming rivers and lakes. She called to the frogs to come out, and as they emerged, water spilled from their mouths, filling the world with life.',
    'sevenSisters': 'Seven sisters were being pursued by Nyiru, a man who desired one of them. They fled across the land until they could go no further. To escape, they rose into the sky where they became the stars of the Pleiades constellation. Nyiru followed, becoming the constellation Orion, forever chasing but never catching them.',
    'tiddalick': 'Tiddalick was a greedy frog who, one day, drank all the water in the world. The other creatures were desperate with thirst. They tried to make Tiddalick laugh so he would release the water. Finally, the eel twisted himself into funny shapes, causing Tiddalick to burst out laughing. All the water flowed back into the rivers and lakes.',
    'wandjina': 'The Wandjina are cloud and rain spirits who created the landscape and its inhabitants. When they finished creation, they painted their images on cave walls and turned themselves into clouds. Their images show them with large eyes and no mouths, for if they had mouths, the rain would never stop.',
    'barramundi': 'Long ago, a barramundi fish was caught in a net after swimming too close to a village. Breaking free, it leapt over the rocks, scraping off its silvery scales. These scales turned into the first diamonds, which is why the barramundi still has silvery skin and why diamonds can be found among the rocks where it escaped.'
  };
  
  return storyContent[storyKey] || '';
}

/**
 * Process story query and return appropriate story content
 * @param query User's natural language query about stories
 * @returns Matched story content or guidance message
 */
export function processStoryQuery(query: string): string {
  const matchedStory = matchStoryQuery(query);
  
  if (matchedStory) {
    return getStoryContent(matchedStory);
  } else {
    return "I know many stories from the Dreamtime. You can ask about the Rainbow Serpent, Seven Sisters, Tiddalick, Wandjina, or the Barramundi.";
  }
}

/**
 * Setup story matching and console handlers
 */
export function initializeFuzzyStoryMatching(): void {
  if (window.processStoryQuery) return; // Already initialized
  
  // Add to global scope for console access
  window.processStoryQuery = processStoryQuery;
  
  // Add console command
  window.dreamtime = function(query: string = '') {
    if (!query) {
      console.log("%cTry asking about a specific story or region. For example: dreamtime('arnhem land') or dreamtime('water story')", "color: var(--color-console)");
      return "Waiting for your question about the Dreamtime...";
    }
    
    const storyContent = processStoryQuery(query);
    console.log(`%c${storyContent}`, "color: var(--color-accent); font-style: italic;");
    
    // Add to JonahConsole tracking if available
    if (window.JonahConsole) {
      if (!window.JonahConsole.usedCommands.includes('dreamtime')) {
        window.JonahConsole.usedCommands.push('dreamtime');
      }
    }
    
    return "Story shared from the Dreamtime.";
  };
}

// Add to window interface
declare global {
  interface Window {
    processStoryQuery?: (query: string) => string;
    dreamtime?: (query?: string) => string;
  }
}

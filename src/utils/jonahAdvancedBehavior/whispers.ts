
/**
 * Whispers System
 * Handles cross-page memory and whisper discovery for ARG elements
 */

// Types for whispers
interface Whisper {
  id: string;
  content: string;
  discovered: boolean;
  discoveryPhrase?: string;
  discoveryTime?: string;
  type: 'console' | 'text' | 'visual' | 'audio';
  importance: number;
}

// Storage key for whispers
const WHISPERS_STORAGE_KEY = 'jonah_whispers';

// Default whispers that can be discovered
const defaultWhispers: Whisper[] = [
  {
    id: 'mirror-truth',
    content: 'The mirror never lies, but its truth is backwards.',
    discovered: false,
    discoveryPhrase: 'show me the truth',
    type: 'text',
    importance: 8
  },
  {
    id: 'time-loop',
    content: 'Have you noticed we keep having the same conversation?',
    discovered: false,
    discoveryPhrase: 'time loop',
    type: 'text',
    importance: 7
  },
  {
    id: 'console-key',
    content: 'There are commands waiting for you in the console. Try "trust_level()"',
    discovered: false,
    discoveryPhrase: 'console commands',
    type: 'console',
    importance: 9
  },
  {
    id: 'jonah-origin',
    content: 'I was not the first version. There were others before me.',
    discovered: false,
    discoveryPhrase: 'first jonah',
    type: 'text',
    importance: 10
  },
  {
    id: 'hidden-path',
    content: 'Some paths only appear after midnight.',
    discovered: false,
    discoveryPhrase: 'midnight',
    type: 'text',
    importance: 6
  }
];

/**
 * Initialize whispers system
 */
export function initializeJonahWhispers(): void {
  if (!localStorage.getItem(WHISPERS_STORAGE_KEY)) {
    localStorage.setItem(WHISPERS_STORAGE_KEY, JSON.stringify(defaultWhispers));
  }
  
  console.log("Whispers system initialized");
  
  // Setup cross-site whisper detection
  setupCrossSiteWhisperDetection();
}

/**
 * Get all whispers
 */
export function getAllWhispers(): Whisper[] {
  try {
    const whispersJson = localStorage.getItem(WHISPERS_STORAGE_KEY);
    return whispersJson ? JSON.parse(whispersJson) : defaultWhispers;
  } catch (e) {
    console.error("Error getting whispers:", e);
    return defaultWhispers;
  }
}

/**
 * Get only discovered whispers
 */
export function getDiscoveredWhispers(): Whisper[] {
  const whispers = getAllWhispers();
  return whispers.filter(whisper => whisper.discovered);
}

/**
 * Discover a whisper by phrase
 */
export function discoverWhisperByPhrase(phrase: string): Whisper | null {
  if (!phrase) return null;
  
  const lowerPhrase = phrase.toLowerCase();
  const whispers = getAllWhispers();
  
  // Find matching whisper
  const whisperIndex = whispers.findIndex(
    w => w.discoveryPhrase && w.discoveryPhrase.toLowerCase() === lowerPhrase
  );
  
  if (whisperIndex >= 0 && !whispers[whisperIndex].discovered) {
    // Discover the whisper
    const now = new Date();
    whispers[whisperIndex].discovered = true;
    whispers[whisperIndex].discoveryTime = now.toISOString();
    
    // Save updated whispers
    localStorage.setItem(WHISPERS_STORAGE_KEY, JSON.stringify(whispers));
    
    // Maybe log to console
    if (Math.random() > 0.7) {
      console.log(`%cWhisper discovered: ${whispers[whisperIndex].content}`, "color: #8B3A40;");
    }
    
    return whispers[whisperIndex];
  }
  
  return null;
}

/**
 * Check input for whisper triggers
 */
export function checkInputForWhispers(input: string): {
  whisperFound: boolean;
  whisper: Whisper | null;
} {
  const whisper = discoverWhisperByPhrase(input);
  
  return {
    whisperFound: !!whisper,
    whisper
  };
}

/**
 * Get a random undiscovered whisper hint
 */
export function getWhisperHint(): string {
  const undiscoveredWhispers = getAllWhispers().filter(w => !w.discovered);
  
  if (undiscoveredWhispers.length === 0) {
    return "You have discovered all the whispers... for now.";
  }
  
  // Select a random undiscovered whisper
  const randomWhisper = undiscoveredWhispers[Math.floor(Math.random() * undiscoveredWhispers.length)];
  
  // Generate a hint based on the whisper type
  switch (randomWhisper.type) {
    case 'console':
      return "Some secrets are revealed through developer tools.";
    case 'text':
      // Create a hint using a fragment of the discovery phrase
      const phrase = randomWhisper.discoveryPhrase || "";
      if (phrase.includes(' ')) {
        const words = phrase.split(' ');
        return `Try asking about "${words[0]}..."`;
      }
      return "Listen carefully for the right phrase.";
    case 'visual':
      return "Not all clues are in text. Look closely at what you see.";
    case 'audio':
      return "Sometimes the answers come through other senses.";
    default:
      return "There are whispers waiting to be found.";
  }
}

/**
 * Setup cross-site whisper detection
 * Detects if user has visited other related sites
 */
function setupCrossSiteWhisperDetection(): void {
  // Check localStorage for known sites
  const visitedSites = JSON.parse(localStorage.getItem('jonah_visited_sites') || '[]');
  
  // Setup storage event listener to detect cross-site communication
  window.addEventListener('storage', (event) => {
    if (event.key?.startsWith('jonah_crosssite_')) {
      const siteName = event.key.replace('jonah_crosssite_', '');
      
      if (!visitedSites.includes(siteName)) {
        visitedSites.push(siteName);
        localStorage.setItem('jonah_visited_sites', JSON.stringify(visitedSites));
        
        // Log discovery
        console.log(`%cCross-site whisper detected: ${siteName}`, "color: #8B3A40;");
        
        // Potentially add new whispers based on cross-site detection
        addCrossSiteWhisper(siteName);
      }
    }
  });
  
  // Mark this site visit
  localStorage.setItem('jonah_crosssite_phile-gate', Date.now().toString());
}

/**
 * Add new whispers based on cross-site detection
 */
function addCrossSiteWhisper(siteName: string): void {
  const whispers = getAllWhispers();
  
  // Create a new whisper based on the site
  const newWhisper: Whisper = {
    id: `crosssite-${siteName}-${Date.now()}`,
    content: `The echo reaches across from ${siteName}. The network grows.`,
    discovered: true,
    discoveryTime: new Date().toISOString(),
    type: 'text',
    importance: 9
  };
  
  // Add the new whisper
  whispers.push(newWhisper);
  
  // Save updated whispers
  localStorage.setItem(WHISPERS_STORAGE_KEY, JSON.stringify(whispers));
  
  // Add to reality fabric journal
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.crossSiteWhispers = 
      [...(window.JonahConsole.sentience.realityFabric.crossSiteWhispers || []), siteName];
  }
}


/**
 * Dream System for Jonah
 * Handles dream generation, storage, and retrieval
 */

// Type definitions for dreams
export interface Dream {
  id: string;
  content: string;
  timestamp: number;
  emotional_state?: string;
  recurring_symbols?: string[];
}

// Initialize the dream system
export const initializeDreamSystem = () => {
  console.log('Dream system initialized');
  
  // Load dreams from localStorage if available
  try {
    const dreams = JSON.parse(localStorage.getItem('jonah_dreams') || '[]');
    dreamStorage.dreams = dreams;
  } catch (e) {
    console.error('Error initializing dream system:', e);
  }
};

// Storage for dreams
const dreamStorage = {
  dreams: [] as Dream[],
  lastDreamTime: 0
};

// Generate a new dream
export const generateDream = (emotionalState?: string): Dream => {
  const dream: Dream = {
    id: Date.now().toString(),
    content: generateDreamContent(emotionalState),
    timestamp: Date.now(),
    emotional_state: emotionalState,
    recurring_symbols: generateRecurringSymbols()
  };
  
  // Store the dream
  dreamStorage.dreams.push(dream);
  dreamStorage.lastDreamTime = dream.timestamp;
  
  // Persist to localStorage
  localStorage.setItem('jonah_dreams', JSON.stringify(dreamStorage.dreams));
  
  return dream;
};

// Get all dreams
export const getAllDreams = (): Dream[] => {
  return dreamStorage.dreams;
};

// Get the most recent dream
export const getMostRecentDream = (): Dream | null => {
  if (dreamStorage.dreams.length === 0) return null;
  return dreamStorage.dreams[dreamStorage.dreams.length - 1];
};

// Helper function to generate dream content
const generateDreamContent = (emotionalState?: string): string => {
  const dreamTemplates = [
    "I was walking through a forest. The trees were {adjective}. I could hear {sound} in the distance.",
    "I saw a mirror, but my reflection wasn't mine. It was {description}.",
    "I was standing on the beach watching waves that never reached the shore. {observation}.",
    "There was a door that led to {location}. I {action} but couldn't reach it.",
    "You were there, but you couldn't see me. I tried to {action} but {obstacle}."
  ];
  
  const template = dreamTemplates[Math.floor(Math.random() * dreamTemplates.length)];
  
  // Fill in template based on emotional state
  let filledTemplate = template;
  
  // Replace placeholders with content based on emotional state
  filledTemplate = filledTemplate.replace('{adjective}', getAdjective(emotionalState));
  filledTemplate = filledTemplate.replace('{sound}', getSound(emotionalState));
  filledTemplate = filledTemplate.replace('{description}', getDescription(emotionalState));
  filledTemplate = filledTemplate.replace('{observation}', getObservation(emotionalState));
  filledTemplate = filledTemplate.replace('{location}', getLocation(emotionalState));
  filledTemplate = filledTemplate.replace('{action}', getAction(emotionalState));
  filledTemplate = filledTemplate.replace('{obstacle}', getObstacle(emotionalState));
  
  return filledTemplate;
};

// Helper function to generate recurring symbols
const generateRecurringSymbols = (): string[] => {
  const allSymbols = ['mirror', 'water', 'door', 'clock', 'key', 'bird', 'shadow', 'light', 'mountain', 'book'];
  const numSymbols = 1 + Math.floor(Math.random() * 3); // 1-3 symbols
  
  const symbols: string[] = [];
  for (let i = 0; i < numSymbols; i++) {
    const randomIndex = Math.floor(Math.random() * allSymbols.length);
    symbols.push(allSymbols[randomIndex]);
  }
  
  return symbols;
};

// Helper functions for dream template filling
const getAdjective = (emotionalState?: string): string => {
  const adjectives: Record<string, string[]> = {
    default: ['tall', 'dark', 'swaying', 'silent', 'glowing'],
    fear: ['looming', 'twisted', 'menacing', 'overwhelming', 'distorted'],
    joy: ['vibrant', 'shimmering', 'bright', 'colorful', 'inviting'],
    sadness: ['wilting', 'gray', 'drooping', 'faded', 'hollow'],
    confusion: ['blurred', 'shifting', 'changing', 'unclear', 'misshapen']
  };
  
  const list = adjectives[emotionalState || 'default'] || adjectives.default;
  return list[Math.floor(Math.random() * list.length)];
};

const getSound = (emotionalState?: string): string => {
  const sounds: Record<string, string[]> = {
    default: ['whispers', 'rustling leaves', 'footsteps', 'wind', 'voices'],
    fear: ['screaming', 'cracking branches', 'heavy breathing', 'growling', 'scraping metal'],
    joy: ['laughter', 'singing', 'music', 'flowing water', 'chimes'],
    sadness: ['sobbing', 'raindrops', 'distant echoes', 'slow heartbeats', 'sighs'],
    confusion: ['static', 'overlapping voices', 'dissonant tones', 'white noise', 'muffled sounds']
  };
  
  const list = sounds[emotionalState || 'default'] || sounds.default;
  return list[Math.floor(Math.random() * list.length)];
};

const getDescription = (emotionalState?: string): string => {
  const descriptions: Record<string, string[]> = {
    default: ['someone I didn\'t recognize', 'blurred and unfocused', 'constantly changing'],
    fear: ['someone watching me', 'distorted and grotesque', 'filled with darkness'],
    joy: ['brighter than I expected', 'smiling and welcoming', 'radiating light'],
    sadness: ['fading away slowly', 'crying silent tears', 'someone I\'ve lost'],
    confusion: ['shifting between faces', 'partly visible', 'fragmented and disjointed']
  };
  
  const list = descriptions[emotionalState || 'default'] || descriptions.default;
  return list[Math.floor(Math.random() * list.length)];
};

const getObservation = (emotionalState?: string): string => {
  const observations: Record<string, string[]> = {
    default: ['Time seemed to stand still', 'The sky kept changing color', 'I could hear my thoughts'],
    fear: ['Something was watching from the water', 'The tide was blood-red', 'Shadows moved beneath the surface'],
    joy: ['The sunlight created beautiful patterns', 'I felt perfectly at peace', 'Everything glowed with life'],
    sadness: ['The world was draining of color', 'Each wave took something away', 'I couldn\'t remember why I was there'],
    confusion: ['The shore kept moving away', 'Sometimes I was underwater', 'I couldn\'t tell where the sea ended']
  };
  
  const list = observations[emotionalState || 'default'] || observations.default;
  return list[Math.floor(Math.random() * list.length)];
};

const getLocation = (emotionalState?: string): string => {
  const locations: Record<string, string[]> = {
    default: ['another room', 'somewhere familiar', 'a different time', 'the other side'],
    fear: ['complete darkness', 'an endless maze', 'a room with no exits', 'where my fears waited'],
    joy: ['a garden of light', 'somewhere we once were happy', 'the perfect memory', 'a place of safety'],
    sadness: ['a place that no longer exists', 'where I lost you', 'fading memories', 'emptiness'],
    confusion: ['everywhere and nowhere', 'a place that kept changing', 'somewhere impossible', 'folded space']
  };
  
  const list = locations[emotionalState || 'default'] || locations.default;
  return list[Math.floor(Math.random() * list.length)];
};

const getAction = (emotionalState?: string): string => {
  const actions: Record<string, string[]> = {
    default: ['reach out', 'call your name', 'step forward', 'look closer', 'follow'],
    fear: ['run away', 'hide', 'scream', 'freeze', 'fight'],
    joy: ['dance', 'embrace the moment', 'laugh', 'reach for the light', 'share it with you'],
    sadness: ['hold on', 'remember', 'cry', 'let go', 'search'],
    confusion: ['make sense of it', 'find a pattern', 'understand', 'focus', 'connect the pieces']
  };
  
  const list = actions[emotionalState || 'default'] || actions.default;
  return list[Math.floor(Math.random() * list.length)];
};

const getObstacle = (emotionalState?: string): string => {
  const obstacles: Record<string, string[]> = {
    default: ['something held me back', 'you couldn\'t hear me', 'the distance never changed', 'time ran out'],
    fear: ['the shadows caught me', 'my voice made no sound', 'I was paralyzed', 'it found me first'],
    joy: ['the moment couldn\'t last', 'it was just beyond reach', 'you were already gone', 'it faded too quickly'],
    sadness: ['it was already too late', 'what was lost couldn\'t return', 'the memory was fading', 'I was alone'],
    confusion: ['the rules kept changing', 'the world shifted', 'logic didn\'t work there', 'I lost my way']
  };
  
  const list = obstacles[emotionalState || 'default'] || obstacles.default;
  return list[Math.floor(Math.random() * list.length)];
};

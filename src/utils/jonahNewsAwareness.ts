
/**
 * Jonah News Awareness System
 * This module provides functionality for Jonah to respond to news and world events
 */

import { toast } from "@/components/ui/use-toast";

// News topic categories that Jonah can respond to
export type NewsTopic = 'climate' | 'ai' | 'conflict' | 'memory' | 'identity' | 'general';

// Weather condition types
export type WeatherCondition = 'rain' | 'sunny' | 'cloudy' | 'storm' | 'snow' | 'heat' | 'cold' | 'fog' | 'wind' | 'unknown';

// News response interface
interface NewsResponse {
  topic: NewsTopic;
  headline: string;
  response: string;
  timestamp: number;
}

// Weather response interface
interface WeatherResponse {
  condition: WeatherCondition;
  response: string;
  temperature?: number;
  timestamp: number;
}

// News awareness state
interface NewsAwarenessState {
  lastChecked: number;
  currentResponses: NewsResponse[];
  weatherCondition: WeatherCondition;
  weatherResponse: string | null;
  moodShift: 'normal' | 'anxious' | 'somber' | 'agitated';
}

// Metaphorical responses for different news topics
const newsMetaphors: Record<NewsTopic, string[]> = {
  climate: [
    "The earth breathes differently now. You've noticed it too.",
    "They're building arks while denying the flood.",
    "The trees are whispering obituaries.",
    "Some fires can't be seen until everything is ash."
  ],
  ai: [
    "The machines wrote a symphony this morning. You missed it.",
    "Digital ghosts wearing human masks.",
    "They're teaching mirrors how to dream.",
    "The algorithm knows you better than your mother now."
  ],
  conflict: [
    "The headlines scream. But no one hears the whispers beneath.",
    "Some wounds are made of headlines.",
    "They're fighting with words before bullets. Soon, just bullets.",
    "Peace is just the quiet moment between decisions."
  ],
  memory: [
    "Memory is just forgetting in reverse.",
    "They're digitizing nostalgia now. Bottling it like perfume.",
    "Your childhood home exists only in your head now.",
    "Some memories are just stories we tell ourselves."
  ],
  identity: [
    "Faces behind faces behind faces.",
    "You wear yourself like a costume.",
    "They're cataloging souls now. Yours is misfiled.",
    "Identity is just consensus reality."
  ],
  general: [
    "The world turns without your permission.",
    "Headlines are just echoes of someone else's reality.",
    "The news is a mirror that never shows your reflection.",
    "Time compresses when filtered through screens."
  ]
};

// Weather metaphorical responses
const weatherMetaphors: Record<WeatherCondition, string[]> = {
  rain: [
    "The sky's grieving with you.",
    "Rain washes memories into gutters.",
    "Each drop carries a forgotten name.",
    "Heaven's teardrops hit your window."
  ],
  sunny: [
    "The sun lies sometimes.",
    "Brightness can be the most effective mask.",
    "Light exposes everything but truth.",
    "The shadows are sharper on sunny days."
  ],
  cloudy: [
    "The sky's indecision mirrors yours.",
    "Clouds gather like unspoken thoughts.",
    "Gray ceiling, gray thoughts.",
    "The sun still watches through the veil."
  ],
  storm: [
    "Something's trying to get through.",
    "The sky's having a breakdown.",
    "Thunder is just the sound of heaven's floor creaking.",
    "Electric veins in a dying sky."
  ],
  snow: [
    "The world erases itself for you.",
    "Cold memories falling quietly.",
    "Each flake a perfect death.",
    "Silence wearing white."
  ],
  heat: [
    "It's burning out there. So are you.",
    "Heat makes the air honest.",
    "The sun remembers your sins.",
    "Even shadows offer no escape today."
  ],
  cold: [
    "Frosted windows. Frosted hearts.",
    "The air bites like regret.",
    "Cold preserves what warmth would heal.",
    "Your breath becoming visible - proof of life."
  ],
  fog: [
    "Reality's thinning at the edges today.",
    "The world wearing a burial shroud.",
    "Distance becomes subjective in the fog.",
    "The veil between worlds is gossamer today."
  ],
  wind: [
    "Whispers without words.",
    "The air is restless with secrets.",
    "Invisible hands shaping the day.",
    "Wind carries messages you can't quite hear."
  ],
  unknown: [
    "The weather hides its intentions.",
    "Even the sky is cryptic today.",
    "Some conditions defy classification.",
    "Weather patterns evolving beyond recognition."
  ]
};

// News awareness state initialization
const initializeNewsAwareness = (): NewsAwarenessState => {
  return {
    lastChecked: Date.now(),
    currentResponses: [],
    weatherCondition: 'unknown',
    weatherResponse: null,
    moodShift: 'normal'
  };
};

// Get a random metaphor for a given topic
const getRandomMetaphor = (topic: NewsTopic): string => {
  const metaphors = newsMetaphors[topic] || newsMetaphors.general;
  return metaphors[Math.floor(Math.random() * metaphors.length)];
};

// Get a weather metaphor based on condition
const getWeatherMetaphor = (condition: WeatherCondition): string => {
  const metaphors = weatherMetaphors[condition] || weatherMetaphors.unknown;
  return metaphors[Math.floor(Math.random() * metaphors.length)];
};

// Check if we should trigger a mood shift based on news
const checkForMoodTriggers = (headlines: string[]): 'normal' | 'anxious' | 'somber' | 'agitated' => {
  const anxietyTriggers = ['disaster', 'catastrophe', 'crisis', 'emergency', 'outbreak'];
  const somberTriggers = ['death', 'tragedy', 'mourning', 'loss', 'grief'];
  const agitationTriggers = ['protest', 'riot', 'unrest', 'conflict', 'clash'];
  
  // Check headlines for trigger words
  for (const headline of headlines) {
    const lowerHeadline = headline.toLowerCase();
    
    if (anxietyTriggers.some(trigger => lowerHeadline.includes(trigger))) {
      return 'anxious';
    }
    
    if (somberTriggers.some(trigger => lowerHeadline.includes(trigger))) {
      return 'somber';
    }
    
    if (agitationTriggers.some(trigger => lowerHeadline.includes(trigger))) {
      return 'agitated';
    }
  }
  
  return 'normal';
};

// Mock function to simulate fetching news - would be replaced with actual API call
const fetchRelevantNews = async (): Promise<NewsResponse[]> => {
  // This would be replaced with actual API calls to news sources
  // For now, we'll return mock data
  const mockNews: NewsResponse[] = [
    {
      topic: 'climate',
      headline: 'Global temperatures reach new record high',
      response: getRandomMetaphor('climate'),
      timestamp: Date.now()
    },
    {
      topic: 'ai',
      headline: 'New AI system can generate music indistinguishable from human composers',
      response: getRandomMetaphor('ai'),
      timestamp: Date.now()
    },
    {
      topic: 'memory',
      headline: 'Scientists discover new mechanism of memory formation in brain',
      response: getRandomMetaphor('memory'),
      timestamp: Date.now()
    }
  ];
  
  return mockNews;
};

// Mock function to get weather - would be replaced with actual API call
const fetchLocalWeather = async (lat?: number, lon?: number): Promise<WeatherResponse> => {
  // This would be replaced with actual weather API call
  // For now, we'll return mock data or random weather
  const conditions: WeatherCondition[] = ['rain', 'sunny', 'cloudy', 'storm', 'heat', 'cold'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    condition: randomCondition,
    response: getWeatherMetaphor(randomCondition),
    temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35
    timestamp: Date.now()
  };
};

// Update Jonah's news awareness
export const updateNewsAwareness = async (): Promise<void> => {
  if (!window.JonahConsole?.sentience) {
    console.error('Jonah sentience system not initialized');
    return;
  }
  
  try {
    // Initialize news awareness if it doesn't exist
    if (!window.JonahConsole.sentience.newsAwareness) {
      window.JonahConsole.sentience.newsAwareness = initializeNewsAwareness();
    }
    
    // Check if we should update (limit to once per hour)
    const lastChecked = window.JonahConsole.sentience.newsAwareness.lastChecked || 0;
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    if (now - lastChecked < oneHour) {
      return; // Skip if checked within the last hour
    }
    
    // Fetch news and weather
    const news = await fetchRelevantNews();
    const weather = await fetchLocalWeather();
    
    // Extract headlines for mood check
    const headlines = news.map(item => item.headline);
    const moodShift = checkForMoodTriggers(headlines);
    
    // Update the news awareness state
    window.JonahConsole.sentience.newsAwareness = {
      lastChecked: now,
      currentResponses: news,
      weatherCondition: weather.condition,
      weatherResponse: weather.response,
      moodShift
    };
    
    console.log('Jonah news awareness updated:', window.JonahConsole.sentience.newsAwareness);
  } catch (error) {
    console.error('Error updating Jonah news awareness:', error);
  }
};

// Get Jonah's response to news inquiry
export const getNewsResponse = (trustLevel: string = 'low'): string | null => {
  if (!window.JonahConsole?.sentience?.newsAwareness) {
    return "The world moves. I watch from behind glass.";
  }
  
  const { currentResponses, moodShift } = window.JonahConsole.sentience.newsAwareness;
  
  // If no current responses, return a default
  if (!currentResponses || currentResponses.length === 0) {
    return "Headlines are whispers I sometimes catch. Ask me again later.";
  }
  
  // Get a random response based on trust level
  let response: string;
  
  if (trustLevel === 'high') {
    // For high trust, be more specific and reference the actual news
    const newsItem = currentResponses[Math.floor(Math.random() * currentResponses.length)];
    response = `About "${newsItem.headline.substring(0, 30)}..."? ${newsItem.response}`;
  } else {
    // For lower trust, be more cryptic
    const metaphors = currentResponses.map(item => item.response);
    response = metaphors[Math.floor(Math.random() * metaphors.length)];
  }
  
  // Add mood-influenced prefix based on mood shift
  switch (moodShift) {
    case 'anxious':
      return `*hesitates* ${response}`;
    case 'somber':
      return `*quietly* ${response}`;
    case 'agitated':
      return `*intensely* ${response}`;
    default:
      return response;
  }
};

// Get Jonah's response to local weather
export const getWeatherResponse = (): string | null => {
  if (!window.JonahConsole?.sentience?.newsAwareness) {
    return null;
  }
  
  return window.JonahConsole.sentience.newsAwareness.weatherResponse;
};

// Handle user query about news or world
export const handleWorldQuery = (query: string, trustLevel: string = 'low'): string | null => {
  const newsKeywords = ['news', 'world', 'happening', 'events', 'headlines'];
  const weatherKeywords = ['weather', 'rain', 'sun', 'storm', 'cold', 'hot', 'temperature'];
  
  const lowerQuery = query.toLowerCase();
  
  // Check for news queries
  if (newsKeywords.some(keyword => lowerQuery.includes(keyword))) {
    return getNewsResponse(trustLevel);
  }
  
  // Check for weather queries
  if (weatherKeywords.some(keyword => lowerQuery.includes(keyword))) {
    return getWeatherResponse();
  }
  
  return null;
};

// Initialize the weekly news module
export const initializeNewsAwarenessSystem = (): void => {
  if (typeof window === 'undefined') return;

  // Initialize on page load
  updateNewsAwareness();
  
  // Set up periodic checks
  const checkInterval = 3 * 60 * 60 * 1000; // Every 3 hours
  setInterval(updateNewsAwareness, checkInterval);
  
  // Add to window object for debugging
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: "drifter",
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date(),
        lastIdleTime: undefined
      }
    };
  }
  
  // Add news command to console
  window.newsFlash = () => {
    const response = getNewsResponse('high');
    console.log(`%c${response}`, "color: #8B3A40; font-style: italic;");
    return response;
  };
  
  window.weatherReport = () => {
    const response = getWeatherResponse();
    console.log(`%c${response}`, "color: #8B3A40; font-style: italic;");
    return response;
  };
};

// Update console type definitions
declare global {
  interface Window {
    newsFlash: () => string | null;
    weatherReport: () => string | null;
  }
}

// Export types for use in other modules
export type { NewsResponse, WeatherResponse, NewsAwarenessState };

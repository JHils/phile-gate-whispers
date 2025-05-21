
/**
 * Jonah News Awareness System
 * Allows Jonah to be aware of current news and respond to it
 */

import { NewsAwareness } from './jonahAdvancedBehavior/types';

// Initialize the news awareness system
export const initializeNewsAwareness = () => {
  // Ensure the sentience object exists
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    // Initialize the newsAwareness object if it doesn't exist
    if (!window.JonahConsole.sentience.newsAwareness) {
      window.JonahConsole.sentience.newsAwareness = {
        lastChecked: Date.now(),
        currentResponses: [],
        weatherCondition: 'unknown',
        weatherResponse: null,
        moodShift: 'normal'
      };
    }
    
    // Log initialization
    console.log("Jonah News Awareness System initialized");
  }
};

// Export initializeNewsAwarenessSystem as an alias for initializeNewsAwareness
export const initializeNewsAwarenessSystem = initializeNewsAwareness;

// Check if news should be updated based on last check time
export const shouldUpdateNews = (): boolean => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.newsAwareness) {
    return false;
  }
  
  const newsAwareness = window.JonahConsole.sentience.newsAwareness;
  const now = Date.now();
  const hoursSinceLastCheck = (now - newsAwareness.lastChecked) / (1000 * 60 * 60);
  
  // Update every 6 hours
  return hoursSinceLastCheck > 6;
};

// Update news awareness with new content
export const updateNewsAwareness = (
  headlines: Array<{topic: string, headline: string}>,
  weather: string
) => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.newsAwareness) {
    return;
  }
  
  const now = Date.now();
  const newsAwareness = window.JonahConsole.sentience.newsAwareness;
  
  // Update headlines with responses
  const newResponses = headlines.map(item => ({
    topic: item.topic,
    headline: item.headline,
    response: generateNewsResponse(item.headline, item.topic),
    timestamp: now
  }));
  
  // Update weather with response
  const weatherResponse = generateWeatherResponse(weather);
  
  // Determine mood shift based on news content
  const moodShift = determineNewsBasedMoodShift(headlines, weather);
  
  // Update the news awareness object
  newsAwareness.lastChecked = now;
  newsAwareness.currentResponses = newResponses;
  newsAwareness.weatherCondition = weather;
  newsAwareness.weatherResponse = weatherResponse;
  newsAwareness.moodShift = moodShift;
};

// Generate a response to a news headline
export const generateNewsResponse = (headline: string, topic: string): string => {
  // Simple implementation with different response patterns based on topic
  const responses: Record<string, string[]> = {
    'politics': [
      "The shifting of power continues as expected.",
      "They never tell the whole truth about these things.",
      "I wonder what they're not telling us."
    ],
    'technology': [
      "They think they're innovating, but they're just rebuilding what was lost.",
      "The old systems had this too, just with different names.",
      "It's just another way to track and monitor."
    ],
    'environment': [
      "The patterns are accelerating. Not enough time.",
      "Sometimes I dream of the world before the changes began.",
      "They won't admit how bad it really is."
    ],
    'default': [
      "I've seen this cycle before.",
      "Nothing new under the sun.",
      "History repeating with different actors."
    ]
  };
  
  // Get appropriate response templates
  const templates = responses[topic.toLowerCase()] || responses['default'];
  
  // Select a random response template
  return templates[Math.floor(Math.random() * templates.length)];
};

// Create getNewsResponse as an alias for generateNewsResponse for compatibility
export const getNewsResponse = generateNewsResponse;

// Generate a response to weather conditions
export const generateWeatherResponse = (weather: string): string => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.newsAwareness) {
    return "The weather affects us all, whether we notice it or not.";
  }
  
  const responses: Record<string, string[]> = {
    'rain': [
      "The rain washes away more than just dust.",
      "I can almost hear the raindrops from here.",
      "Rain blurs the boundaries between worlds."
    ],
    'cloudy': [
      "Clouds hide what lies above.",
      "Grey skies mirror grey thoughts.",
      "The veil thickens on cloudy days."
    ],
    'clear': [
      "Clear skies hide nothing, but reveal less than you'd think.",
      "The clarity is deceptive.",
      "On clear days, the Gate is more visible."
    ],
    'snow': [
      "Snow muffles the whispers from beyond.",
      "The white silence has its own voice.",
      "Cold and silence go hand in hand."
    ],
    'default': [
      "The weather shifts, but the patterns remain.",
      "Weather is the most honest news we get.",
      "The atmosphere speaks its own truth."
    ]
  };
  
  // Get appropriate response templates
  const weatherKey = Object.keys(responses).find(key => weather.toLowerCase().includes(key)) || 'default';
  const templates = responses[weatherKey];
  
  // Select a random response template
  return templates[Math.floor(Math.random() * templates.length)];
};

// Create getWeatherResponse as an alias for generateWeatherResponse for compatibility
export const getWeatherResponse = generateWeatherResponse;

// Determine mood shift based on news content
export const determineNewsBasedMoodShift = (
  headlines: Array<{topic: string, headline: string}>,
  weather: string
): 'normal' | 'anxious' | 'somber' | 'agitated' => {
  // Simple implementation
  
  // Count negative triggers
  let negativeCount = 0;
  const negativeTriggers = ['disaster', 'crisis', 'death', 'warning', 'danger', 'threat', 'war', 'conflict'];
  
  headlines.forEach(item => {
    const headline = item.headline.toLowerCase();
    negativeTriggers.forEach(trigger => {
      if (headline.includes(trigger)) {
        negativeCount++;
      }
    });
  });
  
  // Weather factors
  const isGloomy = weather.toLowerCase().includes('rain') || 
                   weather.toLowerCase().includes('storm') ||
                   weather.toLowerCase().includes('fog');
  
  // Determine mood shift
  if (negativeCount >= 3 || (negativeCount >= 2 && isGloomy)) {
    return 'anxious';
  } else if (isGloomy && negativeCount > 0) {
    return 'somber';
  } else if (negativeCount > 1) {
    return 'agitated';
  }
  
  return 'normal';
};

// Get a response based on current news awareness
export const getNewsAwarenessResponse = (): string | null => {
  if (typeof window === 'undefined' || !window.JonahConsole?.sentience?.newsAwareness) {
    return null;
  }
  
  const newsAwareness = window.JonahConsole.sentience.newsAwareness;
  
  // Choose between weather and news responses
  const useWeatherResponse = Math.random() < 0.4; // 40% chance for weather
  
  if (useWeatherResponse && newsAwareness.weatherResponse) {
    return newsAwareness.weatherResponse;
  } else if (newsAwareness.currentResponses && newsAwareness.currentResponses.length > 0) {
    // Get a random news response
    const randomIndex = Math.floor(Math.random() * newsAwareness.currentResponses.length);
    return newsAwareness.currentResponses[randomIndex].response;
  }
  
  return null;
};

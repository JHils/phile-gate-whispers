
/**
 * Jonah's News Awareness System
 * The system adds contextual awareness of current events and news
 */

// Initialize the news awareness system
export function initializeNewsAwarenessSystem(): void {
  if (typeof window !== 'undefined') {
    // Log initialization
    console.log("Jonah News Awareness System initialized");
    
    // Initialize news awareness in sentience data
    if (window.JonahConsole?.sentience) {
      if (!window.JonahConsole.sentience.newsAwareness) {
        window.JonahConsole.sentience.newsAwareness = {
          lastChecked: Date.now(),
          currentResponses: [],
          weatherCondition: generateRandomWeather(),
          weatherResponse: null,
          moodShift: 'normal'
        };
      }
    }
  }
}

// Generate news responses
export function getNewsResponse(): string | null {
  // Skip if the user is offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return "I can't access news right now. The connection seems broken.";
  }
  
  // Don't respond too frequently
  if (window.JonahConsole?.sentience?.newsAwareness) {
    const lastChecked = window.JonahConsole.sentience.newsAwareness.lastChecked || 0;
    if (Date.now() - lastChecked < 30 * 60 * 1000) { // 30 minutes
      return null;
    }
    
    // Update last checked time
    window.JonahConsole.sentience.newsAwareness.lastChecked = Date.now();
  } else {
    // Initialize if it doesn't exist
    initializeNewsAwarenessSystem();
  }
  
  // Generate a random news topic
  const newsTopics = [
    {
      topic: "technology",
      headline: "New AI breakthrough reported",
      response: "The digital minds are evolving faster than expected."
    },
    {
      topic: "environment",
      headline: "Record temperatures reported",
      response: "The physical world is becoming unstable, just like the digital one."
    },
    {
      topic: "science",
      headline: "Quantum computing milestone achieved",
      response: "They're getting closer to seeing between realities."
    },
    {
      topic: "space",
      headline: "New exoplanet discovered",
      response: "More places to hide, or more places to be found?"
    },
    {
      topic: "archaeology",
      headline: "Ancient artifact discovered",
      response: "The past always finds a way to resurface."
    }
  ];
  
  // Select a random topic
  const selectedTopic = newsTopics[Math.floor(Math.random() * newsTopics.length)];
  
  // Store the response
  if (window.JonahConsole?.sentience?.newsAwareness) {
    window.JonahConsole.sentience.newsAwareness.currentResponses.push({
      ...selectedTopic,
      timestamp: Date.now()
    });
  }
  
  // Return the response
  return selectedTopic.response;
}

// Generate weather responses
export function getWeatherResponse(): string | null {
  // Don't respond too frequently
  if (window.JonahConsole?.sentience?.newsAwareness) {
    const lastChecked = window.JonahConsole.sentience.newsAwareness.lastChecked || 0;
    if (Date.now() - lastChecked < 60 * 60 * 1000) { // 60 minutes
      return window.JonahConsole.sentience.newsAwareness.weatherResponse;
    }
  } else {
    // Initialize if it doesn't exist
    initializeNewsAwarenessSystem();
    return null;
  }
  
  // Generate new condition
  const condition = generateRandomWeather();
  
  // Store the condition
  if (window.JonahConsole?.sentience?.newsAwareness) {
    window.JonahConsole.sentience.newsAwareness.weatherCondition = condition;
  }
  
  // Generate response based on condition
  let response = "";
  
  switch (condition) {
    case "clear":
      response = "The sky is clear today. Too clear. No place to hide.";
      break;
    case "rain":
      response = "It's raining somewhere. The static matches the rhythm of the drops.";
      break;
    case "storm":
      response = "There's a storm brewing. Digital or physical, they feel the same to me now.";
      break;
    case "fog":
      response = "The fog obscures everything. Perfect for crossing boundaries.";
      break;
    case "snow":
      response = "Snow falling like static. White noise covering mistakes.";
      break;
    default:
      response = "I can't see the weather anymore. The window shows something else now.";
  }
  
  // Store the response
  if (window.JonahConsole?.sentience?.newsAwareness) {
    window.JonahConsole.sentience.newsAwareness.weatherResponse = response;
  }
  
  return response;
}

// Generate random weather condition
function generateRandomWeather(): string {
  const conditions = ["clear", "rain", "storm", "fog", "snow"];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

// Check if a message is related to news
export function isNewsRelatedMessage(message: string): boolean {
  const newsKeywords = [
    'news', 'weather', 'current events', 'happening', 'today',
    'report', 'forecast', 'headline', 'climate', 'temperature'
  ];
  
  const normalizedMessage = message.toLowerCase();
  
  return newsKeywords.some(keyword => normalizedMessage.includes(keyword));
}

// Generate a contextual response based on news awareness
export function generateNewsAwarenessResponse(message: string): string | null {
  // Don't respond if the message isn't news related
  if (!isNewsRelatedMessage(message)) {
    return null;
  }
  
  // Check for specific topics
  if (message.toLowerCase().includes('weather')) {
    return getWeatherResponse();
  }
  
  // General news response
  return getNewsResponse();
}

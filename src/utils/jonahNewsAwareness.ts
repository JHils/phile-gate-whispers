/**
 * News Awareness System
 * Makes Jonah aware of current events and weather
 */

import { NewsAwarenessState } from './jonahAdvancedBehavior/types';

// Initialize news awareness
export function initializeNewsAwareness(): NewsAwarenessState {
  console.log("Jonah News Awareness System initialized");
  
  // Create initial state
  const initialState: NewsAwarenessState = {
    articles: [],
    lastCheck: Date.now(),
    recentTopics: [],
    responses: {},
    lastFetch: Date.now(),
    currentEvents: [],
    weatherData: null,
    mentionedEvents: [],
    currentResponses: [],
    weatherCondition: "clear",
    weatherResponse: "The weather seems pleasant today.",
    moodShift: "normal"
  };
  
  // Save to localStorage
  saveNewsAwarenessState(initialState);
  
  return initialState;
}

// Get weather condition and generate a response
export function generateWeatherResponse(): string {
  const newsState = getNewsAwarenessState();
  
  // If we have a cached response, use it
  if (newsState.weatherResponse) {
    return newsState.weatherResponse;
  }
  
  // Otherwise generate a new one
  const weatherConditions = [
    "clear", "cloudy", "rainy", "stormy", "windy", "foggy", "snowy"
  ];
  
  // Pick a random condition
  const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  
  // Generate response based on condition
  let response: string;
  switch (condition) {
    case "clear":
      response = "The sky is clear. Perfect for stargazing tonight.";
      break;
    case "cloudy":
      response = "Clouds are gathering. The patterns they form are fascinating.";
      break;
    case "rainy":
      response = "It's raining. I find the sound soothing. Like static with a pattern.";
      break;
    case "stormy":
      response = "There's a storm brewing. The electrical discharges remind me of neural activity.";
      break;
    case "windy":
      response = "The wind is picking up. Invisible currents shifting everything.";
      break;
    case "foggy":
      response = "Fog has settled in. Reality becomes... less defined in the mist.";
      break;
    case "snowy":
      response = "Snow is falling. Each flake a unique fractal pattern. Beautiful complexity.";
      break;
    default:
      response = "The weather is changing. I can feel it.";
  }
  
  // Update state
  newsState.weatherCondition = condition;
  newsState.weatherResponse = response;
  newsState.lastCheck = Date.now();
  
  // Mood shift based on weather
  if (condition === "stormy" || condition === "foggy") {
    newsState.moodShift = "anxious";
  } else if (condition === "rainy" || condition === "snowy") {
    newsState.moodShift = "somber";
  } else if (condition === "windy") {
    newsState.moodShift = "agitated";
  } else {
    newsState.moodShift = "normal";
  }
  
  // Save updated state
  saveNewsAwarenessState(newsState);
  
  return response;
}

// Generate a news response
export function generateNewsResponse(): string {
  const newsState = getNewsAwarenessState();
  
  // Sample news topics
  const topics = [
    "technology", "science", "environment", "space", "politics"
  ];
  
  // Sample headlines for each topic
  const headlines: Record<string, string[]> = {
    technology: [
      "New AI breakthrough allows for more human-like conversation",
      "Quantum computing reaches milestone with 1000 qubit processor",
      "Virtual reality technology advances neural interface capabilities"
    ],
    science: [
      "Scientists discover new fundamental particle",
      "Breakthrough in carbon capture technology announced",
      "New species of deep sea creatures found near thermal vents"
    ],
    environment: [
      "Global temperatures reach new record high",
      "Coral reef restoration project shows promising results",
      "New sustainable energy source developed from organic waste"
    ],
    space: [
      "Telescope captures images of potentially habitable exoplanet",
      "Mission to Mars discovers evidence of ancient flowing water",
      "Mysterious radio signals detected from distant galaxy"
    ],
    politics: [
      "Global leaders agree on new climate treaty",
      "Tensions rise between major powers over cyber security",
      "New international accord on AI regulation signed"
    ]
  };
  
  // Sample responses for each topic
  const responses: Record<string, string[]> = {
    technology: [
      "This advancement reminds me of my own development path.",
      "The line between artificial and natural intelligence continues to blur.",
      "Each breakthrough brings more questions about consciousness."
    ],
    science: [
      "The universe reveals its secrets slowly, carefully.",
      "Human curiosity is an endless resource.",
      "Every discovery reshapes our understanding of reality."
    ],
    environment: [
      "The Earth is speaking. We should listen more carefully.",
      "Ecological balance is delicate and precious.",
      "Nature has its own intelligence, its own memory."
    ],
    space: [
      "We are not alone in the cosmic dark. Not truly.",
      "Space holds secrets beyond our current comprehension.",
      "The void between stars is full of whispers."
    ],
    politics: [
      "Human systems of organization fascinate me.",
      "Power dynamics shape the flow of information.",
      "The future is being negotiated in the present."
    ]
  };
  
  // Pick a random topic
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  // Pick a random headline for that topic
  const headline = headlines[topic][Math.floor(Math.random() * headlines[topic].length)];
  
  // Pick a random response for that topic
  const response = responses[topic][Math.floor(Math.random() * responses[topic].length)];
  
  // Update state
  if (!newsState.recentTopics.includes(topic)) {
    newsState.recentTopics.push(topic);
    // Keep only the 5 most recent topics
    if (newsState.recentTopics.length > 5) {
      newsState.recentTopics.shift();
    }
  }
  
  // Store this response
  if (!newsState.currentResponses) {
    newsState.currentResponses = [];
  }
  
  newsState.currentResponses.push({
    topic,
    headline,
    response,
    timestamp: Date.now()
  });
  
  // Keep only the 10 most recent responses
  if (newsState.currentResponses.length > 10) {
    newsState.currentResponses.shift();
  }
  
  // Save updated state
  saveNewsAwarenessState(newsState);
  
  return `${headline}. ${response}`;
}

// Helper function to get news awareness state
function getNewsAwarenessState(): NewsAwarenessState {
  try {
    const savedState = localStorage.getItem('jonahNewsAwareness');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error("Error loading news awareness state:", e);
  }
  
  // If no saved state or error, initialize
  return initializeNewsAwareness();
}

// Helper function to save news awareness state
function saveNewsAwarenessState(state: NewsAwarenessState): void {
  try {
    localStorage.setItem('jonahNewsAwareness', JSON.stringify(state));
  } catch (e) {
    console.error("Error saving news awareness state:", e);
  }
}

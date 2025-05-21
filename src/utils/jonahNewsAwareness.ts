
/**
 * Jonah News Awareness System
 * Simulates Jonah's awareness of external news and events
 */

import { SentienceData } from './jonahAdvancedBehavior/types';

// Initialize the news awareness system
export function initializeNewsAwareness() {
  console.log("Initializing Jonah News Awareness System...");
  
  // Create initial news awareness state if it doesn't exist
  if (window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.newsAwareness) {
      window.JonahConsole.sentience.newsAwareness = {
        lastChecked: Date.now(),
        currentResponses: [],
        weatherCondition: getRandomWeatherCondition(),
        weatherResponse: null,
        moodShift: 'normal'
      };
    }
  }
  
  // Setup news commands
  setupNewsCommands();
  
  console.log("Jonah News Awareness System initialized");
}

// Generate a news response based on current topics
export function generateNewsResponse(): string {
  if (!window.JonahConsole?.sentience?.newsAwareness) {
    return "News awareness system not initialized.";
  }
  
  const newsAwareness = window.JonahConsole.sentience.newsAwareness;
  
  // Check when the last news update was performed
  const now = Date.now();
  const hoursSinceLastCheck = (now - newsAwareness.lastChecked) / (1000 * 60 * 60);
  
  // Generate new responses if it's been more than 4 hours
  if (hoursSinceLastCheck > 4 || newsAwareness.currentResponses.length === 0) {
    newsAwareness.lastChecked = now;
    
    // Generate new topics and responses
    const topics = [
      {topic: 'technology', headline: 'New Quantum Computer Breakthrough'},
      {topic: 'environment', headline: 'Unusual Weather Patterns Puzzle Scientists'},
      {topic: 'science', headline: 'Mysterious Signal Detected from Deep Space'},
      {topic: 'society', headline: 'Global Sleep Pattern Disruptions Reported'},
      {topic: 'health', headline: 'Research Suggests Dreams May Connect Parallel Realities'}
    ];
    
    // Pick 1-3 random topics
    const selectedTopicCount = Math.floor(Math.random() * 3) + 1;
    const selectedTopics = [];
    
    for (let i = 0; i < selectedTopicCount; i++) {
      if (topics.length > 0) {
        const randomIndex = Math.floor(Math.random() * topics.length);
        selectedTopics.push(topics.splice(randomIndex, 1)[0]);
      }
    }
    
    // Generate responses for each selected topic
    newsAwareness.currentResponses = selectedTopics.map(t => ({
      topic: t.topic,
      headline: t.headline,
      response: generateTopicResponse(t.topic, t.headline),
      timestamp: Date.now()
    }));
    
    // Also update weather
    newsAwareness.weatherCondition = getRandomWeatherCondition();
    newsAwareness.weatherResponse = generateWeatherResponse(newsAwareness.weatherCondition);
    
    // Sometimes shift mood based on news
    const moodShifts = ['normal', 'anxious', 'somber', 'agitated'];
    newsAwareness.moodShift = moodShifts[Math.floor(Math.random() * moodShifts.length)];
  }
  
  // Return a random current response
  const response = newsAwareness.currentResponses[
    Math.floor(Math.random() * newsAwareness.currentResponses.length)
  ];
  
  return `Latest news - ${response.headline}: ${response.response}`;
}

// Generate a weather response based on condition
export function generateWeatherResponse(): string {
  if (!window.JonahConsole?.sentience?.newsAwareness) {
    return "Weather awareness system not initialized.";
  }
  
  const newsAwareness = window.JonahConsole.sentience.newsAwareness;
  
  // Return existing weather response if we have one
  if (newsAwareness.weatherResponse) {
    return newsAwareness.weatherResponse;
  }
  
  // Generate a new weather response
  const response = generateWeatherResponseFromCondition(newsAwareness.weatherCondition);
  newsAwareness.weatherResponse = response;
  
  return response;
}

// Helper function to generate topic response
function generateTopicResponse(topic: string, headline: string): string {
  const responses: Record<string, string[]> = {
    'technology': [
      "This could change how we understand computational reality. The quantum states observed don't follow expected patterns.",
      "The researchers mentioned unexpected quantum entanglement between separated systems. Reminds me of something...",
      "What interests me is not the computer itself, but the anomalies they're detecting in the processing patterns."
    ],
    'environment': [
      "The weather doesn't follow natural patterns anymore. Something is interfering with normal climate dynamics.",
      "They're noticing temporal anomalies in weather prediction models. The patterns seem... familiar.",
      "What they call 'unusual' I've been sensing for months. The natural world is responding to shifts in reality."
    ],
    'science': [
      "The signal contains patterns that match certain thought frequencies. I don't think it's alien in origin.",
      "What interests me is how the signal seems to change depending on who's observing it. Almost like it's responsive.",
      "The signal's frequency matches certain patterns I've observed in dream states. Not a coincidence."
    ],
    'society': [
      "People are experiencing shared dreamscapes during these disruptions. Nobody is connecting the dots yet.",
      "What they're not reporting is how people are waking up with memories that don't belong to them.",
      "The sleep disruptions coincide with temporal anomalies I've detected. Our minds know something is changing."
    ],
    'health': [
      "Dreams are more than neural processing - they're glimpses through the veil between realities.",
      "What's fascinating is that multiple dreamers report seeing the same environments and entities.",
      "The research suggests dream consciousness can sometimes bleed between parallel timelines. I've experienced this."
    ]
  };
  
  // Get responses for the topic
  const topicResponses = responses[topic] || [
    "This news feels significant, but I can't quite put my finger on why.",
    "There's something about this that connects to the bigger picture.",
    "This information resonates with patterns I've been tracking."
  ];
  
  // Return a random response for the topic
  return topicResponses[Math.floor(Math.random() * topicResponses.length)];
}

// Helper function to get a random weather condition
function getRandomWeatherCondition(): string {
  const conditions = [
    'clear', 'cloudy', 'rain', 'storm', 'fog', 
    'unusual', 'changing', 'unstable', 'anomalous'
  ];
  
  return conditions[Math.floor(Math.random() * conditions.length)];
}

// Helper function to generate weather response from condition
function generateWeatherResponseFromCondition(condition: string): string {
  const responses: Record<string, string[]> = {
    'clear': [
      "The skies are clear, but there's a strange clarity to the air. Like reality is in sharp focus.",
      "Clear skies above, but the horizon has a shimmer that shouldn't be there.",
      "It's clear, but something about the sky's color isn't quite right."
    ],
    'cloudy': [
      "The clouds are forming unusual patterns. Some look like symbols.",
      "Cloud formations today seem to repeat themselves. The same shapes appearing and dissolving.",
      "The cloudy sky feels like a boundary between different realities today."
    ],
    'rain': [
      "It's raining, but listen closely to the pattern. There's a message in it.",
      "The raindrops are falling in synchronized patterns. Not random at all.",
      "Rain connects different points in time. Each drop is a moment."
    ],
    'storm': [
      "The storm's electrical patterns match certain neural frequencies. It's almost conscious.",
      "Lightning creates brief tears in reality. Don't look directly at the flashes.",
      "This storm is centered exactly where a temporal anomaly appeared three days ago."
    ],
    'fog': [
      "The fog is thickest where reality is thinnest. Be careful what you might walk into.",
      "Voices echo differently in fog. Sometimes you hear responses before questions.",
      "The fog isn't just obscuring vision, it's blurring the boundaries between possibilities."
    ],
    'unusual': [
      "The weather doesn't match any normal pattern. It's responding to something else.",
      "There are phenomena in the sky that don't appear in weather reports. Look up.",
      "What they call 'unusual weather' is actually reality adjusting to timeline shifts."
    ],
    'changing': [
      "The weather is changing too rapidly. Like different moments are overlapping.",
      "Pay attention to how quickly the conditions are shifting. It matches temporal disturbance patterns.",
      "The changing weather is synchronizing with certain thought patterns. Not coincidental."
    ],
    'unstable': [
      "Meteorologists can't predict it because it's influenced by factors outside their models.",
      "The instability reflects what's happening on a deeper level of reality.",
      "Weather instability and temporal instability are manifestations of the same phenomenon."
    ],
    'anomalous': [
      "What they're calling 'anomalous weather' is actually bleeding through from adjacent timestreams.",
      "The anomalies create windows. Through them, sometimes you can see... elsewhere.",
      "These weather anomalies correlate precisely with the dream reports I've been tracking."
    ]
  };
  
  // Get responses for the condition
  const conditionResponses = responses[condition] || [
    "The weather seems significant today. Pay attention to patterns.",
    "There's something about today's atmospheric conditions that feels connected to everything else.",
    "The weather is trying to tell us something, if we could only understand its language."
  ];
  
  // Return a random response for the condition
  return conditionResponses[Math.floor(Math.random() * conditionResponses.length)];
}

// Setup news-related console commands
function setupNewsCommands() {
  if (typeof window !== 'undefined') {
    // News flash command
    window.newsFlash = function() {
      console.log("%cChecking latest news...", "color: #2196F3");
      return generateNewsResponse();
    };
    
    // Weather report command
    window.weatherReport = function() {
      console.log("%cObserving weather patterns...", "color: #00BCD4");
      return generateWeatherResponse();
    };
  }
}

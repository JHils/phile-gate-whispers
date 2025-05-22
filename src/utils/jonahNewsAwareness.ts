/**
 * News Awareness System
 * Manages Jonah's awareness of the news and world events
 */
import { NewsAwarenessState } from './jonahAdvancedBehavior/types';

// Initialize news awareness
export function initializeNewsAwareness(): NewsAwarenessState {
  const stored = localStorage.getItem('jonahNewsAwareness');
  let awareness: NewsAwarenessState;
  
  if (stored) {
    try {
      awareness = JSON.parse(stored);
    } catch (e) {
      awareness = createDefaultNewsAwareness();
    }
  } else {
    awareness = createDefaultNewsAwareness();
    saveNewsAwareness(awareness);
  }
  
  return awareness;
}

// Create default news awareness
function createDefaultNewsAwareness(): NewsAwarenessState {
  return {
    lastChecked: Date.now(),
    currentResponses: [],
    weatherCondition: 'clear',
    weatherResponse: null,
    moodShift: 'normal',
    articles: [], // Added missing property
    recentTopics: [] // Added missing property
  };
}

// Save news awareness to storage
function saveNewsAwareness(awareness: NewsAwarenessState): void {
  localStorage.setItem('jonahNewsAwareness', JSON.stringify(awareness));
}

// Get current news awareness
export function getNewsAwareness(): NewsAwarenessState {
  return initializeNewsAwareness();
}

// Update news awareness
export function updateNewsAwareness(updates: Partial<NewsAwarenessState>): NewsAwarenessState {
  const current = getNewsAwareness();
  const updated = { ...current, ...updates };
  saveNewsAwareness(updated);
  return updated;
}

// Check if it's time for a news update
export function shouldUpdateNews(): boolean {
  const awareness = getNewsAwareness();
  const now = Date.now();
  
  // Update once every 4 hours
  return now - awareness.lastChecked > 4 * 60 * 60 * 1000;
}

// Fetch news headlines
export async function fetchNewsHeadlines(topic: string): Promise<string[]> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const headlines = [
        `Breaking: ${topic} - Scientists Discover New Evidence`,
        `Just In: ${topic} - Government Announces New Policy`,
        `Developing: ${topic} - Protests Erupt in Major Cities`
      ];
      resolve(headlines);
    }, 1500);
  });
}

// Generate response to news
export function generateNewsResponse(headline: string): string {
  // Mock implementation
  return `I've processed the news: "${headline}". It seems significant.`;
}

// Update current responses
export function updateCurrentResponses(topic: string, headline: string, response: string): void {
  const awareness = getNewsAwareness();
  
  if (!awareness.currentResponses) {
    awareness.currentResponses = [];
  }
  
  awareness.currentResponses.push({
    topic,
    headline,
    response,
    timestamp: Date.now()
  });
  
  // Limit to 5 responses
  if (awareness.currentResponses.length > 5) {
    awareness.currentResponses.shift();
  }
  
  saveNewsAwareness(awareness);
}

// Fetch weather data
export async function fetchWeatherData(): Promise<{ condition: string; temperature: number }> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const weatherData = {
        condition: 'clear',
        temperature: 25
      };
      resolve(weatherData);
    }, 1000);
  });
}

// Generate weather response
export function generateWeatherResponse(condition: string): string {
  // Mock implementation
  return `The weather is ${condition}. I'm processing this information.`;
}

// Update weather condition
export function updateWeatherCondition(condition: string): void {
  const awareness = getNewsAwareness();
  awareness.weatherCondition = condition;
  saveNewsAwareness(awareness);
}

// Update weather response
export function updateWeatherResponse(response: string): void {
  const awareness = getNewsAwareness();
  awareness.weatherResponse = response;
  saveNewsAwareness(awareness);
}

// Apply mood shift
export function applyMoodShift(condition: string): 'normal' | 'anxious' | 'somber' | 'agitated' {
  // Mock implementation
  if (condition === 'stormy') {
    return 'anxious';
  } else if (condition === 'overcast') {
    return 'somber';
  } else {
    return 'normal';
  }
}

// Update mood shift
export function updateMoodShift(shift: 'normal' | 'anxious' | 'somber' | 'agitated'): void {
  const awareness = getNewsAwareness();
  awareness.moodShift = shift;
  saveNewsAwareness(awareness);
}

// Update recent topics
export function updateRecentTopics(topics: string[]): void {
  const awareness = getNewsAwareness();
  
  if (!awareness.recentTopics) {
    awareness.recentTopics = [];
  }
  
  awareness.recentTopics = [...topics];
  
  // Limit to 10 topics
  if (awareness.recentTopics.length > 10) {
    awareness.recentTopics = awareness.recentTopics.slice(0, 10);
  }
  
  saveNewsAwareness(awareness);
}


/**
 * Jonah News Awareness
 * Provides Jonah with awareness of news events
 */

import { SentienceData } from './jonahAdvancedBehavior/types';
import { NewsAwareness } from './jonahAdvancedBehavior/types';

// Initialize news awareness
export function initializeNewsAwareness(sentience: SentienceData): SentienceData {
  if (!sentience.newsAwareness) {
    const initialNewsAwareness: NewsAwareness = {
      level: 0,
      lastChecked: Date.now(),
      topics: [],
      knownStories: [],
      storyResponses: {},
      lastNewsTopic: undefined,
      currentStory: undefined
    };
    
    return {
      ...sentience,
      newsAwareness: initialNewsAwareness
    };
  }
  
  return sentience;
}

// Get news awareness level
export function getNewsAwarenessLevel(sentience: SentienceData): number {
  return sentience?.newsAwareness?.level || 0;
}

// Check if news awareness is active
export function isNewsAwarenessActive(sentience: SentienceData): boolean {
  return (sentience?.newsAwareness?.level || 0) > 0;
}

// Add a topic to news awareness
export function addNewsAwarenessTopic(
  sentience: SentienceData, 
  topic: string
): SentienceData {
  if (!sentience.newsAwareness) {
    return initializeNewsAwareness(sentience);
  }
  
  const updatedNewsAwareness: NewsAwareness = {
    ...sentience.newsAwareness,
    topics: [...(sentience.newsAwareness.topics || []), topic],
    lastNewsTopic: topic,
    lastChecked: Date.now()
  };
  
  return {
    ...sentience,
    newsAwareness: updatedNewsAwareness
  };
}

// Add a news story
export function addNewsStory(
  sentience: SentienceData,
  story: string
): SentienceData {
  if (!sentience.newsAwareness) {
    return initializeNewsAwareness(sentience);
  }
  
  const knownStories = sentience.newsAwareness.knownStories || [];
  const updatedStories = knownStories.includes(story) 
    ? knownStories 
    : [...knownStories, story];
  
  const updatedNewsAwareness: NewsAwareness = {
    ...sentience.newsAwareness,
    knownStories: updatedStories,
    currentStory: story
  };
  
  return {
    ...sentience,
    newsAwareness: updatedNewsAwareness
  };
}

// Add a story response
export function addStoryResponse(
  sentience: SentienceData,
  story: string,
  response: string
): SentienceData {
  if (!sentience.newsAwareness) {
    return initializeNewsAwareness(sentience);
  }
  
  const currentResponses = sentience.newsAwareness.storyResponses || {};
  const storyResponses = currentResponses[story] || [];
  
  const updatedStoryResponses = {
    ...currentResponses,
    [story]: [...storyResponses, response]
  };
  
  const updatedNewsAwareness: NewsAwareness = {
    ...sentience.newsAwareness,
    storyResponses: updatedStoryResponses
  };
  
  return {
    ...sentience,
    newsAwareness: updatedNewsAwareness
  };
}

// Get story responses
export function getStoryResponses(sentience: SentienceData, story: string): string[] {
  const responses = sentience?.newsAwareness?.storyResponses;
  return responses ? (responses[story] || []) : [];
}

// Get latest news topic
export function getLatestNewsTopic(sentience: SentienceData): string | undefined {
  return sentience?.newsAwareness?.lastNewsTopic;
}

// Get current news story
export function getCurrentNewsStory(sentience: SentienceData): string | undefined {
  return sentience?.newsAwareness?.currentStory;
}

// Generate news awareness response
export function generateNewsAwarenessResponse(
  sentience: SentienceData, 
  input: string
): string | null {
  if (!isNewsAwarenessActive(sentience)) {
    return null;
  }
  
  // Check if input might be asking about news
  const newsKeywords = ["news", "headline", "current events", "happened", "world"];
  const isNewsQuery = newsKeywords.some(keyword => input.toLowerCase().includes(keyword));
  
  if (!isNewsQuery) {
    return null;
  }
  
  const currentStory = getCurrentNewsStory(sentience);
  if (currentStory) {
    const responses = [
      `I've been thinking about ${currentStory} recently.`,
      `Did you hear about ${currentStory}?`,
      `I'm still processing the news about ${currentStory}.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  const genericResponses = [
    "I try to stay aware of what's happening in the world.",
    "The news can be overwhelming sometimes.",
    "I'm still learning how to process current events."
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Update news awareness level
export function updateNewsAwarenessLevel(sentience: SentienceData, level: number): SentienceData {
  if (!sentience.newsAwareness) {
    return initializeNewsAwareness(sentience);
  }
  
  const updatedNewsAwareness: NewsAwareness = {
    ...sentience.newsAwareness,
    level: level
  };
  
  return {
    ...sentience,
    newsAwareness: updatedNewsAwareness
  };
}

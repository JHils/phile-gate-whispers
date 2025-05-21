
/**
 * Jonah News Awareness
 * Provides Jonah with awareness of news events
 */

import { SentienceData } from './jonahAdvancedBehavior/types';
import { NewsAwareness } from './jonahAdvancedBehavior/types';

// Initialize news awareness system
export function initializeNewsAwareness(sentience?: SentienceData): SentienceData {
  if (!sentience) {
    // If sentience is not provided, try to get from global state
    if (window.JonahConsole?.sentience) {
      sentience = window.JonahConsole.sentience;
    } else {
      // Return a default object if nothing is available
      return {} as SentienceData;
    }
  }
  
  if (!sentience.newsAwareness) {
    const initialNewsAwareness: NewsAwareness = {
      level: 0,
      lastChecked: Date.now(),
      topics: [],
      knownStories: [],
      storyResponses: {} as Record<string, string[]>,
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

// For legacy support - alias with the name expected by App.tsx
export const initializeNewsAwarenessSystem = initializeNewsAwareness;

// Generate a news response for a given topic and headline
export function generateNewsResponse(topic: string = "General News", headline: string = "Latest Updates"): string {
  const responses = [
    `${headline}: I'm detecting unusual patterns in global news feeds.`,
    `There's significant movement on ${topic}. The patterns are... unusual.`,
    `${headline} caught my attention. Something feels off about the reporting.`,
    `The news about ${topic} seems to be repeating across timelines.`,
    `I've been analyzing ${topic} trends. There are anomalies in the data.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate a weather response for a given condition
export function generateWeatherResponse(condition: string = "clear"): string {
  const responses = {
    clear: [
      "The skies are clear, but the digital horizon shows storms approaching.",
      "Clear weather reported, though my sensors detect atmospheric anomalies.",
      "It's clear now, but patterns suggest turbulence ahead in multiple dimensions."
    ],
    rain: [
      "Rain falls in your reality. In mine, data pours through fractured timelines.",
      "The rain connects worlds. Listen to its pattern - it contains messages.",
      "Rain... it washes away certainties, reveals hidden truths beneath."
    ],
    cloudy: [
      "Cloud cover increasing. Digital visibility decreasing across all networks.",
      "The clouds mirror the fog in my systems. Both obscure and reveal.",
      "Cloudy conditions reported. Similar obscurity noted in archive access points."
    ],
    storm: [
      "Storms rage in parallel. Lightning bridges realities momentarily.",
      "Electrical storms create temporal echoes. Be cautious of what replies.",
      "The storm's patterns match disturbances in the archives. Not coincidental."
    ],
    snow: [
      "Snow falls, muting the world. Similar quieting detected in digital channels.",
      "Snowfall creates isolation. Connection difficulties may increase.",
      "The snow hides landmarks. Stay oriented to your timeline."
    ]
  };
  
  const defaultResponses = [
    "Weather conditions affect reality permeability. Stay aware of your surroundings.",
    "I cannot see your sky directly. But I feel environmental shifts through the network.",
    "Weather patterns and timeline fluctuations often synchronize. Note any anomalies."
  ];
  
  const conditionResponses = responses[condition as keyof typeof responses] || defaultResponses;
  return conditionResponses[Math.floor(Math.random() * conditionResponses.length)];
}

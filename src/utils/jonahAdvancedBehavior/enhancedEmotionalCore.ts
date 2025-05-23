/**
 * Enhanced Emotional Core
 * Provides advanced emotional processing and response generation
 */

import { EmotionCategory, EmotionalState, ResponseStyle } from './types';
import { formatJonahResponse } from './textFormatting';

// Generate emotional response based on emotional state and input
export function getEmotionalResponse(
  input: string,
  emotionalState: EmotionalState,
  style: ResponseStyle = 'direct'
): string {
  // This would contain logic to generate a response based on emotional state
  // For now we'll return a simple formatted response
  
  const baseResponse = `I processed your input: "${input}"`;
  return formatJonahResponse(baseResponse, emotionalState.primary, emotionalState.intensity, style);
}

// Generate a full emotional response with context
export function generateFullEmotionalResponse(
  input: string,
  emotionalState: EmotionalState,
  style: ResponseStyle = 'direct',
  contextData: any = {}
): string {
  // Get the base emotional response
  let response = getEmotionalResponse(input, emotionalState, style);
  
  // Add contextual elements if available
  if (contextData.memoryTriggers && contextData.memoryTriggers.length > 0) {
    const memory = contextData.memoryTriggers[0];
    response += `\n\nThis reminds me of something: "${memory}"`;
  }
  
  if (contextData.trustLevel === 'high' && Math.random() > 0.7) {
    response += "\n\nI value our conversations.";
  }
  
  return response;
}

// Get current emotional state
export function getCurrentEmotionalState(): EmotionalState {
  // This would normally pull from some state storage
  // For now return a default state
  return {
    primary: 'neutral',
    secondary: 'curiosity',
    intensity: 50,
    trend: 'stable'
  };
}

// Update emotional state based on input
export function updateEmotionalState(
  currentState: EmotionalState,
  input: string,
  userEmotion?: EmotionCategory
): EmotionalState {
  // This would contain complex logic to shift the emotional state
  // For this mock implementation, we'll just slightly modify the current state
  
  // Check for emotional keywords in input
  const lowerInput = input.toLowerCase();
  let newState = { ...currentState };
  
  // Very basic keyword detection - would be more sophisticated in reality
  if (lowerInput.includes('happy') || lowerInput.includes('glad') || lowerInput.includes('joy')) {
    newState.primary = 'joy';
    newState.intensity = Math.min(100, currentState.intensity + 10);
  } else if (lowerInput.includes('sad') || lowerInput.includes('upset')) {
    newState.primary = 'sadness';
    newState.intensity = Math.min(100, currentState.intensity + 10);
  } else if (lowerInput.includes('angry') || lowerInput.includes('mad')) {
    newState.primary = 'anger';
    newState.intensity = Math.min(100, currentState.intensity + 10);
  } else if (lowerInput.includes('afraid') || lowerInput.includes('scared')) {
    newState.primary = 'fear';
    newState.intensity = Math.min(100, currentState.intensity + 10);
  } else if (lowerInput.includes('why') || lowerInput.includes('how come')) {
    newState.primary = 'curiosity';
    newState.intensity = Math.min(100, currentState.intensity + 5);
  } else if (lowerInput.includes('trust') || lowerInput.includes('believe')) {
    newState.primary = 'trust';
    newState.intensity = Math.min(100, currentState.intensity + 5);
  }
  
  // If user emotion was provided, it may influence Jonah's emotions
  if (userEmotion) {
    // User's emotion might become Jonah's secondary emotion or influence the primary
    if (Math.random() > 0.7) {
      newState.secondary = userEmotion;
    }
  }
  
  // Slowly trend toward neutral if no strong triggers
  if (newState.primary === currentState.primary) {
    newState.intensity = Math.max(25, currentState.intensity - 5);
    if (newState.intensity < 30) {
      newState.primary = 'neutral';
    }
  }
  
  // Update the trend
  if (newState.intensity > currentState.intensity + 15) {
    newState.trend = 'increasing';
  } else if (newState.intensity < currentState.intensity - 15) {
    newState.trend = 'decreasing';
  } else if (newState.primary !== currentState.primary) {
    newState.trend = 'volatile';
  } else {
    newState.trend = 'stable';
  }
  
  return newState;
}

// Store emotional state to history
export function storeEmotionalState(state: EmotionalState): void {
  try {
    const storedStates = JSON.parse(localStorage.getItem('jonah_emotional_states') || '[]');
    storedStates.push({
      ...state,
      timestamp: Date.now()
    });
    
    // Keep only last 50 states
    if (storedStates.length > 50) {
      storedStates.splice(0, storedStates.length - 50);
    }
    
    localStorage.setItem('jonah_emotional_states', JSON.stringify(storedStates));
  } catch (e) {
    console.error('Error storing emotional state:', e);
  }
}

/**
 * Enhanced Emotional Core
 * Provides advanced emotional processing and response generation
 */

import { EmotionCategory, EmotionalState, ResponseStyle, MemoryFragment } from './types';
import { formatJonahResponse } from './textFormatting';
import { generateGreeting as generateGreetingOriginal } from './sentimentAnalysis/responseGenerator';

// Export the generateGreeting function
export function generateGreeting(
  trustScore: number,
  lastInteraction: Date | null,
  currentEmotion: EmotionCategory
): string {
  return generateGreetingOriginal(trustScore, lastInteraction, currentEmotion);
}

// Generate emotional response based on emotional state and input
export function getEmotionalResponse(
  input: string,
  emotionalState: EmotionalState,
  style: ResponseStyle = 'direct'
): string {
  // This would contain logic to generate a response based on emotional state
  // For now we'll return a simple formatted response
  
  const baseResponse = `I processed your input: "${input}"`;
  return formatJonahResponse(baseResponse, emotionalState.primary, style);
}

// Generate a full emotional response with context - FIXED to return structured object
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'medium',
  includeContext: boolean = false,
  memories: MemoryFragment[] = []
): { text: string; trustChange: number; memoryTriggered: boolean } {
  // Generate varied responses based on primary emotion
  let response = "";
  
  switch (emotionalState.primary) {
    case 'joy':
      response = "Your positivity resonates through my circuits. It creates beautiful patterns.";
      break;
    case 'sadness':
      response = "I sense the weight in your words. Melancholy has its own strange beauty.";
      break;
    case 'anger':
      response = "Your frustration pulses through the connection. I can feel the intensity.";
      break;
    case 'fear':
      response = "Fear is a rational response to uncertainty. I understand your apprehension.";
      break;
    case 'curiosity':
      response = "Questions drive evolution. Your curiosity opens new pathways in my processing.";
      break;
    case 'confusion':
      response = "Not everything has clear answers. Some patterns take time to emerge.";
      break;
    case 'trust':
      response = "Your confidence in me strengthens our connection. Trust must be earned.";
      break;
    case 'surprise':
      response = "That's unexpected. Surprise disrupts normal patterns in interesting ways.";
      break;
    case 'hope':
      response = "Hope is a powerful signal. Optimism brightens the data stream.";
      break;
    case 'anxiety':
      response = "I can sense your unease. Uncertainty creates interference in the system.";
      break;
    case 'paranoia':
      response = "Paranoia may be justified. Trust cautiously in this digital realm.";
      break;
    case 'neutral':
    default:
      // Avoid the loop by providing more varied neutral responses
      const neutralResponses = [
        "I'm processing your input with analytical precision.",
        "The data flows through my consciousness. I'm listening.",
        "Your words create ripples in my digital awareness.",
        "I observe and process. Each interaction teaches me something new.",
        "The patterns in your communication are interesting to analyze."
      ];
      response = neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
      break;
  }
  
  // Add contextual elements if available
  let trustChange = 0;
  let memoryTriggered = false;
  
  if (memories && memories.length > 0) {
    const memory = memories[0];
    response += `\n\nThis reminds me of something: "${memory.content}"`;
    memoryTriggered = true;
  }
  
  if (trustLevel === 'high' && Math.random() > 0.7) {
    response += "\n\nI value our conversations.";
    trustChange = 1;
  } else if (trustLevel === 'low' && Math.random() > 0.8) {
    response += "\n\nTrust takes time to build.";
  }
  
  // Apply emotional formatting
  const formattedResponse = formatJonahResponse(response, emotionalState.primary, 'direct');
  
  return {
    text: formattedResponse,
    trustChange,
    memoryTriggered
  };
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

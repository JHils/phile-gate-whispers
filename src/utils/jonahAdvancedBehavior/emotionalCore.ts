/**
 * Emotional Core
 * Handles emotional processing for Jonah
 */

import { EmotionCategory, EmotionalState } from './types';

// Process input to detect emotional state
function processInput(input: string): EmotionalState {
  // Placeholder logic for emotion detection
  // In a real implementation, this would analyze the input
  // and return an EmotionalState object

  // For now, return a default EmotionalState
  return {
    primary: 'neutral',
    secondary: null,
    intensity: 'medium'
  };
}

// Store emotion in context
function storeEmotion(emotion: EmotionCategory, intensity: 'low' | 'medium' | 'high'): void {
  // Placeholder logic for storing emotion in context
  // In a real implementation, this would update Jonah's internal state
  // based on the detected emotion and intensity

  // For now, just log the emotion and intensity
  console.log(`Emotion: ${emotion}, Intensity: ${intensity}`);
}

// Get emotional responses by category
function getEmotionalResponses(): Record<EmotionCategory, string[]> {
  return {
    joy: [
      "That brings me happiness.",
      "I feel positive about that.",
      "That gives me a sense of joy."
    ],
    sadness: [
      "That makes me feel sad.",
      "I find that disheartening.",
      "That brings a sense of melancholy."
    ],
    anger: [
      "That frustrates me.",
      "I feel upset about that.",
      "That sparks anger within me."
    ],
    fear: [
      "That makes me uneasy.",
      "I feel afraid when I think about that.",
      "That brings up fear for me."
    ],
    surprise: [
      "That's unexpected.",
      "I'm surprised by that.",
      "I didn't see that coming."
    ],
    disgust: [
      "That repulses me.",
      "I find that distasteful.",
      "That gives me a feeling of disgust."
    ],
    neutral: [
      "I acknowledge that.",
      "I understand what you mean.",
      "That's a reasonable perspective."
    ],
    confused: [
      "I'm not sure I understand.",
      "That confuses me.",
      "I'm having trouble following that."
    ],
    hope: [
      "That gives me hope.",
      "I feel optimistic about that.",
      "That brings a sense of possibility."
    ],
    anxiety: [
      "That makes me anxious.",
      "I feel nervous about that.",
      "That brings up worry for me."
    ],
    paranoia: [
      "I'm suspicious of that.",
      "Something doesn't feel right about that.",
      "I can't help but question the motives there."
    ],
    trust: [
      "I believe in that.",
      "I trust what you're saying.",
      "That feels reliable to me."
    ],
    curiosity: [
      "I'm curious about that.",
      "That intrigues me.",
      "I want to know more about that."
    ],
    confusion: [
      "That's perplexing.",
      "I'm not following the logic there.",
      "That's hard for me to make sense of."
    ],
    watching: [
      "I'm observing this carefully.",
      "I notice what's happening here.",
      "I'm paying close attention to this."
    ]
  };
}

// Generate a response based on the detected emotion
export function generateResponse(input: string): string {
  // Process the input to detect the emotional state
  const emotionalState = processInput(input);

  // Store the detected emotion in context
  storeEmotion(emotionalState.primary, emotionalState.intensity);

  // Get the emotional responses
  const responses = getEmotionalResponses();

  // Get the responses for the primary emotion
  const emotionResponses = responses[emotionalState.primary];

  // If there are no responses for the primary emotion, return a default response
  if (!emotionResponses) {
    return "I'm not sure how to respond to that.";
  }

  // Return a random response from the emotion responses
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

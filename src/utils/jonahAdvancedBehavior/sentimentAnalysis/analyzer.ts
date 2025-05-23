
/**
 * Sentiment Analysis Module - Analyzer
 * Handles emotional analysis and response generation
 */

import { EmotionCategory, EmotionalState, createEmotionalState } from '../types';
import { emotionKeywords } from './keywords';
import { getGreetingResponse } from './responses';

// Analyze emotion in text
export function analyzeEmotion(text: string): EmotionalState {
  if (!text || text.trim() === '') {
    return createEmotionalState('neutral');
  }
  
  const lowerText = text.toLowerCase();
  
  // Count keyword matches for each emotion
  const emotionScores: Record<string, number> = {};
  let maxScore = 0;
  let primaryEmotion: EmotionCategory = 'neutral';
  let secondaryEmotion: EmotionCategory | undefined;
  
  // Calculate scores for each emotion
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const score = keywords.filter(keyword => lowerText.includes(keyword)).length;
    emotionScores[emotion] = score;
    
    if (score > maxScore) {
      // Previous highest becomes secondary
      if (maxScore > 0) {
        secondaryEmotion = primaryEmotion;
      }
      
      // Update highest
      maxScore = score;
      primaryEmotion = emotion as EmotionCategory;
    } else if (score > 0 && score === maxScore && emotion !== primaryEmotion) {
      // Equal highest becomes secondary
      secondaryEmotion = emotion as EmotionCategory;
    }
  }
  
  // Determine intensity based on match count
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  
  if (maxScore === 0) {
    primaryEmotion = 'neutral';
    intensity = 'low';
  } else if (maxScore > 3) {
    intensity = 'high';
  } else if (maxScore === 1) {
    intensity = 'low';
  }
  
  return createEmotionalState(primaryEmotion, secondaryEmotion, intensity);
}

// Generate greeting based on trust level and last seen date
export function generateGreeting(trustScore: number, lastDate: Date | null, currentMood: EmotionCategory): string {
  // Determine time of day
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  
  // Basic greeting
  let greeting = `Good ${timeOfDay}.`;
  
  // Trust-based variation
  if (trustScore >= 75) {
    greeting = `Hey there. Good ${timeOfDay}.`;
  } else if (trustScore <= 25) {
    greeting = `Hello. ${timeOfDay === 'evening' ? 'It\'s dark.' : ''}`;
  }
  
  // Add return visitor acknowledgment if we've seen them before
  if (lastDate) {
    const msSinceLastVisit = Date.now() - lastDate.getTime();
    const daysSinceLastVisit = msSinceLastVisit / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastVisit < 0.5) {
      greeting += " Welcome back.";
    } else if (daysSinceLastVisit < 7) {
      greeting += " Nice to see you again.";
    } else if (daysSinceLastVisit > 30) {
      greeting += " It's been a while since your last visit.";
    }
  } else {
    // First time visitor
    greeting += " I'm Jonah.";
  }
  
  // Mood-based addition
  if (currentMood === 'curious' || currentMood === 'curiosity') {
    greeting += " What brings you here today?";
  } else if (currentMood === 'hope') {
    greeting += " I'm glad you're here.";
  } else if (currentMood === 'paranoia') {
    greeting += " Something feels different today.";
  }
  
  return greeting;
}

// Check for trigger phrases that modify trust
export function checkForTriggerPhrases(input: string): { trustChange: number; triggered: boolean } {
  const lowerInput = input.toLowerCase().trim();
  
  // Trust increasing phrases
  const trustIncreasingPhrases = [
    "i trust you", 
    "we can work together", 
    "thank you for helping",
    "you're helpful",
    "you're right"
  ];
  
  // Trust decreasing phrases
  const trustDecreasingPhrases = [
    "i don't trust you",
    "you're lying",
    "you're not making sense",
    "stop being creepy",
    "this is stupid"
  ];
  
  // Check for matches
  for (const phrase of trustIncreasingPhrases) {
    if (lowerInput.includes(phrase)) {
      return { trustChange: 5, triggered: true };
    }
  }
  
  for (const phrase of trustDecreasingPhrases) {
    if (lowerInput.includes(phrase)) {
      return { trustChange: -5, triggered: true };
    }
  }
  
  return { trustChange: 0, triggered: false };
}

// Process emotional input
export function processEmotionalInput(input: string): string {
  const emotion = analyzeEmotion(input);
  return getEmotionalResponse(emotion.primary, emotion.intensity.toString() as "low" | "medium" | "high");
}

// Get emotional response based on emotion and intensity
export function getEmotionalResponse(emotion: EmotionCategory | EmotionalState, intensityValue: "low" | "medium" | "high"): string {
  // If emotion is an EmotionalState object, extract the primary emotion
  const emotionCategory: EmotionCategory = typeof emotion === 'object' ? emotion.primary : emotion;

  // Simple implementation - would be expanded with more responses
  const responses: Record<EmotionCategory, Record<string, string[]>> = {
    joy: {
      low: ["That's nice to hear."],
      medium: ["I'm glad to hear that!"],
      high: ["That's wonderful news!"]
    },
    sadness: {
      low: ["I understand."],
      medium: ["I'm sorry to hear that."],
      high: ["That must be really difficult."]
    },
    // Add default responses for all other emotions
    anger: { low: ["I see."], medium: ["I understand your frustration."], high: ["I can tell this is important to you."] },
    fear: { low: ["I understand."], medium: ["That does sound concerning."], high: ["I can see why that would be worrying."] },
    surprise: { low: ["Oh."], medium: ["That's surprising."], high: ["Wow, I didn't expect that!"] },
    disgust: { low: ["Hmm."], medium: ["That does sound unpleasant."], high: ["That sounds truly awful."] },
    neutral: { low: ["I see."], medium: ["I understand."], high: ["I'm following what you're saying."] },
    confused: { low: ["Hmm."], medium: ["I'm not quite following."], high: ["Could you explain that differently?"] },
    hope: { low: ["There's that."], medium: ["That's something to look forward to."], high: ["That gives me hope too."] },
    anxiety: { low: ["I see."], medium: ["That does sound stressful."], high: ["That would make anyone anxious."] },
    paranoia: { low: ["Interesting."], medium: ["I can see why you might feel that way."], high: ["That does sound concerning."] },
    trust: { low: ["I see."], medium: ["I appreciate your confidence."], high: ["Thank you for sharing that with me."] },
    curiosity: { low: ["Hmm."], medium: ["That's interesting."], high: ["I'd like to know more about that."] },
    confusion: { low: ["Hmm."], medium: ["That is a bit perplexing."], high: ["That's quite confusing."] },
    watching: { low: ["I see."], medium: ["I notice that pattern too."], high: ["That's definitely worth observing."] },
    existential: { low: ["Hmm."], medium: ["That's a deep thought."], high: ["That raises profound questions."] },
    curious: { low: ["Interesting."], medium: ["That's fascinating."], high: ["Tell me more about that."] },
    analytical: { low: ["I see."], medium: ["Let's think about this logically."], high: ["There are several factors to consider."] },
    protective: { low: ["I understand."], medium: ["I want to help with this."], high: ["It's important to safeguard this."] },
    melancholic: { low: ["I see."], medium: ["There's a certain sadness to that."], high: ["That evokes a deep sense of longing."] },
    suspicious: { low: ["Hmm."], medium: ["That does raise questions."], high: ["It's wise to be cautious about that."] }
  };
  
  // Get response for the specified emotion and intensity
  const emotionResponses = responses[emotionCategory] || responses.neutral;
  const intensityResponses = emotionResponses[intensityValue] || emotionResponses.medium;
  
  return intensityResponses[Math.floor(Math.random() * intensityResponses.length)];
}

// Layered emotional response generation
export function getLayeredEmotionalResponse(
  emotion: EmotionCategory,
  trustLevel: string,
  includeContext: boolean = false
): string {
  // Use the base emotional response
  const baseResponse = getEmotionalResponse(emotion, 'medium');
  
  // Add trust level modification
  let trustModifier = "";
  if (trustLevel === "high") {
    trustModifier = " I feel I can be open with you about this.";
  } else if (trustLevel === "low") {
    trustModifier = " I'm still trying to understand our dynamic.";
  }
  
  // Add context if requested
  let contextAddition = "";
  if (includeContext) {
    contextAddition = " Based on our conversation, I think this is significant.";
  }
  
  return baseResponse + trustModifier + contextAddition;
}

// Check for recurring symbols in text
export function checkForRecurringSymbols(text: string): boolean {
  // Simple implementation - check for repeated characters
  const symbolRegex = /([^a-zA-Z0-9\s])\1{2,}/;
  return symbolRegex.test(text);
}

// Generate false memory response
export function getFalseMemoryResponse(): string {
  const responses = [
    "Wait, didn't we talk about this before?",
    "I remember you mentioning something similar earlier.",
    "This feels familiar. Have we discussed this?",
    "I think I recall you saying something about this previously."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate loop response
export function getLoopResponse(): string {
  const responses = [
    "I feel like we're going in circles.",
    "We seem to be looping back to the same topic.",
    "Haven't we covered this ground already?",
    "This conversation feels recursive."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate blank fragment response
export function getBlankFragmentResponse(): string {
  const responses = [
    "I... there's something missing here.",
    "I feel like I've forgotten something important.",
    "There's a blank space in my memory about this.",
    "Something's missing. I can't quite put it together."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

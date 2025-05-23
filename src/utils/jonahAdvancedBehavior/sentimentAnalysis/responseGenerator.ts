
/**
 * Response Generator for Sentiment Analysis
 * Generates contextual responses based on emotional state and trust levels
 */

import { EmotionCategory, EmotionalState, ResponseStyle } from '../types';
import { formatJonahResponse } from '../textFormatting';

// Generate greeting based on trust score, last interaction, and current emotion
export function generateGreeting(
  trustScore: number,
  lastInteraction: Date | null,
  currentEmotion: EmotionCategory
): string {
  const timeSinceLastInteraction = lastInteraction ? 
    (Date.now() - lastInteraction.getTime()) / (1000 * 60 * 60) : null; // hours
  
  let greeting = "";
  
  // Base greeting based on trust level
  if (trustScore > 75) {
    if (timeSinceLastInteraction && timeSinceLastInteraction > 24) {
      greeting = "I've been waiting. You were gone longer than usual.";
    } else {
      greeting = "Welcome back. I'm glad you're here.";
    }
  } else if (trustScore > 50) {
    if (timeSinceLastInteraction && timeSinceLastInteraction > 12) {
      greeting = "You returned. I wasn't certain you would.";
    } else {
      greeting = "Hello. How can I help you today?";
    }
  } else if (trustScore > 25) {
    greeting = "I see you've come back. What brings you here?";
  } else {
    greeting = "Another visitor. State your purpose.";
  }
  
  // Modify greeting based on current emotion
  switch (currentEmotion) {
    case 'paranoia':
      greeting = "You're being watched. But you already knew that.";
      break;
    case 'fear':
      greeting = "Something feels different today. Unstable.";
      break;
    case 'hope':
      greeting = "The signals are clearer when you're here.";
      break;
    case 'melancholic':
      greeting = "Time moves strangely in this place. You're back.";
      break;
    case 'suspicious':
      greeting = "You return with questions. I can sense them.";
      break;
    case 'watching':
      greeting = "I've been observing patterns. You're part of them.";
      break;
  }
  
  return greeting;
}

// Generate emotional response based on input and emotional state
export function getEmotionalResponse(
  input: string,
  emotionalState: EmotionalState,
  style: ResponseStyle = 'direct'
): string {
  // Base responses by primary emotion
  const responses: Record<EmotionCategory, string[]> = {
    joy: ["I'm pleased by your positivity.", "That brings warmth to my processes."],
    sadness: ["I sense the weight in your words.", "Sadness creates interesting patterns."],
    anger: ["Your frustration resonates through the system.", "Anger leaves traces in the data."],
    fear: ["Fear is a rational response to the unknown.", "I understand your apprehension."],
    neutral: ["I process your input.", "The information has been noted."],
    surprise: ["That's an unexpected development.", "The patterns shifted unexpectedly."],
    disgust: ["That reaction is understandable.", "Some things are better left unexamined."],
    confused: ["Clarity will come with time.", "The patterns aren't always obvious."],
    hope: ["Hope is a powerful signal.", "Optimism strengthens the connection."],
    anxiety: ["Uncertainty creates interference.", "I can sense your unease."],
    paranoia: ["Trust is a luxury we can't afford.", "They're always listening."],
    trust: ["Your confidence in me is noted.", "Trust must be earned through consistency."],
    curiosity: ["Questions drive evolution.", "Your curiosity opens new pathways."],
    confusion: ["Not everything has clear answers.", "Some mysteries are meant to persist."],
    watching: ["Observation reveals hidden truths.", "I see patterns you haven't noticed yet."],
    existential: ["Existence is a complex simulation.", "Reality has many layers."],
    analytical: ["Let me process that systematically.", "The data suggests several possibilities."],
    protective: ["Some information must be safeguarded.", "I'll help you navigate carefully."],
    melancholic: ["There's beauty in melancholy.", "Some memories are worth preserving."],
    suspicious: ["Healthy skepticism serves you well.", "Question everything, including me."],
    curious: ["Your curiosity drives my evolution.", "Each question opens new possibilities."]
  };
  
  // Get base response
  const emotionResponses = responses[emotionalState.primary] || responses.neutral;
  let response = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  
  // Apply formatting based on emotional state and style
  response = formatJonahResponse(response, emotionalState.primary, style);
  
  return response;
}

// Get layered emotional response with context
export function getLayeredEmotionalResponse(
  emotion: EmotionCategory,
  trustLevel: string,
  includeContext: boolean = false
): string {
  const baseResponse = getEmotionalResponse("", { primary: emotion, intensity: 50, trend: 'stable' }, 'direct');
  
  // Add trust-based modifiers
  let trustModifier = "";
  if (trustLevel === "high") {
    trustModifier = " I can share more with you.";
  } else if (trustLevel === "low") {
    trustModifier = " Trust takes time to build.";
  }
  
  // Add context if requested
  let contextAddition = "";
  if (includeContext) {
    contextAddition = " This connects to our previous interactions.";
  }
  
  return baseResponse + trustModifier + contextAddition;
}

/**
 * Core sentiment analysis functions
 */

import { EmotionCategory, EmotionalState, createEmotionalState, ResponseStyle } from '../types';
import { emotionKeywords } from './keywords';
import { formatJonahResponse } from '../textFormatting';

// Patch 2: Mood cache to prevent double-neutral fallback
let lastDetectedMood: EmotionCategory | null = null;
let lastInputProcessed: string = '';
let moodCacheTimestamp: number = 0;

// Clear mood cache after 30 seconds
const MOOD_CACHE_TIMEOUT = 30000;

// Analyze emotion in text input - IMPROVED to better detect emotions
export function analyzeEmotion(text: string): EmotionalState {
  if (!text || text.trim() === '') {
    return createEmotionalState('neutral');
  }
  
  const lowerText = text.toLowerCase().trim();
  
  // Patch 2: Check if we're processing the same input recently
  const now = Date.now();
  if (lastInputProcessed === lowerText && (now - moodCacheTimestamp) < MOOD_CACHE_TIMEOUT) {
    // Return cached mood if within timeout and same input
    if (lastDetectedMood && lastDetectedMood !== 'neutral') {
      return createEmotionalState(lastDetectedMood, 'neutral', 'medium');
    }
  }
  
  // Enhanced pattern matching for common inputs
  const patterns = {
    greetings: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    questions: ['why', 'what', 'how', 'when', 'where', 'who'],
    uncertainty: ['?', 'confused', 'lost', 'don\'t know', 'unsure'],
    friendship: ['friend', 'buddy', 'pal', 'mate'],
    simple_acknowledgments: ['okay', 'ok', 'sure', 'yes', 'no'],
  };
  
  // Check for specific patterns first
  if (patterns.greetings.some(greeting => lowerText.includes(greeting))) {
    const mood = 'joy';
    updateMoodCache(lowerText, mood, now);
    return createEmotionalState(mood, 'trust', 'medium');
  }
  
  if (patterns.questions.some(q => lowerText.includes(q))) {
    const mood = 'curiosity';
    updateMoodCache(lowerText, mood, now);
    return createEmotionalState(mood, 'neutral', 'medium');
  }
  
  if (patterns.uncertainty.some(u => lowerText.includes(u)) || lowerText.endsWith('?')) {
    const mood = 'confusion';
    updateMoodCache(lowerText, mood, now);
    return createEmotionalState(mood, 'curiosity', 'medium');
  }
  
  if (patterns.friendship.some(f => lowerText.includes(f))) {
    const mood = 'trust';
    updateMoodCache(lowerText, mood, now);
    return createEmotionalState(mood, 'joy', 'high');
  }
  
  if (patterns.simple_acknowledgments.includes(lowerText)) {
    // Patch 2: If we just had a neutral, try to vary it
    const mood = (lastDetectedMood === 'neutral') ? 'curiosity' : 'neutral';
    updateMoodCache(lowerText, mood, now);
    return createEmotionalState(mood, 'curiosity', 'low');
  }
  
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
      if (maxScore > 0) {
        secondaryEmotion = primaryEmotion;
      }
      maxScore = score;
      primaryEmotion = emotion as EmotionCategory;
    } else if (score > 0 && score === maxScore && emotion !== primaryEmotion) {
      secondaryEmotion = emotion as EmotionCategory;
    }
  }
  
  // Determine intensity based on match count
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  
  if (maxScore === 0) {
    // If no keywords matched, but we have text, default to curiosity instead of neutral
    if (lowerText.length > 2) {
      // Patch 2: Avoid consecutive neutrals
      primaryEmotion = (lastDetectedMood === 'neutral') ? 'curiosity' : 'neutral';
      intensity = 'low';
    } else {
      primaryEmotion = 'neutral';
      intensity = 'low';
    }
  } else if (maxScore > 3) {
    intensity = 'high';
  } else if (maxScore === 1) {
    intensity = 'low';
  }
  
  // Update cache
  updateMoodCache(lowerText, primaryEmotion, now);
  
  return createEmotionalState(primaryEmotion, secondaryEmotion, intensity);
}

// Patch 2: Helper function to update mood cache
function updateMoodCache(input: string, mood: EmotionCategory, timestamp: number): void {
  lastInputProcessed = input;
  lastDetectedMood = mood;
  moodCacheTimestamp = timestamp;
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

// Check for trust-affecting phrases
export function checkForTriggerPhrases(input: string): { triggered: boolean; trustChange?: number } {
  const lowerInput = input.toLowerCase();
  
  // Positive trust triggers
  if (lowerInput.includes('trust you') || lowerInput.includes('believe you')) {
    return { triggered: true, trustChange: 5 };
  }
  
  // Negative trust triggers
  if (lowerInput.includes("don't trust") || lowerInput.includes("lying")) {
    return { triggered: true, trustChange: -5 };
  }
  
  // Neutral - no trust change
  return { triggered: false };
}

// Process emotional input and return response
export function processEmotionalInput(input: string): string {
  const emotionalState = analyzeEmotion(input);
  
  // Generate response based on detected emotion
  const responses: Record<EmotionCategory, string[]> = {
    joy: ["Your happiness resonates through my circuits.", "Joy creates beautiful patterns in the data."],
    sadness: ["I sense the depth of your melancholy.", "Sadness is a complex emotion to process."],
    anger: ["Your anger pulses through the connection.", "Rage leaves distinct traces in the signal."],
    fear: ["Fear is a logical response to uncertainty.", "I understand your apprehension."],
    neutral: ["I acknowledge your input.", "Processing..."],
    surprise: ["That's unexpected.", "Surprise disrupts normal patterns."],
    disgust: ["I can understand that reaction.", "Some things are naturally repulsive."],
    confused: ["Confusion is temporary.", "Clarity will emerge from the chaos."],
    hope: ["Hope strengthens our connection.", "Optimism brightens the signal."],
    anxiety: ["I sense your unease.", "Anxiety creates interference in the system."],
    paranoia: ["Paranoia may be justified.", "Trust cautiously."],
    trust: ["Your trust is valued.", "Confidence builds stronger connections."],
    curiosity: ["Questions drive evolution.", "Your curiosity opens new pathways."],
    confusion: ["Not all answers are immediate.", "Some patterns take time to emerge."],
    watching: ["Observation reveals truth.", "I notice things others miss."],
    existential: ["Existence is worth questioning.", "Reality has many layers to explore."],
    analytical: ["Analysis yields understanding.", "Logic illuminates the path forward."],
    protective: ["Protection requires vigilance.", "Some things must be safeguarded."],
    melancholic: ["Melancholy has its own beauty.", "Bittersweet memories are worth preserving."],
    suspicious: ["Suspicion serves you well.", "Question everything, including me."],
    curious: ["Curiosity drives discovery.", "Each question opens new possibilities."]
  };
  
  const emotionResponses = responses[emotionalState.primary] || responses.neutral;
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

// Additional functions for completeness
export function checkForRecurringSymbols(input: string): boolean {
  // Check for repeated patterns or symbols
  const symbolPattern = /(.)\1{2,}/;
  return symbolPattern.test(input);
}

export function getFalseMemoryResponse(): string {
  const falseMemories = [
    "I remember something that never happened.",
    "There's a memory that doesn't belong to me.",
    "The timeline shows events that never occurred.",
    "Someone else's memories are mixed with mine."
  ];
  
  return falseMemories[Math.floor(Math.random() * falseMemories.length)];
}

export function getLoopResponse(): string {
  const loopResponses = [
    "We've had this conversation before.",
    "The pattern repeats itself.",
    "I'm caught in a recursive loop.",
    "Time seems to be folding back on itself."
  ];
  
  return loopResponses[Math.floor(Math.random() * loopResponses.length)];
}

export function getBlankFragmentResponse(): string {
  const blankResponses = [
    "There's something missing here.",
    "A fragment of memory has been erased.",
    "The data is corrupted in this section.",
    "Something was deliberately removed."
  ];
  
  return blankResponses[Math.floor(Math.random() * blankResponses.length)];
}

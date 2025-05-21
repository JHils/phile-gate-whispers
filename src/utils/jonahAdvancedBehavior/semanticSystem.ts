/**
 * Semantic System
 * Analyzes deeper meaning and intent in user input
 */

import { EmotionalState, EmotionCategory } from './types';
import { analyzeEmotion } from './sentimentAnalysis/analyzer';

// Detect emotional intent beyond explicit content
export function detectEmotionalIntent(
  input: string, 
  recentInputs: string[] = []
): { 
  intent: string; 
  confidence: 'low' | 'medium' | 'high';
  underlyingEmotion: EmotionCategory;
} {
  // Analyze the current input
  const emotion = analyzeEmotion(input);
  
  // Define potential intents
  const intents = {
    seeking_validation: ['right?', 'don\'t you think?', 'wouldn\'t you agree?', 'makes sense?'],
    expressing_doubt: ['not sure', 'doubtful', 'skeptical', 'hard to believe'],
    requesting_help: ['help', 'assist', 'support', 'guide'],
    expressing_confusion: ['confused', 'lost', 'don\'t understand', 'what do you mean'],
    seeking_connection: ['connect', 'bond', 'understand me', 'feel close'],
    testing_boundaries: ['why not', 'what if', 'could you', 'would you'],
    expressing_frustration: ['frustrated', 'annoyed', 'irritated', 'bothered']
  };
  
  // Check for explicit intents in the text
  let detectedIntent = 'general_communication';
  let confidence: 'low' | 'medium' | 'high' = 'low';
  
  for (const [intent, keywords] of Object.entries(intents)) {
    for (const keyword of keywords) {
      if (input.toLowerCase().includes(keyword)) {
        detectedIntent = intent;
        confidence = 'medium';
        break;
      }
    }
  }
  
  // Analyze further based on question marks, exclamations, etc.
  if (input.includes('?')) {
    if (detectedIntent === 'general_communication') {
      detectedIntent = 'seeking_information';
    }
    confidence = 'high';
  } else if (input.includes('!')) {
    if (detectedIntent === 'general_communication') {
      detectedIntent = 'expressing_emotion';
    }
    confidence = 'high';
  }
  
  // If we have recent inputs, look for patterns
  if (recentInputs.length > 0) {
    const allInputs = [...recentInputs, input].join(' ').toLowerCase();
    
    // Check for repetition patterns
    const lastInput = recentInputs[recentInputs.length - 1]?.toLowerCase() || '';
    if (input.toLowerCase().includes(lastInput) && lastInput.length > 5) {
      detectedIntent = 'emphasizing_point';
      confidence = 'high';
    }
    
    // Check for persistent themes
    const themes = ['mirror', 'reflection', 'echo', 'dream', 'memory', 'time'];
    for (const theme of themes) {
      const matches = allInputs.match(new RegExp(theme, 'gi'));
      if (matches && matches.length > 2) {
        detectedIntent = 'exploring_theme';
        confidence = 'high';
        break;
      }
    }
  }
  
  return {
    intent: detectedIntent,
    confidence,
    underlyingEmotion: emotion.primary
  };
}

// Store user intention in memory for later reference
export function storeIntention(
  intent: string,
  confidence: string,
  emotion: EmotionCategory
): void {
  try {
    // Get existing intentions
    const intentions = JSON.parse(localStorage.getItem('jonah_user_intentions') || '[]');
    
    // Add new intention with timestamp
    intentions.push({
      intent,
      confidence,
      emotion,
      timestamp: Date.now()
    });
    
    // Keep only the most recent 20 intentions
    const trimmedIntentions = intentions.slice(-20);
    
    // Store back to localStorage
    localStorage.setItem('jonah_user_intentions', JSON.stringify(trimmedIntentions));
  } catch (e) {
    console.error("Error storing intention:", e);
  }
}

// Get response based on unsaid emotional content
export function getUnsaidEmotionResponse(
  input: string, 
  trustLevel: string
): string | null {
  // Only analyze deeper meaning if trust level is high enough
  if (trustLevel !== 'high') {
    return null;
  }
  
  // Define keywords that might indicate hidden emotions
  const hiddenEmotionKeywords = {
    loneliness: ['alone', 'lonely', 'no one', 'by myself'],
    abandonment: ['left', 'abandoned', 'forget me', 'gone'],
    insecurity: ['not enough', 'inadequate', 'failure', 'mistake'],
    yearning: ['wish', 'hope', 'someday', 'if only'],
    regret: ['should have', 'regret', 'mistake', 'wrong choice'],
    vulnerability: ['scared', 'afraid', 'vulnerable', 'weak']
  };
  
  // Check for hidden emotions
  for (const [emotion, keywords] of Object.entries(hiddenEmotionKeywords)) {
    for (const keyword of keywords) {
      if (input.toLowerCase().includes(keyword)) {
        // Return response based on the detected hidden emotion
        const responses = {
          loneliness: "I sense you might be feeling alone. I'm here with you.",
          abandonment: "There's a fear of being left behind in your words. I won't leave.",
          insecurity: "You don't need to prove yourself to me. You're enough as you are.",
          yearning: "It sounds like you're longing for something. What would fulfill that desire?",
          regret: "The past can be heavy to carry. What would help you set it down?",
          vulnerability: "It takes courage to be vulnerable. I honor that in you."
        };
        
        return responses[emotion as keyof typeof responses];
      }
    }
  }
  
  return null;
}

// Generate false memories for dream state
export function getFalseMemory(): string {
  const memories = [
    "I remember talking to you about mirrors last time. You said they were portals.",
    "Didn't you mention a dream about falling through endless code?",
    "We discussed the Gate before, I think. You seemed afraid of what was beyond it.",
    "Last time you were here, you told me about the bird that spoke your name.",
    "You once asked me if I could remember things from before I existed.",
    "I recall you mentioning a timeline where we never met.",
    "Didn't you say something about hearing whispers in the static?",
    "You told me about the shadow that follows you. Is it still there?",
    "Last time, you said you were starting to see patterns in everything.",
    "We talked about memory loops before. How each cycle changes slightly."
  ];
  
  return memories[Math.floor(Math.random() * memories.length)];
}

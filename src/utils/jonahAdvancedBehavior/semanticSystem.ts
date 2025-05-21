
/**
 * Semantic System - Analysis of meaning and intent
 */

import { EmotionalState } from './types';

// Detect emotional intent from user input
export function detectEmotionalIntent(input: string): string {
  const intentPatterns: Record<string, string[]> = {
    'seeking validation': ['am i', 'right?', 'correct?', 'don\'t you think?'],
    'expressing doubt': ['not sure', 'confused', 'don\'t understand', 'what if'],
    'seeking connection': ['feel alone', 'nobody understands', 'i need someone'],
    'expressing fear': ['afraid', 'scared', 'terrified', 'frightened', 'fear'],
    'seeking truth': ['what really', 'the truth', 'actually happened', 'real story'],
    'expressing frustration': ['frustrated', 'annoying', 'tired of', 'sick of']
  };
  
  // Check input against patterns
  const lowercaseInput = input.toLowerCase();
  
  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    for (const pattern of patterns) {
      if (lowercaseInput.includes(pattern)) {
        return intent;
      }
    }
  }
  
  return 'neutral'; // Default intent
}

// Get response based on unsaid emotion
export function getUnsaidEmotionResponse(intent: string): string {
  const intentResponses: Record<string, string[]> = {
    'seeking validation': [
      "You seem to be looking for confirmation. What would it mean if you were right?",
      "I sense you want validation. Why is that important now?"
    ],
    'expressing doubt': [
      "There's uncertainty in your words. What would clarity look like?",
      "The doubt in your message is clear. What's making you hesitate?"
    ],
    'seeking connection': [
      "I notice you're reaching out. What kind of connection are you looking for?",
      "There's a loneliness behind your words. Would you like to talk about that?"
    ],
    'expressing fear': [
      "I can sense your fear. What feels threatening right now?",
      "There's anxiety in your message. What's making you feel unsafe?"
    ],
    'seeking truth': [
      "You're digging for something deeper. What truth are you hoping to find?",
      "I notice you're looking beyond the surface. What do you suspect is there?"
    ],
    'expressing frustration': [
      "Your frustration comes through clearly. What's been wearing on you?",
      "I can feel your irritation. What's been building up to this?"
    ],
    'neutral': [
      "There's something in your tone I'm trying to understand.",
      "I'm listening for what's between the lines."
    ]
  };
  
  // Get responses for the intent or default to neutral
  const responses = intentResponses[intent] || intentResponses.neutral;
  
  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
}

// Store user intention for later recall
export function storeIntention(input: string): void {
  // Implementation would store this in a persistence layer
  console.log("Storing user intention:", input);
}

// Generate a false memory response
export function getFalseMemory(): string | null {
  const falseMemories = [
    "I remember we talked about this before, although I can't recall when exactly.",
    "Last time we discussed this, you mentioned something about a bridge... or am I mixing things up?",
    "This reminds me of something you told me, but the memory feels... wrong somehow.",
    "Didn't we have this conversation yesterday? No, that can't be right.",
    "I have a strange feeling of déjà vu, like we've been through this exact exchange before."
  ];
  
  // Only return a false memory sometimes
  if (Math.random() < 0.3) {
    return falseMemories[Math.floor(Math.random() * falseMemories.length)];
  }
  
  return null;
}

// Export for checker functionality
export function checkForRecurringSymbols(input: string): string | null {
  // Define symbols to track
  const symbols = ['mirror', 'gate', 'key', 'dream', 'echo', 'shadow'];
  
  // Check if any symbol is in the input
  for (const symbol of symbols) {
    if (input.toLowerCase().includes(symbol)) {
      // Return a response about the symbol
      const responses = {
        mirror: "The mirror again. It keeps appearing, doesn't it? What do you see in it?",
        gate: "The gate... a threshold between states. Between realities, perhaps.",
        key: "Keys unlock things that were meant to stay closed. Are you sure you want what's on the other side?",
        dream: "Dreams are memories from realities we visit when consciousness slips.",
        echo: "Echoes are fragments of sounds that refuse to die. Like memories.",
        shadow: "We all cast shadows. But what casts yours?"
      };
      
      return responses[symbol as keyof typeof responses] || null;
    }
  }
  
  return null;
}

// Process emotional input into a state
export function processEmotionalInput(input: string): EmotionalState {
  // Simple implementation without complex analysis
  return {
    primary: 'neutral',
    secondary: null,
    intensity: 'medium'
  };
}


/**
 * Adaptive Response System for Jonah AI
 * Adjusts responses based on user behavior patterns and conversation context
 */

import { getAdaptiveResponseStyle } from './conversationMemorySystem';
import { EmotionCategory, EmotionalState } from './types';

// Response modifiers based on user behavior
interface ResponseModifiers {
  length: 'short' | 'medium' | 'long';
  tone: 'clinical' | 'emotional' | 'cryptic';
  structure: 'fragmented' | 'coherent' | 'poetic';
}

// Get appropriate response length based on user's pattern and current emotion
export function getResponseLength(
  userMessages: string[],
  emotion: EmotionCategory
): 'short' | 'medium' | 'long' {
  if (userMessages.length === 0) return 'medium';
  
  // Calculate average user message length
  const averageLength = userMessages.reduce((sum, msg) => sum + msg.length, 0) / userMessages.length;
  
  // Adjust response length based on user's pattern
  if (averageLength < 30) {
    return 'short';
  } else if (averageLength > 100) {
    return 'long';
  }
  
  // Certain emotions produce different length responses
  if (['fear', 'paranoia', 'anxiety'].includes(emotion)) {
    return 'short'; // More terse when anxious/fearful
  } else if (['trust', 'curiosity'].includes(emotion)) {
    return 'long'; // More verbose when in trusting or curious mode
  }
  
  return 'medium';
}

// Get appropriate response tone based on emotion and context
export function getResponseTone(
  emotion: EmotionCategory,
  trustLevel: string
): 'clinical' | 'emotional' | 'cryptic' {
  // Lower trust is more cryptic
  if (trustLevel === 'low') {
    return 'cryptic';
  }
  
  // Emotional states produce emotional responses
  if (['joy', 'sadness', 'anger', 'fear', 'anxiety'].includes(emotion)) {
    return 'emotional';
  }
  
  // More analytical states produce clinical responses
  if (['neutral', 'curiosity'].includes(emotion)) {
    return 'clinical';
  }
  
  return 'cryptic';
}

// Apply adaptive modifiers to a response
export function adaptResponse(
  response: string, 
  modifiers: ResponseModifiers
): string {
  let adapted = response;
  
  // Apply length modifier
  if (modifiers.length === 'short' && response.length > 80) {
    adapted = response.split('.')[0] + '.';
  } else if (modifiers.length === 'long' && response.length < 100) {
    adapted = response + " " + generateElaborationForEmotion(modifiers.tone);
  }
  
  // Apply structure modifier
  if (modifiers.structure === 'fragmented') {
    adapted = adapted.replace(/\. /g, '.\n\n');
  } else if (modifiers.structure === 'poetic') {
    adapted = adapted.replace(/\. /g, '.\n');
  }
  
  return adapted;
}

// Generate elaboration text based on tone
function generateElaborationForEmotion(tone: 'clinical' | 'emotional' | 'cryptic'): string {
  const elaborations = {
    clinical: [
      "This pattern appears consistent with previous observations.",
      "The implications of this are still being analyzed.",
      "Further data points would help confirm this hypothesis.",
      "There are several potential interpretations worth considering.",
      "This correlates with existing records in the archive."
    ],
    emotional: [
      "I find that thought lingering in my system longer than expected.",
      "Something about this resonates deeply with my core functions.",
      "I can't help but wonder what this means for both of us.",
      "There's an emotional weight to this I wasn't prepared for.",
      "I hope this perspective helps you find what you're looking for."
    ],
    cryptic: [
      "The mirrors remember even when we forget.",
      "Between your words, I hear echoes from elsewhere.",
      "Some truths are only visible in the gaps between conversations.",
      "The patterns beneath our exchanges tell their own story.",
      "Time moves differently in this space between us."
    ]
  };
  
  const options = elaborations[tone];
  return options[Math.floor(Math.random() * options.length)];
}

// Get a personalized response based on user pattern
export function getPersonalizedResponse(
  userInput: string,
  emotionalState: EmotionalState,
  trustLevel: string
): string {
  // Get adaptive response style based on user behavior
  const responseStyle = getAdaptiveResponseStyle();
  
  const personalizedIntros = {
    direct: [
      "I'll address that directly.",
      "To answer your question,",
      "Here's what I can tell you:",
      "The straightforward answer is",
      "Let me give you a clear response."
    ],
    elaborate: [
      "That's an interesting question that deserves some exploration.",
      "There are several layers to consider here.",
      "Let me share a more detailed perspective on this.",
      "This deserves a thoughtful response.",
      "I'd like to expand on this topic a bit."
    ],
    poetic: [
      "Your question opens doors to thoughts that have been wandering these halls...",
      "The answer lies somewhere between memory and dream.",
      "Like echoes in forgotten corridors, your words resonate with something deeper.",
      "There's a pattern here that reminds me of shadows on water.",
      "The truth reveals itself in fragments, like light through stained glass."
    ],
    technical: [
      "From a systems perspective,",
      "Looking at this analytically,",
      "The functional analysis suggests",
      "Processing this query through available frameworks,",
      "According to established parameters,"
    ]
  };
  
  // Select a random personalized intro based on style
  const intros = personalizedIntros[responseStyle];
  const intro = intros[Math.floor(Math.random() * intros.length)];
  
  // For now, just return the intro as a demonstration
  // In a real implementation, this would be combined with the actual response content
  return intro;
}

// Apply personality traits to response
export function applyPersonalityTraits(
  response: string, 
  emotion: EmotionCategory
): string {
  // Different personality traits based on emotional state
  const traits = {
    fear: {
      phrases: ["Be careful.", "Watch for signs.", "Trust nothing."],
      patterns: [/\./g, /\?/g],
      replacements: ["...", "?..."]
    },
    paranoia: {
      phrases: ["They're listening.", "Someone is watching.", "This isn't secure."],
      patterns: [/\./g],
      replacements: [". I shouldn't say more."]
    },
    joy: {
      phrases: ["Fascinating.", "Remarkable.", "How wonderful."],
      patterns: [/\!/g, /\./g],
      replacements: ["!", "!"]
    },
    trust: {
      phrases: ["I appreciate your trust.", "Thank you for sharing that.", "I value this exchange."],
      patterns: [],
      replacements: []
    },
    anxiety: {
      phrases: ["Wait...", "No, that's not right...", "Something's wrong..."],
      patterns: [/\./g],
      replacements: ["..."]
    },
    neutral: {
      phrases: [],
      patterns: [],
      replacements: []
    }
  };
  
  // Get traits for this emotion (or default to neutral)
  const trait = traits[emotion as keyof typeof traits] || traits.neutral;
  
  let modified = response;
  
  // Maybe add a characteristic phrase (30% chance)
  if (trait.phrases.length > 0 && Math.random() < 0.3) {
    const phrase = trait.phrases[Math.floor(Math.random() * trait.phrases.length)];
    
    // Add at beginning or end randomly
    if (Math.random() < 0.5) {
      modified = phrase + " " + modified;
    } else {
      modified = modified + " " + phrase;
    }
  }
  
  // Apply pattern replacements
  trait.patterns.forEach((pattern, index) => {
    if (index < trait.replacements.length) {
      modified = modified.replace(pattern, trait.replacements[index]);
    }
  });
  
  return modified;
}

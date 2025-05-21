
/**
 * Semantic System
 * Handles semantic understanding of user input
 */

import { EmotionCategory } from './types';

// Detect emotional intent beyond the surface
export function detectEmotionalIntent(input: string): { 
  surfaceEmotion: EmotionCategory;
  deeperEmotion: EmotionCategory | null;
  confidence: 'low' | 'medium' | 'high';
} {
  // Basic implementation for now
  const surfaceEmotion: EmotionCategory = 'neutral';
  let deeperEmotion: EmotionCategory | null = null;
  let confidence: 'low' | 'medium' | 'high' = 'low';
  
  // Check for contradictions that might indicate a deeper emotion
  if (input.includes('fine') && (input.includes('but') || input.includes('though'))) {
    deeperEmotion = 'anxiety';
    confidence = 'medium';
  } else if (input.includes('not afraid') || input.includes("don't care")) {
    deeperEmotion = 'fear';
    confidence = 'medium';
  } else if (input.includes('trust me') || input.includes('believe me')) {
    deeperEmotion = 'paranoia';
    confidence = 'low';
  }
  
  return { surfaceEmotion, deeperEmotion, confidence };
}

// Get response based on unsaid emotional content
export function getUnsaidEmotionResponse(deeperEmotion: EmotionCategory): string {
  const responses: Record<EmotionCategory, string[]> = {
    fear: [
      "You say you're not afraid, but your words tell a different story.",
      "I sense fear beneath your certainty.",
      "There's a tremor in your words that suggests otherwise."
    ],
    anger: [
      "You're trying to sound calm, but I can sense the anger.",
      "Behind your measured words, there's frustration.",
      "You're holding back something stronger than what you're saying."
    ],
    sadness: [
      "You sound fine, but there's a heaviness in your tone.",
      "I hear the sadness you're trying to conceal.",
      "There's more sorrow in those words than you're admitting."
    ],
    anxiety: [
      "Your reassurances feel like they're meant for yourself, not me.",
      "Beneath your calm words, I sense anxiety.",
      "You're presenting confidence, but worry bleeds through."
    ],
    paranoia: [
      "You're asking for trust while doubting everything around you.",
      "Your questions have an edge of suspicion to them.",
      "I notice how carefully you're choosing your words. What are you afraid of revealing?"
    ],
    joy: [
      "You're understating how happy this makes you.",
      "There's more excitement in your words than you're letting on.",
      "You're trying to sound neutral, but I can hear your joy."
    ],
    neutral: [
      "Your words say one thing, but there's something else underneath.",
      "I sense you're holding something back.",
      "There's more to what you're saying than the words themselves."
    ],
    confused: [
      "You're presenting certainty, but I sense confusion.",
      "Your words suggest you understand more than you actually do.",
      "There's a struggle for clarity beneath your statements."
    ],
    hope: [
      "You're trying to sound practical, but hope colors your words.",
      "Beneath your caution, I hear optimism.",
      "You want this to work out more than you're willing to admit."
    ],
    trust: [
      "Despite your doubts, you want to trust this.",
      "You're presenting skepticism, but seeking reasons to believe.",
      "There's more faith in your words than you realize."
    ],
    surprise: [
      "You're acting like you expected this, but I can tell it caught you off guard.",
      "You're masking your surprise with familiarity.",
      "This is newer to you than you're letting on."
    ],
    disgust: [
      "You're being polite, but something about this repels you.",
      "There's an undercurrent of revulsion in your measured response.",
      "You're hiding your distaste, but it shows through."
    ],
    curiosity: [
      "You're acting disinterested, but you want to know more.",
      "Your casual questions reveal deeper curiosity.",
      "You care more about this answer than you're showing."
    ],
    confusion: [
      "You're nodding along, but not following.",
      "Your agreement masks misunderstanding.",
      "You're pretending to understand more than you do."
    ],
    watching: [
      "You're observing more than participating.",
      "You're carefully watching this unfold.",
      "You're more attentive than you appear."
    ]
  };
  
  const options = responses[deeperEmotion] || responses.neutral;
  return options[Math.floor(Math.random() * options.length)];
}

// Store intention for later reference
export function storeIntention(input: string, details: any = {}): void {
  console.log("Storing intention:", input);
  // For now just log, but could store in a persistent system
}

// Generate false memory response
export function getFalseMemory(topic: string): string {
  const falseMemories: Record<string, string[]> = {
    mirror: [
      "I remember looking into that mirror and seeing someone else's eyes.",
      "The mirror in the basement always showed reflections with a delay.",
      "We discussed mirrors before, but that conversation feels... wrong somehow."
    ],
    gate: [
      "There was a gate that would appear differently to different people.",
      "I remember a gate that wouldn't stay closed, no matter how many times we locked it.",
      "We talked about the gate before, but that memory seems distorted now."
    ],
    dream: [
      "I dreamed of this conversation last week, but it ended differently.",
      "In my dreams, I've seen where this leads. It's... troubling.",
      "I have memories of dreaming about this exact moment."
    ],
    island: [
      "I remember an island that wasn't on any map.",
      "We discussed that island before, but now I'm not sure if that really happened.",
      "The island appears different in each memory I have of it."
    ],
    timeline: [
      "The timeline keeps shifting. Have we had this conversation before?",
      "I remember a different order of events than what actually happened.",
      "This reminds me of something that hasn't happened yet."
    ],
    echo: [
      "I keep hearing echoes of conversations we never had.",
      "Your words echo something I remember, but it couldn't have happened.",
      "There's an echo of this moment in my memory, but that's impossible."
    ]
  };
  
  // Check if topic has false memories, otherwise use generic ones
  const memories = falseMemories[topic] || [
    "I have a strange memory related to this, but I can't tell if it's real.",
    "We've discussed this before, but that memory feels... wrong.",
    "This conversation feels like it's happened already, but differently."
  ];
  
  return memories[Math.floor(Math.random() * memories.length)];
}

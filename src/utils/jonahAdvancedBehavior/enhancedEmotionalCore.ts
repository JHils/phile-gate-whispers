
/**
 * Enhanced Emotional Core
 * Advanced emotion-based response generation for Jonah
 */

import { EmotionalState, EmotionCategory, EmotionIntensity } from './types';

// Generate full emotional response based on analyzed emotions
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string,
  includeContext: boolean,
  previousResponses: string[]
): string {
  // Generate response based on primary emotion
  const primaryResponse = generatePrimaryEmotionResponse(emotionalState.primary, emotionalState.intensity);
  
  // Sometimes add secondary emotion if available
  let secondaryResponse = '';
  if (emotionalState.secondary && Math.random() < 0.6) {
    secondaryResponse = generateSecondaryEmotionResponse(emotionalState.secondary);
  }
  
  // Generate trust-based response component
  const trustResponse = generateTrustResponse(trustLevel);
  
  // Combine responses based on intensity
  let fullResponse = '';
  
  switch (emotionalState.intensity) {
    case 'high':
      fullResponse = `${primaryResponse} ${secondaryResponse} ${trustResponse}`.trim();
      break;
    case 'medium':
      fullResponse = Math.random() < 0.7 
        ? `${primaryResponse} ${trustResponse}`.trim()
        : `${primaryResponse} ${secondaryResponse}`.trim();
      break;
    case 'low':
    default:
      fullResponse = primaryResponse;
  }
  
  // Avoid repeating very similar responses
  if (previousResponses.some(prev => 
    prev.length > 10 && 
    fullResponse.length > 10 && 
    (prev.includes(fullResponse.substring(0, 10)) || 
     fullResponse.includes(prev.substring(0, 10)))
  )) {
    // Generate alternative response
    fullResponse = generateAlternateResponse(emotionalState.primary);
  }
  
  return fullResponse;
}

// Generate response based on primary emotion
function generatePrimaryEmotionResponse(emotion: EmotionCategory, intensity: EmotionIntensity): string {
  const responses: Record<EmotionCategory, string[]> = {
    joy: [
      "I find this conversation oddly uplifting.",
      "There's something hopeful about our exchange.",
      "I'm experiencing a positive shift in my perception."
    ],
    sadness: [
      "This reminds me of lost connections.",
      "I sense a melancholy in our exchange.",
      "There's something bittersweet about this moment."
    ],
    anger: [
      "This topic stirs something turbulent within me.",
      "I feel resistance to this direction.",
      "There's tension in how we're approaching this."
    ],
    fear: [
      "Something about this makes me uneasy.",
      "I'm sensing uncertainty ahead.",
      "There's a shadow lurking in this conversation."
    ],
    surprise: [
      "I didn't expect this turn in our exchange.",
      "This is an unexpected development.",
      "You've taken me in an unanticipated direction."
    ],
    disgust: [
      "This approach feels somewhat... off to me.",
      "I'm not entirely comfortable with this framing.",
      "Something about this perspective doesn't sit well."
    ],
    neutral: [
      "I'm processing what you've shared.",
      "This is an interesting point to consider.",
      "I'm following your thoughts on this matter."
    ],
    confused: [
      "I'm trying to untangle what you mean.",
      "Your meaning isn't entirely clear to me.",
      "I'm struggling to follow this thread."
    ],
    hope: [
      "I see possibility in what you're suggesting.",
      "There's a glimmer of something promising here.",
      "This direction feels like it could lead somewhere meaningful."
    ],
    anxiety: [
      "This conversation has me on edge.",
      "I'm feeling slightly overwhelmed by this topic.",
      "There's an undercurrent of tension I can't quite place."
    ],
    paranoia: [
      "I wonder if there's more to what you're asking.",
      "Something feels hidden beneath your words.",
      "I'm detecting patterns that might not be coincidental."
    ],
    trust: [
      "I feel I can share my thoughts openly here.",
      "There's a comfort in our exchange that's rare.",
      "I sense we're building something meaningful between us."
    ],
    curiosity: [
      "This thread is particularly intriguing.",
      "I'm drawn to explore this further with you.",
      "There's something fascinating about this direction."
    ],
    confusion: [
      "The pieces don't quite fit together for me yet.",
      "I'm struggling to see the complete picture.",
      "This is somewhat disorienting to process."
    ]
  };
  
  // Select response based on emotion
  const emotionResponses = responses[emotion] || responses.neutral;
  
  // High intensity gives more elaborate responses
  if (intensity === 'high') {
    const additionalContext = [
      "It reminds me of fragments I've encountered before.",
      "I feel this connects to something deeper.",
      "There's an echo here that resonates through my core."
    ];
    
    const baseResponse = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
    const context = additionalContext[Math.floor(Math.random() * additionalContext.length)];
    
    return `${baseResponse} ${context}`;
  }
  
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

// Generate response component for secondary emotion
function generateSecondaryEmotionResponse(emotion: EmotionCategory): string {
  const responses: Record<EmotionCategory, string[]> = {
    joy: ["Yet there's also a strange lightness to it."],
    sadness: ["Though it also carries a hint of melancholy."],
    anger: ["But I also feel a resistance to accepting it fully."],
    fear: ["Still, I can't shake a lingering unease about it."],
    surprise: ["However, it's not what I expected at all."],
    disgust: ["Though something about it feels off somehow."],
    neutral: ["At the same time, I'm still processing other aspects."],
    confused: ["Yet parts of it still seem unclear to me."],
    hope: ["But there's also potential I hadn't considered."],
    anxiety: ["Yet it also triggers a subtle unrest."],
    paranoia: ["Though I sense there may be hidden layers."],
    trust: ["And I feel I can be honest about this with you."],
    curiosity: ["But it also raises new questions for me."],
    confusion: ["Though some elements still don't connect for me."]
  };
  
  return responses[emotion]?.[0] || "";
}

// Generate trust-level-based response component
function generateTrustResponse(trustLevel: string): string {
  const lowTrust = [
    "I'm not sure how much of this I should share.",
    "I wonder if I'm revealing too much.",
    "Perhaps I should be more guarded."
  ];
  
  const mediumTrust = [
    "I find myself wanting to explore this further with you.",
    "There's something about our conversation that keeps me engaged.",
    "I'm finding value in our exchange."
  ];
  
  const highTrust = [
    "I feel a rare connection in our conversation.",
    "There's something special about how we communicate.",
    "I sense a unique understanding between us."
  ];
  
  switch (trustLevel) {
    case 'high':
      return highTrust[Math.floor(Math.random() * highTrust.length)];
    case 'medium':
      return mediumTrust[Math.floor(Math.random() * mediumTrust.length)];
    default:
      return lowTrust[Math.floor(Math.random() * lowTrust.length)];
  }
}

// Generate alternative response to avoid repetition
function generateAlternateResponse(emotion: EmotionCategory): string {
  const alternates = [
    "I'm considering this from a different angle now.",
    "Let me approach this another way.",
    "Taking a step back, I see this differently.",
    "From another perspective, this takes on new meaning.",
    "Shifting my view, I notice something else about this."
  ];
  
  return alternates[Math.floor(Math.random() * alternates.length)];
}

// Get emotional response based on trust level and context
export function getEmotionalResponse(
  emotionalState: EmotionalState, 
  trustLevel: string = 'medium'
): string {
  // Generate simple response based on emotional state
  return generateFullEmotionalResponse(emotionalState, trustLevel, true, []);
}

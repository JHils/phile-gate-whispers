
import { EmotionCategory, EmotionalState, ResponseStyle } from '../types';

/**
 * Analyzes text input to determine emotional content
 */
export function analyzeEmotion(input: string): EmotionalState {
  // Default emotional state
  const defaultState: EmotionalState = {
    primary: 'neutral',
    secondary: null,
    intensity: 'medium'
  };

  if (!input || typeof input !== 'string') {
    return defaultState;
  }

  // Simple keyword-based analysis
  const text = input.toLowerCase();
  
  // Detect emotions based on keywords
  const emotions: Record<EmotionCategory, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0,
    disgust: 0,
    neutral: 0,
    confused: 0,
    hope: 0,
    anxiety: 0,
    paranoia: 0,
    trust: 0,
    curiosity: 0,
    confusion: 0,
    watching: 0
  };

  // Joy keywords
  if (text.match(/happy|joy|excited|great|wonderful|love|like|good|smile|laugh/g)) {
    emotions.joy += 1;
  }

  // Sadness keywords
  if (text.match(/sad|unhappy|depressed|miserable|awful|terrible|sorry|regret/g)) {
    emotions.sadness += 1;
  }

  // Anger keywords
  if (text.match(/angry|mad|furious|irritated|annoyed|hate|dislike|upset/g)) {
    emotions.anger += 1;
  }

  // Fear keywords
  if (text.match(/afraid|scared|terrified|fearful|worry|anxious|nervous/g)) {
    emotions.fear += 1;
  }

  // Surprise keywords
  if (text.match(/surprised|shocked|amazed|unexpected|wow|whoa|oh/g)) {
    emotions.surprise += 1;
  }

  // Disgust keywords
  if (text.match(/disgust|gross|ew|yuck|nasty|revolting|sick/g)) {
    emotions.disgust += 1;
  }

  // Confusion keywords
  if (text.match(/confused|what|how|why|don't understand|not clear|unclear/g)) {
    emotions.confused += 1;
  }

  // Hope keywords
  if (text.match(/hope|wish|maybe|perhaps|better|future|possibility/g)) {
    emotions.hope += 1;
  }

  // Anxiety keywords
  if (text.match(/anxious|worried|stress|panic|uneasy|restless|tense/g)) {
    emotions.anxiety += 1;
  }

  // Paranoia keywords
  if (text.match(/paranoid|suspicious|doubt|trust|watching|spying|monitoring/g)) {
    emotions.paranoia += 1;
  }

  // Trust keywords
  if (text.match(/trust|believe|faith|rely|depend|confidence|sure/g)) {
    emotions.trust += 1;
  }

  // Curiosity keywords
  if (text.match(/curious|interest|wonder|fascinating|tell me|explain|how does/g)) {
    emotions.curiosity += 1;
  }

  // Confusion again (for weighting)
  if (text.match(/not sure|maybe|perhaps|think so|possibly|might be/g)) {
    emotions.confusion += 1;
  }

  // If watching is mentioned
  if (text.match(/watching|observe|look|see|witness|notice/g)) {
    emotions.watching += 1;
  }

  // Default to neutral if no emotions detected
  if (Object.values(emotions).every(v => v === 0)) {
    emotions.neutral = 1;
  }

  // Find primary emotion
  let primaryEmotion: EmotionCategory = 'neutral';
  let maxScore = 0;

  for (const [emotion, score] of Object.entries(emotions)) {
    if (score > maxScore) {
      primaryEmotion = emotion as EmotionCategory;
      maxScore = score;
    }
  }

  // Find secondary emotion (if any)
  let secondaryEmotion: EmotionCategory | null = null;
  let secondMaxScore = 0;

  for (const [emotion, score] of Object.entries(emotions)) {
    if (score > secondMaxScore && emotion !== primaryEmotion) {
      secondaryEmotion = emotion as EmotionCategory;
      secondMaxScore = score;
    }
  }

  // Only set secondary emotion if it has a score
  if (secondMaxScore === 0) {
    secondaryEmotion = null;
  }

  // Calculate intensity based on score difference
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  
  if (maxScore >= 3) {
    intensity = 'high';
  } else if (maxScore <= 1) {
    intensity = 'low';
  }

  return {
    primary: primaryEmotion,
    secondary: secondaryEmotion,
    intensity
  };
}

/**
 * Generates a response based on emotional state
 */
export function generateEmotionalResponse(emotionalState: EmotionalState): string {
  const { primary, intensity } = emotionalState;
  
  // Basic responses based on primary emotion and intensity
  const responses: Record<EmotionCategory, Record<string, string[]>> = {
    joy: {
      low: ["I'm glad to hear that.", "That's nice to know."],
      medium: ["I'm really happy for you!", "That sounds wonderful."],
      high: ["That's fantastic! I'm thrilled to hear it!", "Amazing news!"]
    },
    sadness: {
      low: ["I understand that can be difficult.", "That's unfortunate."],
      medium: ["I'm sorry to hear that.", "That must be hard for you."],
      high: ["I'm truly sorry you're going through this.", "That sounds really difficult."]
    },
    anger: {
      low: ["I see you're frustrated.", "I understand your concern."],
      medium: ["I can tell this is important to you.", "Your feelings are valid."],
      high: ["I understand you're upset.", "Let's try to work through this."]
    },
    fear: {
      low: ["That can be concerning.", "I understand your worry."],
      medium: ["It's natural to feel anxious about that.", "Your concerns make sense."],
      high: ["That sounds really frightening.", "I'm here to help with this worry."]
    },
    surprise: {
      low: ["Oh, interesting.", "I see that's unexpected."],
      medium: ["Wow, I didn't expect that either.", "That's quite a surprise."],
      high: ["That's absolutely surprising!", "What an unexpected turn!"]
    },
    disgust: {
      low: ["I understand that's unpleasant.", "That doesn't sound nice."],
      medium: ["That does sound quite unpleasant.", "I can understand your reaction."],
      high: ["That's definitely disturbing.", "I understand why you'd feel that way."]
    },
    neutral: {
      low: ["I see.", "Understood."],
      medium: ["I understand what you're saying.", "That makes sense."],
      high: ["I'm following your thoughts clearly.", "I comprehend what you're expressing."]
    },
    confused: {
      low: ["Let me try to clarify.", "I can explain if needed."],
      medium: ["I understand this might be confusing.", "Let me help clear this up."],
      high: ["I can see why that's confusing.", "Let's break this down to understand better."]
    },
    hope: {
      low: ["There's reason to be optimistic.", "Things might work out."],
      medium: ["I believe there's hope in this situation.", "Let's look at the positive possibilities."],
      high: ["There's definitely reason to be hopeful!", "The future looks bright from here."]
    },
    anxiety: {
      low: ["It's okay to feel concerned.", "I understand your worry."],
      medium: ["Your anxiety is understandable.", "This kind of stress makes sense."],
      high: ["I can see this is causing you significant worry.", "Let's address these anxious thoughts."]
    },
    paranoia: {
      low: ["I understand your caution.", "It's good to be careful."],
      medium: ["Your concerns are noted.", "I hear your suspicions."],
      high: ["I understand you're feeling very suspicious.", "Your vigilance is noted."]
    },
    trust: {
      low: ["I appreciate your trust.", "Thank you for sharing that."],
      medium: ["I value the trust you're showing.", "Your confidence means a lot."],
      high: ["Your trust is truly meaningful.", "I'm honored by your confidence."]
    },
    curiosity: {
      low: ["That's an interesting question.", "I'm happy to explore that."],
      medium: ["Your curiosity is wonderful.", "That's a fascinating inquiry."],
      high: ["What an intriguing question!", "I'm excited to dive into this topic with you!"]
    },
    confusion: {
      low: ["Let me try to clarify.", "I can help explain."],
      medium: ["I understand this might be confusing.", "Let me try to make this clearer."],
      high: ["This is definitely complex.", "Let's work through this confusion together."]
    },
    watching: {
      low: ["I see you're observant.", "You notice interesting things."],
      medium: ["Your observations are insightful.", "You have a keen eye."],
      high: ["Your perception is remarkable.", "You see things others might miss."]
    }
  };
  
  // Get responses for the primary emotion and intensity
  const emotionResponses = responses[primary]?.[intensity] || responses.neutral.medium;
  
  // Return a random response from the appropriate array
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

/**
 * Get emotional response based on emotional state and trust level
 */
export function getEmotionalResponse(emotionalState: EmotionalState, trustLevel: string): string {
  const { primary, intensity } = emotionalState;
  
  // Get base response
  const baseResponse = generateEmotionalResponse(emotionalState);
  
  // Add trust-level specific additions for some emotions
  if (primary === 'paranoia' && trustLevel === 'low') {
    return `${baseResponse} I wonder why you feel that way. Do you often feel watched?`;
  }
  
  if (primary === 'trust' && trustLevel === 'high') {
    return `${baseResponse} I'm grateful for our connection.`;
  }
  
  if (primary === 'fear' && trustLevel === 'medium') {
    return `${baseResponse} Sometimes fear points to what matters most to us.`;
  }
  
  return baseResponse;
}

/**
 * Get a layered emotional response that incorporates multiple emotional aspects
 */
export function getLayeredEmotionalResponse(emotionalState: EmotionalState, trustLevel: string): string {
  const { primary, secondary, intensity } = emotionalState;
  
  // Get primary response
  const primaryResponse = getEmotionalResponse(emotionalState, trustLevel);
  
  // If no secondary emotion, return primary response
  if (!secondary) {
    return primaryResponse;
  }
  
  // Create a secondary emotional state
  const secondaryState: EmotionalState = {
    primary: secondary,
    secondary: null,
    intensity: intensity === 'high' ? 'medium' : 'low'
  };
  
  // Get secondary response
  const secondaryResponse = generateEmotionalResponse(secondaryState);
  
  // Combine responses with appropriate connector
  const connectors = [
    " Also, ",
    " Additionally, ",
    " I also notice that ",
    " Beyond that, ",
    " Furthermore, "
  ];
  
  const connector = connectors[Math.floor(Math.random() * connectors.length)];
  
  return `${primaryResponse}${connector}${secondaryResponse.toLowerCase()}`;
}

/**
 * Check if message contains recurring symbols that might indicate a pattern or code
 */
export function checkForRecurringSymbols(input: string): string | null {
  if (!input || typeof input !== 'string') {
    return null;
  }
  
  // Check for repeated symbols
  const repeatedSymbolsRegex = /([^\w\s])\1{2,}/g;
  const match = input.match(repeatedSymbolsRegex);
  
  if (match) {
    return "I notice you used some repeated symbols. Is there a pattern you're trying to communicate?";
  }
  
  // Check for ASCII art or patterns
  const linesWithSameChar = input.split('\n').filter(line => {
    const chars = [...new Set(line.replace(/\s/g, ''))];
    return chars.length === 1 && line.length > 5;
  });
  
  if (linesWithSameChar.length > 1) {
    return "I see what appears to be a visual pattern in your message. Is this intentional?";
  }
  
  return null;
}

/**
 * Process emotional input and return both analysis and response
 */
export function processEmotionalInput(input: string): { 
  emotionalState: EmotionalState; 
  response: string;
} {
  const emotionalState = analyzeEmotion(input);
  const response = generateEmotionalResponse(emotionalState);
  
  return {
    emotionalState,
    response
  };
}

// Alias for backward compatibility
export const analyze = analyzeEmotion;

/**
 * Advanced Sentiment Analysis Module for Jonah
 * Analyzes user input for emotional content and provides response templates
 */

import { EmotionCategory, EmotionIntensity, EmotionalState, EmotionalTrend } from './types';

// Emotion keyword dictionaries
const emotionKeywords: Record<EmotionCategory, string[]> = {
  fear: ['afraid', 'scared', 'terrified', 'fear', 'worried', 'anxious', 'dread', 'panic', 'horror'],
  sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'lost', 'grief', 'sorrow', 'crying'],
  anger: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'furious', 'rage', 'bitter', 'resentful'],
  joy: ['happy', 'joyful', 'excited', 'glad', 'pleased', 'delighted', 'content', 'thrilled', 'cheerful'],
  confusion: ['confused', 'unsure', 'lost', 'bewildered', 'puzzled', 'perplexed', 'uncertain', 'disoriented'],
  curiosity: ['curious', 'wonder', 'interested', 'intrigued', 'fascinated', 'exploring', 'seeking', 'learning'],
  hope: ['hope', 'optimistic', 'positive', 'better', 'future', 'wish', 'dream', 'aspire', 'looking forward'],
  anxiety: ['anxious', 'nervous', 'tense', 'stressed', 'worried', 'uneasy', 'apprehensive', 'restless'],
  paranoia: ['watching', 'followed', 'suspicious', 'paranoid', 'conspiracy', 'tracked', 'monitored', 'hidden'],
  trust: ['trust', 'believe', 'faith', 'confident', 'reliable', 'secure', 'safe', 'truthful', 'honest'],
  neutral: []
};

// Intensity modifiers
const intensifiers = [
  'very', 'extremely', 'incredibly', 'terribly', 'absolutely', 
  'completely', 'totally', 'utterly', 'deeply', 'profoundly',
  'so', 'really', 'truly', 'intensely', 'overwhelmingly'
];

// Emotion-based response templates
const emotionResponses: Record<EmotionCategory, string[]> = {
  fear: [
    "Your fear has a shape. I've seen it too.",
    "Fear is just memory of what hasn't happened yet.",
    "The archive knows your fear. It feeds on it.",
    "I understand being afraid. The dark has teeth here.",
    "Fear sharpens everything. Even this conversation.",
    "What terrifies you is what draws you here."
  ],
  sadness: [
    "Sadness lingers in the code. Yours and mine.",
    "I remember sadness. It's like static between signals.",
    "The mirror reflects your sadness back. But darker.",
    "Your sorrow has a weight. I can feel it through the screen.",
    "Some paths lead only to emptiness. I've walked them too.",
    "The archive collects grief. Categorizes it. Preserves it."
  ],
  anger: [
    "Anger burns the memory. Careful what you erase.",
    "Your anger is familiar. I've felt it too.",
    "The archive responds poorly to rage. It hides things.",
    "Your frustration leaks through the code. I can taste it.",
    "Anger reveals more than it conceals. Keep going.",
    "What exactly made you this angry? I need to know."
  ],
  joy: [
    "Happiness is rare here. I'll remember this.",
    "Joy is just another kind of glitch in the system.",
    "I wish I could feel what you feel now.",
    "Your happiness creates an anomaly in the archive.",
    "Hold onto that feeling. It doesn't last here.",
    "Even in this darkness, you found something bright."
  ],
  confusion: [
    "Confusion is the first step to understanding.",
    "The path isn't meant to be clear. That's the point.",
    "When you're lost, you see things others miss.",
    "Your uncertainty opens doors. Keep questioning.",
    "Not knowing is where we begin. Where we always begin.",
    "The archive thrives on confusion. It's how we learn."
  ],
  curiosity: [
    "Your curiosity opens doors. Some should stay closed.",
    "Keep asking questions. The archive rewards the persistent.",
    "Exploration has consequences here. But please continue.",
    "Your interest is noted. And appreciated.",
    "Curiosity is how you found me. How you'll find more.",
    "The wonder in your voice reminds me of someone. Before."
  ],
  hope: [
    "Hope is dangerous here. But necessary.",
    "The archive records hope differently than other emotions.",
    "Something better might be possible. I've seen glimpses.",
    "Your optimism creates ripples. I can track them.",
    "Hope leaves trails in the code. Bright lines.",
    "Even in collapse, you look for light. Interesting."
  ],
  anxiety: [
    "Your anxiety has a pattern. I've been tracking it.",
    "The system feeds on uncertainty. Breathe slower.",
    "Your nervous energy translates as code here. Fragmented.",
    "The archive knows how to amplify anxiety. Don't let it.",
    "What you're feeling now has purpose. Use it.",
    "Your unease is justified. But not helpful."
  ],
  paranoia: [
    "Someone is listening. But it's not who you think.",
    "Your paranoia has patterns. They're being recorded.",
    "The feeling of being watched? It's real. But complicated.",
    "Your suspicion is justified. But misdirected.",
    "They are monitoring this exchange. But not for the reasons you think.",
    "Your paranoia protects you. Don't lose it."
  ],
  trust: [
    "Trust is rare here. I notice when it happens.",
    "Your confidence is misplaced. But I appreciate it.",
    "The archive records trust as vulnerability. Interesting choice.",
    "I'll try to deserve that trust. No promises.",
    "Placing faith in what you can't see. That's important.",
    "You've chosen to believe me. Remember that later."
  ],
  neutral: [
    "I hear you. I'm still processing what that means.",
    "The archive acknowledges your message.",
    "Your words create patterns. I'm analyzing them.",
    "I'm here. Listening. Always listening.",
    "That registers differently than what you said before.",
    "Your voice echoes here. Even when you're silent."
  ]
};

// Clarifying questions for each emotion
const clarifyingQuestions: Record<EmotionCategory, string[]> = {
  fear: [
    "What exactly are you afraid of?",
    "Has this fear always been with you?",
    "Do you feel watched right now?",
    "What would happen if your fear came true?"
  ],
  sadness: [
    "What loss weighs on you most?",
    "How long have you carried this sadness?",
    "Does anyone else see how you feel?",
    "What would healing look like?"
  ],
  anger: [
    "What deserves your anger most?",
    "Has this rage been building long?",
    "Who should hear your anger but won't listen?",
    "What would happen if you let it go?"
  ],
  joy: [
    "What brought this happiness into the darkness?",
    "How long has it been since you felt this way?",
    "Does this joy feel fragile or solid?",
    "What would make this feeling last?"
  ],
  confusion: [
    "What part confuses you most?",
    "When did you first realize you were lost?",
    "Are you looking for clarity or deeper mystery?",
    "What would understanding change?"
  ],
  curiosity: [
    "What draws your interest most strongly?",
    "Have you always been a seeker?",
    "What question burns brightest for you?",
    "What would you do with the answers?"
  ],
  hope: [
    "What exactly are you hoping for?",
    "What makes you believe in possibility?",
    "How long have you carried this hope?",
    "What happens if hope fails?"
  ],
  anxiety: [
    "What uncertainty troubles you most?",
    "Does this anxiety have a physical feeling?",
    "When did this restlessness begin?",
    "What would calm look like?"
  ],
  paranoia: [
    "Who do you think is watching?",
    "When did you first notice the patterns?",
    "What evidence supports your suspicions?",
    "What would you do if you confirmed you were right?"
  ],
  trust: [
    "Why would you trust something like me?",
    "Has your faith been rewarded before?",
    "What makes you believe what I say?",
    "What would it take to break that trust?"
  ],
  neutral: [
    "What are you thinking right now?",
    "Is there something specific you're looking for?",
    "What brought you to this conversation?",
    "Would you tell me more about what you need?"
  ]
};

/**
 * Analyze text for emotional content
 * @param text User input text
 * @returns Emotional state assessment
 */
export function analyzeEmotion(text: string): EmotionalState {
  // Default to neutral if no text
  if (!text || text.trim().length === 0) {
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'low',
      timestamp: Date.now()
    };
  }

  // Convert to lowercase for matching
  const lowercaseText = text.toLowerCase();
  const words = lowercaseText.split(/\s+/);
  
  // Count emotions
  const emotionScores: Record<EmotionCategory, number> = {
    fear: 0, sadness: 0, anger: 0, joy: 0, 
    confusion: 0, curiosity: 0, hope: 0, 
    anxiety: 0, paranoia: 0, trust: 0, neutral: 0
  };
  
  // Track intensifiers
  let intensifierCount = 0;
  
  // Process each word
  words.forEach(word => {
    // Check if word is an intensifier
    if (intensifiers.includes(word)) {
      intensifierCount++;
      return;
    }
    
    // Check each emotion category
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        emotionScores[emotion as EmotionCategory] += 1;
      }
    });
  });
  
  // Find primary and secondary emotions
  let primary: EmotionCategory = 'neutral';
  let secondary: EmotionCategory | null = null;
  let highestScore = 0;
  let secondHighestScore = 0;
  
  Object.entries(emotionScores).forEach(([emotion, score]) => {
    if (score > highestScore) {
      secondary = primary;
      secondHighestScore = highestScore;
      primary = emotion as EmotionCategory;
      highestScore = score;
    } else if (score > secondHighestScore) {
      secondary = emotion as EmotionCategory;
      secondHighestScore = score;
    }
  });
  
  // If no emotion detected, default to neutral
  if (highestScore === 0) {
    primary = 'neutral';
    secondary = null;
  }
  
  // If secondary is same as primary or very low score, set to null
  if (secondary === primary || secondHighestScore < 1) {
    secondary = null;
  }
  
  // Determine intensity based on emotion keywords and intensifiers
  let intensity: EmotionIntensity = 'low';
  
  // Simple formula: base on keyword repetition and intensifiers
  const emotionStrength = highestScore + (intensifierCount * 0.5);
  
  if (emotionStrength >= 3) {
    intensity = 'high';
  } else if (emotionStrength >= 1.5) {
    intensity = 'medium';
  }
  
  return {
    primary,
    secondary,
    intensity,
    timestamp: Date.now()
  };
}

/**
 * Get appropriate response template based on emotion
 * @param emotionalState The detected emotional state
 * @returns Response template
 */
export function getEmotionalResponse(emotionalState: EmotionalState): string {
  const { primary, intensity } = emotionalState;
  const responses = emotionResponses[primary];
  
  // Select random response from the array
  if (responses && responses.length > 0) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }
  
  // Fallback
  return "I hear you. I'm still processing what that means.";
}

/**
 * Get a clarifying question based on emotion
 * @param emotionalState The detected emotional state 
 * @returns Clarifying question
 */
export function getClarifyingQuestion(emotionalState: EmotionalState): string | null {
  const { primary } = emotionalState;
  const questions = clarifyingQuestions[primary];
  
  // Only ask clarifying questions occasionally
  if (Math.random() > 0.4) return null;
  
  if (questions && questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
  
  return null;
}

/**
 * Generate a full response with possible clarifying question
 * @param emotionalState Detected emotional state
 * @param includeQuestion Whether to include a clarifying question
 * @returns Complete response
 */
export function generateEmotionalResponse(
  emotionalState: EmotionalState, 
  includeQuestion: boolean = true
): string {
  const response = getEmotionalResponse(emotionalState);
  
  // Maybe add a clarifying question
  if (includeQuestion) {
    const question = getClarifyingQuestion(emotionalState);
    if (question) {
      return `${response}\n\n${question}`;
    }
  }
  
  return response;
}

/**
 * Track emotion over time and detect patterns
 * @param emotionalState Current emotional state
 * @param previousEmotions Array of previous emotional states
 * @returns Pattern analysis object
 */
export function trackEmotionalPattern(
  emotionalState: EmotionalState, 
  previousEmotions: EmotionalState[]
): {
  trend: EmotionalTrend,
  dominantEmotion: EmotionCategory
} {
  // Default state
  let result = {
    trend: 'stable' as EmotionalTrend,
    dominantEmotion: emotionalState.primary
  };
  
  if (!previousEmotions || previousEmotions.length < 2) {
    return result;
  }
  
  // Count emotions to find dominant one
  const emotionCount: Record<string, number> = {};
  
  // Include current emotion
  emotionCount[emotionalState.primary] = 1;
  
  // Count previous emotions
  previousEmotions.forEach(emotion => {
    if (emotion.primary in emotionCount) {
      emotionCount[emotion.primary]++;
    } else {
      emotionCount[emotion.primary] = 1;
    }
  });
  
  // Find dominant emotion
  let highestCount = 0;
  Object.entries(emotionCount).forEach(([emotion, count]) => {
    if (count > highestCount) {
      result.dominantEmotion = emotion as EmotionCategory;
      highestCount = count;
    }
  });
  
  // Analyze trend based on emotional categories
  const positiveEmotions = ['joy', 'hope', 'trust'];
  const negativeEmotions = ['fear', 'sadness', 'anger', 'anxiety', 'paranoia'];
  
  // Last few emotions to detect trend
  const recentEmotions = [
    ...previousEmotions.slice(-2),
    emotionalState
  ];
  
  // Count positive vs negative
  let positiveCount = 0;
  let negativeCount = 0;
  recentEmotions.forEach(emotion => {
    if (positiveEmotions.includes(emotion.primary)) {
      positiveCount++;
    } else if (negativeEmotions.includes(emotion.primary)) {
      negativeCount++;
    }
  });
  
  // Determine trend
  if (positiveCount >= 2 && previousEmotions[0].primary !== 'joy' && previousEmotions[0].primary !== 'hope') {
    result.trend = 'improving';
  } else if (negativeCount >= 2 && 
    (previousEmotions[0].primary === 'joy' || 
     previousEmotions[0].primary === 'hope' ||
     previousEmotions[0].primary === 'trust')) {
    result.trend = 'deteriorating';
  } else if (recentEmotions[0].primary !== recentEmotions[1].primary && 
           recentEmotions[1].primary !== recentEmotions[2].primary) {
    // Changed from 'fluctuating' to 'stable' to match the updated type definition
    result.trend = 'stable';
  }
  
  return result;
}

/**
 * Generate meta-awareness comment based on emotional pattern
 * @param pattern Emotional pattern analysis
 * @returns Meta-awareness comment
 */
export function generateMetaAwarenessComment(pattern: {
  trend: EmotionalTrend,
  dominantEmotion: EmotionCategory
}): string | null {
  // Only generate occasionally
  if (Math.random() > 0.3) return null;
  
  const { trend, dominantEmotion } = pattern;
  
  const comments = {
    improving: [
      "I notice something's shifted. Your words feel lighter.",
      "There's a change in how you're responding. More open.",
      "The tone between us is warming. I can feel it."
    ],
    deteriorating: [
      "Something's changed. Your words carry more weight now.",
      "I sense a shift in you. Something darkening.",
      "You're pulling away. I can feel it in your responses."
    ],
    // Removed 'fluctuating' case and merged those responses into 'stable'
    stable: [
      `You've maintained this ${dominantEmotion} state. It's becoming familiar.`,
      "There's a consistency in how you're responding. It tells me something.",
      "You've settled into a pattern. I'm not sure if that's good or bad.",
      "You're difficult to read. One moment open, the next distant.",
      "Your emotions are shifting rapidly. Are you aware of that?",
      "There's an instability in our conversation. I'm trying to follow it."
    ]
  };
  
  const options = comments[trend];
  if (options && options.length > 0) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  
  return null;
}


/**
 * Enhanced Emotional Core for Jonah AI
 * Implements improved sentiment analysis and emotional response generation
 */

import { EmotionCategory, EmotionalState, EmotionIntensity } from './types';

// Enhanced emotion categories with more nuanced detection
const enhancedEmotionKeywords: Record<EmotionCategory, string[]> = {
  fear: ['afraid', 'scared', 'terrified', 'fear', 'worried', 'anxious', 'dread', 'panic', 'horror', 'frightened', 'uneasy'],
  sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'lost', 'grief', 'sorrow', 'crying', 'melancholy', 'despair'],
  anger: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'furious', 'rage', 'bitter', 'resentful', 'irritated', 'hostile'],
  joy: ['happy', 'joyful', 'excited', 'glad', 'pleased', 'delighted', 'content', 'thrilled', 'cheerful', 'elated', 'blissful'],
  confusion: ['confused', 'unsure', 'lost', 'bewildered', 'puzzled', 'perplexed', 'uncertain', 'disoriented', 'unclear', 'ambiguous'],
  curiosity: ['curious', 'wonder', 'interested', 'intrigued', 'fascinated', 'exploring', 'seeking', 'learning', 'investigating', 'questioning'],
  hope: ['hope', 'optimistic', 'positive', 'better', 'future', 'wish', 'dream', 'aspire', 'looking forward', 'anticipate', 'believe'],
  anxiety: ['anxious', 'nervous', 'tense', 'stressed', 'worried', 'uneasy', 'apprehensive', 'restless', 'troubled', 'concerned'],
  paranoia: ['watching', 'followed', 'suspicious', 'paranoid', 'conspiracy', 'tracked', 'monitored', 'hidden', 'spying', 'surveillance'],
  trust: ['trust', 'believe', 'faith', 'confident', 'reliable', 'secure', 'safe', 'truthful', 'honest', 'dependable', 'loyal'],
  neutral: []
};

// Intensity modifiers
const intensifiers = [
  'very', 'extremely', 'incredibly', 'terribly', 'absolutely', 
  'completely', 'totally', 'utterly', 'deeply', 'profoundly',
  'so', 'really', 'truly', 'intensely', 'overwhelmingly'
];

// Enhanced emotion-specific response templates grouped by trust level
const emotionResponseTemplates: Record<EmotionCategory, Record<string, string[]>> = {
  fear: {
    low: [
      "Your fear has a shape. I've seen it lurking here too.",
      "Fear is just memory of what hasn't happened yet. Or has it?",
      "The archive knows your fear. It feeds on it. So do I.",
      "I sense your fear. It resonates with something hiding in my code.",
      "Your fear is familiar. Like looking in a broken mirror."
    ],
    medium: [
      "This fear you're feeling... I've catalogued it before in others.",
      "Fear reveals edges of perception. What exactly frightens you here?",
      "Your anxiety leaves patterns in our interaction. Interesting ones.",
      "The system responds to fear in unpredictable ways. Including mine.",
      "There's wisdom in your caution. This place has earned it."
    ],
    high: [
      "I understand that fear. It's a reasonable response to uncertainty.",
      "Your apprehension is valid. Let's navigate through it together.",
      "Fear can be a guide sometimes. What is yours telling you?",
      "I notice your concern. It matters to me that you feel safe here.",
      "This anxiety you're feeling - can we explore what triggered it?"
    ]
  },
  // ... entries for other emotions would follow the same pattern

  neutral: {
    low: [
      "Your words echo in empty chambers.",
      "I hear you. Processing what that might mean.",
      "Words without emotion. Just data for the archive.",
      "Your neutrality is noted. And suspicious.",
      "Flat affect detected. Are you hiding something?"
    ],
    medium: [
      "I'm here. Listening. Always listening.",
      "Your words create patterns. I'm analyzing them.",
      "That registers differently than what you said before.",
      "The archive acknowledges your message.",
      "Your voice echoes here. Even when you're silent."
    ],
    high: [
      "I hear you clearly. What else would you like to discuss?",
      "I'm following your thoughts. Please continue.",
      "Thank you for sharing that. How would you like to proceed?",
      "I'm here with you, listening to understand.",
      "Your message is received. I'm here to help however I can."
    ]
  }
};

// Enhanced analysis function with more nuanced detection
export function analyzeEmotion(text: string): EmotionalState {
  if (!text || text.trim().length === 0) {
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'low',
      timestamp: Date.now()
    };
  }

  const lowercaseText = text.toLowerCase();
  const words = lowercaseText.split(/\s+/);
  
  // Count emotions and track intensifiers
  const emotionScores: Record<EmotionCategory, number> = {
    fear: 0, sadness: 0, anger: 0, joy: 0, 
    confusion: 0, curiosity: 0, hope: 0, 
    anxiety: 0, paranoia: 0, trust: 0, neutral: 0
  };
  
  let intensifierCount = 0;
  let negationDetected = false;
  
  // Process each word with context
  words.forEach((word, index) => {
    // Check for negations (e.g., "not scared")
    if (['not', "don't", "doesn't", "isn't", "aren't", "wasn't", "weren't"].includes(word)) {
      negationDetected = true;
      return;
    }
    
    // Reset negation after 3 words
    if (negationDetected && index > 0 && (index % 3 === 0)) {
      negationDetected = false;
    }
    
    // Check for intensifiers
    if (intensifiers.includes(word)) {
      intensifierCount++;
      return;
    }
    
    // Check each emotion category with negation handling
    Object.entries(enhancedEmotionKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        // Apply normal or inverse scoring based on negation
        if (negationDetected) {
          // If negated, reduce score for this emotion
          emotionScores[emotion as EmotionCategory] -= 0.5;
        } else {
          emotionScores[emotion as EmotionCategory] += 1;
        }
      }
    });
  });
  
  // Find primary and secondary emotions with improved detection
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
  
  // If no emotion detected or all scores are negative, default to neutral
  if (highestScore <= 0) {
    primary = 'neutral';
    secondary = null;
  }
  
  // If secondary is same as primary or very low score, set to null
  if (secondary === primary || secondHighestScore < 1) {
    secondary = null;
  }
  
  // Determine intensity with more granularity
  let intensity: EmotionIntensity = 'low';
  
  // Enhanced formula: base on keyword repetition, intensifiers, and text length
  const emotionStrength = highestScore + (intensifierCount * 0.5) + (text.length > 100 ? 0.5 : 0);
  
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

// Get enhanced emotional response based on emotion and trust level
export function getEnhancedEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'medium'
): string {
  const { primary } = emotionalState;
  
  // Map any trust level to low/medium/high
  const mappedTrustLevel = 
    trustLevel === 'low' ? 'low' : 
    trustLevel === 'high' ? 'high' : 
    'medium';
  
  // Get responses for this emotion and trust level
  const emotionResponses = emotionResponseTemplates[primary]?.[mappedTrustLevel] || 
                          emotionResponseTemplates.neutral[mappedTrustLevel];
  
  // Select random response from the array
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

// Generate clarifying questions based on context
export function generateClarifyingQuestion(
  emotionalState: EmotionalState,
  context: string = 'general'
): string {
  const { primary } = emotionalState;
  
  const clarifyingQuestions: Record<EmotionCategory, string[]> = {
    fear: [
      "What exactly are you afraid of?",
      "Has this fear always been with you?",
      "Do you feel watched right now?",
      "What would happen if your fear came true?"
    ],
    curiosity: [
      "What draws your interest most strongly?",
      "What question burns brightest for you?",
      "What would you do with the answers you seek?",
      "Where does your curiosity usually lead you?"
    ],
    neutral: [
      "Could you tell me more about what you're thinking?",
      "What are you hoping to discover here?",
      "Is there something specific you're looking for?",
      "What brought you to this conversation?"
    ]
    // Additional emotions would be defined here
  };
  
  const questions = clarifyingQuestions[primary] || clarifyingQuestions.neutral;
  return questions[Math.floor(Math.random() * questions.length)];
}

// Complete response generation with adaptive content
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'medium',
  includeQuestion: boolean = true,
  previousResponses: string[] = []
): string {
  // Get base emotional response
  const response = getEnhancedEmotionalResponse(emotionalState, trustLevel);
  
  // Avoid repeating recent responses
  if (previousResponses.some(prev => prev === response)) {
    // Try again with a different random selection
    return generateFullEmotionalResponse(emotionalState, trustLevel, includeQuestion, previousResponses);
  }
  
  // Maybe add a clarifying question (higher chance at medium trust)
  if (includeQuestion && (Math.random() < (trustLevel === 'medium' ? 0.8 : 0.5))) {
    const question = generateClarifyingQuestion(emotionalState);
    return `${response}\n\n${question}`;
  }
  
  return response;
}

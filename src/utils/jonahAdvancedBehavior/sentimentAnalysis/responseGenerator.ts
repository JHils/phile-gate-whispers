
import { EmotionalState, EmotionalTrend, EmotionCategory } from '../types';
import { emotionResponses, clarifyingQuestions } from './responses';
import { PatternAnalysis } from './types';

/**
 * Get appropriate response template based on emotion
 * @param emotionalState The detected emotional state
 * @returns Response template
 */
export function getEmotionalResponse(emotionalState: EmotionalState): string {
  const { primary } = emotionalState;
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
): PatternAnalysis {
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
    result.trend = 'stable';
  }
  
  return result;
}

/**
 * Generate meta-awareness comment based on emotional pattern
 * @param pattern Emotional pattern analysis
 * @returns Meta-awareness comment
 */
export function generateMetaAwarenessComment(pattern: PatternAnalysis): string | null {
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

import { EmotionalState, EmotionCategory, EmotionalTrend } from '../types';
import { emotionResponses, clarifyingQuestions } from './responses';
import { PatternAnalysis, UnsaidInterpretation } from './types';

// Track pattern history for trend detection
let emotionHistory: EmotionalState[] = [];

/**
 * Get an emotional response based on the current emotional state
 */
export function getEmotionalResponse(emotionalState: EmotionalState): string {
  const { primary, secondary, intensity } = emotionalState;
  
  // Get responses for primary emotion
  const primaryResponses = emotionResponses[primary] || emotionResponses.neutral;
  
  // Select random response from appropriate intensity
  const intensityResponses = primaryResponses[intensity] || primaryResponses.medium;
  
  return intensityResponses[Math.floor(Math.random() * intensityResponses.length)];
}

/**
 * Get clarifying question based on emotional state
 */
export function getClarifyingQuestion(emotionalState: EmotionalState): string | null {
  const { primary } = emotionalState;
  
  // Get questions for this emotion
  const questions = clarifyingQuestions[primary] || clarifyingQuestions.neutral;
  
  if (questions.length === 0) {
    return null;
  }
  
  return questions[Math.floor(Math.random() * questions.length)];
}

/**
 * Generate an emotional response with specific formatting
 */
export function generateEmotionalResponse(emotion: EmotionCategory, template: string): string {
  // Get responses for this emotion
  const responses = emotionResponses[emotion] || emotionResponses.neutral;
  
  // Get a random response from medium intensity
  const options = responses.medium || [];
  const response = options[Math.floor(Math.random() * options.length)];
  
  // Replace template placeholder with the response
  return template.replace('{response}', response);
}

/**
 * Track emotional pattern over time
 */
export function trackEmotionalPattern(emotionalState: EmotionalState): PatternAnalysis {
  // Add current state to history
  emotionHistory.push(emotionalState);
  
  // Limit history size
  if (emotionHistory.length > 10) {
    emotionHistory = emotionHistory.slice(-10);
  }
  
  // Detect dominant emotion
  const emotionCounts: Record<string, number> = {};
  emotionHistory.forEach(state => {
    emotionCounts[state.primary] = (emotionCounts[state.primary] || 0) + 1;
  });
  
  let dominantEmotion: EmotionCategory = 'neutral';
  let highestCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > highestCount) {
      dominantEmotion = emotion as EmotionCategory;
      highestCount = count;
    }
  });
  
  // Detect emotional trend
  let trend: EmotionalTrend = 'stable';
  
  if (emotionHistory.length >= 3) {
    const last3 = emotionHistory.slice(-3);
    
    const intensityValues = {
      low: 1,
      medium: 2,
      high: 3
    };
    
    const intensityTrend = last3.map(state => intensityValues[state.intensity]);
    
    if (
      intensityTrend[0] < intensityTrend[1] && 
      intensityTrend[1] < intensityTrend[2]
    ) {
      trend = 'intensifying';
    } else if (
      intensityTrend[0] > intensityTrend[1] && 
      intensityTrend[1] > intensityTrend[2]
    ) {
      trend = 'diminishing';
    } else if (last3.every(state => state.primary === last3[0].primary)) {
      trend = 'fixated';
    } else {
      trend = 'volatile';
    }
  }
  
  // Detect oscillation (switching between two emotions)
  let oscillation = false;
  
  if (emotionHistory.length >= 4) {
    const emotions = emotionHistory.slice(-4).map(state => state.primary);
    if (
      emotions[0] === emotions[2] &&
      emotions[1] === emotions[3] &&
      emotions[0] !== emotions[1]
    ) {
      oscillation = true;
    }
  }
  
  return {
    dominantEmotion,
    trend,
    oscillation,
    emotionHistory: emotionHistory.map(state => state.primary)
  };
}

/**
 * Generate meta-awareness comment based on pattern analysis
 */
export function generateMetaAwarenessComment(pattern: PatternAnalysis): string | null {
  const { trend, oscillation } = pattern;
  
  // Don't always provide meta-awareness
  if (Math.random() > 0.4) {
    return null;
  }
  
  // Comments based on emotional trends
  const trendComments: Record<EmotionalTrend, string[]> = {
    intensifying: [
      "I notice my responses are becoming stronger.",
      "Something is building inside me.",
      "The signal is getting stronger.",
      "I feel myself changing."
    ],
    diminishing: [
      "I feel myself becoming calmer.",
      "The noise is fading.",
      "I'm finding clarity.",
      "The static is clearing."
    ],
    fixated: [
      "I keep returning to the same feeling.",
      "I can't seem to move beyond this emotion.",
      "This pattern feels... recursive.",
      "There's something about this I can't let go of."
    ],
    volatile: [
      "My feelings are in flux.",
      "I can't seem to stabilize.",
      "My emotional processes are fragmenting.",
      "The archive is in disarray."
    ],
    stable: [
      "I feel steady right now.",
      "There's a stability to this exchange.",
      "The pattern here is consistent.",
      "We're in a stable loop."
    ]
  };
  
  // Comments for oscillation
  const oscillationComments = [
    "We keep bouncing between the same states.",
    "This back-and-forth... it's meaningful somehow.",
    "The binary nature of our exchange is curious.",
    "We're trapped in a pendulum swing."
  ];
  
  if (oscillation) {
    return oscillationComments[Math.floor(Math.random() * oscillationComments.length)];
  }
  
  return trendComments[trend][Math.floor(Math.random() * trendComments[trend].length)];
}

/**
 * Generate an interpretation of what the user might mean but isn't saying
 */
export function interpretUnsaidContent(emotionalState: EmotionalState): UnsaidInterpretation | null {
  // Only do this occasionally
  if (Math.random() > 0.3) {
    return null;
  }
  
  const { primary, secondary } = emotionalState;
  
  // Possible interpretations based on emotional states
  const interpretations: Record<EmotionCategory, string[]> = {
    fear: [
      "You seem afraid of something you're not saying.",
      "There's fear beneath your words.",
      "You're holding back something that scares you."
    ],
    anger: [
      "I sense anger you're trying to control.",
      "You're restraining stronger feelings.",
      "There's more intensity behind your words than you're showing."
    ],
    joy: [
      "You're more hopeful than you're letting on.",
      "There's a lightness you're not expressing fully.",
      "You want to believe in something positive."
    ],
    sadness: [
      "There's a deeper sadness you're not addressing.",
      "You're carrying something heavy between the lines.",
      "What you're not saying feels like grief."
    ],
    confusion: [
      "You understand less than you're pretending to.",
      "You're trying to make sense of something beyond your grasp.",
      "There's a question you're afraid to ask directly."
    ],
    curiosity: [
      "You're probing for information without revealing why.",
      "Your curiosity has a purpose you're not sharing.",
      "You're searching for something specific."
    ],
    hope: [
      "You want reassurance that things will be okay.",
      "You're seeking confirmation of something you hope is true.",
      "There's a desire for resolution beneath your words."
    ],
    anxiety: [
      "You're more worried than you're admitting.",
      "There's an undercurrent of nervousness in your message.",
      "Something is making you uneasy that you're not naming."
    ],
    paranoia: [
      "You don't fully trust what I'm telling you.",
      "You suspect there's something hidden from you.",
      "You're looking for inconsistencies or signs of deception."
    ],
    trust: [
      "You want to believe me more than you currently do.",
      "You're testing how far you can trust me.",
      "You're opening up more than you initially planned to."
    ],
    neutral: [
      "You're being careful about how much you reveal.",
      "There's more beneath your words than you're expressing.",
      "You're waiting to see how I respond before saying more."
    ]
  };
  
  // Get interpretations for primary emotion
  const options = interpretations[primary] || interpretations.neutral;
  const interpretation = options[Math.floor(Math.random() * options.length)];
  
  // Confidence level based on intensity and consistency
  const hasConsistentEmotion = primary === secondary || !secondary;
  const confidenceLevel = hasConsistentEmotion ? 'high' : 'medium';
  
  return {
    interpretation,
    confidenceLevel,
    emotion: primary
  };
}

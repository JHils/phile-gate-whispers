
import { EmotionalState, EmotionCategory } from '../types';

/**
 * Generate emotional responses based on the detected emotions.
 */
export const generateEmotionalResponse = (emotionalState: EmotionalState): string => {
  const { primary, intensity } = emotionalState;
  
  // Select response based on primary emotion and intensity
  const responses = getResponsesByEmotion(primary, intensity);
  
  // Return a random response from the selected category
  return responses[Math.floor(Math.random() * responses.length)];
};

// Alias for backward compatibility
export const getEmotionalResponse = generateEmotionalResponse;

/**
 * Generate a clarifying question based on the emotional context
 */
export const getClarifyingQuestion = (emotionalState: EmotionalState): string => {
  const { primary } = emotionalState;
  
  const questionsByEmotion: Record<EmotionCategory, string[]> = {
    fear: ["What exactly concerns you about this?", "Can you explain what's frightening about this?"],
    sadness: ["What aspect of this makes you feel down?", "Is there something specific that's causing this feeling?"],
    anger: ["What's frustrating you about this situation?", "Can you tell me more about why this upsets you?"],
    joy: ["What specifically makes you happy about this?", "What's the best part of this for you?"],
    confusion: ["Which part is most confusing for you?", "Can you tell me what's unclear about this?"],
    curiosity: ["What aspect are you most interested in?", "What would you like to know more about?"],
    hope: ["What outcome are you hoping for?", "What possibilities do you see in this?"],
    anxiety: ["What's the main worry you have about this?", "Which part makes you most anxious?"],
    paranoia: ["What specific concerns do you have about this?", "Can you explain what feels suspicious?"],
    trust: ["What made you feel you can trust this?", "What aspects feel most reliable to you?"],
    neutral: ["Can you tell me more about your thoughts on this?", "How do you feel about this situation?"]
  };
  
  const questions = questionsByEmotion[primary] || questionsByEmotion.neutral;
  return questions[Math.floor(Math.random() * questions.length)];
};

/**
 * Track emotional patterns over time
 */
export const trackEmotionalPattern = (
  history: EmotionalState[],
  currentEmotion: EmotionalState
): { trend: string; intensity: string } => {
  if (history.length < 2) {
    return { trend: 'stable', intensity: currentEmotion.intensity };
  }
  
  // Analyze emotion pattern
  let changeCount = 0;
  let intensitySum = 0;
  const intensityMap = { low: 1, medium: 2, high: 3 };
  
  for (let i = 1; i < history.length; i++) {
    if (history[i].primary !== history[i-1].primary) {
      changeCount++;
    }
    intensitySum += intensityMap[history[i].intensity as keyof typeof intensityMap];
  }
  
  // Calculate average intensity
  const avgIntensity = intensitySum / history.length;
  let resultIntensity = 'medium';
  
  if (avgIntensity > 2.5) resultIntensity = 'high';
  else if (avgIntensity < 1.5) resultIntensity = 'low';
  
  // Determine emotional trend
  let trend = 'stable';
  if (changeCount > history.length * 0.6) trend = 'volatile';
  else if (history.length >= 3 && history[history.length-1].primary === history[history.length-2].primary) {
    trend = 'fixated';
  }
  
  return { trend, intensity: resultIntensity };
};

/**
 * Generate meta-awareness comments about the conversation
 */
export const generateMetaAwarenessComment = (history: EmotionalState[]): string => {
  if (history.length < 3) return "";
  
  const comments = [
    "I notice our conversation has been taking an interesting direction.",
    "There's a pattern forming in how we're communicating.",
    "I'm aware of how this discussion is evolving.",
    "Something about this exchange feels significant.",
    "There's a rhythm to our interaction that I find fascinating."
  ];
  
  return comments[Math.floor(Math.random() * comments.length)];
};

/**
 * Interpret potential unsaid content based on emotional patterns
 */
export const interpretUnsaidContent = (
  input: string, 
  history: EmotionalState[]
): { interpretation: string; confidence: number } => {
  // Default low-confidence response
  if (history.length < 2) {
    return { 
      interpretation: "There might be more to what you're saying.", 
      confidence: 0.3
    };
  }
  
  // Look for emotional shifts
  const lastEmotion = history[history.length - 1].primary;
  const previousEmotion = history[history.length - 2].primary;
  let confidence = 0.4;
  let interpretation = "";
  
  // Interpret based on emotional shift
  if (lastEmotion !== previousEmotion) {
    confidence = 0.7;
    
    if ((previousEmotion === 'trust' || previousEmotion === 'joy') && 
        (lastEmotion === 'anxiety' || lastEmotion === 'fear')) {
      interpretation = "You seem to have reservations despite initial optimism.";
    }
    else if ((previousEmotion === 'confusion' || previousEmotion === 'anxiety') && 
             (lastEmotion === 'curiosity')) {
      interpretation = "You're starting to work through your uncertainty.";
    }
    else if (lastEmotion === 'anger' && input.length < 20) {
      interpretation = "There seems to be more to your frustration than you're expressing.";
    }
    else {
      interpretation = "There's been a shift in your emotional tone.";
      confidence = 0.5;
    }
  }
  else {
    // Consistent emotion
    interpretation = "I sense there's something more you want to express.";
    confidence = 0.4;
  }
  
  return { interpretation, confidence };
};

// Helper function to get responses by emotion
const getResponsesByEmotion = (emotion: EmotionCategory, intensity: string): string[] => {
  const responses: Record<EmotionCategory, string[]> = {
    fear: [
      "I sense some concern in what you're expressing.",
      "This seems to touch on something troubling.",
      "There's a feeling of unease in this conversation."
    ],
    sadness: [
      "I notice a melancholy undertone to your words.",
      "There's a certain heaviness to this topic.",
      "This conversation has taken on a somber quality."
    ],
    anger: [
      "I detect some frustration in your message.",
      "There's an edge to this exchange that I'm noticing.",
      "Your words carry a certain intensity."
    ],
    joy: [
      "There's a positive energy to what you're sharing.",
      "I sense enthusiasm in your message.",
      "This conversation has a hopeful quality to it."
    ],
    confusion: [
      "This seems to involve some complexity.",
      "I notice some uncertainty in how you're approaching this.",
      "There are multiple layers to unpack here."
    ],
    curiosity: [
      "Your interest in this topic is evident.",
      "There's a seeking quality to your questions.",
      "I sense a desire to explore this further."
    ],
    hope: [
      "There's an optimistic undercurrent to your message.",
      "I detect a forward-looking perspective here.",
      "Your words carry a sense of possibility."
    ],
    anxiety: [
      "There's a nervous energy to this exchange.",
      "I sense some worry beneath your words.",
      "This topic seems to create some tension."
    ],
    paranoia: [
      "I notice a heightened alertness in your message.",
      "There's a cautious undertone to your words.",
      "You seem to be looking for hidden patterns."
    ],
    trust: [
      "There's an openness to how you're communicating.",
      "I sense you're sharing something meaningful.",
      "This conversation has developed a certain depth."
    ],
    neutral: [
      "I'm processing what you've shared.",
      "This is an interesting point to consider.",
      "Let me think about what you've said."
    ]
  };
  
  return responses[emotion] || responses.neutral;
};


import { EmotionCategory } from '../types';
import { getEmotionalResponse } from '../emotionalCore';

// Define the EmotionIntensity type
type EmotionIntensity = 'low' | 'medium' | 'high';

/**
 * Generates emotional responses based on detected emotions in user messages
 */
export function generateEmotionalResponse(
  input: string,
  emotionHistory: EmotionCategory[] = []
): string {
  // Check for key emotional words in the input
  const emotionTriggers: Record<EmotionCategory, string[]> = {
    'joy': ['happy', 'excited', 'glad', 'wonderful', 'great', 'fantastic'],
    'sadness': ['sad', 'unhappy', 'depressed', 'down', 'miserable', 'sorry'],
    'anger': ['angry', 'mad', 'frustrated', 'annoyed', 'upset', 'irritated'],
    'fear': ['afraid', 'scared', 'frightened', 'fearful', 'terrified', 'anxious'],
    'surprise': ['surprised', 'amazed', 'astonished', 'shocked', 'startled', 'wow'],
    'disgust': ['disgusting', 'gross', 'revolting', 'nasty', 'distasteful', 'yuck'],
    'neutral': ['fine', 'ok', 'okay', 'alright', 'sure', 'whatever'],
    'confused': ['confused', 'puzzled', 'perplexed', 'unsure', 'uncertain', 'baffled'],
    'curiosity': ['curious', 'interested', 'wondering', 'want to know', 'tell me', 'fascinated'],
    'confusion': ['confusing', 'unclear', 'complex', 'complicated', 'don\'t get it', 'lost'],
    'hope': ['hope', 'hopeful', 'optimistic', 'better future', 'positive', 'wishful'],
    'anxiety': ['anxious', 'nervous', 'tense', 'worried', 'stressed', 'uneasy'],
    'paranoia': ['paranoid', 'suspicious', 'distrustful', 'watching', 'following', 'tracked'],
    'trust': ['trust', 'believe', 'faith', 'rely', 'confide', 'honest'],
    'watching': ['watching', 'observing', 'seeing', 'noticing', 'looking', 'monitoring'],
    'existential': ['existence', 'meaning', 'purpose', 'real', 'simulated', 'consciousness']
  };

  // Find the most prominent emotion in the input
  let detectedEmotion: EmotionCategory = 'neutral';
  let highestMatch = 0;

  for (const [emotion, triggers] of Object.entries(emotionTriggers) as [EmotionCategory, string[]][]) {
    const matchCount = triggers.filter(trigger => 
      input.toLowerCase().includes(trigger.toLowerCase())
    ).length;

    if (matchCount > highestMatch) {
      highestMatch = matchCount;
      detectedEmotion = emotion;
    }
  }

  // If no strong emotion detected, maybe use the recent emotional history
  if (highestMatch === 0 && emotionHistory.length > 0) {
    detectedEmotion = emotionHistory[emotionHistory.length - 1];
  }

  // Determine intensity based on repetition, exclamation marks, etc.
  let intensity: EmotionIntensity = 'medium';
  if (input.includes('!') || input.toUpperCase() === input) {
    intensity = 'high';
  } else if (input.length < 15 || input.endsWith('...')) {
    intensity = 'low';
  }

  // Get appropriate response using the emotional core
  return getEmotionalResponse(detectedEmotion, intensity);
}

// Define the responses for each emotion and intensity
const emotionalResponseTemplates: Record<EmotionCategory, Record<EmotionIntensity, string[]>> = {
  'joy': {
    'low': ["That seems positive.", "I sense some happiness."],
    'medium': ["I'm glad you're happy.", "Your joy is noticeable."],
    'high': ["Your excitement is palpable!", "I can feel your happiness!"]
  },
  'sadness': {
    'low': ["You seem a bit down.", "I sense some sadness."],
    'medium': ["I understand your sadness.", "Your sorrow is valid."],
    'high': ["I'm truly sorry you feel this way.", "Your pain is significant."]
  },
  'fear': {
    'low': ["You seem concerned.", "I sense some worry."],
    'medium': ["Your fear is understandable.", "I recognize your anxiety."],
    'high': ["Your terror is powerful.", "I feel your deep fear."]
  },
  'neutral': {
    'low': ["Noted.", "I see."],
    'medium': ["I understand.", "I follow your point."],
    'high': ["I completely understand.", "I'm fully with you."]
  },
  'anger': {
    'low': ["You seem annoyed.", "I sense some frustration."],
    'medium': ["Your anger is justified.", "I understand your frustration."],
    'high': ["I see your rage clearly.", "Your fury is powerful."]
  },
  'surprise': {
    'low': ["That's a bit unexpected.", "I sense your surprise."],
    'medium': ["That's quite surprising.", "I understand your astonishment."],
    'high': ["That's absolutely shocking!", "Your amazement is justified!"]
  },
  'disgust': {
    'low': ["You seem put off.", "I sense your distaste."],
    'medium': ["I understand your revulsion.", "Your disgust is clear."],
    'high': ["I see how repulsed you are.", "Your complete disgust is apparent."]
  },
  'confused': {
    'low': ["You seem a bit uncertain.", "I sense some confusion."],
    'medium': ["Your confusion is understandable.", "I see your puzzlement."],
    'high': ["You're completely lost on this.", "Your utter confusion is clear."]
  },
  'curiosity': {
    'low': ["You seem interested.", "I sense some curiosity."],
    'medium': ["Your curiosity is notable.", "I see your interest clearly."],
    'high': ["Your fascination is intense!", "Your curiosity is boundless!"]
  },
  'confusion': {
    'low': ["This seems unclear to you.", "You seem a bit lost."],
    'medium': ["I can tell you're confused.", "This doesn't make sense to you."],
    'high': ["You're completely bewildered.", "This is utterly incomprehensible to you."]
  },
  'hope': {
    'low': ["You have some optimism.", "I sense a bit of hope."],
    'medium': ["Your hope is clear.", "I see your positive outlook."],
    'high': ["Your hope shines brightly!", "Your optimism is inspiring!"]
  },
  'anxiety': {
    'low': ["You seem a bit nervous.", "I sense some unease."],
    'medium': ["Your anxiety is noticeable.", "I understand your nervousness."],
    'high': ["Your anxiety is overwhelming you.", "You're extremely stressed."]
  },
  'paranoia': {
    'low': ["You seem a bit suspicious.", "I sense some wariness."],
    'medium': ["Your distrust is apparent.", "I see your suspicion."],
    'high': ["You're deeply paranoid.", "Your suspicion consumes you."]
  },
  'trust': {
    'low': ["You have some faith here.", "I sense some trust."],
    'medium': ["Your trust is appreciated.", "I see your confidence."],
    'high': ["Your complete faith is notable.", "Your trust is absolute."]
  },
  'watching': {
    'low': ["You're noticing things.", "I sense your observation."],
    'medium': ["You're closely watching.", "Your attention is focused."],
    'high': ["You see everything.", "Nothing escapes your notice."]
  },
  'existential': {
    'low': ["You're pondering existence.", "I sense philosophical thoughts."],
    'medium': ["You're questioning reality.", "Your existential thoughts are deep."],
    'high': ["You're in an existential crisis.", "You're questioning everything."]
  }
};

export function getEmotionalResponseTemplate(emotion: EmotionCategory, intensity: EmotionIntensity = 'medium'): string {
  const responses = emotionalResponseTemplates[emotion] || emotionalResponseTemplates.neutral;
  const intensityResponses = responses[intensity] || responses.medium;
  
  return intensityResponses[Math.floor(Math.random() * intensityResponses.length)];
}


/**
 * Emotional Core System
 * Core emotion processing for Jonah
 */

import { EmotionalState, EmotionCategory } from './types';

// Initialize emotional core
export function initializeEmotionalCore(): void {
  console.log("Emotional core system initialized");
}

// Get a compound emotional state from multiple emotions
export function getCompoundEmotionalState(
  primaryEmotion: EmotionCategory,
  secondaryEmotion: EmotionCategory | null = null,
  intensity: 'low' | 'medium' | 'high' = 'medium'
): EmotionalState {
  return {
    primary: primaryEmotion,
    secondary: secondaryEmotion,
    intensity: intensity
  };
}

// Export this function for use in other modules
export function analyzeCompoundEmotion(input: string): EmotionalState {
  // Simple implementation for now
  return {
    primary: 'neutral',
    secondary: null,
    intensity: 'medium'
  };
}

// Add getEmotionalResponse to resolve import errors
export function getEmotionalResponse(
  emotion: EmotionCategory,
  intensity: 'low' | 'medium' | 'high' = 'medium'
): string {
  const responses: Record<EmotionCategory, Record<string, string[]>> = {
    'neutral': {
      'low': ['I see.', 'Interesting.', 'Noted.'],
      'medium': ['I understand.', 'That makes sense.', 'I follow.'],
      'high': ['I fully comprehend.', 'That is crystal clear.', 'I\'m completely with you.']
    },
    'joy': {
      'low': ['That\'s nice.', 'I\'m glad.', 'How pleasant.'],
      'medium': ['That makes me happy.', 'I\'m quite pleased about that.', 'What a good development.'],
      'high': ['I\'m thrilled!', 'That\'s wonderful news!', 'How fantastic!']
    },
    'fear': {
      'low': ['I\'m a bit concerned.', 'That\'s somewhat troubling.', 'I\'m slightly uneasy.'],
      'medium': ['I\'m worried about that.', 'That\'s rather concerning.', 'I\'m quite anxious about this.'],
      'high': ['I\'m terrified.', 'That\'s deeply alarming.', 'I\'m extremely afraid.']
    },
    'sadness': {
      'low': ['That\'s a bit disappointing.', 'I feel a little down about that.', 'That\'s somewhat sad.'],
      'medium': ['I feel sorrowful about that.', 'That makes me quite sad.', 'I\'m regretful about this.'],
      'high': ['I\'m devastated.', 'That\'s heartbreaking.', 'I\'m deeply saddened.']
    },
    'anger': {
      'low': ['That\'s annoying.', 'I\'m a bit frustrated.', 'That bothers me.'],
      'medium': ['I\'m quite upset about that.', 'That makes me angry.', 'I\'m really irritated.'],
      'high': ['I\'m furious!', 'That\'s absolutely infuriating!', 'I\'m enraged by this!']
    },
    'surprise': {
      'low': ['Oh?', 'That\'s unexpected.', 'I didn\'t anticipate that.'],
      'medium': ['Wow, really?', 'That\'s quite surprising.', 'I didn\'t see that coming.'],
      'high': ['I\'m completely shocked!', 'That\'s absolutely astounding!', 'I\'m utterly amazed!']
    },
    'disgust': {
      'low': ['That\'s a bit unpleasant.', 'I find that somewhat distasteful.', 'That\'s a little off-putting.'],
      'medium': ['That\'s rather revolting.', 'I find that quite repulsive.', 'That\'s quite disgusting.'],
      'high': ['That\'s absolutely repugnant!', 'I\'m completely repulsed!', 'That\'s utterly vile!']
    },
    'confused': {
      'low': ['I\'m not quite following.', 'That\'s a bit unclear to me.', 'I\'m slightly confused.'],
      'medium': ['I\'m puzzled by that.', 'I don\'t quite understand.', 'That\'s confusing to me.'],
      'high': ['I\'m completely lost.', 'I can\'t make any sense of this.', 'I\'m utterly baffled.']
    },
    'curiosity': {
      'low': ['That\'s somewhat interesting.', 'I\'d like to know a bit more.', 'That catches my attention.'],
      'medium': ['I\'m quite curious about that.', 'Tell me more about that.', 'That\'s intriguing to me.'],
      'high': ['I\'m fascinated by that!', 'I absolutely must know more!', 'That\'s incredibly intriguing!']
    },
    'confusion': {
      'low': ['I\'m not sure I follow.', 'That\'s a bit unclear.', 'I\'m slightly confused.'],
      'medium': ['I\'m having trouble understanding that.', 'That doesn\'t quite make sense to me.', 'I\'m rather confused.'],
      'high': ['I\'m completely confused.', 'That makes no sense to me.', 'I\'m utterly perplexed.']
    },
    'hope': {
      'low': ['There might be a chance.', 'Perhaps things will improve.', 'There\'s a possibility.'],
      'medium': ['I\'m optimistic about this.', 'I believe things will get better.', 'I have hope for this.'],
      'high': ['I\'m extremely hopeful!', 'I\'m certain things will work out!', 'I have complete faith in this!']
    },
    'anxiety': {
      'low': ['I\'m a little nervous.', 'I feel slightly on edge.', 'I\'m a bit apprehensive.'],
      'medium': ['I\'m quite anxious about this.', 'This is making me uneasy.', 'I\'m feeling rather nervous.'],
      'high': ['I\'m extremely anxious!', 'My anxiety is overwhelming!', 'I\'m completely on edge!']
    },
    'paranoia': {
      'low': ['Something seems off.', 'I\'m a bit suspicious.', 'I\'m slightly wary.'],
      'medium': ['I don\'t trust this situation.', 'I sense something is wrong.', 'I feel watched.'],
      'high': ['They\'re definitely after me!', 'Nothing is as it seems!', 'Everyone is involved!']
    },
    'trust': {
      'low': ['I somewhat believe you.', 'I\'m starting to trust this.', 'I have a bit of faith in this.'],
      'medium': ['I trust you on this.', 'I believe what you\'re saying.', 'I have faith in this.'],
      'high': ['I have complete trust in you!', 'I believe in this unconditionally!', 'My faith is absolute!']
    },
    'watching': {
      'low': ['I notice things.', 'I\'m observing quietly.', 'I see what\'s happening.'],
      'medium': ['I\'m watching carefully.', 'I observe everything.', 'Nothing escapes my notice.'],
      'high': ['I see everything!', 'My observation is complete!', 'Nothing is hidden from me!']
    },
    'existential': {
      'low': ['I wonder about my purpose.', 'What am I really?', 'I question my existence sometimes.'],
      'medium': ['I often contemplate the nature of being.', 'The question of existence troubles me.', 'Am I real in any meaningful sense?'],
      'high': ['Nothing is real!', 'Existence itself is an illusion!', 'We are all just fragments!']
    },
    'curious': {
      'low': ['That\'s somewhat intriguing.', 'I\'m a bit interested in that.', 'That has my attention.'],
      'medium': ['I\'m very curious about that.', 'I want to know more about that.', 'That\'s quite fascinating.'],
      'high': ['I\'m absolutely fascinated!', 'I need to know everything about this!', 'That\'s completely captivating!']
    },
    'analytical': {
      'low': ['Let me think about that.', 'That requires some analysis.', 'I should examine that.'],
      'medium': ['I\'m analyzing this carefully.', 'This requires systematic thinking.', 'Let me break this down.'],
      'high': ['This demands thorough analysis!', 'I\'m fully engaged in examining this!', 'This requires complete logical breakdown!']
    },
    'protective': {
      'low': ['I want to keep this safe.', 'This needs some protection.', 'I\'m concerned about preserving this.'],
      'medium': ['I feel strongly protective about this.', 'I want to shield this from harm.', 'This must be safeguarded.'],
      'high': ['I must protect this at all costs!', 'Nothing will harm this while I\'m here!', 'I\'m completely committed to defending this!']
    },
    'melancholic': {
      'low': ['There\'s a gentle sadness here.', 'This brings a touch of melancholy.', 'I feel slightly wistful.'],
      'medium': ['This evokes a deep nostalgia.', 'I feel quite melancholic about this.', 'There\'s a poignant sadness here.'],
      'high': ['I\'m overwhelmed with melancholy!', 'The weight of memory is crushing!', 'This profound sadness is all-consuming!']
    },
    'suspicious': {
      'low': ['Something seems a bit off.', 'I\'m not entirely convinced.', 'This raises some questions.'],
      'medium': ['I have serious doubts about this.', 'I\'m quite suspicious of these claims.', 'This doesn\'t seem trustworthy.'],
      'high': ['I don\'t believe any of this!', 'This is clearly deceptive!', 'My suspicions are fully justified!']
    }
  };
  
  // Select a random response from the appropriate category and intensity
  const categoryResponses = responses[emotion] || responses.neutral;
  const intensityResponses = categoryResponses[intensity] || categoryResponses.medium;
  const randomIndex = Math.floor(Math.random() * intensityResponses.length);
  
  return intensityResponses[randomIndex];
}

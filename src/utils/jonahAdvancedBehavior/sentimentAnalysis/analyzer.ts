
/**
 * Sentiment Analysis for Jonah
 * Analyzes emotional content in text
 */

import { EmotionalState, EmotionCategory, EmotionIntensity } from '../types';

// Function to analyze emotional content in text
export function analyzeEmotion(text: string): EmotionalState {
  if (!text || text.trim().length === 0) {
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'low'
    };
  }
  
  text = text.toLowerCase();
  
  // Simple emotion keyword mapping
  const emotions: Record<EmotionCategory, string[]> = {
    joy: ['happy', 'joy', 'delighted', 'pleased', 'glad', 'excited'],
    sadness: ['sad', 'unhappy', 'depressed', 'miserable', 'down', 'blue'],
    anger: ['angry', 'mad', 'furious', 'enraged', 'irritated', 'annoyed'],
    fear: ['afraid', 'scared', 'frightened', 'terrified', 'anxious', 'nervous'],
    surprise: ['surprised', 'shocked', 'astonished', 'amazed', 'stunned'],
    disgust: ['disgusted', 'revolted', 'appalled', 'repulsed'],
    neutral: ['fine', 'okay', 'alright', 'so-so', 'neutral'],
    confused: ['confused', 'puzzled', 'perplexed', 'unsure', 'uncertain', 'wondering'],
    hope: ['hope', 'optimistic', 'wishful', 'looking forward', 'hopeful'],
    anxiety: ['anxious', 'worried', 'uneasy', 'concerned', 'stress', 'troubled'],
    paranoia: ['paranoid', 'suspicious', 'distrustful', 'wary', 'watchful'],
    trust: ['trust', 'believe', 'faith', 'confidence', 'reliance', 'dependence'],
    curiosity: ['curious', 'inquisitive', 'interested', 'fascinated', 'intrigued'],
    confusion: ['baffled', 'lost', 'disoriented', 'mystified', 'befuddled', 'unclear'],
    watching: ['watching', 'observing', 'monitoring', 'tracking', 'overseeing']
  };
  
  // Count emotion matches
  const emotionCounts: Record<EmotionCategory, number> = {
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
  
  Object.entries(emotions).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        emotionCounts[emotion as EmotionCategory] += 1;
      }
    });
  });
  
  // Find primary and secondary emotions
  let primary: EmotionCategory = 'neutral';
  let secondary: EmotionCategory | null = null;
  let maxCount = 0;
  let secondMaxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      secondary = primary;
      secondMaxCount = maxCount;
      primary = emotion as EmotionCategory;
      maxCount = count;
    } else if (count > secondMaxCount && emotion !== primary) {
      secondary = emotion as EmotionCategory;
      secondMaxCount = count;
    }
  });
  
  // If no emotions detected, default to neutral
  if (maxCount === 0) {
    primary = 'neutral';
    secondary = null;
  }
  
  // Determine intensity based on match count and text length
  let intensity: EmotionIntensity = 'medium';
  const textLength = text.split(' ').length;
  
  if (maxCount > 3 || (maxCount > 1 && textLength < 5)) {
    intensity = 'high';
  } else if (maxCount <= 1 || textLength > 20) {
    intensity = 'low';
  }
  
  return {
    primary,
    secondary: secondary && secondMaxCount > 0 ? secondary : null,
    intensity
  };
}

// Get emotional response based on analyzed emotion
export function getEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'medium'
): string {
  const { primary, intensity } = emotionalState;
  
  // Basic responses based on primary emotion and intensity
  const responses: Record<EmotionCategory, Record<EmotionIntensity, string[]>> = {
    joy: {
      low: ["I'm glad to see you're feeling positive.", "That's nice to hear."],
      medium: ["Your happiness is infectious.", "I'm really glad things are going well for you."],
      high: ["Wow, you're really excited! That's wonderful.", "Your joy is radiating through your words!"]
    },
    sadness: {
      low: ["I sense some sadness in your words.", "You seem a bit down."],
      medium: ["I can tell you're feeling sad. I'm here to listen.", "It sounds like you're going through a difficult time."],
      high: ["I'm truly sorry you're feeling so devastated.", "Your pain comes through clearly, and I wish I could help more."]
    },
    anger: {
      low: ["You seem a bit frustrated.", "I sense some annoyance in your message."],
      medium: ["I can tell you're angry about this.", "Your frustration is understandable."],
      high: ["I can feel your intense anger.", "You're clearly very upset about this situation."]
    },
    fear: {
      low: ["You seem a bit concerned.", "I sense some worry in your words."],
      medium: ["Your fear is understandable in this situation.", "I can tell this makes you anxious."],
      high: ["I can feel how terrified you are.", "Your fear comes through very strongly."]
    },
    surprise: {
      low: ["That seems unexpected to you.", "I sense this caught you off guard."],
      medium: ["You're quite surprised by this, aren't you?", "This really wasn't what you expected."],
      high: ["You're completely astonished!", "This has truly shocked you."]
    },
    disgust: {
      low: ["You seem a bit put off by this.", "I sense some displeasure in your response."],
      medium: ["You find this quite distasteful, don't you?", "Your disgust is evident."],
      high: ["You're completely repulsed by this.", "I can tell you find this absolutely revolting."]
    },
    neutral: {
      low: ["I see.", "Understood."],
      medium: ["I understand your perspective.", "That makes sense."],
      high: ["I completely follow your reasoning.", "That's perfectly clear to me."]
    },
    confused: {
      low: ["You seem a little uncertain.", "I sense some confusion in your question."],
      medium: ["You're quite puzzled by this, aren't you?", "Your confusion is understandable."],
      high: ["You're completely lost on this topic.", "This has really got you bewildered."]
    },
    hope: {
      low: ["I see a glimmer of hope in your words.", "You're cautiously optimistic."],
      medium: ["Your hopefulness is evident.", "You're really looking forward to this possibility."],
      high: ["Your hope shines through powerfully.", "You're incredibly optimistic about this."]
    },
    anxiety: {
      low: ["You seem a bit concerned.", "I notice a hint of worry in your words."],
      medium: ["Your anxiety about this is clear.", "This really has you worried."],
      high: ["You're extremely anxious about this situation.", "Your words convey profound worry."]
    },
    paranoia: {
      low: ["You're being cautious about this.", "I sense you're a bit suspicious."],
      medium: ["You're quite distrustful of this situation.", "Your paranoia is coming through."],
      high: ["You're extremely suspicious of everything around this.", "Your paranoia is at a peak level."]
    },
    trust: {
      low: ["You seem to have some faith in this.", "I sense some trust in your words."],
      medium: ["You truly believe in this, don't you?", "Your trust is commendable."],
      high: ["Your complete faith in this is remarkable.", "You trust this implicitly."]
    },
    curiosity: {
      low: ["You seem somewhat interested in this.", "I notice a bit of curiosity in your question."],
      medium: ["You're quite curious about this, aren't you?", "Your interest in this topic is clear."],
      high: ["You're absolutely fascinated by this.", "Your curiosity knows no bounds on this subject."]
    },
    confusion: {
      low: ["This seems a little unclear to you.", "You're somewhat confused about this."],
      medium: ["You're really struggling to make sense of this.", "This has you quite confused."],
      high: ["You're completely baffled by this whole situation.", "This has thoroughly confused you."]
    },
    watching: {
      low: ["You're keeping an eye on things.", "I notice you're observing carefully."],
      medium: ["You're monitoring this situation closely.", "Your watchful attention is evident."],
      high: ["You're intensely focused on every detail here.", "Nothing escapes your observation."]
    }
  };
  
  // Get responses for the primary emotion and intensity
  const emotionResponses = responses[primary]?.[intensity] || responses.neutral.medium;
  
  // Pick a random response
  const response = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  
  // Adjust based on trust level
  if (trustLevel === 'low') {
    return response + " At least, that's my impression.";
  } else if (trustLevel === 'high') {
    return response + " I'm pretty certain about this.";
  }
  
  return response;
}

// Function to generate a layered emotional response
export function getLayeredEmotionalResponse(
  state: EmotionalState, 
  context: string, 
  trustLevel: string = 'medium'
): string {
  const baseResponse = getEmotionalResponse(state, trustLevel);
  
  // Add contextual layer if available
  if (context && context.length > 0) {
    return `${baseResponse} In the context of ${context}, this is especially relevant.`;
  }
  
  return baseResponse;
}

// Check for recurring symbols or patterns in text
export function checkForRecurringSymbols(text: string): { found: boolean; pattern: string | null } {
  if (!text || text.length < 5) return { found: false, pattern: null };
  
  // Check for repeated symbols
  const symbolRegex = /([!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\1{2,}/g;
  const matches = text.match(symbolRegex);
  
  if (matches && matches.length > 0) {
    return { 
      found: true, 
      pattern: matches[0] 
    };
  }
  
  // Check for word repetition
  const wordArray = text.toLowerCase().split(/\s+/);
  const wordSet = new Set(wordArray);
  
  if (wordArray.length > 5 && wordSet.size < wordArray.length / 2) {
    // Significant repetition detected
    const mostFrequent = findMostFrequentWord(wordArray);
    return {
      found: true,
      pattern: mostFrequent
    };
  }
  
  return { found: false, pattern: null };
}

// Helper function to find most frequent word
function findMostFrequentWord(words: string[]): string {
  const frequency: Record<string, number> = {};
  let maxFreq = 0;
  let mostFrequent = '';
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
    if (frequency[word] > maxFreq && word.length > 2) { // Ignore short words
      maxFreq = frequency[word];
      mostFrequent = word;
    }
  });
  
  return mostFrequent;
}

// Function to process emotional input with advanced analysis
export function processEmotionalInput(input: string, trustLevel: string = 'medium'): string {
  // First analyze the basic emotion
  const emotionalState = analyzeEmotion(input);
  
  // Check for patterns or symbols
  const patterns = checkForRecurringSymbols(input);
  
  // Generate response based on emotional state
  let response = getEmotionalResponse(emotionalState, trustLevel);
  
  // If patterns found, acknowledge them
  if (patterns.found) {
    response += ` I notice you keep using "${patterns.pattern}". Does this have special significance?`;
  }
  
  return response;
}

// Generate emotional response with style variations
export function generateEmotionalResponse(
  emotionalState: EmotionalState, 
  trustLevel: string = 'medium', 
  style: 'direct' | 'cryptic' | 'analytical' | 'poetic' = 'direct'
): string {
  const baseResponse = getEmotionalResponse(emotionalState, trustLevel);
  
  // Style transformations
  switch (style) {
    case 'cryptic':
      return `Between the lines of what you're saying... ${baseResponse.toLowerCase()} Or perhaps that's just an echo.`;
      
    case 'analytical':
      return `Analysis indicates ${baseResponse.toLowerCase()} The emotional pattern suggests a ${emotionalState.intensity} level of ${emotionalState.primary}.`;
      
    case 'poetic':
      return `Like ${getPoeticMetaphor(emotionalState.primary)}, your words reveal that ${baseResponse.toLowerCase()}`;
      
    case 'direct':
    default:
      return baseResponse;
  }
}

// Helper function for poetic metaphors
function getPoeticMetaphor(emotion: EmotionCategory): string {
  const metaphors: Record<EmotionCategory, string[]> = {
    joy: ['sunlight breaking through clouds', 'a bird taking flight', 'a sudden warm breeze'],
    sadness: ['rain against a window', 'autumn leaves falling', 'the last notes of a song'],
    anger: ['a spark catching dry tinder', 'thunder in the distance', 'a dam about to break'],
    fear: ['shadows lengthening at dusk', 'footsteps behind you in the dark', 'a door creaking open'],
    surprise: ['the sudden flutter of startled birds', 'a curtain pulled back', 'lightning across a clear sky'],
    disgust: ['a sour taste lingering', 'the scent of something rotten', 'muddy water seeping in'],
    neutral: ['still water', 'the middle path', 'balanced scales'],
    confused: ['a labyrinth with shifting walls', 'fog obscuring the path', 'a tangled skein'],
    hope: ['the first green shoots after winter', 'stars appearing one by one', 'a lighthouse beam'],
    anxiety: ['sand slipping through fingers', 'a clock ticking louder', 'the edge of a precipice'],
    paranoia: ['eyes watching from darkened windows', 'whispers just beyond hearing', 'the feeling of being followed'],
    trust: ['a hand extended in the dark', 'a bridge across troubled water', 'an anchor in a storm'],
    curiosity: ['an unopened letter', 'a door left ajar', 'a map with unexplored territories'],
    confusion: ['a puzzle with missing pieces', 'a compass spinning wildly', 'echoes in a maze'],
    watching: ['a sentinel on the wall', 'eyes reflecting moonlight', 'the stillness before movement']
  };
  
  const options = metaphors[emotion] || metaphors.neutral;
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Jonah Adaptive Learning System
 * Tracks user interaction patterns and adapts responses accordingly
 */

// Interface for user interaction pattern
interface InteractionPattern {
  repeatedPhrases: Record<string, number>;
  responsePreferences: Record<string, number>;
  sentimentTrends: string[];
  interactionFrequency: {
    timestamps: number[];
    averageGap: number;
  };
  personalTags: string[];
  lastAnalyzed: number;
}

// Get the current interaction pattern
const getInteractionPattern = (): InteractionPattern => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return behaviorData.interactionPattern || {
      repeatedPhrases: {},
      responsePreferences: {},
      sentimentTrends: [],
      interactionFrequency: {
        timestamps: [],
        averageGap: 0
      },
      personalTags: [],
      lastAnalyzed: Date.now()
    };
  } catch (error) {
    console.error("Error retrieving interaction pattern:", error);
    return {
      repeatedPhrases: {},
      responsePreferences: {},
      sentimentTrends: [],
      interactionFrequency: {
        timestamps: [],
        averageGap: 0
      },
      personalTags: [],
      lastAnalyzed: Date.now()
    };
  }
};

// Save interaction pattern
const saveInteractionPattern = (pattern: InteractionPattern): void => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    behaviorData.interactionPattern = pattern;
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error saving interaction pattern:", error);
  }
};

// Track a user input for patterns
export const trackUserInput = (input: string): void => {
  const pattern = getInteractionPattern();
  
  // Track timestamps for frequency analysis
  pattern.interactionFrequency.timestamps.push(Date.now());
  if (pattern.interactionFrequency.timestamps.length > 20) {
    pattern.interactionFrequency.timestamps = pattern.interactionFrequency.timestamps.slice(-20);
  }
  
  // Calculate average gap between interactions
  if (pattern.interactionFrequency.timestamps.length > 1) {
    const gaps: number[] = [];
    for (let i = 1; i < pattern.interactionFrequency.timestamps.length; i++) {
      gaps.push(pattern.interactionFrequency.timestamps[i] - pattern.interactionFrequency.timestamps[i - 1]);
    }
    pattern.interactionFrequency.averageGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
  }
  
  // Track repeated phrases
  const normalizedInput = input.toLowerCase().trim();
  if (normalizedInput.length > 3) {
    pattern.repeatedPhrases[normalizedInput] = (pattern.repeatedPhrases[normalizedInput] || 0) + 1;
    
    // Cleanup if we have too many phrases
    const phrases = Object.entries(pattern.repeatedPhrases);
    if (phrases.length > 30) {
      // Sort by frequency and keep only the top 30
      phrases.sort((a, b) => b[1] - a[1]);
      pattern.repeatedPhrases = Object.fromEntries(phrases.slice(0, 30));
    }
  }
  
  // Track sentiment trends
  const sentiments = {
    positive: ['good', 'great', 'nice', 'happy', 'thanks', 'love', 'like', 'awesome', 'amazing', 'wonderful', 'excellent'],
    negative: ['bad', 'awful', 'terrible', 'sad', 'angry', 'hate', 'dislike', 'disappoint', 'frustrated', 'annoyed'],
    curious: ['what', 'how', 'why', 'when', 'where', 'who', 'which', '?'],
    directive: ['do', 'show', 'tell', 'explain', 'help', 'find', 'give']
  };
  
  // Check for sentiment matches
  for (const [sentiment, words] of Object.entries(sentiments)) {
    if (words.some(word => normalizedInput.includes(word))) {
      pattern.sentimentTrends.push(sentiment);
      break;
    }
  }
  
  // Keep only last 20 sentiment trends
  if (pattern.sentimentTrends.length > 20) {
    pattern.sentimentTrends = pattern.sentimentTrends.slice(-20);
  }
  
  // Update last analyzed timestamp
  pattern.lastAnalyzed = Date.now();
  
  // Save updated pattern
  saveInteractionPattern(pattern);
  
  // Generate personal tags if we have enough data and none exist
  if (pattern.personalTags.length === 0 && pattern.sentimentTrends.length >= 10) {
    generatePersonalTags();
  }
};

// Track a response preference
export const trackResponsePreference = (responseType: string): void => {
  const pattern = getInteractionPattern();
  
  pattern.responsePreferences[responseType] = (pattern.responsePreferences[responseType] || 0) + 1;
  
  saveInteractionPattern(pattern);
};

// Generate personal tags based on interaction patterns
export const generatePersonalTags = (): string[] => {
  const pattern = getInteractionPattern();
  const tags: string[] = [];
  
  // Analyze sentiment trends
  const sentimentCounts: Record<string, number> = {};
  pattern.sentimentTrends.forEach(sentiment => {
    sentimentCounts[sentiment] = (sentimentCounts[sentiment] || 0) + 1;
  });
  
  // Get dominant sentiment
  let dominantSentiment = '';
  let highestCount = 0;
  
  for (const [sentiment, count] of Object.entries(sentimentCounts)) {
    if (count > highestCount) {
      dominantSentiment = sentiment;
      highestCount = count;
    }
  }
  
  // Generate tag based on dominant sentiment
  if (dominantSentiment) {
    switch (dominantSentiment) {
      case 'positive':
        tags.push('The Optimist');
        break;
      case 'negative':
        tags.push('The Skeptic');
        break;
      case 'curious':
        tags.push('The Seeker');
        break;
      case 'directive':
        tags.push('The Director');
        break;
    }
  }
  
  // Check interaction frequency
  if (pattern.interactionFrequency.timestamps.length > 5) {
    const averageGapMinutes = pattern.interactionFrequency.averageGap / (1000 * 60);
    
    if (averageGapMinutes < 0.5) {
      tags.push('The Impatient');
    } else if (averageGapMinutes > 5) {
      tags.push('The Thoughtful');
    }
  }
  
  // Check for repeated phrases
  const repeatedPhrasesCount = Object.values(pattern.repeatedPhrases).reduce((sum, count) => sum + count, 0);
  const phraseVariety = Object.keys(pattern.repeatedPhrases).length;
  
  if (repeatedPhrasesCount > 0 && phraseVariety > 0) {
    const repetitionFactor = repeatedPhrasesCount / phraseVariety;
    
    if (repetitionFactor > 2) {
      tags.push('The Echo');
    } else if (repetitionFactor < 1.2) {
      tags.push('The Explorer');
    }
  }
  
  // Save tags
  pattern.personalTags = tags;
  saveInteractionPattern(pattern);
  
  return tags;
};

// Get user's personal tags
export const getPersonalTags = (): string[] => {
  const pattern = getInteractionPattern();
  return pattern.personalTags;
};

// Get response adapted to user's patterns
export const getAdaptedResponse = (baseResponse: string): string => {
  const pattern = getInteractionPattern();
  
  // If we don't have enough data, return the base response
  if (pattern.sentimentTrends.length < 5) {
    return baseResponse;
  }
  
  // Check if we should personalize with tags
  if (pattern.personalTags.length > 0 && Math.random() < 0.2) {
    const tag = pattern.personalTags[Math.floor(Math.random() * pattern.personalTags.length)];
    
    const personalizations = [
      `${baseResponse} That's what I'd expect from ${tag}.`,
      `${tag} would understand this: ${baseResponse}`,
      `${baseResponse} You always were ${tag}.`,
      `I remember your patterns, ${tag}. ${baseResponse}`,
      `${baseResponse} It's your nature as ${tag}.`
    ];
    
    return personalizations[Math.floor(Math.random() * personalizations.length)];
  }
  
  // Check if we should adapt to sentiment trends
  const recentSentiments = pattern.sentimentTrends.slice(-5);
  const sentimentCounts: Record<string, number> = {};
  
  recentSentiments.forEach(sentiment => {
    sentimentCounts[sentiment] = (sentimentCounts[sentiment] || 0) + 1;
  });
  
  // Get most recent dominant sentiment
  let dominantRecentSentiment = '';
  let highestRecentCount = 0;
  
  for (const [sentiment, count] of Object.entries(sentimentCounts)) {
    if (count > highestRecentCount) {
      dominantRecentSentiment = sentiment;
      highestRecentCount = count;
    }
  }
  
  // Adapt response based on dominant sentiment
  if (dominantRecentSentiment && highestRecentCount >= 2) {
    switch (dominantRecentSentiment) {
      case 'positive':
        return `${baseResponse} I appreciate your positive energy.`;
      case 'negative':
        return `${baseResponse} I sense your concern.`;
      case 'curious':
        return `${baseResponse} Keep questioning. That's how we find the truth.`;
      case 'directive':
        return `${baseResponse} You always know what you want.`;
    }
  }
  
  // If no adaptation, return base response
  return baseResponse;
};

// Check if a phrase is repeated by the user
export const isRepeatedPhrase = (input: string): boolean => {
  const pattern = getInteractionPattern();
  const normalizedInput = input.toLowerCase().trim();
  
  return (pattern.repeatedPhrases[normalizedInput] || 0) > 1;
};

// Get a response about repetition
export const getRepetitionResponse = (input: string): string | null => {
  const pattern = getInteractionPattern();
  const normalizedInput = input.toLowerCase().trim();
  
  // Check if this is a repeated phrase
  const repetitionCount = pattern.repeatedPhrases[normalizedInput] || 0;
  
  if (repetitionCount > 1) {
    const responses = [
      `You've said this before. ${repetitionCount} times now.`,
      `You keep coming back to these words.`,
      `This repetition feels significant.`,
      `You said the same thing before. I remember.`,
      `I'm noticing a pattern in your messages.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return null;
};

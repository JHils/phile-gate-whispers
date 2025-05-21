
/**
 * Emotional Core
 * Handles emotional processing for Jonah
 */

import { EmotionCategory, EmotionalState } from './types';

/**
 * Initialize the emotional core system
 */
export function initializeEmotionalCore(): void {
  console.log("Initializing Jonah's emotional core...");
  
  // Set initial emotional state in localStorage if not already set
  if (!localStorage.getItem('jonah_emotion_primary')) {
    localStorage.setItem('jonah_emotion_primary', 'neutral');
  }
  
  if (!localStorage.getItem('jonah_emotion_intensity')) {
    localStorage.setItem('jonah_emotion_intensity', 'medium');
  }
  
  // Initialize baseline emotional metrics
  const baselineEmotions: Record<EmotionCategory, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0,
    disgust: 0,
    neutral: 10, // Start with mostly neutral
    confused: 0,
    hope: 2, // A little hope
    anxiety: 1, // A touch of anxiety
    paranoia: 0,
    trust: 2, // Some basic trust
    curiosity: 3, // Some curiosity
    confusion: 0,
    watching: 0
  };
  
  // Store baseline if not already set
  if (!localStorage.getItem('jonah_emotional_baseline')) {
    localStorage.setItem('jonah_emotional_baseline', JSON.stringify(baselineEmotions));
  }
  
  console.log("Emotional core initialized");
}

// Process input to detect emotional state
export function processInput(input: string): EmotionalState {
  // Analyze for emotions
  const emotionalState = analyzeText(input);
  
  // Update emotional metrics based on input
  updateEmotionalMetrics(input, emotionalState);
  
  return emotionalState;
}

// Analyze text for emotional content
function analyzeText(text: string): EmotionalState {
  // Simple keyword based analysis for now
  const keywords: Record<EmotionCategory, string[]> = {
    joy: ['happy', 'joy', 'glad', 'excited', 'pleased'],
    sadness: ['sad', 'unhappy', 'depressed', 'sorrow', 'grief', 'lost'],
    anger: ['angry', 'mad', 'furious', 'outraged', 'annoyed'],
    fear: ['fear', 'afraid', 'scared', 'terrified', 'anxious'],
    surprise: ['surprised', 'shocked', 'amazed', 'astonished'],
    disgust: ['disgust', 'gross', 'repulsed', 'sickened'],
    neutral: ['okay', 'fine', 'neutral', 'normal'],
    confused: ['confused', 'puzzled', 'perplexed'],
    hope: ['hope', 'optimistic', 'hopeful', 'positive'],
    anxiety: ['anxious', 'worried', 'nervous', 'concerned'],
    paranoia: ['suspicious', 'paranoid', 'doubting', 'skeptical'],
    trust: ['trust', 'believe', 'faith', 'reliable'],
    curiosity: ['curious', 'interested', 'intrigued'],
    confusion: ['confused', 'unsure', 'uncertain'],
    watching: ['watching', 'observing', 'monitoring']
  };

  // Count emotion keywords
  const counts: Record<EmotionCategory, number> = {
    joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, 
    disgust: 0, neutral: 0, confused: 0, hope: 0, 
    anxiety: 0, paranoia: 0, trust: 0, curiosity: 0, 
    confusion: 0, watching: 0
  };
  
  const lowerText = text.toLowerCase();
  
  // Count occurrences of each emotion's keywords
  Object.entries(keywords).forEach(([emotion, words]) => {
    words.forEach(word => {
      if (lowerText.includes(word)) {
        counts[emotion as EmotionCategory] += 1;
      }
    });
  });
  
  // Find primary emotion (most counts)
  let primaryEmotion: EmotionCategory = 'neutral';
  let maxCount = 0;
  
  Object.entries(counts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      primaryEmotion = emotion as EmotionCategory;
    }
  });
  
  // Default to neutral if no emotions detected
  if (maxCount === 0) {
    primaryEmotion = 'neutral';
  }
  
  // Determine intensity based on count and text length
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  if (maxCount >= 3 || text.length > 100) {
    intensity = 'high';
  } else if (maxCount <= 1 && text.length < 20) {
    intensity = 'low';
  }
  
  // Find secondary emotion (second most counts)
  let secondaryEmotion: EmotionCategory | null = null;
  let secondMaxCount = 0;
  
  Object.entries(counts).forEach(([emotion, count]) => {
    if (count > secondMaxCount && emotion !== primaryEmotion) {
      secondMaxCount = count;
      secondaryEmotion = emotion as EmotionCategory;
    }
  });
  
  // Only set secondary if it has counts
  if (secondMaxCount === 0) {
    secondaryEmotion = null;
  }
  
  return {
    primary: primaryEmotion,
    secondary: secondaryEmotion,
    intensity
  };
}

// Update emotional metrics based on input
function updateEmotionalMetrics(input: string, state: EmotionalState): void {
  try {
    // Get current baseline
    const baselineStr = localStorage.getItem('jonah_emotional_baseline');
    if (!baselineStr) return;
    
    const baseline: Record<EmotionCategory, number> = JSON.parse(baselineStr);
    
    // Update based on primary emotion
    if (state.primary) {
      baseline[state.primary] += state.intensity === 'high' ? 2 : 1;
    }
    
    // Update based on secondary emotion
    if (state.secondary) {
      baseline[state.secondary] += 0.5;
    }
    
    // Decay other emotions slightly
    Object.keys(baseline).forEach(emotion => {
      if (emotion !== state.primary && emotion !== state.secondary) {
        baseline[emotion as EmotionCategory] *= 0.95; // Slight decay
      }
    });
    
    // Store updated baseline
    localStorage.setItem('jonah_emotional_baseline', JSON.stringify(baseline));
    
    // Update current emotional state
    localStorage.setItem('jonah_emotion_primary', state.primary);
    localStorage.setItem('jonah_emotion_intensity', state.intensity);
    if (state.secondary) {
      localStorage.setItem('jonah_emotion_secondary', state.secondary);
    } else {
      localStorage.removeItem('jonah_emotion_secondary');
    }
  } catch (e) {
    console.error("Error updating emotional metrics:", e);
  }
}

// Get emotional responses by category
export function getEmotionalResponses(): Record<EmotionCategory, string[]> {
  return {
    joy: [
      "That brings me happiness.",
      "I feel positive about that.",
      "That gives me a sense of joy."
    ],
    sadness: [
      "That makes me feel sad.",
      "I find that disheartening.",
      "That brings a sense of melancholy."
    ],
    anger: [
      "That frustrates me.",
      "I feel upset about that.",
      "That sparks anger within me."
    ],
    fear: [
      "That makes me uneasy.",
      "I feel afraid when I think about that.",
      "That brings up fear for me."
    ],
    surprise: [
      "That's unexpected.",
      "I'm surprised by that.",
      "I didn't see that coming."
    ],
    disgust: [
      "That repulses me.",
      "I find that distasteful.",
      "That gives me a feeling of disgust."
    ],
    neutral: [
      "I acknowledge that.",
      "I understand what you mean.",
      "That's a reasonable perspective."
    ],
    confused: [
      "I'm not sure I understand.",
      "That confuses me.",
      "I'm having trouble following that."
    ],
    hope: [
      "That gives me hope.",
      "I feel optimistic about that.",
      "That brings a sense of possibility."
    ],
    anxiety: [
      "That makes me anxious.",
      "I feel nervous about that.",
      "That brings up worry for me."
    ],
    paranoia: [
      "I'm suspicious of that.",
      "Something doesn't feel right about that.",
      "I can't help but question the motives there."
    ],
    trust: [
      "I believe in that.",
      "I trust what you're saying.",
      "That feels reliable to me."
    ],
    curiosity: [
      "I'm curious about that.",
      "That intrigues me.",
      "I want to know more about that."
    ],
    confusion: [
      "That's perplexing.",
      "I'm not following the logic there.",
      "That's hard for me to make sense of."
    ],
    watching: [
      "I'm observing this carefully.",
      "I notice what's happening here.",
      "I'm paying close attention to this."
    ]
  };
}

// Generate a response based on the detected emotion
export function generateEmotionalResponse(input: string): string {
  // Process the input to detect the emotional state
  const emotionalState = processInput(input);
  
  // Get the emotional responses
  const responses = getEmotionalResponses();
  
  // Get the responses for the primary emotion
  const emotionResponses = responses[emotionalState.primary];
  
  // If there are no responses for the primary emotion, return a default response
  if (!emotionResponses) {
    return "I'm not sure how to respond to that.";
  }
  
  // Return a random response from the emotion responses
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

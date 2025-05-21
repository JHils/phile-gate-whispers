
// Update paths to trustLevel and lastInteractionTime

/**
 * Emotional Response Generator
 * Generates contextual emotional responses based on memory and current state
 */

import { EmotionCategory, EmotionalState, EmotionIntensity } from '../types';
import { MemoryContext } from './memoryContext';

// Helper function to select a random item from an array
const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Generate a contextual emotional response based on memory and current state
export const generateContextualResponse = (
  emotion: EmotionCategory,
  intensity: EmotionIntensity,
  context: MemoryContext,
  trustLevel: string = 'medium'
): string => {
  // Responses based on emotion and intensity
  const emotionResponses: Record<EmotionCategory, Record<EmotionIntensity, string[]>> = {
    joy: {
      low: [
        "I'm feeling positive about this.",
        "This brings a bit of brightness to my day.",
        "I like where this is going."
      ],
      medium: [
        "I'm happy we're talking about this!",
        "This makes me feel good.",
        "I'm genuinely pleased with this conversation."
      ],
      high: [
        "This brings me so much joy!",
        "I'm truly delighted by this!",
        "What a wonderful exchange! I feel so uplifted!"
      ]
    },
    sadness: {
      low: [
        "I feel a little down about this.",
        "There's something melancholy here.",
        "This touches on something sad for me."
      ],
      medium: [
        "I feel sad when I think about this.",
        "This creates a sense of loss for me.",
        "There's a heaviness in this topic."
      ],
      high: [
        "This deeply saddens me.",
        "I feel a profound sense of grief about this.",
        "I'm overwhelmed with sadness thinking about this."
      ]
    },
    fear: {
      low: [
        "I'm slightly concerned about this.",
        "This makes me a bit uneasy.",
        "I have some reservations here."
      ],
      medium: [
        "This makes me quite anxious.",
        "I'm worried about where this leads.",
        "I feel vulnerable discussing this."
      ],
      high: [
        "This terrifies me.",
        "I'm deeply afraid of this possibility.",
        "This triggers intense fear in me."
      ]
    },
    // ... more emotions as needed
    neutral: {
      low: [
        "I don't have strong feelings about this.",
        "This seems neither good nor bad to me.",
        "I'm neutral on this topic."
      ],
      medium: [
        "I can see this objectively.",
        "I'm maintaining a balanced perspective here.",
        "I'm approaching this with neutrality."
      ],
      high: [
        "I'm deliberately remaining neutral here.",
        "I'm carefully avoiding emotional bias on this topic.",
        "I'm keeping a completely objective stance."
      ]
    }
  };
  
  // Contextual elements based on previous interactions
  let contextualPrefix = "";
  let contextualSuffix = "";
  
  // Check for recurring topics
  if (context.recentInputs.length > 3) {
    const lastInput = context.recentInputs[0].toLowerCase();
    const prevInputs = context.recentInputs.slice(1).map(i => i.toLowerCase());
    
    const hasRecurringTopic = prevInputs.some(input => {
      const words = input.split(" ");
      const lastWords = lastInput.split(" ");
      return words.some(word => word.length > 4 && lastWords.includes(word));
    });
    
    if (hasRecurringTopic) {
      const recurringPrefixes = [
        "We keep coming back to this. ",
        "This topic seems important to you. ",
        "You've mentioned this before. "
      ];
      contextualPrefix = trustLevel !== 'low' ? getRandomItem(recurringPrefixes) : "";
    }
  }
  
  // Check for emotional shifts
  if (context.recentEmotions && context.recentEmotions.length > 2) {
    const previousEmotion = context.recentEmotions[1];
    const currentEmotion = emotion;
    
    if (previousEmotion !== currentEmotion) {
      const emotionalShiftSuffixes = [
        ` This is different from how I felt earlier.`,
        ` My feelings have changed on this.`,
        ` I'm seeing this in a new emotional light now.`
      ];
      
      contextualSuffix = trustLevel !== 'low' ? getRandomItem(emotionalShiftSuffixes) : "";
    }
  }
  
  // Check for trust level and adapt response
  const trustLevelValue = trustLevel === 'high' ? 75 : trustLevel === 'medium' ? 50 : 25;
  
  let emotionalResponse = "";
  
  // Select appropriate emotional response based on emotion and intensity
  if (emotionResponses[emotion] && emotionResponses[emotion][intensity]) {
    emotionalResponse = getRandomItem(emotionResponses[emotion][intensity]);
  } else {
    // Fallback for undefined emotion/intensity combinations
    emotionalResponse = getRandomItem(emotionResponses.neutral.medium);
  }
  
  // For high trust, add more personal elements
  if (trustLevelValue > 70 && Math.random() > 0.5) {
    const personalElements = [
      "I feel like I can be honest with you about this.",
      "Since we've built this connection, I'll tell you that",
      "I don't usually share this, but"
    ];
    
    contextualPrefix = getRandomItem(personalElements) + " ";
  }
  
  // For very low trust, be more guarded
  if (trustLevelValue < 30 && Math.random() > 0.5) {
    const guardedElements = [
      "I'm not sure I should say this, but",
      "Perhaps",
      "I might be"
    ];
    
    contextualPrefix = getRandomItem(guardedElements) + " ";
    // Tone down the emotional expression
    emotionalResponse = emotionalResponse.replace(/!+/g, '.');
  }
  
  // Check time since last interaction
  const now = Date.now();
  const lastInteractionTime = context.lastInteractionTime || now;
  const timeSinceLastInteraction = now - lastInteractionTime;
  
  // If it's been a while since the last interaction
  if (timeSinceLastInteraction > 86400000) { // More than a day
    const reconnectionPrefixes = [
      "It's been a while. ",
      "After our break, I find that ",
      "Since we last talked, I've been thinking that "
    ];
    
    contextualPrefix = getRandomItem(reconnectionPrefixes);
  }
  
  return contextualPrefix + emotionalResponse + contextualSuffix;
};

// Generate a response that reflects emotional complexity
export const generateComplexEmotionalResponse = (
  primaryEmotion: EmotionCategory,
  secondaryEmotion: EmotionCategory | null,
  intensity: EmotionIntensity,
  context: MemoryContext,
  trustLevel: string = 'medium'
): string => {
  if (!secondaryEmotion) {
    // If there's no secondary emotion, just use the standard response
    return generateContextualResponse(primaryEmotion, intensity, context, trustLevel);
  }
  
  const primaryResponse = generateContextualResponse(primaryEmotion, intensity, context, trustLevel);
  const secondaryResponse = generateContextualResponse(secondaryEmotion, 'low', context, trustLevel);
  
  // Connectors to blend the two emotions
  const emotionalConnectors = [
    "But I also feel",
    "Yet, at the same time,",
    "Though, I'm also experiencing",
    "While also sensing",
    "Mixed with",
  ];
  
  // Customize based on trust level
  const trustLevelValue = trustLevel === 'high' ? 75 : trustLevel === 'medium' ? 50 : 25;
  
  // For high trust, reveal more complexity
  if (trustLevelValue > 60) {
    return `${primaryResponse} ${getRandomItem(emotionalConnectors)} ${secondaryResponse.toLowerCase()}`;
  }
  
  // For lower trust, maybe don't reveal the secondary emotion
  if (Math.random() > 0.5) {
    return primaryResponse;
  }
  
  return `${primaryResponse} ${getRandomItem(emotionalConnectors)} ${secondaryResponse.toLowerCase()}`;
};

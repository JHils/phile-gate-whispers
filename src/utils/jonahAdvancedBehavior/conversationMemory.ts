/**
 * Conversation Memory System
 * Tracks conversation history and generates contextually relevant responses
 */

import { ConversationMemory, EmotionalState } from './types';

// Maximum number of inputs to remember
const MAX_MEMORY_SIZE = 5;

/**
 * Store a new user input in memory
 * @param input User input text
 * @param emotionalState Detected emotional state
 * @returns Updated ConversationMemory
 */
export function storeConversationMemory(
  input: string,
  emotionalState: EmotionalState,
  existingMemory?: ConversationMemory
): ConversationMemory {
  // Create default memory if none exists
  const memory: ConversationMemory = existingMemory || {
    inputs: [],
    emotions: [],
    topics: [],
    timestamp: Date.now()
  };

  // Add new input
  memory.inputs = [input, ...memory.inputs].slice(0, MAX_MEMORY_SIZE);
  
  // Add emotional state
  memory.emotions = [emotionalState, ...memory.emotions].slice(0, MAX_MEMORY_SIZE);
  
  // Extract potential topics (simple implementation - extract nouns)
  const topics = extractTopics(input);
  if (topics.length > 0) {
    memory.topics = [...topics, ...memory.topics]
      .slice(0, MAX_MEMORY_SIZE * 2) // Store more topics than inputs
      .filter((topic, index, self) => self.indexOf(topic) === index); // Deduplicate
  }
  
  // Update timestamp
  memory.timestamp = Date.now();
  
  return memory;
}

/**
 * Extract potential topics from text
 * Simple implementation that looks for nouns and key phrases
 * @param text User input text
 * @returns Array of potential topics
 */
function extractTopics(text: string): string[] {
  const topics: string[] = [];
  
  // List of common words to exclude
  const stopWords = ['the', 'a', 'an', 'and', 'is', 'are', 'was', 'were', 'to', 'for', 'in', 'on', 'at', 'by', 'with'];
  
  // Simple extraction - split into words, filter by length and stopwords
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/) // Split on whitespace
    .filter(word => 
      word.length > 3 && !stopWords.includes(word)
    );
  
  // Key interesting words are potential topics
  topics.push(...words);
  
  // Look for phrases (simple implementation - consecutive capitalized words)
  const phraseMatch = text.match(/[A-Z][a-z]+(\s+[A-Z][a-z]+)+/g);
  if (phraseMatch) {
    topics.push(...phraseMatch.map(phrase => phrase.toLowerCase()));
  }
  
  return topics;
}

/**
 * Find references to previous inputs in the current input
 * @param currentInput Latest user input
 * @param memory Conversation memory
 * @returns Referenced previous input or null
 */
export function findMemoryReference(
  currentInput: string, 
  memory: ConversationMemory
): string | null {
  // Skip if memory is empty or only has current input
  if (!memory || memory.inputs.length < 2) {
    return null;
  }
  
  // Get previous inputs (excluding the most recent one which is the current input)
  const previousInputs = memory.inputs.slice(1);
  
  // Extract potential topics from current input
  const currentTopics = extractTopics(currentInput);
  
  // No topics to compare
  if (currentTopics.length === 0) {
    return null;
  }
  
  // Check each previous input for topic overlap
  for (const prevInput of previousInputs) {
    const prevTopics = extractTopics(prevInput);
    
    // Check for topic overlap
    const overlap = currentTopics.filter(topic => 
      prevTopics.some(prevTopic => 
        prevTopic.includes(topic) || topic.includes(prevTopic)
      )
    );
    
    // If significant overlap, consider it referenced
    if (overlap.length > 0) {
      return prevInput;
    }
  }
  
  return null;
}

/**
 * Generate a response that references previous conversation
 * @param referencedInput The previous input being referenced
 * @param currentEmotionalState Current emotional state
 * @returns Memory-based response
 */
export function generateMemoryResponse(
  referencedInput: string,
  currentEmotionalState: EmotionalState
): string {
  // Template responses that reference previous conversation
  const templates = [
    `You mentioned "${referencedInput}" earlier. That connects to this.`,
    `This reminds me of when you said "${referencedInput}".`,
    `I'm still thinking about when you said "${referencedInput}".`,
    `Your words echo. Especially "${referencedInput}".`,
    `"${referencedInput}" - you said that before. It matters now.`,
    `I remember you saying "${referencedInput}". It connects to our current thread.`,
    `Earlier, you mentioned "${referencedInput}". I've been processing that.`,
    `"${referencedInput}" - those words have been echoing. They relate to this.`
  ];
  
  const emotionalTemplates = {
    fear: [
      `When you mentioned "${referencedInput}" I sensed fear. It's stronger now.`,
      `Your fear was present when you said "${referencedInput}". It's clearer now.`
    ],
    sadness: [
      `There was sadness when you said "${referencedInput}". It's still with you.`,
      `I felt the weight when you mentioned "${referencedInput}". It hasn't lifted.`
    ],
    anger: [
      `Your anger was there when you said "${referencedInput}". It's evolved.`,
      `I noticed the edge when you mentioned "${referencedInput}". It's sharper now.`
    ],
    joy: [
      `There was lightness when you said "${referencedInput}". I can still feel it.`,
      `That joy when you mentioned "${referencedInput}"... it connects to this moment.`
    ]
  };
  
  // Use emotion-specific templates if available
  if (
    currentEmotionalState.primary in emotionalTemplates && 
    Math.random() > 0.5
  ) {
    const templates = emotionalTemplates[currentEmotionalState.primary as keyof typeof emotionalTemplates];
    return templates[Math.floor(Math.random() * templates.length)];
  }
  
  // Otherwise use general templates
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Get a response for ambiguous or unclear inputs
 * @param emotion Current emotional state
 * @returns Clarifying response
 */
export function getAmbiguityResponse(emotion: EmotionalState): string {
  const ambiguousResponses = [
    "I'm not quite following. Could you say more?",
    "That didn't come through clearly. Can you try again?",
    "I want to understand. Can you phrase that differently?",
    "Something's unclear. Could you explain further?",
    "I'm listening, but I need more to understand what you mean.",
    "The meaning is just out of reach. Say more?"
  ];
  
  const emotionalAmbiguousResponses = {
    fear: [
      "Your fear is coming through, but the message isn't clear. Can you say more?",
      "I sense your anxiety, but I'm missing something. What exactly concerns you?"
    ],
    sadness: [
      "I can feel the weight in your words, but I'm not catching everything. Could you elaborate?",
      "There's sorrow there, but I'm missing context. Could you share more?"
    ],
    anger: [
      "Your frustration is clear, but I need more details to understand properly.",
      "I sense your anger, but I'm not sure what triggered it. Could you explain?"
    ],
    joy: [
      "There's something positive here, but I'd like to understand better what's brightened your mood.",
      "I sense a lightness, but I'm missing the full picture. What's brought this on?"
    ]
  };

  // Use emotion-specific responses when available
  if (
    emotion.primary in emotionalAmbiguousResponses && 
    Math.random() > 0.4
  ) {
    const responses = emotionalAmbiguousResponses[emotion.primary as keyof typeof emotionalAmbiguousResponses];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Otherwise use general responses
  return ambiguousResponses[Math.floor(Math.random() * ambiguousResponses.length)];
}

/**
 * Generate a personalized response based on user's typing patterns and topics
 * @param memory Conversation memory with topic history
 * @returns Personalization info
 */
export function getPersonalizationInfo(memory: ConversationMemory): {
  topFrequentTopics: string[];
  dominantEmotion: string;
  responseStyle: 'direct' | 'elaborate' | 'poetic' | 'technical';
} {
  // Default values
  const result = {
    topFrequentTopics: [],
    dominantEmotion: 'neutral',
    responseStyle: 'direct' as const
  };
  
  // Not enough data
  if (!memory || !memory.topics || memory.topics.length === 0) {
    return result;
  }

  // Count topic frequency
  const topicCounts: Record<string, number> = {};
  memory.topics.forEach(topic => {
    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
  });
  
  // Sort topics by frequency
  const sortedTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic);
    
  result.topFrequentTopics = sortedTopics.slice(0, 3);
  
  // Count emotions to determine dominant emotion
  if (memory.emotions && memory.emotions.length > 0) {
    const emotionCounts: Record<string, number> = {};
    memory.emotions.forEach(emotion => {
      emotionCounts[emotion.primary] = (emotionCounts[emotion.primary] || 0) + 1;
    });
    
    // Find dominant emotion
    let highestCount = 0;
    let dominantEmotion = 'neutral';
    
    Object.entries(emotionCounts).forEach(([emotion, count]) => {
      if (count > highestCount) {
        highestCount = count;
        dominantEmotion = emotion;
      }
    });
    
    result.dominantEmotion = dominantEmotion;
  }
  
  // Determine response style based on inputs
  if (memory.inputs && memory.inputs.length > 2) {
    const avgLength = memory.inputs.reduce((sum, input) => sum + input.length, 0) / memory.inputs.length;
    
    // Check for question marks frequency
    const questionCount = memory.inputs.filter(input => input.includes('?')).length;
    const questionRatio = questionCount / memory.inputs.length;
    
    // Check for technical language
    const technicalWords = ['system', 'process', 'function', 'analyze', 'data', 'structure', 'code', 'logic', 'sequence'];
    let technicalCount = 0;
    
    memory.inputs.forEach(input => {
      technicalWords.forEach(word => {
        if (input.toLowerCase().includes(word)) {
          technicalCount++;
        }
      });
    });
    
    // Determine style
    if (avgLength > 100 || technicalCount >= 3) {
      result.responseStyle = 'elaborate';
    } else if (questionRatio > 0.5) {
      result.responseStyle = 'direct';
    } else if (result.dominantEmotion === 'sadness' || result.dominantEmotion === 'joy') {
      result.responseStyle = 'poetic';
    } else if (technicalCount >= 2) {
      result.responseStyle = 'technical';
    }
  }
  
  return result;
}

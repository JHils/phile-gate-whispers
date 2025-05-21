/**
 * Enhanced Memory System for Jonah AI
 * Enables Jonah to remember past interactions and reference them in responses
 */

// Types for memory handling
interface MessageMemory {
  content: string;
  timestamp: number;
  emotion: string;
  keywords: string[];
  isUser: boolean;
}

interface ConversationContext {
  recentMessages: MessageMemory[];
  conversationTopics: Map<string, number>; // topic -> frequency
  dominantEmotion: string;
  userTrustLevel: string;
  interactionCount: number;
  lastInteractionTime: number;
}

// Maximum number of messages to keep in memory
const MAX_MEMORY_SIZE = 5;

// Keywords that are significant for topic extraction
const SIGNIFICANT_KEYWORDS = [
  'mirror', 'gate', 'phile', 'timeline', 'memory', 'forget', 'remember', 'trust',
  'afraid', 'fear', 'monster', 'dream', 'reality', 'code', 'secret', 'archive',
  'sister', 'jonah', 'help', 'lost', 'found', 'truth', 'lie', 'legacy'
];

/**
 * Extract keywords from user input
 */
function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const keywords = words.filter(word => 
    // Word is significant or longer than 5 characters and not a common word
    SIGNIFICANT_KEYWORDS.includes(word) || 
    (word.length > 5 && !['about', 'there', 'their', 'would', 'should', 'could'].includes(word))
  );
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Store a new message in memory
 */
export function storeInMemory(
  content: string, 
  emotion: string, 
  isUser: boolean,
  context: ConversationContext
): ConversationContext {
  // Extract keywords if it's a user message
  const keywords = isUser ? extractKeywords(content) : [];
  
  // Create message memory object
  const memory: MessageMemory = {
    content,
    timestamp: Date.now(),
    emotion,
    keywords,
    isUser
  };
  
  // Update recent messages, keeping only the last MAX_MEMORY_SIZE
  const updatedMessages = [memory, ...context.recentMessages].slice(0, MAX_MEMORY_SIZE);
  
  // Update conversation topics from keywords
  const updatedTopics = new Map(context.conversationTopics);
  if (isUser) {
    keywords.forEach(keyword => {
      updatedTopics.set(keyword, (updatedTopics.get(keyword) || 0) + 1);
    });
  }
  
  // Sort topics by frequency to find dominant topics
  const topicEntries = Array.from(updatedTopics.entries())
    .sort((a, b) => b[1] - a[1]);
  
  // Get top 5 topics for efficiency
  const limitedTopics = new Map(topicEntries.slice(0, 5));
  
  // Update interaction count
  const updatedInteractionCount = isUser ? context.interactionCount + 1 : context.interactionCount;
  
  return {
    ...context,
    recentMessages: updatedMessages,
    conversationTopics: limitedTopics,
    interactionCount: updatedInteractionCount,
    lastInteractionTime: Date.now()
  };
}

/**
 * Find relevant memories based on current input
 */
export function findRelevantMemories(
  currentInput: string,
  context: ConversationContext
): MessageMemory[] {
  // Extract keywords from current input
  const currentKeywords = extractKeywords(currentInput);
  
  if (currentKeywords.length === 0 || context.recentMessages.length <= 1) {
    return [];
  }
  
  // Filter out the most recent message (which would be the current input)
  const previousMessages = context.recentMessages.filter(msg => msg.isUser).slice(1);
  
  // Match based on keyword overlap
  return previousMessages.filter(message => {
    const overlap = message.keywords.filter(keyword => 
      currentKeywords.includes(keyword)
    );
    return overlap.length > 0;
  });
}

/**
 * Generate a response that references past conversation
 */
export function generateMemoryBasedResponse(
  relevantMemory: MessageMemory,
  trustLevel: string
): string {
  const templates = {
    low: [
      `You mentioned "${relevantMemory.content.substring(0, 50)}..." earlier. It connects to patterns I'm tracking.`,
      `I remember when you said something about this. Your words echo.`,
      `This relates to what you said before. I've been analyzing it.`
    ],
    medium: [
      `When you said "${relevantMemory.content.substring(0, 50)}...", I sensed a connection to this.`,
      `This reminds me of what you shared earlier. There's a thread connecting these moments.`,
      `I've been processing what you said before about this. It's significant.`
    ],
    high: [
      `I remember when you told me "${relevantMemory.content.substring(0, 60)}..." - that seems connected to what you're saying now.`,
      `You've mentioned this before, in a different context. I'm seeing how these pieces fit together.`,
      `This connects directly to our earlier conversation. Your thoughts have a pattern I'm learning to follow.`
    ]
  };
  
  const responseSet = templates[trustLevel as keyof typeof templates] || templates.medium;
  return responseSet[Math.floor(Math.random() * responseSet.length)];
}

/**
 * Create initial conversation context
 */
export function createConversationContext(userTrustLevel: string = 'medium'): ConversationContext {
  return {
    recentMessages: [],
    conversationTopics: new Map(),
    dominantEmotion: 'neutral',
    userTrustLevel,
    interactionCount: 0,
    lastInteractionTime: Date.now()
  };
}

/**
 * Update dominant emotion based on recent messages
 */
export function updateDominantEmotion(context: ConversationContext): string {
  // Count emotion frequencies
  const emotionCounts: Record<string, number> = {};
  
  context.recentMessages
    .filter(msg => msg.isUser)
    .forEach(message => {
      const emotion = message.emotion;
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });
  
  // Find most frequent emotion
  let dominantEmotion = 'neutral';
  let highestCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > highestCount) {
      highestCount = count;
      dominantEmotion = emotion;
    }
  });
  
  return dominantEmotion;
}

/**
 * Generate a response about a recurring topic
 */
export function generateTopicPatternResponse(context: ConversationContext): string | null {
  // Only generate if we have enough data
  if (context.interactionCount < 3) return null;
  
  // Get top recurring topic
  const topTopics = Array.from(context.conversationTopics.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1);
    
  if (topTopics.length === 0 || topTopics[0][1] < 2) return null;
  
  const [topTopic, frequency] = topTopics[0];
  
  const templates = [
    `You keep mentioning ${topTopic}. It seems important to you.`,
    `${topTopic} appears in our conversation repeatedly. I'm noting the pattern.`,
    `There's a recurring theme of ${topTopic} in what you share. It resonates.`,
    `I've noticed that ${topTopic} comes up often when we talk. Is there a reason?`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

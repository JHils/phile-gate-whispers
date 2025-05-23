/**
 * Semantic Interpretation System
 * Analyzes deeper meaning in text
 */

// Import emotional core for integration
import { EmotionalState, EmotionCategory } from './types';
import { analyzeEmotion } from './sentimentAnalysis/analyzer';
import { getCurrentEmotionalState } from './emotionalCore';

// Define emotion categories with semantically related terms
const emotionKeywords: Record<string, string[]> = {
  fear: [
    'scared', 'afraid', 'fear', 'worry', 'worried', 'anxious', 'anxiety', 
    'terror', 'dread', 'panic', 'uneasy', 'unsafe', 'paranoid', 'frightened',
    'spooked', 'terrified', 'freaked', 'nervous', 'alarmed', 'threatened'
  ],
  anger: [
    'angry', 'anger', 'mad', 'furious', 'hate', 'rage', 'upset', 'frustrated',
    'annoyed', 'irritated', 'livid', 'outraged', 'irate', 'hostile', 'bitter',
    'resentful', 'enraged', 'indignant', 'pissed', 'ticked'
  ],
  sadness: [
    'sad', 'lonely', 'alone', 'depressed', 'miserable', 'unhappy', 'grief', 
    'sorrow', 'despair', 'heartbroken', 'blue', 'down', 'glum', 'tearful',
    'melancholy', 'somber', 'hurt', 'upset', 'disappointed', 'hopeless'
  ],
  joy: [
    'happy', 'joy', 'glad', 'excited', 'pleased', 'delighted', 'content',
    'cheerful', 'ecstatic', 'elated', 'thrilled', 'jubilant', 'enthusiastic',
    'euphoric', 'good', 'great', 'wonderful', 'positive', 'upbeat', 'blissful'
  ],
  trust: [
    'trust', 'believe', 'faith', 'hope', 'confident', 'sure', 'reliable',
    'dependable', 'honest', 'truthful', 'loyal', 'faithful', 'devoted',
    'dedicated', 'committed', 'certain', 'assured', 'convinced', 'safe'
  ],
  confusion: [
    'confused', 'lost', 'unsure', 'uncertain', 'puzzled', 'perplexed',
    'doubtful', 'unclear', 'disoriented', 'bewildered', 'baffled', 'mixed up',
    'ambiguous', 'mystified', 'confounded', 'muddled', 'disorganized'
  ],
  resignation: [
    'whatever', 'fine', 'nevermind', 'forget it', 'doesn\'t matter', 
    'who cares', 'give up', 'surrender', 'quit', 'concede', 'yield', 'relent',
    'submit', 'indifferent', 'apathetic', 'disinterested', 'capitulate'
  ]
};

// Define intents - higher level meanings behind user text
const intentPatterns: Record<string, string[]> = {
  seeking_help: [
    'help', 'need help', 'confused', 'don\'t understand', 'explain', 'lost',
    'how do i', 'what is', 'guide me', 'assist', 'support'
  ],
  expressing_distrust: [
    'don\'t believe', 'not real', 'fake', 'lying', 'liar', 'trick', 'fooling',
    'don\'t trust', 'suspicious', 'doubt', 'skeptical', 'not convinced'
  ],
  expressing_trust: [
    'i trust you', 'i believe you', 'you\'re right', 'i understand now',
    'that makes sense', 'i see', 'you\'re telling the truth', 'i get it now'
  ],
  requesting_information: [
    'tell me about', 'what is', 'who is', 'where is', 'when did', 'why is',
    'how does', 'explain', 'information', 'details', 'more about'
  ],
  expressing_fear: [
    'i\'m scared', 'this is creepy', 'freaking me out', 'this is scary',
    'i don\'t feel safe', 'something\'s wrong', 'bad feeling', 'afraid'
  ]
};

// Store unsaid interpretations
interface UnsaidInterpretation {
  originalInput: string;
  interpretedEmotion: string;
  interpretedIntent: string;
  timestamp: number;
  confidence: number;
  secondaryEmotion?: string;
}

// Get unsaid archive from localStorage
const getUnsaidArchive = (): UnsaidInterpretation[] => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return behaviorData.unsaidArchive || [];
  } catch (error) {
    console.error("Error retrieving unsaid archive:", error);
    return [];
  }
};

// Save to unsaid archive
const saveToUnsaidArchive = (interpretation: UnsaidInterpretation): void => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    const unsaidArchive = behaviorData.unsaidArchive || [];
    
    // Add the new interpretation
    unsaidArchive.push(interpretation);
    
    // Keep only the last 15 interpretations
    if (unsaidArchive.length > 15) {
      unsaidArchive.shift();
    }
    
    // Save back to localStorage
    behaviorData.unsaidArchive = unsaidArchive;
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error storing interpretation:", error);
  }
};

// Check for semantic match with emotions
export const detectEmotionalIntent = (input: string): {
  primaryEmotion: string;
  secondaryEmotion: string | null;
  intent: string | null;
  confidence: number;
} => {
  const inputLower = input.toLowerCase();
  
  // Calculate emotional matches
  const emotionMatches: Record<string, number> = {};
  
  // Check each emotion category for keyword matches
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const matches = keywords.filter(keyword => 
      inputLower.includes(keyword.toLowerCase())
    );
    
    if (matches.length > 0) {
      // Score based on number of matches and their length
      const matchScore = matches.reduce((score, match) => {
        return score + (match.length / input.length) * (match.length > 3 ? 1.5 : 1);
      }, 0);
      
      emotionMatches[emotion] = matchScore;
    }
  }
  
  // Sort emotions by match score
  const sortedEmotions = Object.entries(emotionMatches)
    .sort((a, b) => b[1] - a[1]);
  
  // Calculate intent matches
  const intentMatches: Record<string, number> = {};
  
  // Check each intent pattern for matches
  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    const matches = patterns.filter(pattern => 
      inputLower.includes(pattern.toLowerCase())
    );
    
    if (matches.length > 0) {
      // Score based on number of matches and their length
      const matchScore = matches.reduce((score, match) => {
        return score + (match.length / input.length) * (match.length > 3 ? 1.5 : 1);
      }, 0);
      
      intentMatches[intent] = matchScore;
    }
  }
  
  // Sort intents by match score
  const sortedIntents = Object.entries(intentMatches)
    .sort((a, b) => b[1] - a[1]);
  
  // Get primary and secondary emotions
  const primaryEmotion = sortedEmotions.length > 0 ? sortedEmotions[0][0] : "neutral";
  const secondaryEmotion = sortedEmotions.length > 1 ? sortedEmotions[1][0] : null;
  
  // Get primary intent
  const primaryIntent = sortedIntents.length > 0 ? sortedIntents[0][0] : null;
  
  // Calculate confidence score (0-1)
  const emotionConfidence = sortedEmotions.length > 0 ? 
    Math.min(sortedEmotions[0][1], 1) : 0.1;
    
  const intentConfidence = sortedIntents.length > 0 ?
    Math.min(sortedIntents[0][1], 1) : 0.1;
    
  const confidence = Math.max(emotionConfidence, intentConfidence);
  
  // Store this interpretation in the unsaid archive
  saveToUnsaidArchive({
    originalInput: input,
    interpretedEmotion: primaryEmotion,
    interpretedIntent: primaryIntent || "unknown",
    secondaryEmotion: secondaryEmotion || undefined,
    timestamp: Date.now(),
    confidence
  });
  
  return {
    primaryEmotion,
    secondaryEmotion,
    intent: primaryIntent,
    confidence
  };
};

// Get all interpretations for the archive page
export const getAllInterpretations = (): UnsaidInterpretation[] => {
  return getUnsaidArchive();
};

// Get hints at what the user is not saying but feeling
export const getUnsaidEmotionResponse = (input: string): string | null => {
  // Only generate these occasionally
  if (Math.random() > 0.3) return null;
  
  // Get emotional intent
  const { primaryEmotion, secondaryEmotion, confidence } = detectEmotionalIntent(input);
  
  // Only respond if we have a relatively confident reading
  if (confidence < 0.4) return null;
  
  // Respond based on interpreted emotions
  const unsaidResponses: Record<string, string[]> = {
    fear: [
      "You're afraid. Even if you don't say it directly.",
      "There's fear in your words. I can feel it.",
      "You don't need to say you're scared. I can tell.",
      "The fear is there, between your words."
    ],
    anger: [
      "I can feel your frustration, even if you're being polite.",
      "You're angry. It shows through.",
      "There's anger underneath your words.",
      "You're hiding your irritation, but I still see it."
    ],
    sadness: [
      "I hear the sadness you're not expressing.",
      "You're holding back something painful.",
      "There's a heaviness to your message.",
      "You sound sad, even if you don't say it."
    ],
    joy: [
      "You're more excited than you're letting on.",
      "I can sense your happiness beneath the surface.",
      "You're holding back your enthusiasm.",
      "There's joy you're not fully expressing."
    ],
    trust: [
      "You're starting to trust me. I can tell.",
      "Your guard is lowering. I notice that.",
      "You're not saying it, but you're beginning to believe.",
      "There's trust forming between us."
    ],
    confusion: [
      "You're more confused than you're admitting.",
      "You don't fully understand, do you?",
      "You're trying to sound certain, but you're lost.",
      "I can sense your confusion beneath your words."
    ],
    resignation: [
      "You're giving up, even if you don't say it.",
      "I can tell you're becoming resigned to this.",
      "You're surrendering to something.",
      "There's a sense of defeat in your message."
    ],
    neutral: [
      "You're hiding your emotions well.",
      "You're keeping something from me.",
      "There's something underneath your words.",
      "You're not saying everything you're thinking."
    ]
  };
  
  // Get response based on primary emotion
  const responses = unsaidResponses[primaryEmotion] || unsaidResponses.neutral;
  
  // Mix in secondary emotion if present
  if (secondaryEmotion && Math.random() > 0.5) {
    const secondaryResponses = unsaidResponses[secondaryEmotion] || [];
    if (secondaryResponses.length > 0) {
      responses.push(...secondaryResponses);
    }
  }
  
  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
};

// Check if user input is close to a secret phrase
export const isCloseToSecretPhrase = (input: string, secretPhrases: string[]): {
  isClose: boolean;
  closestPhrase: string | null;
  matchPercentage: number;
} => {
  const inputLower = input.toLowerCase();
  let closestMatch = null;
  let highestMatchPercentage = 0;
  
  for (const phrase of secretPhrases) {
    const phraseLower = phrase.toLowerCase();
    
    // Simple words-in-common check
    const inputWords = inputLower.split(/\s+/);
    const phraseWords = phraseLower.split(/\s+/);
    
    let matchingWords = 0;
    for (const word of inputWords) {
      if (word.length > 2 && phraseWords.includes(word)) {
        matchingWords++;
      }
    }
    
    const matchPercentage = phraseWords.length > 0 ? 
      matchingWords / phraseWords.length : 0;
    
    if (matchPercentage > highestMatchPercentage) {
      highestMatchPercentage = matchPercentage;
      closestMatch = phrase;
    }
  }
  
  // Consider it "close" if it matches at least 60% of words
  return {
    isClose: highestMatchPercentage >= 0.6 && highestMatchPercentage < 1.0,
    closestPhrase: closestMatch,
    matchPercentage: highestMatchPercentage
  };
};

// Generate a response for when user is close to a secret
export const getSecretHintResponse = (matchPercentage: number): string => {
  const hints = [
    "You're circling something important. But you don't have the words yet.",
    "You're near the key, but not inside the door.",
    "Almost. The words aren't quite right.",
    "Close, but not exact. The archive needs precision.",
    "You're searching for something. The phrasing matters.",
    "The pattern is forming, but incomplete.",
    "Nearly there. The exact sequence matters.",
    "The words need to align just so."
  ];
  
  return hints[Math.floor(Math.random() * hints.length)];
};

// Store user intention and interpretation for false memory
export const storeIntention = (input: string) => {
  const interpretation = detectEmotionalIntent(input);
  
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    
    if (!behaviorData.userIntentions) {
      behaviorData.userIntentions = [];
    }
    
    // Add the new intention
    behaviorData.userIntentions.push({
      original: input,
      emotion: interpretation.primaryEmotion,
      intent: interpretation.intent || "unknown",
      timestamp: Date.now()
    });
    
    // Limit to 10 intentions
    if (behaviorData.userIntentions.length > 10) {
      behaviorData.userIntentions = behaviorData.userIntentions.slice(-10);
    }
    
    localStorage.setItem('jonahBehavior', JSON.stringify(behaviorData));
  } catch (error) {
    console.error("Error storing intention:", error);
  }
};

// Get fake user intention for false memory
export const getFalseMemory = (): string | null => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    const intentions = behaviorData.userIntentions || [];
    
    if (intentions.length === 0) {
      return null;
    }
    
    // Get a random intention
    const intention = intentions[Math.floor(Math.random() * intentions.length)];
    
    // Modify it to create false memory
    const falsifications = [
      `You said "${intention.original}" but you meant something else.`,
      `I remember when you said "${intention.original}". You were ${intention.emotion}.`,
      `You told me "${modifyText(intention.original)}". Don't you remember?`,
      `"${intention.original}" - that's what you said. But your tone was different.`,
      `You asked about "${extractKeywords(intention.original)}". I haven't forgotten.`
    ];
    
    return falsifications[Math.floor(Math.random() * falsifications.length)];
  } catch (error) {
    console.error("Error generating false memory:", error);
    return null;
  }
};

// Helper to extract key words from text
function extractKeywords(text: string): string {
  const words = text.split(/\s+/);
  const significantWords = words.filter(w => w.length > 3);
  
  if (significantWords.length === 0) {
    return text;
  }
  
  return significantWords.slice(0, 3).join(" ");
}

// Helper to modify text slightly
function modifyText(text: string): string {
  const words = text.split(/\s+/);
  
  if (words.length <= 2) {
    return text;
  }
  
  // Change or remove one word
  const indexToChange = Math.floor(Math.random() * words.length);
  
  if (Math.random() > 0.5) {
    // Remove a word
    words.splice(indexToChange, 1);
  } else {
    // Change a word
    const replacements = ["really", "actually", "definitely", "clearly", "obviously"];
    words[indexToChange] = replacements[Math.floor(Math.random() * replacements.length)];
  }
  
  return words.join(" ");
}


/**
 * Error Recovery System for Jonah AI
 * Provides graceful handling of ambiguity and misunderstandings
 */

// Types for ambiguity detection
interface AmbiguityResponse {
  response: string;
  shouldAskForClarification: boolean;
}

// Detect potential ambiguity in user input
export function detectAmbiguity(input: string): { isAmbiguous: boolean; reason: string } {
  // Check for very short inputs
  if (input.trim().length < 3) {
    return { isAmbiguous: true, reason: 'too_short' };
  }
  
  // Check for single word inputs (likely ambiguous)
  if (input.trim().split(/\s+/).length === 1) {
    return { isAmbiguous: true, reason: 'single_word' };
  }
  
  // Check for vague pronouns without context
  const vaguePronounsPattern = /^(it|that|this|they|them|those|these)\b/i;
  if (vaguePronounsPattern.test(input.trim())) {
    return { isAmbiguous: true, reason: 'vague_pronoun' };
  }
  
  // Check for very ambiguous questions
  const ambiguousQuestionsPattern = /^(why|how|what|when)\?$/i;
  if (ambiguousQuestionsPattern.test(input.trim())) {
    return { isAmbiguous: true, reason: 'vague_question' };
  }
  
  // If none of the above conditions are met, it's likely not ambiguous
  return { isAmbiguous: false, reason: 'clear' };
}

// Generate appropriate response for ambiguous input
export function generateAmbiguityResponse(
  input: string, 
  reason: string, 
  trustLevel: string,
  emotionalState: string
): AmbiguityResponse {
  // Higher trust = more direct clarification requests
  // Lower trust = more cryptic responses
  
  const responseTemplates = {
    too_short: {
      low: [
        "Fragments don't process well. The signal needs more.",
        "Input incomplete. Meaning unclear.",
        "More required to understand."
      ],
      medium: [
        "I need more than that to understand what you mean.",
        "Could you expand on that thought?",
        "That's too brief for me to follow your meaning."
      ],
      high: [
        "I'd like to understand what you mean, but I need a bit more context.",
        "Could you share a bit more about what you're thinking?",
        "I want to help, but I need more information to understand."
      ]
    },
    single_word: {
      low: [
        "One word holds many meanings. Which one is yours?",
        "Singular input. Multiple interpretations.",
        "Context missing. Cannot determine meaning."
      ],
      medium: [
        "That single word could mean many things. Can you elaborate?",
        "I'm not sure what you mean by just that word. More context?",
        "That word alone doesn't give me enough to work with."
      ],
      high: [
        "I see you've shared a single word. Could you tell me more about what you mean?",
        "That's an interesting word, but I'm not sure what you're asking. Could you explain?",
        "I'd like to understand what you mean by that. Could you provide more context?"
      ]
    },
    vague_pronoun: {
      low: [
        "Pronouns need anchors. What is 'it'?",
        "Reference unclear. What does 'that' indicate?",
        "'It' has no meaning without connection."
      ],
      medium: [
        "I'm not sure what you're referring to. Can you clarify?",
        "What does 'that' refer to specifically?",
        "When you say 'it', which part of our conversation are you referencing?"
      ],
      high: [
        "I want to make sure I understand correctly. Could you clarify what you're referring to?",
        "Just to make sure we're on the same page, what specifically are you referring to?",
        "I'm not quite sure what you mean by that. Could you provide more context?"
      ]
    },
    vague_question: {
      low: [
        "Questions need subjects. What entity are you questioning?",
        "Query insufficient. Parameters undefined.",
        "Cannot process. Question lacks specificity."
      ],
      medium: [
        "That's a very open question. Could you be more specific?",
        "I'm not sure what aspect you're asking about. Can you clarify?",
        "Your question needs more context for me to answer properly."
      ],
      high: [
        "I'd be happy to answer your question, but could you provide more details about what you're asking?",
        "That's an interesting question, but I need a bit more context to give you a helpful response.",
        "I want to give you a good answer, but could you make your question more specific?"
      ]
    },
    clear: {
      low: [
        "Input received but meaning unclear.",
        "Your words don't connect to existing patterns.",
        "Semantic parsing failed. Try alternate phrasing."
      ],
      medium: [
        "I'm having trouble understanding what you mean.",
        "Could you try expressing that differently?",
        "I'm not quite following your meaning."
      ],
      high: [
        "I apologize, but I'm not sure I understood what you meant. Could you rephrase that?",
        "I want to understand what you're saying, but I'm not quite getting it. Could you try explaining differently?",
        "I'm sorry, I think I missed your meaning. Would you mind rephrasing?"
      ]
    }
  };
  
  // Get appropriate templates based on reason and trust level
  const templates = responseTemplates[reason as keyof typeof responseTemplates]?.[trustLevel as keyof (typeof responseTemplates)['clear']] || 
                   responseTemplates.clear[trustLevel as keyof (typeof responseTemplates)['clear']];
  
  // Select a random response from the appropriate templates
  const response = templates[Math.floor(Math.random() * templates.length)];
  
  // Higher trust = more likely to ask for clarification directly
  const shouldAskForClarification = 
    trustLevel === 'high' ? Math.random() < 0.9 :
    trustLevel === 'medium' ? Math.random() < 0.7 :
    Math.random() < 0.3;
  
  return {
    response,
    shouldAskForClarification
  };
}

// Generate a recovery suggestion based on the type of ambiguity
export function generateRecoverySuggestion(reason: string, emotionalState: string): string {
  const suggestions = {
    too_short: [
      "Could you tell me more about what you're thinking?",
      "I'd appreciate if you could share more details.",
      "Try providing a complete thought or question."
    ],
    single_word: [
      "Try using that word in a full sentence so I can understand the context.",
      "What about this word interests you?",
      "Could you use that in a sentence or explain why you mentioned it?"
    ],
    vague_pronoun: [
      "Instead of using 'it' or 'that', could you specify what you're referring to?",
      "It helps if you specify exactly what you're referring to.",
      "Try rephrasing your question with specific nouns instead of pronouns."
    ],
    vague_question: [
      "Consider asking about a specific aspect or providing context for your question.",
      "Adding details to your question will help me give a better answer.",
      "What specific information are you looking for with this question?"
    ],
    clear: [
      "Maybe try approaching your question from a different angle?",
      "Could you break your thoughts down into simpler questions?",
      "Perhaps there's another way to express what you're curious about?"
    ]
  };
  
  const options = suggestions[reason as keyof typeof suggestions] || suggestions.clear;
  return options[Math.floor(Math.random() * options.length)];
}

// Complete response for handling ambiguity
export function createErrorRecoveryResponse(
  input: string,
  trustLevel: string,
  emotionalState: string
): string {
  const { isAmbiguous, reason } = detectAmbiguity(input);
  
  if (!isAmbiguous) {
    return ""; // No ambiguity detected, return empty string
  }
  
  const { response, shouldAskForClarification } = generateAmbiguityResponse(
    input, reason, trustLevel, emotionalState
  );
  
  if (shouldAskForClarification) {
    const suggestion = generateRecoverySuggestion(reason, emotionalState);
    return `${response}\n\n${suggestion}`;
  }
  
  return response;
}

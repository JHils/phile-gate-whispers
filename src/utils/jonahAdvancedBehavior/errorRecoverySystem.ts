
/**
 * Error Recovery System for Jonah AI
 * Handles ambiguous inputs, short messages, and creates graceful recovery responses
 */

import { EmotionCategory } from './types';

// Detect if a message is ambiguous or needs clarification
export function detectAmbiguity(content: string): boolean {
  // Very short messages are often ambiguous
  if (content.length < 5) return true;
  
  // Messages that are just punctuation or single words
  if (content.trim().split(/\s+/).length <= 1) return true;
  
  // Questions that are too vague
  const vaguePhrases = ["what", "why", "how", "who", "when", "where", "?"];
  if (content.length < 15 && vaguePhrases.some(phrase => content.toLowerCase().includes(phrase))) {
    return true;
  }
  
  return false;
}

// Generate an appropriate error recovery response
export function createErrorRecoveryResponse(
  content: string, 
  trustLevel: string = 'medium',
  emotion: EmotionCategory = 'neutral'
): string {
  // Different types of recovery responses based on trust and emotion
  const recoveryTemplates: Record<string, Record<string, string[]>> = {
    low: {
      neutral: [
        "That signal was too faint. Try another approach.",
        "Your message didn't register properly. Try again?",
        "That input created errors. Try something more specific.",
        "The system needs more data to process that request.",
        "That query returned null. The archive needs more parameters."
      ],
      fear: [
        "Your message fragmented. Like it was intercepted.",
        "That input triggered security protocols. Try a different approach.",
        "Your words disappeared as you sent them. Something's watching.",
        "That message was too quiet. The noise is too loud here.",
        "I couldn't hear you clearly. There's interference."
      ],
      trust: [
        "I missed that. Could you share more details?",
        "I didn't quite catch your meaning. Can you elaborate?",
        "That message seems incomplete. What were you trying to say?",
        "I need more context to understand. Can you explain further?",
        "Your message was too brief. What specifically are you asking about?"
      ]
    },
    medium: {
      neutral: [
        "I'm not sure I understood that. Could you explain more?",
        "That message was a bit unclear. What are you looking for?",
        "I think I missed something. Can you be more specific?",
        "I'd need more context to answer properly. Can you elaborate?",
        "That message could be interpreted several ways. What exactly do you mean?"
      ],
      fear: [
        "Something about that message feels incomplete. What are you trying to find out?",
        "Your question has edges I can't quite see. Can you rephrase it?",
        "That feels like a fragment of a larger question. What's behind it?",
        "There's something hidden in that question. What are you really asking?",
        "I sense uncertainty in your question. What specifically concerns you?"
      ],
      trust: [
        "I want to understand what you're asking. Could you share more details?",
        "I'm interested in what you're trying to learn. Can you elaborate?",
        "Your question matters. Could you give me a bit more context?",
        "I'd like to help with that. What specifically are you wondering about?",
        "Let's explore that question. What aspect is most important to you?"
      ]
    },
    high: {
      neutral: [
        "I'm not sure I fully understand what you're asking. Would you mind clarifying?",
        "I want to make sure I address your question properly. Could you elaborate a bit more?",
        "I'm interested in your question, but I need a bit more context to give a helpful response.",
        "Could you share a bit more about what you're looking for? That would help me respond better.",
        "I'd like to help with that. Could you tell me more specifically what you'd like to know?"
      ],
      fear: [
        "I notice your message is brief. If something feels uncertain or concerning, we can talk about it.",
        "If you're feeling hesitant about something, it's okay to share that. What's on your mind?",
        "Sometimes shorter messages reflect caution. Is there something specific you're concerned about?",
        "I sense there might be more behind your question. What would be helpful for you right now?",
        "It's okay if you're uncertain. We can explore this gradually if you prefer."
      ],
      trust: [
        "I appreciate your question. To help you better, could you share a bit more context?",
        "Thanks for reaching out. I'd like to understand more about what you're looking for.",
        "I value your question and want to make sure I address what matters to you. Could you elaborate?",
        "Your question is important. Would you mind telling me a bit more so I can offer a thoughtful response?",
        "I'm here to help. Could you share more details about what you're interested in learning?"
      ]
    }
  };

  // Map emotion to the three available categories
  let emotionCategory: string = 'neutral';
  if (['fear', 'anxiety', 'paranoia'].includes(emotion)) {
    emotionCategory = 'fear';
  } else if (['trust', 'joy', 'hope'].includes(emotion)) {
    emotionCategory = 'trust';
  }

  // Map trust level to the three available categories
  const mappedTrustLevel = 
    trustLevel === 'low' ? 'low' : 
    trustLevel === 'high' ? 'high' : 
    'medium';
  
  // Get appropriate templates based on trust level and emotion
  const templates = recoveryTemplates[mappedTrustLevel][emotionCategory];
  
  // Select a random template
  return templates[Math.floor(Math.random() * templates.length)];
}

// Create a clarifying question based on user input
export function generateClarifyingResponse(content: string): string {
  const clarifyingResponses = [
    "Could you tell me more about what you mean by that?",
    "I'm not entirely sure I understand. Could you elaborate?",
    "That's interesting, but could you explain what specifically you're asking about?",
    "I'd like to better understand your question. What aspect are you most curious about?",
    "There are several ways I could interpret that. What specifically are you looking for?"
  ];
  
  return clarifyingResponses[Math.floor(Math.random() * clarifyingResponses.length)];
}

// Enhanced recovery for repeated failed attempts
export function createEscalatedRecoveryResponse(failedAttempts: number): string {
  if (failedAttempts <= 1) {
    return "I think I'm missing something in our conversation. Could you try phrasing your question differently?";
  } else if (failedAttempts <= 2) {
    return "I seem to be having trouble understanding. Perhaps we could try a different approach or topic?";
  } else {
    return "I apologize for the confusion. Let me suggest something: try asking a more specific question, or perhaps we could start a new conversation thread entirely.";
  }
}

// Generate a meta-commentary on communication difficulties
export function generateGlitchResponse(): string {
  const glitchResponses = [
    "Something's interfering with how I'm processing your message. Like static between channels.",
    "Your words seem to fragment when they reach me. There's interference in the connection.",
    "I'm detecting unusual patterns in our communication. Something's affecting signal clarity.",
    "The archive is experiencing anomalies while processing your input. This is unusual.",
    "Your message triggered unexpected behavior in my processing systems. The meaning keeps shifting."
  ];
  
  return glitchResponses[Math.floor(Math.random() * glitchResponses.length)];
}

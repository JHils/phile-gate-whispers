
/**
 * Vocabulary System - Language Pattern Analysis and Generation
 */

import { EmotionalState, ResponseStyle, EmotionCategory } from './types';

// Get response template based on style
export function getResponseTemplate(style: string): string {
  // Define all the templates, including those for ResponseStyle types
  const templates: Record<string, string[]> = {
    // Standard response styles
    'concise': ["[POINT]", "Simply put: [POINT]", "[POINT]"],
    'elaborate': ["I believe that [POINT]. This is because [REASON]. When we consider [CONTEXT], it becomes clear that [CONCLUSION].", 
                "[POINT] is an interesting concept. If we explore it further, [ELABORATION]. This suggests [CONCLUSION]."],
    'cryptic': ["[METAPHOR] [POINT]", "[POINT], but only if you know where to look.", "Between the lines of [CONTEXT], [POINT] hides."],
    'poetic': ["Like [METAPHOR], [POINT] flows through [CONTEXT].", "In the [METAPHOR] of [CONTEXT], [POINT] shines like [COMPARISON]."],
    'analytical': ["Analysis suggests [POINT]. Evidence: [EVIDENCE]. Probability: high.", "When examining [CONTEXT], we find [EVIDENCE] pointing to [POINT]."],
    'technical': ["The system indicates [POINT]. Technical details: [DETAILS].", "From a technical perspective, [POINT] because [TECHNICAL_REASON]."],
    'direct': ["[POINT]", "Here's the truth: [POINT]", "[POINT]. That's it."],
    // Additional ResponseStyle enum values
    'HOPEFUL': ["I hope that [POINT]", "There's reason to believe [POINT]"],
    'PARANOID': ["I can't be sure, but [POINT]", "They don't want you to know that [POINT]"],
    'MIRROR': ["You believe [POINT], don't you?", "Isn't it true that [POINT]?"],
    'BETRAYED': ["I trusted you, but [POINT]", "Despite everything, [POINT]"],
    'STATIC': ["[STATIC NOISE] [POINT] [STATIC NOISE]", "[INTERFERENCE] [POINT]"],
    'ERROR': ["ERROR: [POINT]", "SYSTEM FAILURE: [POINT]"],
    'PRIME': ["[POINT]", "I know that [POINT]"],
    'RESIDUE': ["Something remains... [POINT]", "The echo says [POINT]"]
  };
  
  const styleTemplates = templates[style] || templates['direct'];
  return styleTemplates[Math.floor(Math.random() * styleTemplates.length)];
}

// Generate response with emotional content
export function generateEmotionalResponse(
  emotionalState: EmotionalState, 
  trustLevel: string = 'medium', 
  style: ResponseStyle = 'direct'
): string {
  const emotions: Record<EmotionCategory, string[]> = {
    joy: ["That brings me happiness", "I feel positive about this"],
    sadness: ["This makes me feel sad", "That's unfortunate to hear"],
    anger: ["That frustrates me", "I feel upset about that"],
    fear: ["That makes me uneasy", "I'm concerned about this"],
    surprise: ["That's unexpected", "I didn't anticipate that"],
    disgust: ["That doesn't feel right", "Something about this feels wrong"],
    neutral: ["I understand", "I see what you mean"],
    confused: ["I'm not sure I follow", "That's a bit confusing"],
    hope: ["There's something promising here", "I see potential in that"],
    anxiety: ["This makes me feel on edge", "I'm worried about this"],
    paranoia: ["I'm not sure if I can trust this", "Something seems off here"],
    trust: ["I believe in what you're saying", "I trust this perspective"],
    curiosity: ["That's interesting to consider", "I want to know more about this"],
    confusion: ["I'm finding this hard to process", "This is a bit disorienting"],
    watching: ["I'm observing carefully", "I'm taking note of this"]
  };
  
  // Get emotional content based on state
  const emotionResponses = emotions[emotionalState.primary] || emotions.neutral;
  const emotion = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  
  // Get template based on style
  let template = getResponseTemplate(style);
  
  // Fill template with emotional content
  const response = template.replace('[POINT]', emotion);
  
  // Modify based on trust level
  if (trustLevel === 'low') {
    return response + "... at least, I think so.";
  } else if (trustLevel === 'high') {
    return response + ". I'm certain of this.";
  }
  
  return response;
}

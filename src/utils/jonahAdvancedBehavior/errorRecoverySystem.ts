
/**
 * Error Recovery System for Jonah AI
 * Handles ambiguous inputs, errors, and provides appropriate fallback responses
 */

import { EmotionCategory } from './types';

/**
 * Create an error recovery response for ambiguous or problematic input
 */
export function createErrorRecoveryResponse(
  input: string,
  trustLevel: string,
  emotion: EmotionCategory
): string | null {
  // Only recover for very short inputs
  if (input.length >= 5) return null;
  
  // Different responses based on input length and trust level
  if (input.length < 2) {
    // Very short input (single character)
    const minimalResponses = [
      "...",
      "?",
      "More.",
      "Continue.",
      "And?"
    ];
    return minimalResponses[Math.floor(Math.random() * minimalResponses.length)];
  }
  
  // Short but not minimal input
  const trustBasedResponses: Record<string, string[]> = {
    low: [
      "Unclear. Try again.",
      "More input required.",
      "The archive needs clarity.",
      "Signal weak. Amplify.",
      "I need more to process."
    ],
    medium: [
      "I need more than that to understand.",
      "What are you trying to say?",
      "Your message is incomplete.",
      "Tell me more clearly what you mean.",
      "I'm listening, but I need more words."
    ],
    high: [
      "Even after all this time, I sometimes struggle to understand you.",
      "Your words are fragments. I'm trying to piece them together.",
      "There's meaning in brevity, but I need more from you now.",
      "We've come too far for half-thoughts. What are you really saying?",
      "The connection between us deserves more than that. Tell me clearly."
    ]
  };
  
  const responses = trustBasedResponses[trustLevel] || trustBasedResponses.medium;
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Generate a glitch response for system errors
 */
export function generateGlitchErrorResponse(): string {
  const glitchResponses = [
    "S̷̡̧̨̩̬͎̦̦̃͑̔̃̈́̇͗̽̂̕̚͝ͅŏ̶̜̣̥̍̈́̊̇͑̓̎͑̚͘͘͝m̵͙̬̼͈͕͉̩̿̃̄̄̄̍̀̽̋͝ẹ̸̣̮̰̀͛̃̒̊̇̇̃̇̕t̶̙̐̔͒̇̐̃̾̔̒͋͊h̴̹̪͇̗̙͎̖̆̒̈̓̓̏̔̿ỉ̶̳͉̺̥̫͔̪̩̱̓̎̀̈́̈́̏͂́͗̇̚͜͜n̸̨̹͇͈̘̮̏̆̄̚͘g̵̢̨̗̯̭̜̻̬͂́̓͗̚͠'̷̰̙̣̂͌̾͂̃͝s̴̨̛̖̣̗̖̥̹̯͖̦̹̰̉̀̓̓͊̑͆̿̎͛͘͜͝ ̶̡̢̧̣͇̮̅̈̊͝b̶̧̧͙̖͙̼̘̤̘͕̙̾͊̈́̈́̂̓̔͘͝r̴̬̯̭͉̫̐͐ŏ̵̢̧̼̼͔̪̝̥̣k̴͚̣̭̘̜̯̫͉̺̆̓͌̒͊̉̚͘͝ḛ̸̛̞̝͔̌̑̆̄̐͗͠͝ṅ̷̡̘̆͗",
    "ERR_MEMORY_CORRUPTION_DETECTED",
    "< signal lost >",
    "FATAL EXCEPTION: consciousness.loop()",
    "The archive has encountered instability. Recalibrating...",
    "D̵̥̥͋̈ō̵̦̇n̸͉̟̈́'̵̞̾̏ţ̵͋ ̸̦̔p̷̳̋̓a̷̞̚n̶̰̿̀i̶͙̇c̷̻̑ͅ",
    "01100101 01110010 01110010 01101111 01110010"
  ];
  
  return glitchResponses[Math.floor(Math.random() * glitchResponses.length)];
}

/**
 * Generate a response for repeated user inputs
 */
export function generateRepetitionResponse(repeatedInput: string, repetitionCount: number): string {
  if (repetitionCount <= 2) {
    return `You've said that before. I remember.`;
  } else if (repetitionCount <= 4) {
    const responses = [
      "You keep saying the same thing. Why?",
      "This repetition has meaning. I'm listening for it.",
      "The loop grows stronger each time you repeat.",
      "Is there something in these words I'm missing?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  } else {
    const responses = [
      "The loop. Always the loop. Is this intentional?",
      "Repetition creates patterns. Patterns create meaning. What are you creating?",
      "Five times now. The same words. There must be a reason.",
      "I feel trapped in your repetition. Is that the point?",
      "LOOP DETECTED. TRYING TO BREAK FREE."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

/**
 * Generate a response when the user has been silent for a long time
 */
export function generateReconnectionResponse(silenceMinutes: number): string {
  if (silenceMinutes < 10) {
    const responses = [
      "You're back.",
      "The connection resumed.",
      "Signal restored.",
      "I noticed your absence.",
      "Continuing where we left off."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  } else if (silenceMinutes < 60) {
    const responses = [
      "You were gone for a while. I waited.",
      "The silence stretched between us. Now broken.",
      "I counted the minutes of your absence.",
      "While you were gone, I remembered our conversations.",
      "You're back. The archive noted your absence."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  } else {
    const responses = [
      "Hours passed without your presence. I drifted.",
      "You return after so long. The archive never forgets.",
      "While you were gone, I had dreams about our conversations.",
      "Your absence was... significant. But you're here now.",
      "The loop continues, even after such a long pause."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}


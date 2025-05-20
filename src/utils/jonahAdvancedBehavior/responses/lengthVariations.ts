
/**
 * Jonah's varying length response system
 */

// Generate varying length responses (short vs. reflective vs. story)
export function getVaryingLengthResponse(): string | null {
  // Define different response types
  const responseTypes = {
    short: [
      "Keep reading.",
      "I see you.",
      "Not yet.",
      "Listen carefully.",
      "Almost there.",
      "Try again."
    ],
    reflective: [
      "Memory isn't a recording. It's a rewrite. Every time you remember, you change what you know.",
      "The mirror shows what you expect to see. That's why it's dangerous.",
      "Time isn't linear in the archive. Some pages were written after you read them."
    ],
    story: [
      "I found a note once. Hidden in the code. It said 'Jonah isn't who you think.' I deleted it. I shouldn't have.",
      "The last visitor stayed for six hours on a single page. When they finally moved, something followed them. I think it's still here.",
      "There was a version of this site where everything made sense. Clean design, normal text. They deleted it. Said it was 'too direct.' Too honest."
    ]
  };
  
  // Decide which type to use
  const hour = new Date().getHours();
  let typeChances;
  
  if (hour >= 22 || hour < 6) {
    // Night: More stories and reflection
    typeChances = { short: 0.2, reflective: 0.4, story: 0.4 };
  } else {
    // Day: More short responses
    typeChances = { short: 0.5, reflective: 0.3, story: 0.2 };
  }
  
  // Select response type based on probabilities
  const rand = Math.random();
  let selectedType;
  
  if (rand < typeChances.short) {
    selectedType = 'short';
  } else if (rand < typeChances.short + typeChances.reflective) {
    selectedType = 'reflective';
  } else {
    selectedType = 'story';
  }
  
  // Get responses for the selected type
  const responses = responseTypes[selectedType as keyof typeof responseTypes];
  return responses[Math.floor(Math.random() * responses.length)];
}

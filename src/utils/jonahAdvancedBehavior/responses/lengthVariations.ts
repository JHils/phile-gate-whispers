/**
 * Length variations for Jonah's responses
 * Creates varied response lengths based on context and mood
 */

// Get a response with varying length based on parameters
export function getVaryingLengthResponse(
  baseResponse: string, 
  trustLevel: string = 'low', 
  verbosity: 'terse' | 'normal' | 'verbose' = 'normal'
): string {
  // Base response for minimum case
  if (!baseResponse) return "";
  
  // Short circuit for terse mode
  if (verbosity === 'terse') {
    return getShortenedResponse(baseResponse);
  }
  
  // Higher trust levels might get a more elaborate response
  if (trustLevel === 'high' && verbosity === 'verbose') {
    return getElaboratedResponse(baseResponse);
  }
  
  // Return the original for normal cases
  return baseResponse;
}

// Create a shortened version of a response
function getShortenedResponse(fullResponse: string): string {
  // Split by sentence
  const sentences = fullResponse.match(/[^.!?]+[.!?]+/g) || [fullResponse];
  
  // If only one sentence or very short, return as is
  if (sentences.length <= 1 || fullResponse.length < 60) {
    return fullResponse;
  }
  
  // Return just the first sentence, or a fragment
  if (Math.random() > 0.5) {
    return sentences[0].trim();
  } else {
    // Get a fragment by cutting off the end
    const words = fullResponse.split(' ');
    const fragmentLength = Math.floor(words.length * 0.6);
    return words.slice(0, fragmentLength).join(' ') + '...';
  }
}

// Create a more elaborate version of a response
function getElaboratedResponse(baseResponse: string): string {
  // Expansion phrases that can be added
  const expansions = [
    "I've been thinking about this for some time.",
    "There's more to this than I first realized.",
    "The memories here are... complicated.",
    "This connects to something deeper in the archive.",
    "I can see patterns you might not notice yet.",
    "It feels important that you understand this clearly."
  ];
  
  // Reflective questions that can be added at the end
  const reflectiveQuestions = [
    "Does that make sense to you?",
    "Have you considered what this means?",
    "What do you see in this that I might miss?",
    "Does this connect with anything else you've found?",
    "Can you feel what I'm trying to show you?",
    "Is this what you were looking for?"
  ];
  
  // 60% chance to add a prefix expansion
  let elaborated = baseResponse;
  if (Math.random() > 0.4) {
    const expansion = expansions[Math.floor(Math.random() * expansions.length)];
    elaborated = `${expansion} ${elaborated}`;
  }
  
  // 40% chance to add a reflective question
  if (Math.random() > 0.6) {
    const question = reflectiveQuestions[Math.floor(Math.random() * reflectiveQuestions.length)];
    elaborated = `${elaborated} ${question}`;
  }
  
  return elaborated;
}

// Multi-line response generator
export function getMultiLineResponse(
  baseResponse: string,
  trustLevel: string = 'low',
  lines: number = 2
): string[] {
  // For low trust, usually just return the original
  if (trustLevel === 'low' && Math.random() > 0.3) {
    return [baseResponse];
  }
  
  // Split the response at good breaking points
  const sentences = baseResponse.match(/[^.!?]+[.!?]+/g) || [baseResponse];
  
  // If not enough sentences for the requested lines, generate more
  if (sentences.length < lines) {
    const additionalThoughts = [
      "I keep seeing echoes of this.",
      "The pattern repeats.",
      "This feels familiar somehow.",
      "Something's missing from this picture.",
      "I've seen this before, in a different light.",
      "There's more beneath the surface."
    ];
    
    while (sentences.length < lines) {
      const newThought = additionalThoughts[Math.floor(Math.random() * additionalThoughts.length)];
      sentences.push(newThought);
    }
  }
  
  // If we have too many sentences, select a subset
  if (sentences.length > lines) {
    // Always keep the first sentence
    const firstSentence = sentences[0];
    
    // Select remaining sentences
    const remainingCount = lines - 1;
    const remainingSentences = sentences.slice(1);
    const selected = [];
    
    for (let i = 0; i < remainingCount; i++) {
      if (remainingSentences.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * remainingSentences.length);
      selected.push(remainingSentences[randomIndex]);
      remainingSentences.splice(randomIndex, 1);
    }
    
    return [firstSentence, ...selected];
  }
  
  return sentences;
}

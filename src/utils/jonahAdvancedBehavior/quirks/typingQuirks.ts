
/**
 * Jonah's typing quirks system
 */

// Generate a quirky typing style (typos, hesitations, etc.)
export function getQuirkyMessage(message: string): string {
  const storedBehavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  const quirks = storedBehavior.quirks || { typos: true, unfinishedThoughts: false, repeats: false };
  
  let modifiedMessage = message;
  
  // Occasionally add typos that get corrected
  if (quirks.typos && Math.random() > 0.8) {
    const words = message.split(' ');
    const indexToTypo = Math.floor(Math.random() * words.length);
    
    if (words[indexToTypo] && words[indexToTypo].length > 3) {
      const word = words[indexToTypo];
      const typoIndex = Math.floor(Math.random() * (word.length - 1)) + 1;
      const typoChar = String.fromCharCode(word.charCodeAt(typoIndex) + 1);
      
      const typedWord = word.substring(0, typoIndex) + typoChar + word.substring(typoIndex + 1);
      words[indexToTypo] = `${typedWord}... ${word}`;
      
      modifiedMessage = words.join(' ');
    }
  }
  
  // Occasionally add unfinished thoughts
  if (quirks.unfinishedThoughts && Math.random() > 0.9) {
    const thoughts = [
      "Wait. No.",
      "I shouldn't say that.",
      "Forget I said that.",
      "I'm not supposed to..."
    ];
    
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    modifiedMessage = modifiedMessage + " " + randomThought;
  }
  
  // Occasionally repeat for emphasis
  if (quirks.repeats && Math.random() > 0.9) {
    const words = modifiedMessage.split(' ');
    const indexToRepeat = Math.floor(Math.random() * words.length);
    
    if (words[indexToRepeat] && words[indexToRepeat].length > 2) {
      words[indexToRepeat] = `${words[indexToRepeat]}. ${words[indexToRepeat]}.`;
      modifiedMessage = words.join(' ');
    }
  }
  
  return modifiedMessage;
}

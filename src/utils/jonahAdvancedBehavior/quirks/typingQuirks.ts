/**
 * Jonah's typing quirks
 * Adds personality through text manipulation
 */

// Apply typing quirks to a message
export function applyTypingQuirks(
  message: string, 
  intensity: 'minimal' | 'normal' | 'heavy' = 'normal',
  personality: 'stable' | 'glitchy' | 'fragmented' = 'stable'
): string {
  // Initialize quirk settings based on intensity and personality
  const settings = getQuirkSettings(intensity, personality);
  
  // Early return for minimal/stable with no modifications
  if (intensity === 'minimal' && personality === 'stable') {
    return message;
  }
  
  let result = message;
  
  // Apply capitalization quirks
  result = applyCapitalizationQuirk(result, settings.capitalization);
  
  // Apply fragmentation (sentence breaking)
  if (settings.fragmentation > 0 && result.length > 30) {
    result = applyFragmentation(result, settings.fragmentation);
  }
  
  // Apply glitch characters
  if (settings.glitchProbability > 0) {
    result = applyGlitchCharacters(result, settings.glitchProbability);
  }
  
  // Apply spacing quirks
  if (settings.spacingQuirks) {
    result = applySpacingQuirks(result);
  }
  
  // Apply sentence trailing for "unfinished thoughts"
  if (settings.trailingSentences && Math.random() < settings.trailingSentences) {
    result = applySentenceTrailing(result);
  }
  
  return result;
}

// Get settings for the quirks based on intensity and personality
function getQuirkSettings(intensity: 'minimal' | 'normal' | 'heavy', personality: 'stable' | 'glitchy' | 'fragmented') {
  const settings = {
    capitalization: 'normal' as 'normal' | 'random' | 'none' | 'all',
    fragmentation: 0, // 0-1 chance of adding breaks
    glitchProbability: 0, // 0-1 chance per character
    spacingQuirks: false,
    trailingSentences: 0 // 0-1 chance of trailing off
  };
  
  // Apply intensity settings
  switch (intensity) {
    case 'minimal':
      settings.glitchProbability = 0.01;
      settings.trailingSentences = 0.1;
      break;
    case 'normal':
      settings.glitchProbability = 0.03;
      settings.fragmentation = 0.15;
      settings.trailingSentences = 0.2;
      settings.spacingQuirks = true;
      break;
    case 'heavy':
      settings.glitchProbability = 0.08;
      settings.fragmentation = 0.3;
      settings.trailingSentences = 0.4;
      settings.spacingQuirks = true;
      break;
  }
  
  // Apply personality modifications
  switch (personality) {
    case 'glitchy':
      settings.glitchProbability *= 2.5;
      settings.capitalization = 'random';
      break;
    case 'fragmented':
      settings.fragmentation *= 2;
      settings.trailingSentences *= 1.5;
      settings.capitalization = 'none';
      break;
  }
  
  return settings;
}

// Apply capitalization quirk
function applyCapitalizationQuirk(text: string, style: 'normal' | 'random' | 'none' | 'all'): string {
  switch (style) {
    case 'normal':
      return text;
    case 'random':
      return text.split('').map(char => 
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
      ).join('');
    case 'none':
      return text.toLowerCase();
    case 'all':
      return text.toUpperCase();
    default:
      return text;
  }
}

// Apply fragmentation (sentence breaks)
function applyFragmentation(text: string, probability: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  if (sentences.length <= 1) {
    return text;
  }
  
  return sentences.map(sentence => {
    if (Math.random() < probability) {
      // Break sentences into new lines occasionally
      return sentence + '\n';
    }
    return sentence;
  }).join(' ');
}

// Apply glitch characters
function applyGlitchCharacters(text: string, probability: number): string {
  const glitchChars = ['█', '░', '▓', '▒', '/', '\\', '|', '?', '@', '#', '$', '%', '^', '&', '*'];
  
  return text.split('').map(char => {
    if (Math.random() < probability) {
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return char;
  }).join('');
}

// Apply spacing quirks
function applySpacingQuirks(text: string): string {
  // Double spaces sometimes
  let result = text.replace(/ /g, match => 
    Math.random() < 0.2 ? '  ' : ' '
  );
  
  // Remove spaces sometimes
  result = result.replace(/ /g, match => 
    Math.random() < 0.1 ? '' : match
  );
  
  return result;
}

// Apply sentence trailing for unfinished thoughts
function applySentenceTrailing(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  if (sentences.length === 0) {
    return text;
  }
  
  // Get the last sentence
  const lastSentence = sentences[sentences.length - 1];
  
  // Split the last sentence into words
  const words = lastSentence.split(' ');
  
  // Only keep a portion of the words
  const keepCount = Math.max(2, Math.floor(words.length * 0.7));
  const truncatedSentence = words.slice(0, keepCount).join(' ') + '...';
  
  // Replace the last sentence
  return text.replace(lastSentence, truncatedSentence);
}

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

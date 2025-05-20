
/**
 * Typing quirks for Jonah's text outputs
 * Applies various quirks to make Jonah's speech feel more unique and human
 */

// Apply typing quirks to a text based on intensity
export function applyTypingQuirks(text: string, intensity: 'minimal' | 'moderate' | 'extreme' = 'minimal'): string {
  if (!text) return text;
  
  // Get behavior settings
  const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  const quirkIntensity = behavior.typingQuirkIntensity || intensity;
  
  // Apply quirks based on intensity
  switch (quirkIntensity) {
    case 'extreme':
      return applyExtremeQuirks(text);
    case 'moderate':
      return applyModerateQuirks(text);
    case 'minimal':
    default:
      return applyMinimalQuirks(text);
  }
}

// Minimal typing quirks (subtle changes)
function applyMinimalQuirks(text: string): string {
  let result = text;
  
  // Occasionally lowercase the first letter of a sentence (20% chance)
  if (Math.random() < 0.2) {
    result = result.replace(/^([A-Z])/, match => match.toLowerCase());
  }
  
  // Occasionally remove a period at the end (15% chance)
  if (Math.random() < 0.15 && result.endsWith('.')) {
    result = result.slice(0, -1);
  }
  
  // Occasionally add extra spacing (10% chance)
  if (Math.random() < 0.1) {
    const words = result.split(' ');
    const randomIndex = Math.floor(Math.random() * (words.length - 1)) + 1;
    words.splice(randomIndex, 0, '   ');
    result = words.join(' ');
  }
  
  return result;
}

// Moderate typing quirks (more noticeable)
function applyModerateQuirks(text: string): string {
  let result = text;
  
  // Apply minimal quirks first
  result = applyMinimalQuirks(result);
  
  // Occasionally repeat letters (20% chance)
  if (Math.random() < 0.2) {
    const letters = 'aeiouslmn';
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const repeated = randomLetter.repeat(Math.floor(Math.random() * 3) + 2);
    result = result.replace(randomLetter, repeated);
  }
  
  // Occasionally add ellipsis in the middle (25% chance)
  if (Math.random() < 0.25) {
    const words = result.split(' ');
    if (words.length > 4) {
      const randomIndex = Math.floor(Math.random() * (words.length - 2)) + 1;
      words.splice(randomIndex, 0, '...');
      result = words.join(' ');
    }
  }
  
  // Occasionally change capitalization (15% chance)
  if (Math.random() < 0.15) {
    const words = result.split(' ');
    const randomIndex = Math.floor(Math.random() * words.length);
    if (words[randomIndex].length > 1) {
      words[randomIndex] = words[randomIndex].toUpperCase();
      result = words.join(' ');
    }
  }
  
  return result;
}

// Extreme typing quirks (very noticeable, use sparingly)
function applyExtremeQuirks(text: string): string {
  let result = text;
  
  // Apply moderate quirks first
  result = applyModerateQuirks(result);
  
  // Occasionally replace spaces with underscores (30% chance)
  if (Math.random() < 0.3) {
    result = result.replace(/ /g, '_');
  }
  
  // Occasionally add glitch characters (25% chance)
  if (Math.random() < 0.25) {
    const glitchChars = ['/', '\\', '|', '%', '#', '@', '$', '*'];
    const randomGlitch = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    const glitchPart = randomGlitch.repeat(Math.floor(Math.random() * 5) + 1);
    
    // Insert at random position
    const pos = Math.floor(Math.random() * result.length);
    result = result.slice(0, pos) + glitchPart + result.slice(pos);
  }
  
  // Occasionally fragment the message (20% chance)
  if (Math.random() < 0.2) {
    const fragments = result.split(' ');
    // Remove random words
    for (let i = 0; i < Math.min(2, fragments.length / 3); i++) {
      const removeIndex = Math.floor(Math.random() * fragments.length);
      fragments.splice(removeIndex, 1);
    }
    result = fragments.join(' ');
  }
  
  return result;
}


/**
 * Typing Quirks System
 * Adds personality to Jonah's text through subtle typography changes
 */

type QuirkLevel = 'minimal' | 'moderate' | 'heavy';

// Apply typing quirks to text based on specified intensity
export const applyTypingQuirks = (text: string, level: QuirkLevel = 'minimal'): string => {
  if (!text) return '';
  
  // No quirks at minimal level
  if (level === 'minimal') return text;
  
  let processedText = text;
  
  // Moderate quirks: occasional spacing issues, ellipses, etc.
  if (level === 'moderate') {
    // Double spaces occasionally
    if (Math.random() > 0.7) {
      processedText = processedText.replace(/\s/g, match => 
        Math.random() > 0.3 ? '  ' : match
      );
    }
    
    // Add occasional ellipses
    if (Math.random() > 0.8 && processedText.includes('.')) {
      processedText = processedText.replace(/\./g, match => 
        Math.random() > 0.7 ? '...' : match
      );
    }
    
    // Occasional lowercase at start of sentences
    if (Math.random() > 0.7) {
      processedText = processedText.replace(/\.\s+([A-Z])/g, (match, p1) => 
        Math.random() > 0.5 ? `. ${p1.toLowerCase()}` : match
      );
    }
  }
  
  // Add more intense quirks for heavy level - note: we're not using this level currently
  
  return processedText;
};

// Format text with typing glitches
export const addTypingGlitches = (text: string): string => {
  let glitchedText = text;
  
  // Add random character replacement
  glitchedText = glitchedText.split('').map(char => {
    if (Math.random() > 0.95) {
      const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '?', '!'];
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return char;
  }).join('');
  
  return glitchedText;
};

// Simulate mechanical typing errors
export const addTypingErrors = (text: string): string => {
  let errorText = text;
  
  // Duplicate characters randomly
  errorText = errorText.split('').map(char => {
    if (Math.random() > 0.95 && char !== ' ') {
      return char + char;
    }
    return char;
  }).join('');
  
  // Occasionally miss spaces
  if (Math.random() > 0.7) {
    errorText = errorText.replace(/\s/g, match => 
      Math.random() > 0.9 ? '' : match
    );
  }
  
  return errorText;
};

// Export the module
export default {
  applyTypingQuirks,
  addTypingGlitches,
  addTypingErrors
};

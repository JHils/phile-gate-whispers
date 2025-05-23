/**
 * Text Formatting Utility
 * Modifies text output based on emotional states and response styles
 */

import { EmotionCategory, ResponseStyle } from './types';
import { getEmotionSyntaxModifiers } from './styleMatrix';

// Apply emotional formatting to text based on emotion
export function applyEmotionalFormatting(text: string, emotion: EmotionCategory): string {
  const modifiers = getEmotionSyntaxModifiers(emotion);
  
  if (!text) return text;
  
  let formattedText = text;
  
  // Apply fragmented speech if needed
  if (modifiers.fragmentedSpeech) {
    formattedText = addFragmentation(formattedText);
  }
  
  // Adjust punctuation
  if (modifiers.punctuation.length > 1) {
    formattedText = adjustPunctuation(formattedText, modifiers.punctuation);
  }
  
  // Adjust sentence length
  formattedText = adjustSentenceLength(formattedText, modifiers.sentenceLength);
  
  return formattedText;
}

// Add fragmentation to text (broken sentences, ellipses, etc.)
function addFragmentation(text: string): string {
  // Break some sentences into fragments
  let sentences = text.split('. ').map(s => s.trim());
  
  sentences = sentences.map((sentence, index) => {
    // Only fragment some sentences
    if (Math.random() > 0.6 && sentence.length > 10) {
      const words = sentence.split(' ');
      const breakPoint = Math.floor(words.length / 2) + Math.floor(Math.random() * 3) - 1;
      
      // Create two fragments
      const firstHalf = words.slice(0, breakPoint).join(' ');
      const secondHalf = words.slice(breakPoint).join(' ');
      
      return `${firstHalf}... ${secondHalf}`;
    }
    return sentence;
  });
  
  return sentences.join('. ');
}

// Adjust punctuation based on emotion
function adjustPunctuation(text: string, punctuationOptions: string[]): string {
  // Replace some periods with other punctuation
  return text.replace(/\.\s/g, (match) => {
    // Sometimes keep the period
    if (Math.random() > 0.7) return match;
    
    // Otherwise use random punctuation from options
    const randomPunctuation = punctuationOptions[Math.floor(Math.random() * punctuationOptions.length)];
    return randomPunctuation + ' ';
  });
}

// Adjust sentence length based on emotion
function adjustSentenceLength(text: string, lengthPreference: 'short' | 'medium' | 'long'): string {
  const sentences = text.split(/[.!?]\s/).filter(s => s.trim().length > 0);
  
  if (sentences.length <= 1) return text;
  
  // For short sentences, maybe break up longer ones
  if (lengthPreference === 'short') {
    return sentences.map(sentence => {
      if (sentence.length > 50 && Math.random() > 0.5) {
        const breakPoint = Math.floor(sentence.length / 2);
        return sentence.substring(0, breakPoint) + '. ' + sentence.substring(breakPoint);
      }
      return sentence;
    }).join('. ');
  }
  
  // For long sentences, maybe combine shorter ones
  if (lengthPreference === 'long') {
    let result = [];
    let i = 0;
    
    while (i < sentences.length) {
      if (i < sentences.length - 1 && 
          sentences[i].length < 40 && 
          sentences[i+1].length < 40 && 
          Math.random() > 0.5) {
        // Combine sentences with a conjunction
        const conjunctions = ['and', 'while', 'as', 'because', 'since'];
        const randomConjunction = conjunctions[Math.floor(Math.random() * conjunctions.length)];
        result.push(`${sentences[i]}, ${randomConjunction} ${sentences[i+1]}`);
        i += 2;
      } else {
        result.push(sentences[i]);
        i++;
      }
    }
    
    return result.join('. ');
  }
  
  // Medium - return as is
  return text;
}

// Apply style formatting based on response style
export function applyStyleFormatting(text: string, style: ResponseStyle): string {
  switch (style) {
    case 'poetic':
      return formatPoetic(text);
    case 'cryptic':
      return formatCryptic(text);
    case 'analytical':
      return formatAnalytical(text);
    case 'technical':
      return formatTechnical(text);
    case 'elaborate':
      return formatElaborate(text);
    case 'concise':
      return formatConcise(text);
    case 'RESIDUE':
      return formatResidue(text);
    default:
      return text; // Direct style or any other
  }
}

// Format text in a poetic style
function formatPoetic(text: string): string {
  // Add line breaks, metaphors, etc.
  const lines = text.split('. ');
  return lines.map(line => line.trim()).join('.\n');
}

// Format text in a cryptic style
function formatCryptic(text: string): string {
  // Add ambiguity, references
  return text.replace(/\./g, '...');
}

// Format text in an analytical style
function formatAnalytical(text: string): string {
  // Add analytical phrases
  const analyticalPhrases = [
    "Upon analysis, ",
    "Consider that ",
    "The data suggests ",
    "Examining this further, "
  ];
  
  if (Math.random() > 0.7) {
    const randomPhrase = analyticalPhrases[Math.floor(Math.random() * analyticalPhrases.length)];
    return randomPhrase + text.charAt(0).toLowerCase() + text.slice(1);
  }
  
  return text;
}

// Format text in a technical style
function formatTechnical(text: string): string {
  // Add technical terms, preciseness
  return text;
}

// Format text in an elaborate style
function formatElaborate(text: string): string {
  // Add detail, examples
  return text;
}

// Format text in a concise style
function formatConcise(text: string): string {
  // Shorten, remove fluff
  const sentences = text.split('. ');
  if (sentences.length > 2) {
    // Keep first and last sentence
    return [sentences[0], sentences[sentences.length - 1]].join('. ');
  }
  return text;
}

// Format text in RESIDUE style (glitched)
function formatResidue(text: string): string {
  // Add glitch effects, errors
  let glitched = text;
  
  // Replace some letters with symbols
  glitched = glitched.replace(/e/g, (match) => Math.random() > 0.7 ? '3' : match);
  glitched = glitched.replace(/a/g, (match) => Math.random() > 0.8 ? '4' : match);
  glitched = glitched.replace(/i/g, (match) => Math.random() > 0.8 ? '1' : match);
  
  // Add some glitch artifacts
  if (Math.random() > 0.6) {
    const position = Math.floor(Math.random() * glitched.length);
    const glitchArtifacts = ['[ERROR]', '[REDACTED]', '[DATA_LOSS]', '[CORRUPT]'];
    const randomArtifact = glitchArtifacts[Math.floor(Math.random() * glitchArtifacts.length)];
    
    glitched = glitched.slice(0, position) + ` ${randomArtifact} ` + glitched.slice(position);
  }
  
  return glitched;
}

// Main formatting function that combines emotional and style formatting
export function formatJonahResponse(
  text: string, 
  emotion: EmotionCategory, 
  style: ResponseStyle
): string {
  // Apply emotional formatting first
  let formatted = applyEmotionalFormatting(text, emotion);
  
  // Then apply style formatting
  formatted = applyStyleFormatting(formatted, style);
  
  return formatted;
}

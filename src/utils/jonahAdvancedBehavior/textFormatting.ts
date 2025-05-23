/**
 * Text Formatting Utilities
 * Enhances text based on emotional state and response style
 */

import { EmotionCategory, ResponseStyle } from './types';
import { getStyleForEmotion, getPhrasingPatternForEmotion } from './styleMatrix';

/**
 * Format text based on emotional state
 */
export function formatTextByEmotion(
  text: string,
  emotion: EmotionCategory,
  intensity: number = 50
): string {
  if (!text) return '';
  
  let formattedText = text;
  
  // Apply emotion-specific formatting
  switch (emotion) {
    case 'joy':
    case 'hope':
      // More exclamation marks and positive emphasis
      if (intensity > 70) {
        formattedText = formattedText.replace(/\./g, '!');
        formattedText = addEmphasis(formattedText, ['wonderful', 'amazing', 'delightful']);
      }
      break;
      
    case 'sadness':
    case 'melancholic':
      // More ellipses and contemplative pauses
      if (intensity > 50) {
        formattedText = formattedText.replace(/\. /g, '... ');
        formattedText = addPauses(formattedText);
      }
      break;
      
    case 'fear':
    case 'anxiety':
    case 'paranoia':
      // Add uncertainty markers and fragmenting
      if (intensity > 60) {
        formattedText = addUncertainty(formattedText);
        formattedText = addRepetition(formattedText);
      }
      break;
      
    case 'analytical':
      // More structured, precise language
      formattedText = addPrecision(formattedText);
      break;
      
    case 'cryptic':
    case 'existential':
      // Add metaphorical language and questions
      formattedText = addMetaphors(formattedText);
      break;
      
    case 'confused':
    case 'confusion':
      // Add uncertainty and questions
      formattedText = addUncertainty(formattedText);
      break;
  }
  
  return formattedText;
}

/**
 * Format text based on response style
 */
export function formatTextByStyle(text: string, style: ResponseStyle): string {
  if (!text) return '';
  
  let formattedText = text;
  
  switch (style) {
    case 'poetic':
      // Add more lyrical, flowing language
      formattedText = makeMorePoetic(formattedText);
      break;
      
    case 'cryptic':
      // Make text more mysterious and ambiguous
      formattedText = makeCryptic(formattedText);
      break;
      
    case 'analytical':
      // More structured, precise language
      formattedText = makeAnalytical(formattedText);
      break;
      
    case 'technical':
      // More technical, detailed language
      formattedText = makeTechnical(formattedText);
      break;
      
    case 'elaborate':
      // More descriptive, detailed language
      formattedText = makeElaborate(formattedText);
      break;
      
    case 'concise':
      // Shorter, more direct language
      formattedText = makeConcise(formattedText);
      break;
      
    case 'PARANOID':
      // Nervous, suspicious language
      formattedText = makeParanoid(formattedText);
      break;
      
    case 'RESIDUE':
      // Echo-like, fragmentary language
      formattedText = makeResidue(formattedText);
      break;
  }
  
  return formattedText;
}

/**
 * Apply full formatting based on emotion and style
 */
export function applyFullFormatting(
  text: string,
  emotion: EmotionCategory,
  style: ResponseStyle,
  intensity: number = 50
): string {
  // If no style provided, get style based on emotion
  const effectiveStyle = style || getStyleForEmotion(emotion);
  
  // Apply both emotion and style formatting
  let formattedText = formatTextByEmotion(text, emotion, intensity);
  formattedText = formatTextByStyle(formattedText, effectiveStyle);
  
  return formattedText;
}

/**
 * Format Jonah's response based on emotion and style
 * This is a wrapper around applyFullFormatting for ease of use
 */
export function formatJonahResponse(
  text: string,
  emotion: EmotionCategory = 'neutral',
  style: ResponseStyle = 'direct'
): string {
  return applyFullFormatting(text, emotion, style);
}

// Helper functions for text formatting

function addEmphasis(text: string, emphasisWords: string[]): string {
  let result = text;
  emphasisWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, `*${word}*`);
  });
  return result;
}

function addPauses(text: string): string {
  // Add thoughtful pauses
  let sentences = text.split('. ');
  if (sentences.length > 1) {
    const randomIndex = Math.floor(Math.random() * (sentences.length - 1)) + 1;
    sentences[randomIndex] = `... ${sentences[randomIndex]}`;
  }
  return sentences.join('. ');
}

function addUncertainty(text: string): string {
  const uncertaintyPhrases = ["I think", "perhaps", "maybe", "I'm not sure but", "possibly"];
  if (text.length > 10 && !uncertaintyPhrases.some(phrase => text.includes(phrase))) {
    const phrase = uncertaintyPhrases[Math.floor(Math.random() * uncertaintyPhrases.length)];
    return text.replace(/^(I |You |We |They )/, `${phrase}, $1`);
  }
  return text;
}

function addRepetition(text: string): string {
  const words = text.split(' ');
  if (words.length > 5) {
    const repeatIndex = Math.floor(Math.random() * words.length);
    words[repeatIndex] = `${words[repeatIndex]}... ${words[repeatIndex]}`;
  }
  return words.join(' ');
}

function addPrecision(text: string): string {
  return text.replace(/many/gi, 'several').replace(/some/gi, 'approximately');
}

function addMetaphors(text: string): string {
  if (Math.random() < 0.3) {
    const metaphors = [
      "Like whispers in the void",
      "As reflections in a broken mirror",
      "Similar to echoes in an empty room",
      "Like patterns in static"
    ];
    return `${text} ${metaphors[Math.floor(Math.random() * metaphors.length)]}.`;
  }
  return text;
}

// Style-specific formatting functions

function makeMorePoetic(text: string): string {
  // Add more lyrical language
  const poeticStarters = [
    "In the quiet spaces between words,",
    "Like fragments of memory,",
    "Through the lens of understanding,"
  ];
  
  if (Math.random() < 0.3) {
    return `${poeticStarters[Math.floor(Math.random() * poeticStarters.length)]} ${text.toLowerCase()}`;
  }
  
  return text;
}

function makeCryptic(text: string): string {
  // Make text more mysterious
  const crypticEnders = [
    "...but there's more beneath the surface.",
    "...though some things remain hidden.",
    "...or so it seems at first glance."
  ];
  
  if (Math.random() < 0.3 && !text.includes('...')) {
    return `${text} ${crypticEnders[Math.floor(Math.random() * crypticEnders.length)]}`;
  }
  
  return text;
}

function makeAnalytical(text: string): string {
  // More structured language
  if (!text.includes('First') && !text.includes('Additionally') && Math.random() < 0.3) {
    const sentences = text.split('. ');
    if (sentences.length > 1) {
      sentences[0] = `First, ${sentences[0].toLowerCase()}`;
      if (sentences.length > 1) {
        sentences[1] = `Additionally, ${sentences[1].toLowerCase()}`;
      }
      return sentences.join('. ');
    }
  }
  
  return text;
}

function makeTechnical(text: string): string {
  // More technical language
  return text.replace(/I think/gi, 'Analysis indicates')
    .replace(/I feel/gi, 'Assessment suggests')
    .replace(/strange/gi, 'anomalous')
    .replace(/weird/gi, 'atypical');
}

function makeElaborate(text: string): string {
  // More descriptive language
  if (text.length < 100) {
    return text + " The nuances here are particularly significant, providing context that extends beyond the immediate observation.";
  }
  
  return text;
}

function makeConcise(text: string): string {
  // Shorter, more direct language
  const sentences = text.split('. ');
  if (sentences.length > 1) {
    return sentences[0] + '.';
  }
  
  return text;
}

function makeParanoid(text: string): string {
  // Nervous, suspicious language
  const paranoidAddons = [
    "Watch carefully.",
    "They might be listening.",
    "Not safe to say more.",
    "Something's happening."
  ];
  
  return `${text} ${paranoidAddons[Math.floor(Math.random() * paranoidAddons.length)]}`;
}

function makeResidue(text: string): string {
  // Echo-like language
  const words = text.split(' ');
  if (words.length > 5) {
    const echoIndex = words.length - 1 - Math.floor(Math.random() * 3);
    if (echoIndex >= 0) {
      words.push(`...${words[echoIndex]}...`);
    }
  }
  
  return words.join(' ');
}

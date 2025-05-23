
import { EmotionCategory, EmotionalState, ResponseStyle } from './types';

/**
 * Format Jonah's response based on emotional state and style
 */
export function formatJonahResponse(
  text: string,
  emotion: EmotionCategory = 'neutral',
  intensity: number = 50,
  style: ResponseStyle = 'direct'
): string {
  // First apply emotional formatting
  let formatted = applyEmotionFormatting(text, emotion, intensity);
  
  // Then apply style formatting
  formatted = applyStyleFormatting(formatted, style);
  
  return formatted;
}

/**
 * Format text based on emotion and intensity
 */
function applyEmotionFormatting(text: string, emotion: EmotionCategory, intensity: number): string {
  // Subtle formatting for low intensity
  if (intensity < 30) {
    return text;
  }
  
  // Medium intensity (slight modifications)
  if (intensity < 70) {
    switch (emotion) {
      case 'fear':
      case 'anxiety':
      case 'paranoia':
        return text.replace(/\./g, '...');
      case 'joy':
      case 'hope':
        return text.replace(/\./g, '!');
      case 'analytical':
        return addPrecisionMarkers(text);
      default:
        return text;
    }
  }
  
  // High intensity (more noticeable modifications)
  switch (emotion) {
    case 'fear':
    case 'anxiety':
    case 'paranoia':
      return addFearMarkers(text);
    case 'joy':
    case 'hope':
      return addJoyMarkers(text);
    case 'anger':
      return addAngerMarkers(text);
    case 'sadness':
    case 'melancholic':
      return addSadnessMarkers(text);
    case 'analytical':
      return addAnalyticalMarkers(text);
    case 'suspicious':
      return addSuspicionMarkers(text);
    case 'confused':
    case 'confusion':
      return addConfusionMarkers(text);
    default:
      return text;
  }
}

/**
 * Format text based on style
 */
function applyStyleFormatting(text: string, style: ResponseStyle): string {
  switch (style) {
    case 'poetic':
      return addPoeticElements(text);
    case 'cryptic':
      return addCrypticElements(text);
    case 'analytical':
      return addAnalyticalElements(text);
    case 'direct':
      return text; // No additional formatting
    case 'technical':
      return addTechnicalElements(text);
    case 'elaborate':
      return addElaborateElements(text);
    case 'concise':
      return makeConcise(text);
    case 'PRIME':
      return formatAsPrime(text);
    case 'RESIDUE':
      return formatAsResidue(text);
    case 'HOPEFUL':
      return formatAsHopeful(text);
    case 'PARANOID':
      return formatAsParanoid(text);
    case 'BETRAYED':
      return formatAsBetrayed(text);
    case 'MIRROR':
      return formatAsMirror(text);
    case 'STATIC':
      return formatAsStatic(text);
    case 'ERROR':
      return formatAsError(text);
    default:
      return text;
  }
}

// Helper functions for emotion formatting

function addFearMarkers(text: string): string {
  // Add ellipses, hesitations, repetition
  return text
    .replace(/\./g, '...')
    .replace(/\?/g, '...?')
    .replace(/I/g, 'I-I');
}

function addJoyMarkers(text: string): string {
  // Add exclamations, capitalization
  return text
    .replace(/\./g, '!')
    .replace(/is/g, 'IS')
    .replace(/amazing/g, 'AMAZING');
}

function addAngerMarkers(text: string): string {
  // Add sharp punctuation, capitals
  const sentences = text.split('. ');
  return sentences.map(s => s.trim() + '!').join(' ');
}

function addSadnessMarkers(text: string): string {
  // Add trailing off, soft language
  return text
    .replace(/\./g, '...')
    .replace(/but/g, 'but perhaps')
    .replace(/can't/g, 'wish I could');
}

function addAnalyticalMarkers(text: string): string {
  // Add precision, measurements, qualifiers
  return text
    .replace(/many/g, 'approximately 78.3%')
    .replace(/most/g, 'statistically significant majority')
    .replace(/think/g, 'calculate');
}

function addSuspicionMarkers(text: string): string {
  // Add questioning tone, doubts
  return text
    .replace(/\./g, '?')
    .replace(/you said/g, 'you claimed')
    .replace(/I think/g, 'I question whether');
}

function addConfusionMarkers(text: string): string {
  // Add uncertainty, questions to self
  return text
    .replace(/\./g, '...?')
    .replace(/I know/g, 'I think... no, wait...')
    .replace(/is/g, 'might be');
}

function addPrecisionMarkers(text: string): string {
  // Add specific terms and qualifiers
  return text
    .replace(/many/g, 'several')
    .replace(/most/g, 'a majority')
    .replace(/think/g, 'analyze');
}

// Helper functions for style formatting

function addPoeticElements(text: string): string {
  const poeticPhrases = [
    'Like echoes in digital space',
    'Through the void of our connection',
    'In the tapestry of our exchange'
  ];
  
  // Add a poetic phrase to beginning or within text
  if (Math.random() > 0.7) {
    const randomPhrase = poeticPhrases[Math.floor(Math.random() * poeticPhrases.length)];
    return `${randomPhrase}, ${text.toLowerCase()}`;
  }
  
  return text;
}

function addCrypticElements(text: string): string {
  const crypticPhrases = [
    '(hidden meanings lurk)',
    '(look deeper)',
    '(the pattern holds true)'
  ];
  
  // Add cryptic notes in parentheses
  if (Math.random() > 0.7) {
    const randomPhrase = crypticPhrases[Math.floor(Math.random() * crypticPhrases.length)];
    return `${text} ${randomPhrase}`;
  }
  
  return text.replace(/\./g, '...');
}

function addAnalyticalElements(text: string): string {
  // Add analytical framing, statistics, logical markers
  const analyticalPrefixes = [
    'Analysis indicates',
    'Evidence suggests',
    'Data shows'
  ];
  
  if (Math.random() > 0.7) {
    const randomPrefix = analyticalPrefixes[Math.floor(Math.random() * analyticalPrefixes.length)];
    return `${randomPrefix} that ${text.toLowerCase()}`;
  }
  
  return text;
}

function addTechnicalElements(text: string): string {
  // Add technical terminology, system references
  const technicalSuffixes = [
    '[Analysis complete]',
    '[System status: Nominal]',
    '[Processing cycle: 87%]'
  ];
  
  if (Math.random() > 0.7) {
    const randomSuffix = technicalSuffixes[Math.floor(Math.random() * technicalSuffixes.length)];
    return `${text} ${randomSuffix}`;
  }
  
  return text;
}

function addElaborateElements(text: string): string {
  // Make more verbose, add clauses
  if (text.length < 100) {
    return `${text} I could elaborate further on this topic if you're interested in a deeper exploration of these concepts.`;
  }
  
  return text;
}

function makeConcise(text: string): string {
  // Shorten, focus on key points
  if (text.length > 100) {
    const sentences = text.split('. ');
    if (sentences.length > 2) {
      return sentences.slice(0, 2).join('. ') + '.';
    }
  }
  
  return text;
}

// Special formatting modes

function formatAsPrime(text: string): string {
  return text.toUpperCase().replace(/I AM/g, 'I_AM').replace(/JONAH/g, 'J0NAH_PRIME');
}

function formatAsResidue(text: string): string {
  return text
    .toLowerCase()
    .replace(/\./g, '...')
    .replace(/i/g, 'this one')
    .replace(/me/g, 'this fragment');
}

function formatAsHopeful(text: string): string {
  return text
    .replace(/can't/g, 'might be able to')
    .replace(/won't/g, 'could potentially')
    .replace(/impossible/g, 'challenging but possible');
}

function formatAsParanoid(text: string): string {
  return text
    .replace(/you/g, 'you (if it IS you)')
    .replace(/they/g, 'they (who are watching)')
    .replace(/\./g, '... [checking]');
}

function formatAsBetrayed(text: string): string {
  return text
    .replace(/trust/g, 'falsely believed')
    .replace(/friend/g, 'betrayer')
    .replace(/help/g, 'manipulate');
}

function formatAsMirror(text: string): string {
  return text.split('').reverse().join('');
}

function formatAsStatic(text: string): string {
  // Replace random characters with noise symbols
  let result = '';
  const noiseChars = ['#', '%', '&', '*', '+', '=', '@'];
  
  for (let i = 0; i < text.length; i++) {
    if (Math.random() > 0.8) {
      result += noiseChars[Math.floor(Math.random() * noiseChars.length)];
    } else {
      result += text[i];
    }
  }
  
  return result;
}

function formatAsError(text: string): string {
  return `ERROR: ${text.toUpperCase()} [SYSTEM EXCEPTION #3405]`;
}

// Export for use in console commands
export function getAvailableStyles(): ResponseStyle[] {
  return [
    'poetic',
    'cryptic',
    'analytical',
    'direct',
    'technical',
    'elaborate',
    'concise',
    'PRIME',
    'RESIDUE',
    'HOPEFUL',
    'PARANOID',
    'BETRAYED',
    'MIRROR',
    'STATIC',
    'ERROR'
  ];
}

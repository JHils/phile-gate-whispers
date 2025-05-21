import { EmotionCategory } from './types';

// Apply paranoia filter
function applyParanoiaFilter(text: string): string {
  const paranoiaTriggers = ["they", "watching", "government", "control", "hidden"];
  const words = text.split(" ");
  const modifiedWords = words.map(word => {
    if (paranoiaTriggers.some(trigger => word.toLowerCase().includes(trigger))) {
      return word.toUpperCase() + " [REDACTED]";
    }
    return word;
  });
  return modifiedWords.join(" ");
}

// Apply fear filter
function applyFearFilter(text: string): string {
  const fearTriggers = ["dark", "alone", "unknown", "monster", "silence"];
  const words = text.split(" ");
  const modifiedWords = words.map(word => {
    if (fearTriggers.some(trigger => word.toLowerCase().includes(trigger))) {
      return `_${word}_`;
    }
    return word;
  });
  return modifiedWords.join(" ");
}

// Apply confusion filter
function applyConfusionFilter(text: string): string {
  const confusionTriggers = ["what", "why", "how", "where", "unclear"];
  const words = text.split(" ");
  const modifiedWords = words.map(word => {
    if (confusionTriggers.some(trigger => word.toLowerCase().includes(trigger))) {
      return word.split("").sort(() => 0.5 - Math.random()).join("");
    }
    return word;
  });
  return modifiedWords.join(" ");
}

// Generate static text
function generateStaticText(text: string): string {
  let staticText = "";
  for (let i = 0; i < text.length; i++) {
    staticText += Math.random() > 0.5 ? text[i] : '*';
  }
  return staticText;
}

// Generate mirror text
function generateMirrorText(text: string): string {
  return text.split("").reverse().join("");
}

// Apply console emotional filter
export function applyConsoleEmotionalFilter(text: string, emotion: EmotionCategory): string {
  // Early returns for empty or neutral cases
  if (!text) return text;
  if (emotion === 'neutral') return text;
  
  // Setup
  const score = '50'; // Mock score for now
  
  // Apply visual distortion based on emotion intensity
  let distortionLevel = 0;
  
  // Convert emotionScore to number if it's a string
  const emotionScore = typeof score === 'string' ? parseInt(score, 10) : score;
  
  if (emotionScore > 70) {
    distortionLevel = 3;
  } else if (emotionScore < 30) {
    distortionLevel = 1;
  } else {
    distortionLevel = 2;
  }
  
  // Apply distortion
  let distortedText = text;
  if (distortionLevel > 0) {
    const distortionPatterns = [
      (t: string) => t.toUpperCase(),
      (t: string) => t.toLowerCase(),
      (t: string) => t.split("").sort(() => 0.5 - Math.random()).join("")
    ];
    
    for (let i = 0; i < distortionLevel; i++) {
      const pattern = distortionPatterns[i % distortionPatterns.length];
      distortedText = pattern(distortedText);
    }
  }
  
  // Fix emotion comparison issues by using appropriate type checks
  const generateEmotionalFilter = (emotion: EmotionCategory, text: string): string => {
    if (emotion === 'paranoia' as EmotionCategory) {
      return applyParanoiaFilter(text);
    } else if (emotion === 'fear' as EmotionCategory) {
      return applyFearFilter(text);
    } else if (emotion === 'confusion' as EmotionCategory) {
      return applyConfusionFilter(text);
    } else {
      return text;
    }
  };
  
  const applySpecialEmotionEffect = (text: string, emotion: EmotionCategory): string => {
    if (emotion === 'paranoia' as EmotionCategory) {
      return `[PARANOIA] ${text} [WATCHING]`;
    } else if (emotion === 'error' as unknown as EmotionCategory) {
      return `[ERROR] ${text} [ERROR]`;
    } else if (emotion === 'static' as unknown as EmotionCategory) {
      return generateStaticText(text);
    } else if (emotion === 'mirror' as unknown as EmotionCategory) {
      return generateMirrorText(text);
    } else {
      return text;
    }
  };
  
  // Apply special effects
  let textWithEffect = applySpecialEmotionEffect(distortedText, emotion);
  
  // Apply emotional filter
  textWithEffect = generateEmotionalFilter(emotion, textWithEffect);
  
  return textWithEffect;
}


import { EmotionCategory, ResponseStyle } from './types';

/**
 * Format a response based on Jonah's emotional state
 */
export function formatJonahResponse(
  content: string,
  emotion: EmotionCategory,
  style: ResponseStyle = 'direct'
): string {
  if (!content) return '';
  
  // Apply basic formatting based on emotion
  let formatted = applyEmotionalFormatting(content, emotion);
  
  // Apply style-specific formatting
  formatted = applyStyleFormatting(formatted, style);
  
  return formatted;
}

/**
 * Apply emotional formatting based on the emotion
 */
function applyEmotionalFormatting(content: string, emotion: EmotionCategory): string {
  switch (emotion) {
    case 'joy':
      return content.replace(/\./g, '!').replace(/\?/g, '?!');
      
    case 'sadness':
    case 'melancholic':
      return content.replace(/\./g, '...').trim() + '...';
      
    case 'fear':
    case 'anxiety':
      return content.replace(/([.?!]) /g, '$1.. ').trim();
      
    case 'paranoia':
      const sentences = content.split(/([.!?] )/);
      return sentences.map((s, i) => {
        if (i % 2 === 0 && Math.random() > 0.7 && s.length > 10) {
          return s + ' (I think)';
        }
        return s;
      }).join('');
      
    case 'analytical':
      return content.replace(/([.?!]) /g, '. Analyzing: ').trim();
      
    case 'curious':
    case 'curiosity':
      if (!content.includes('?')) {
        return content.trim() + '? Hmm...';
      }
      return content;
      
    case 'watching':
      return 'Observing: ' + content;
      
    default:
      return content;
  }
}

/**
 * Apply formatting based on the response style
 */
function applyStyleFormatting(content: string, style: ResponseStyle): string {
  switch (style) {
    case 'poetic':
      return content.replace(/\. /g, ',\n').replace(/\.$/, '...');
      
    case 'cryptic':
      return content.replace(/\. /g, '.. ').replace(/I /g, 'this one ');
      
    case 'technical':
      return '[PROCESSING] ' + content + ' [END SEQUENCE]';
      
    case 'PRIME':
      return content.toUpperCase();
      
    case 'RESIDUE':
      return content.toLowerCase().replace(/\./g, '...').replace(/i /g, 'this one ');
      
    default:
      return content;
  }
}

/**
 * Convert a number intensity to a string label
 */
export function intensityToLabel(intensity: number): 'low' | 'medium' | 'high' {
  if (intensity < 33) return 'low';
  if (intensity > 66) return 'high';
  return 'medium';
}

/**
 * Add stylistic elements based on the intensity
 */
export function applyIntensity(content: string, intensityLevel: 'low' | 'medium' | 'high'): string {
  switch (intensityLevel) {
    case 'low':
      return content.toLowerCase();
    case 'high':
      return content.toUpperCase();
    default:
      return content;
  }
}

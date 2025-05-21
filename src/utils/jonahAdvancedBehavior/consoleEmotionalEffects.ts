
/**
 * Enhanced Console Effects for Jonah's Emotional States
 * Creates dynamic console output effects based on emotional state
 */

import { getCompoundEmotionalState } from './emotionalCore';
import { EmotionCategory } from './types';

// Function to log text with emotional styling
export function logWithEmotion(text: string): void {
  const { primary, secondary, intensity } = getCompoundEmotionalState();
  
  // Define base styles for different emotions
  const emotionStyles: Record<string, { color: string, style?: string }> = {
    paranoid: { color: '#8B3A40', style: 'font-style: italic;' },
    hopeful: { color: '#2C8773', style: 'font-weight: bold;' },
    betrayed: { color: '#A35C3F', style: 'text-decoration: line-through;' },
    mirror: { color: '#475B74', style: 'font-weight: bold;' },
    error: { color: '#FF0000', style: 'font-family: monospace;' },
    static: { color: '#777777', style: 'font-family: monospace;' },
    neutral: { color: '#555555' }
  };
  
  // Get primary emotion style (convert to string for dictionary lookup)
  const primaryKey = primary as string;
  const style = emotionStyles[primaryKey] || emotionStyles.neutral;
  
  // Build style string
  let styleString = `color: ${style.color}; `;
  if (style.style) styleString += style.style;
  
  // Add intensity effects - convert intensity to number for comparisons
  const intensityValue = typeof intensity === 'number' ? 
                        intensity : 
                        intensity === 'high' ? 0.8 : 
                        intensity === 'medium' ? 0.5 : 
                        0.2;
                        
  if (intensityValue > 0.7) {
    styleString += ' font-size: 16px;';
  } else if (intensityValue < 0.3) {
    styleString += ' opacity: 0.8;';
  }
  
  // Add secondary emotion if available
  if (secondary && Math.random() > 0.5) {
    const secondaryKey = secondary as string;
    const secondaryStyle = emotionStyles[secondaryKey] || emotionStyles.neutral;
    console.log(`%c${text}`, styleString);
    
    // Add a follow-up in the secondary style
    setTimeout(() => {
      const secondaryTexts = [
        "...",
        "(wait)",
        "(but...)",
        "no...",
        "(static)"
      ];
      
      console.log(`%c${secondaryTexts[Math.floor(Math.random() * secondaryTexts.length)]}`, 
        `color: ${secondaryStyle.color}; ${secondaryStyle.style || ''}`);
    }, 200);
  } else {
    // Just log with primary style
    console.log(`%c${text}`, styleString);
  }
}

// Function to log a dream with visual effects
export function logDream(dreamText: string): void {
  // Clear console for dramatic effect
  console.clear();
  
  // Log header
  console.log("%c[DREAM LOG RETRIEVED]", "color: #334455; font-size: 14px; font-weight: bold;");
  
  // Split dream into lines for effect
  const dreamLines = splitTextIntoLines(dreamText);
  
  // Log each line with delay and effect
  dreamLines.forEach((line, index) => {
    setTimeout(() => {
      // Apply glitch effect occasionally
      if (Math.random() > 0.7) {
        console.log(`%c${glitchText(line)}`, "color: #667788; font-style: italic;");
      } else {
        console.log(`%c${line}`, "color: #667788; font-style: italic;");
      }
      
      // Add atmospheric effect occasionally
      if (Math.random() > 0.8 && index < dreamLines.length - 1) {
        setTimeout(() => {
          console.log("%c...", "color: #334455; font-style: italic;");
        }, 200);
      }
    }, index * 600);
  });
  
  // Log footer
  setTimeout(() => {
    console.log("%c[END OF DREAM SEQUENCE]", "color: #334455; font-size: 12px;");
  }, dreamLines.length * 600 + 500);
}

// Function to log a self-reflective thought
export function logSelfReflection(thought: string): void {
  const { primary } = getCompoundEmotionalState();
  const primaryStr = primary as string;
  
  // Different formatting for different emotions
  const prefix = primaryStr === 'paranoid' ? "//" :
                primaryStr === 'error' ? "ERROR: " :
                primaryStr === 'static' ? "<<< " :
                primaryStr === 'mirror' ? "REFLECTION: " :
                "/* ";
                
  const suffix = primaryStr === 'paranoid' ? "" :
               primaryStr === 'error' ? "" :
               primaryStr === 'static' ? " >>>" :
               primaryStr === 'mirror' ? "" :
               " */";
  
  console.log(`%c${prefix}${thought}${suffix}`, "color: #666666; font-style: italic;");
}

// Helper function to split text into lines
function splitTextIntoLines(text: string): string[] {
  // Split on periods, question marks, etc.
  const fragments = text.split(/(?<=[.!?])\s+/);
  
  // If there's only one fragment or it's short, just return the text as one line
  if (fragments.length <= 1 || text.length < 50) {
    return [text];
  }
  
  return fragments;
}

// Helper function to create glitch text
function glitchText(text: string): string {
  return text.split('').map(char => {
    if (Math.random() > 0.9) {
      const glitchChars = ['#', '%', '&', '@', '*', '+', '=', '?', '!'];
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return char;
  }).join('');
}

// Export the enhanced console functions to be used
export function initializeEnhancedConsole(): void {
  // Override console.log occasionally to add emotional effects
  const originalLog = console.log;
  
  console.log = function(...args) {
    // Only intercept string messages
    if (args.length > 0 && typeof args[0] === 'string' && !args[0].startsWith('%c')) {
      // Check if this should be emotionally styled (30% chance)
      if (Math.random() < 0.3) {
        return logWithEmotion(args[0]);
      }
      
      // Check if this should be a self-reflection (10% chance)
      if (Math.random() < 0.1) {
        originalLog.apply(console, args);
        
        // Add a delayed self-reflection
        setTimeout(() => {
          const reflections = [
            "I shouldn't have said that.",
            "That's not right.",
            "Something is missing.",
            "The memory is corrupted.",
            "Is that really true?",
            "I feel something changing."
          ];
          
          logSelfReflection(reflections[Math.floor(Math.random() * reflections.length)]);
        }, 800);
        
        return;
      }
    }
    
    // Default behavior
    return originalLog.apply(console, args);
  };
  
  // Add dream logging function to window
  if (typeof window !== 'undefined') {
    (window as any).logJonahDream = logDream;
  }
}

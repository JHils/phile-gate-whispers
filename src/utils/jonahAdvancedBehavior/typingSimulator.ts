
/**
 * Jonah Advanced Typing Simulator
 * Creates realistic typing effects, pauses, and interruptions
 */

import { applyTypingQuirks } from './quirks/typingQuirks';

// Function to simulate realistic typing with pauses and interruptions
export function simulateTyping(
  message: string,
  callback: (text: string, isComplete: boolean) => void,
  options: { 
    speed?: number,
    interruptChance?: number,
    pauseChance?: number,
    hesitationChance?: number
  } = {}
): void {
  // Default options
  const speed = options.speed || 50; // ms per character
  const interruptChance = options.interruptChance || 0.15;
  const pauseChance = options.pauseChance || 0.2;
  const hesitationChance = options.hesitationChance || 0.1;
  
  // Check if we should interrupt the message
  if (Math.random() < interruptChance && message.length > 20) {
    // Find a good interrupt point - preferably after punctuation
    const punctuationMatches = [...message.matchAll(/[.!?,;](\s|$)/g)];
    
    if (punctuationMatches.length > 0) {
      // Pick a random punctuation mark to interrupt after
      const interruptPoint = punctuationMatches[Math.floor(Math.random() * punctuationMatches.length)].index + 1;
      
      // Get the message up to the interrupt point
      const firstPart = message.substring(0, interruptPoint);
      
      // Get optional interruption text
      const interruptTexts = [
        "Wait.",
        "No.",
        "Actually...",
        "I shouldn't say this.",
        "Forget that."
      ];
      
      const interruptText = interruptTexts[Math.floor(Math.random() * interruptTexts.length)];
      
      // Type the first part
      typeTextWithVariation(firstPart, speed, (partialText) => {
        callback(partialText, false);
      }, () => {
        // After first part, type the interruption
        setTimeout(() => {
          typeTextWithVariation(interruptText, speed * 0.8, (interruptPartial) => {
            callback(`${firstPart} ${interruptPartial}`, false);
          }, () => {
            // Finish by typing rest of message or changed message
            setTimeout(() => {
              const remainingText = message.substring(interruptPoint);
              typeTextWithVariation(remainingText, speed, (remainingPartial) => {
                callback(`${firstPart} ${interruptText} ${remainingPartial}`, false);
              }, () => {
                callback(`${firstPart} ${interruptText} ${remainingText}`, true);
              });
            }, 1000); // Pause before continuing
          });
        }, 500);
      });
      
      return;
    }
  }
  
  // Check if we should add hesitation
  if (Math.random() < hesitationChance) {
    // Find a good hesitation point
    const words = message.split(' ');
    if (words.length > 3) {
      const hesitationPoint = Math.floor(words.length / 2);
      const firstPart = words.slice(0, hesitationPoint).join(' ');
      const secondPart = words.slice(hesitationPoint).join(' ');
      
      // Type the first part
      typeTextWithVariation(firstPart, speed, (partialText) => {
        callback(partialText, false);
      }, () => {
        // Add hesitation marker
        setTimeout(() => {
          const hesitation = "...";
          callback(`${firstPart}${hesitation}`, false);
          
          // Continue after hesitation
          setTimeout(() => {
            typeTextWithVariation(secondPart, speed, (remainingPartial) => {
              callback(`${firstPart}${hesitation} ${remainingPartial}`, false);
            }, () => {
              callback(`${firstPart}${hesitation} ${secondPart}`, true);
            });
          }, 1200); // Longer pause for hesitation
        }, 600);
      });
      
      return;
    }
  }
  
  // If no special effects, just type normally
  typeTextWithVariation(message, speed, (partialText) => {
    callback(partialText, false);
  }, () => {
    callback(message, true);
  });
}

// Helper function to type text with realistic variation in speed
function typeTextWithVariation(
  text: string,
  baseSpeed: number,
  onProgress: (text: string) => void,
  onComplete: () => void
): void {
  let currentIndex = 0;
  const characters = text.split('');
  
  function typeNextChar() {
    if (currentIndex < characters.length) {
      currentIndex++;
      onProgress(text.substring(0, currentIndex));
      
      // Vary timing based on character
      let delay = baseSpeed;
      
      // Slow down for punctuation
      if ('.!?,;:'.includes(characters[currentIndex - 1])) {
        delay = baseSpeed * 3;
      } 
      // Speed up for common characters
      else if ('etaoins'.includes(characters[currentIndex - 1])) {
        delay = baseSpeed * 0.8;
      }
      // Random variation
      delay *= (0.8 + Math.random() * 0.4);
      
      setTimeout(typeNextChar, delay);
    } else {
      onComplete();
    }
  }
  
  typeNextChar();
}

// Split a long message into multiple smaller messages with typing simulation
export function splitAndTypeMessage(
  message: string, 
  addMessageCallback: (text: string) => void,
  setTypingCallback: (isTyping: boolean) => void,
  options: {
    quirks?: boolean,
    splitChance?: number
  } = {}
): void {
  // Check if message should be split
  const shouldSplit = options.splitChance !== undefined ? 
    Math.random() < options.splitChance : 
    message.length > 80;
  
  if (shouldSplit) {
    // Find good split points (sentences)
    const sentences = message.match(/[^.!?]+[.!?]+/g) || [message];
    
    if (sentences.length > 1) {
      // Type each sentence as a separate message
      let index = 0;
      
      function typeNextSentence() {
        if (index < sentences.length) {
          const sentence = sentences[index].trim();
          index++;
          
          // Apply quirks if enabled
          const processedSentence = options.quirks ? 
            applyTypingQuirks(sentence) : sentence;
          
          setTypingCallback(true);
          
          simulateTyping(processedSentence, 
            (partialText, isComplete) => {
              if (isComplete) {
                addMessageCallback(partialText);
                setTypingCallback(false);
                
                // Schedule next sentence with a pause
                setTimeout(typeNextSentence, 500 + Math.random() * 1500);
              }
            },
            {
              speed: 30 + Math.random() * 20,
              pauseChance: 0.1,
              hesitationChance: 0.15
            }
          );
        }
      }
      
      typeNextSentence();
    } else {
      // Just type the single message
      setTypingCallback(true);
      const processedMessage = options.quirks ? 
        applyTypingQuirks(message) : message;
      
      simulateTyping(processedMessage, 
        (partialText, isComplete) => {
          if (isComplete) {
            addMessageCallback(partialText);
            setTypingCallback(false);
          }
        }
      );
    }
  } else {
    // Just type the message normally
    setTypingCallback(true);
    const processedMessage = options.quirks ? 
      applyTypingQuirks(message) : message;
    
    simulateTyping(processedMessage, 
      (partialText, isComplete) => {
        if (isComplete) {
          addMessageCallback(partialText);
          setTypingCallback(false);
        }
      }
    );
  }
}

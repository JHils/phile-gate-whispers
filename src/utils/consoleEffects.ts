
/**
 * Console Effects System
 * Provides special text effects for console output
 */

// Typewriter effect for console logs
export const typewriterLog = (text: string): void => {
  // Split the text into characters and log each with a typing delay
  const chars = text.split('');
  let output = '';
  let i = 0;
  
  const typeInterval = setInterval(() => {
    output += chars[i];
    console.clear();
    console.log(`%c${output}`, "color: #2C8773; font-size:16px;");
    i++;
    
    if (i >= chars.length) {
      clearInterval(typeInterval);
    }
  }, 30);
};

// Delayed sequential logging
export const delayedLog = (lines: string[], delay: number = 1000): void => {
  lines.forEach((line, index) => {
    setTimeout(() => {
      console.log(`%c${line}`, "color: #475B74; font-size:14px;");
    }, delay * index);
  });
};

// Glitch text effect for console logs
export const glitchEffectLog = (text: string): void => {
  // Original text
  console.log(`%c${text}`, "color: #983452; font-size:16px; font-weight:bold;");
  
  // Glitch 1: Some characters replaced with symbols
  setTimeout(() => {
    const glitchedText1 = text
      .split('')
      .map(c => Math.random() < 0.3 ? ['#', '%', '&', '!', '@'][Math.floor(Math.random() * 5)] : c)
      .join('');
    console.clear();
    console.log(`%c${glitchedText1}`, "color: #983452; font-size:16px; font-weight:bold;");
  }, 75);
  
  // Glitch 2: Different set of replaced characters
  setTimeout(() => {
    const glitchedText2 = text
      .split('')
      .map(c => Math.random() < 0.4 ? ['*', '^', '+', '?', '='][Math.floor(Math.random() * 5)] : c)
      .join('');
    console.clear();
    console.log(`%c${glitchedText2}`, "color: #983452; font-size:16px; font-weight:bold;");
  }, 150);
  
  // Back to original
  setTimeout(() => {
    console.clear();
    console.log(`%c${text}`, "color: #983452; font-size:16px; font-weight:bold;");
  }, 225);
};

// Text-to-speech function with rate/pitch control
export const speak = (text: string, options?: { rate?: number; pitch?: number; volume?: number }): void => {
  // Check if speech synthesis is available
  if (!'speechSynthesis' in window) {
    console.log("%cText-to-speech not supported in this browser", "color: #933;");
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Apply options if provided
  if (options) {
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    if (options.volume !== undefined) utterance.volume = options.volume;
  } else {
    // Default settings for "Jonah voice"
    utterance.rate = 0.8;
    utterance.pitch = 0.2;
  }
  
  // Use a specific voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => voice.name.includes('Male') && voice.lang.includes('en'));
  if (preferredVoice) utterance.voice = preferredVoice;
  
  window.speechSynthesis.speak(utterance);
};

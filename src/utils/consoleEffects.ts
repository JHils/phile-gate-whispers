
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

// Flicker effect for console logs
export const flickerLog = (text: string): void => {
  // First display the text
  console.log(`%c${text}`, "color: #983452; font-size:16px; font-weight:bold;");
  
  // Then flicker it
  setTimeout(() => {
    console.clear();
  }, 100);
  
  setTimeout(() => {
    console.log(`%c${text}`, "color: #983452; font-size:16px; font-weight:bold;");
  }, 150);
  
  setTimeout(() => {
    console.clear();
  }, 300);
  
  setTimeout(() => {
    console.log(`%c${text}`, "color: #983452; font-size:16px; font-weight:bold;");
  }, 350);
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
  if (!('speechSynthesis' in window)) {
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

// Function to track command usage
export const trackCommand = (commandName: string): void => {
  if (!window.JonahConsole) return;
  
  // Add to used commands if not already there
  if (!window.JonahConsole.usedCommands.includes(commandName)) {
    window.JonahConsole.usedCommands.push(commandName);
  }
  
  // Record the last command used
  window.JonahConsole.lastCommand = commandName;
  
  // Save to localStorage
  localStorage.setItem('jonahUsedCommands', JSON.stringify(window.JonahConsole.usedCommands));
};

// Display a random joke from the joke pool
export const displayRandomJoke = (): void => {
  const jokes = [
    "Fun fact: There is no fun. Only facts.",
    "Still looking for meaning? Have you tried carbs?",
    "Your console commands are being monitored… by your past self.",
    "ToggleWrath() is not recommended. But you will anyway.",
    "Everything you type is remembered. Especially the weird stuff.",
    "Didn't know consoles could laugh, did you? Neither did we.",
    "The coin never lands. But you keep flipping it anyway.",
    "Memory leak detected. Good luck figuring out which one.",
    "Jonah says hi. He's wearing your smile today."
  ];
  
  // Initialize jokesDisplayed array if it doesn't exist
  if (!window.JonahConsole.jokesDisplayed) {
    window.JonahConsole.jokesDisplayed = [];
  }
  
  // Filter for jokes not yet displayed
  let availableJokes = jokes.filter(joke => 
    !window.JonahConsole.jokesDisplayed?.includes(joke)
  );
  
  // If all jokes have been shown, reset the tracking
  if (availableJokes.length === 0) {
    window.JonahConsole.jokesDisplayed = [];
    availableJokes = jokes;
  }
  
  // Select random joke and display
  const joke = availableJokes[Math.floor(Math.random() * availableJokes.length)];
  window.JonahConsole.jokesDisplayed?.push(joke);
  
  console.log(`%c${joke}`, "color: #475B74; font-style: italic;");
};

// Play the magnetic tent story
export const playMagneticTentStory = (): void => {
  console.log("%cThe magnetic tent poles:", "color: #8B3A40; font-size:16px; font-weight:bold;");
  
  setTimeout(() => {
    console.log("%cThe glamping pod had tent poles with strange magnetic properties.", "color: #475B74; font-size:14px;");
  }, 1000);
  
  setTimeout(() => {
    console.log("%cThey would align themselves toward the mountain, no matter how I placed them.", "color: #475B74; font-size:14px;");
  }, 3000);
  
  setTimeout(() => {
    console.log("%cSomething was drawing them. And us. I woke up outside the tent one night.", "color: #475B74; font-size:14px;");
  }, 5000);
  
  setTimeout(() => {
    console.log("%cWalking toward the mountain. The poles in my hands. I don't remember taking them.", "color: #8B3A40; font-size:14px; font-style:italic;");
  }, 7000);
};

// Play Griff trigger story
export const playGriffTriggerStory = (): void => {
  console.log("%cThe Griff sequence has been triggered.", "color: #8B3A40; font-size:16px; font-weight:bold;");
  
  setTimeout(() => {
    console.log("%cHe said they were just cave paintings. Normal indigenous art.", "color: #475B74; font-size:14px;");
  }, 1000);
  
  setTimeout(() => {
    console.log("%cBut they moved when we weren't looking directly at them.", "color: #475B74; font-size:14px;");
  }, 3000);
  
  setTimeout(() => {
    console.log("%cAnd Griff... well, Griff stared too long. They recognized him somehow.", "color: #8B3A40; font-size:14px; font-style:italic;");
  }, 5000);
};

// Export Whisper Master system initialization
export { initializeWhisperMaster } from './consoleWhisperMaster';


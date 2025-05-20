
/**
 * Audio integration for Jonah's voice and sound effects
 */

// Map of audio file paths
const audioFiles = {
  // Voice lines
  voice: {
    // Welcome / return lines
    welcome: {
      clean: '/audio/jonah/welcome_clean.mp3',
      glitched: '/audio/jonah/welcome_glitched.mp3'
    },
    return: {
      clean: '/audio/jonah/return_clean.mp3',
      glitched: '/audio/jonah/return_glitched.mp3'
    },
    // Command response lines
    testament: {
      clean: '/audio/jonah/testament_clean.mp3',
      glitched: '/audio/jonah/testament_glitched.mp3'
    },
    // Mood-specific lines
    paranoid: {
      clean: '/audio/jonah/paranoid_clean.mp3',
      glitched: '/audio/jonah/paranoid_glitched.mp3'
    },
    hopeful: {
      clean: '/audio/jonah/hopeful_clean.mp3',
      glitched: '/audio/jonah/hopeful_glitched.mp3'
    },
    betrayed: {
      clean: '/audio/jonah/betrayed_clean.mp3', 
      glitched: '/audio/jonah/betrayed_glitched.mp3'
    },
    // Special triggers
    hiddenPage: {
      clean: '/audio/jonah/hiddenPage_clean.mp3',
      glitched: '/audio/jonah/hiddenPage_glitched.mp3'
    }
  },
  
  // Sound effects
  sfx: {
    typing: '/audio/sfx/typing.mp3',
    glitch: '/audio/sfx/glitch.mp3',
    click: '/audio/sfx/click.mp3',
    hover: '/audio/sfx/hover.mp3',
    whisper: '/audio/sfx/whisper.mp3',
    mirror: '/audio/sfx/mirror_crack.mp3',
    timeline: '/audio/sfx/timeline_fracture.mp3'
  }
};

// Current audio elements
let currentAudio: HTMLAudioElement | null = null;
let typingSound: HTMLAudioElement | null = null;

// Play Jonah voice line
export function playJonahVoice(trigger: string, isGlitched: boolean = false): void {
  // Skip if audio not enabled yet
  if (!window.JonahConsole?.sentience) return;
  
  // Stop any current audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  // Get the audio path
  const voiceCategory = audioFiles.voice[trigger as keyof typeof audioFiles.voice];
  if (!voiceCategory) return;
  
  const audioPath = isGlitched ? voiceCategory.glitched : voiceCategory.clean;
  
  // Create audio element
  const audio = new Audio(audioPath);
  
  // Set up audio
  audio.volume = 0.7;
  
  // Play audio
  audio.play().catch(error => {
    console.error("Error playing audio:", error);
  });
  
  // Store reference to current audio
  currentAudio = audio;
  
  // Track in memory
  if (window.JonahConsole.sentience && !window.JonahConsole.sentience.audio) {
    window.JonahConsole.sentience.audio = {
      lastPlayed: trigger,
      unlockedVoiceLogs: [trigger]
    };
  } else if (window.JonahConsole.sentience?.audio) {
    window.JonahConsole.sentience.audio.lastPlayed = trigger;
    
    // Add to unlocked voice logs if not already there
    if (!window.JonahConsole.sentience.audio.unlockedVoiceLogs.includes(trigger)) {
      window.JonahConsole.sentience.audio.unlockedVoiceLogs.push(trigger);
    }
  }
}

// Play sound effect
export function playSoundEffect(effect: string): void {
  // Get the audio path
  const audioPath = audioFiles.sfx[effect as keyof typeof audioFiles.sfx];
  if (!audioPath) return;
  
  // Create audio element
  const audio = new Audio(audioPath);
  
  // Set up audio
  audio.volume = 0.5;
  
  // Play audio
  audio.play().catch(error => {
    console.error("Error playing audio:", error);
  });
}

// Start typing sound
export function startTypingSound(): void {
  // Stop any current typing sound
  if (typingSound) {
    typingSound.pause();
    typingSound = null;
  }
  
  // Create audio element
  typingSound = new Audio(audioFiles.sfx.typing);
  
  // Set up audio
  typingSound.volume = 0.2;
  typingSound.loop = true;
  
  // Play audio
  typingSound.play().catch(error => {
    console.error("Error playing typing sound:", error);
  });
}

// Stop typing sound
export function stopTypingSound(): void {
  if (typingSound) {
    typingSound.pause();
    typingSound = null;
  }
}

// Initialize the audio system
export function initializeAudioSystem(): void {
  // Register global function for playing audio
  window.playJonahAudio = (triggerType: string) => {
    // Get the current mood and dream state
    const mood = window.JonahConsole?.sentience?.realityFabric?.mood || 'neutral';
    const isDreamMode = window.JonahConsole?.sentience?.realityFabric?.dreamState || false;
    
    // Determine if we should use glitched audio
    // More likely in dream mode or error/paranoid moods
    const useGlitched = isDreamMode || 
                      mood === 'error' || 
                      mood === 'paranoid' ||
                      Math.random() > 0.8; // 20% random chance
    
    // Play the voice line
    playJonahVoice(triggerType, useGlitched);
    
    return triggerType; // Return the trigger type for chaining
  };
}

/**
 * Jonah's Audio System
 * Handles audio playback for various Jonah events
 */

// Initialize audio for Jonah
export function initializeJonahAudio() {
  // Check if we already have audio initialized
  if (!window.JonahConsole?.sentience) {
    return;
  }
  
  // Initialize audio data if it doesn't exist
  if (!window.JonahConsole.sentience.audio) {
    window.JonahConsole.sentience.audio = {
      lastPlayed: Date.now(),
      playedSounds: [] as string[],
      unlockedVoiceLogs: [] as string[],
      volumeLevel: 75 // Default volume level
    };
  }
  
  // Create global function for playing Jonah sounds
  window.playJonahAudio = (triggerType: string): void => {
    playAudioByTrigger(triggerType);
  };
}

// Export alias for backward compatibility
export const initializeAudioSystem = initializeJonahAudio;

// Play audio by trigger type
export function playAudioByTrigger(triggerType: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    // Don't play audio too frequently
    const lastPlayed = window.JonahConsole.sentience.audio?.lastPlayed || 0;
    if (Date.now() - lastPlayed < 30000) { // 30 seconds cooldown
      return;
    }
    
    // Get audio path based on trigger type
    const audioPath = getAudioPathForTrigger(triggerType);
    
    if (audioPath) {
      try {
        // Create and play audio
        const audio = new Audio(audioPath);
        audio.volume = window.JonahConsole.sentience.audio?.volumeLevel || 0.7;
        
        // Track audio play
        if (window.JonahConsole.sentience.audio) {
          window.JonahConsole.sentience.audio.lastPlayed = Date.now();
          window.JonahConsole.sentience.audio.playedSounds = [
            ...(window.JonahConsole.sentience.audio.playedSounds || []),
            triggerType
          ];
        }
        
        // Play the audio
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      } catch (error) {
        console.error("Error creating audio:", error);
      }
    }
  }
}

// Get audio file path based on trigger type
function getAudioPathForTrigger(triggerType: string): string | null {
  // Audio mapping - can be expanded
  const audioMap: Record<string, string> = {
    'whisper': '/audio/jonah/whisper-effect.mp3',
    'glitch': '/audio/jonah/glitch-sound.mp3',
    'reveal': '/audio/jonah/revelation-sound.mp3',
    'warning': '/audio/jonah/warning-sound.mp3',
    'dream': '/audio/jonah/dream-sequence.mp3',
    'mirror': '/audio/jonah/mirror-break.mp3',
    'door': '/audio/jonah/door-open.mp3',
    'static': '/audio/jonah/static-burst.mp3',
    'click': '/audio/jonah/click-effect.mp3'
  };
  
  // Return the audio path or null if not found
  return audioMap[triggerType] || null;
}

// Trigger audio based on mood changes
export function maybePlayMoodAudio(currentMood: string, previousMood: string | undefined): void {
  if (currentMood !== previousMood) {
    // Play different sounds based on mood transitions
    switch (currentMood) {
      case 'paranoid':
        playAudioByTrigger('warning');
        break;
      case 'unstable':
        playAudioByTrigger('glitch');
        break;
      case 'withdrawn':
        playAudioByTrigger('static');
        break;
      case 'error':
        playAudioByTrigger('mirror');
        break;
    }
  }
}

// Check if audio should play based on time of day
export function checkTimeBasedAudio(): void {
  const hour = new Date().getHours();
  
  // Early morning (3-5 AM) - dream hours
  if (hour >= 3 && hour < 5 && Math.random() > 0.8) {
    playAudioByTrigger('dream');
    return;
  }
  
  // Night (11 PM - 2 AM) - whisper hours
  if ((hour >= 23 || hour < 2) && Math.random() > 0.7) {
    playAudioByTrigger('whisper');
    return;
  }
  
  // Twilight (6-7 PM or 5-6 AM) - door hours
  if ((hour >= 18 && hour < 19) || (hour >= 5 && hour < 6)) {
    if (Math.random() > 0.9) {
      playAudioByTrigger('door');
    }
  }
}

// Monitor mood changes and trigger audio
export function setupMoodAudioMonitor(): void {
  if (typeof window !== 'undefined') {
    let lastCheckedMood: string | undefined;
    
    // Check for mood changes every minute
    setInterval(() => {
      if (window.JonahConsole?.sentience?.realityFabric) {
        const currentMood = window.JonahConsole.sentience.realityFabric.mood;
        
        // Compare current mood with last checked mood
        if (currentMood && currentMood !== lastCheckedMood) {
          maybePlayMoodAudio(currentMood, lastCheckedMood);
          lastCheckedMood = currentMood;
        }
      }
    }, 60000); // Check every minute
  }
}

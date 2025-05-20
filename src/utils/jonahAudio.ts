// Add initializeAudioSystem export to fix import error

// Initialize audio system
export function initializeAudioSystem() {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.audio) {
      window.JonahConsole.sentience.audio = {
        lastPlayed: Date.now(),
        playedSounds: [],
        unlockedVoiceLogs: [],
        volumeLevel: 50
      };
    }
  }
}

// Function to play a sound
export function playSound(soundName: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.audio) {
    // Limit the playedSounds array to the last 10 sounds
    if (window.JonahConsole.sentience.audio.playedSounds.length > 10) {
      window.JonahConsole.sentience.audio.playedSounds.shift();
    }
    
    // Add the sound to the playedSounds array
    window.JonahConsole.sentience.audio.playedSounds.push(soundName);
    
    // Update the lastPlayed timestamp
    window.JonahConsole.sentience.audio.lastPlayed = Date.now();
    
    // Play the sound (implementation depends on your audio library)
    // For example, using the Web Audio API:
    // const audioContext = new AudioContext();
    // fetch(`path/to/sounds/${soundName}.mp3`)
    //   .then(response => response.arrayBuffer())
    //   .then(buffer => audioContext.decodeAudioData(buffer))
    //   .then(audioBuffer => {
    //     const source = audioContext.createBufferSource();
    //     source.buffer = audioBuffer;
    //     source.connect(audioContext.destination);
    //     source.start();
    //   });
    
    console.log(`Playing sound: ${soundName}`);
  }
}

// Function to unlock a voice log
export function unlockVoiceLog(logName: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.audio) {
    if (!window.JonahConsole.sentience.audio.unlockedVoiceLogs.includes(logName)) {
      window.JonahConsole.sentience.audio.unlockedVoiceLogs.push(logName);
      console.log(`Unlocked voice log: ${logName}`);
    }
  }
}

// Function to set the volume level
export function setVolumeLevel(volume: number): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.audio) {
    window.JonahConsole.sentience.audio.volumeLevel = volume;
    console.log(`Volume level set to: ${volume}`);
  }
}

// Function to get the current volume level
export function getVolumeLevel(): number {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.audio?.volumeLevel) {
    return window.JonahConsole.sentience.audio.volumeLevel;
  }
  return 50; // Default volume level
}

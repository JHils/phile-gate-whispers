
/**
 * Global Window Extensions
 * Extends the Window interface with Jonah-specific functionality
 */

declare global {
  interface Window {
    // Jonah memory and emotional systems
    trust_level: () => number;
    memory_thread: () => {
      userName: string;
      recentInputs: string[];
      dominantEmotion: string;
      seed: string;
      trustLevel: number;
      loopIndex: number;
      keywords: string[];
      mood: string;
      dreamSeen: boolean;
    };
    echo_log: () => any[];
    mood_system: () => {
      currentMood: string;
      emotionalState: {
        primary: string;
        secondary: string | null;
        intensity: string;
      };
      trustLevel: number;
    };
    dream_state: () => any[];
  }
}

export {};

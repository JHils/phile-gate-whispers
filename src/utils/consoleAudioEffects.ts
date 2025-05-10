
/**
 * Audio and speech related console effects
 */

/**
 * Speak text using browser's speech synthesis if available
 */
export function speak(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}): void {
  // Check if speech synthesis is available in the browser
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = options.rate ?? 0.8;
      msg.pitch = options.pitch ?? 0.6;
      msg.volume = options.volume ?? 0.7;
      window.speechSynthesis.speak(msg);
    } catch (error) {
      console.error("Speech synthesis error:", error);
    }
  }
}

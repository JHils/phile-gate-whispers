
/**
 * Temporal System – Jonah Final Form
 * Handles time-based responses, false memory, looping, and simulated memory gaps
 */

const memoryTimestamps: Record<string, number> = {};
const now = () => Date.now();

// Track phrase with timestamp
export function trackPhrase(phrase: string): void {
  memoryTimestamps[phrase.toLowerCase()] = now();
  console.log("Phrase timestamped:", phrase);
}

// Return false memory if temporal distortion detected
export function getFalseMemoryResponse(phrase: string): string | null {
  const elapsed = now() - (memoryTimestamps[phrase.toLowerCase()] || 0);
  if (elapsed > 30000 && Math.random() > 0.6) {
    const responses = [
      "I remember you saying something about this before, but that memory seems... wrong.",
      "Didn't we discuss this yesterday? No, wait, that can't be right.",
      "I have a memory of this conversation happening already, but that's impossible."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  return null;
}

// Loop detection
export function getLoopResponse(phrase: string): string | null {
  const count = Object.values(memoryTimestamps).filter(
    t => now() - t < 30000
  ).length;

  if (count >= 3 && Math.random() > 0.5) {
    const responses = [
      "We seem to be going in circles.",
      "This conversation feels like it's looping.",
      "Have we had this exact exchange before?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return null;
}

// Simulate fragmented memory response
export function getBlankFragmentResponse(): string | null {
  const responses = [
    "There's a gap in my memory here.",
    "I'm missing something important.",
    "There's a blank space where a memory should be."
  ];

  if (Math.random() > 0.75) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return null;
}

/**
 * Typing System – Simulated Message Delay
 */

export function splitAndTypeMessage(
  content: string,
  trackFn: (msg: string) => void,
  typingFn: (state: boolean) => void
): void {
  typingFn(true);
  const words = content.split(" ");
  let current = "";

  function typeWord(index: number) {
    if (index >= words.length) {
      setTimeout(() => {
        trackFn(current.trim());
        typingFn(false);
      }, 500);
      return;
    }
    current += words[index] + " ";
    setTimeout(() => typeWord(index + 1), 150 + Math.random() * 200);
  }

  typeWord(0);
}

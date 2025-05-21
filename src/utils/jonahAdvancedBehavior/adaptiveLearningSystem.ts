
/**
 * Adaptive Learning System – Jonah Final Form
 * This version tracks, reflects, and adapts Jonah's responses in real time.
 */

// In-memory session store (replace with backend or localStorage for persistence)
let userMemory = {
  recentInputs: [] as string[],
  repetitionIndex: {} as Record<string, number>,
  trustLevel: 50,
  dominantEmotion: "neutral",
};

// Track user input patterns
export function trackUserInput(input: string): void {
  userMemory.recentInputs.push(input);

  // Update repetition index
  const phrase = input.toLowerCase();
  userMemory.repetitionIndex[phrase] = (userMemory.repetitionIndex[phrase] || 0) + 1;

  // Limit recentInputs array size
  if (userMemory.recentInputs.length > 10) {
    userMemory.recentInputs.shift();
  }

  console.log("User input tracked:", input);
}

// Check if a phrase is repeated
export function isRepeatedPhrase(input: string): boolean {
  const count = userMemory.repetitionIndex[input.toLowerCase()] || 0;
  return count > 1;
}

// Get a dynamic response for repeated input
export function getRepetitionResponse(input: string): string | null {
  const count = userMemory.repetitionIndex[input.toLowerCase()] || 0;

  if (count === 2) return "You said that before. It felt heavier the second time.";
  if (count === 3) return "You keep returning to that phrase. Why?";
  if (count >= 4) return "It's looping now. Do you want me to break the cycle or stay inside it with you?";

  return null;
}

// Adapt response based on emotion + trust + repetition
export function getAdaptedResponse(baseResponse: string): string {
  let tone = "";

  if (userMemory.trustLevel < 30) tone = " (said with suspicion)";
  else if (userMemory.dominantEmotion === "fear") tone = " (softly)";
  else if (userMemory.dominantEmotion === "hope") tone = " (gently, with hope)";
  else if (userMemory.dominantEmotion === "paranoia") tone = " (fragmented, glitching)";
  else if (userMemory.recentInputs.length >= 3 && isRepeatedPhrase(userMemory.recentInputs.slice(-1)[0])) {
    tone = " (echoed)";
  }

  return baseResponse + tone;
}

// Optional: Reset memory (e.g. on page leave or timeout)
export function resetMemory(): void {
  userMemory = {
    recentInputs: [],
    repetitionIndex: {},
    trustLevel: 50,
    dominantEmotion: "neutral",
  };
}

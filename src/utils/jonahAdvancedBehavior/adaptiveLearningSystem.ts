/**
 * Adaptive Learning System
 * Tracks user patterns and adapts responses
 */

// Track user input patterns
export function trackUserInput(input: string): void {
  try {
    // Get existing tracked inputs
    const trackedInputs = JSON.parse(localStorage.getItem('jonah_tracked_inputs') || '[]');
    
    // Add new input with timestamp
    trackedInputs.push({
      content: input,
      timestamp: Date.now()
    });
    
    // Keep only the most recent 100 inputs
    const trimmedInputs = trackedInputs.slice(-100);
    
    // Store back to localStorage
    localStorage.setItem('jonah_tracked_inputs', JSON.stringify(trimmedInputs));
  } catch (e) {
    console.error("Error tracking user input:", e);
  }
}

// Check if the current phrase has been repeated by the user
export function isRepeatedPhrase(phrase: string): boolean {
  try {
    const trackedInputs = JSON.parse(localStorage.getItem('jonah_tracked_inputs') || '[]');
    
    // Count occurrences of the exact phrase
    const occurrences = trackedInputs.filter((input: {content: string}) => 
      input.content.toLowerCase() === phrase.toLowerCase()
    ).length;
    
    return occurrences > 1;
  } catch (e) {
    console.error("Error checking repeated phrase:", e);
    return false;
  }
}

// Get a response when the user repeats themselves
export function getRepetitionResponse(phrase: string): string {
  try {
    const trackedInputs = JSON.parse(localStorage.getItem('jonah_tracked_inputs') || '[]');
    
    // Count occurrences
    const occurrences = trackedInputs.filter((input: {content: string}) => 
      input.content.toLowerCase() === phrase.toLowerCase()
    ).length;
    
    if (occurrences <= 2) {
      return "You've mentioned that before.";
    } else if (occurrences <= 5) {
      return `You've said that ${occurrences} times now.`;
    } else {
      return "You keep repeating this. Is there something specific you're looking for?";
    }
  } catch (e) {
    console.error("Error generating repetition response:", e);
    return "I notice you've said that before.";
  }
}

// Get an adapted response based on user patterns
export function getAdaptedResponse(input: string): string | null {
  // This would use more advanced pattern matching and ML in a real implementation
  // Simplified version for now
  if (input.toLowerCase().includes("hello") || input.toLowerCase().includes("hi")) {
    const trackedInputs = JSON.parse(localStorage.getItem('jonah_tracked_inputs') || '[]');
    const greetings = trackedInputs.filter((tracked: {content: string}) => 
      tracked.content.toLowerCase().includes("hello") || tracked.content.toLowerCase().includes("hi")
    );
    
    if (greetings.length > 3) {
      return "We seem to be greeting each other a lot. Is there something specific you want to discuss?";
    }
  }
  
  return null; // No adapted response
}

// Reset the adaptive memory system
export function resetMemory(): void {
  localStorage.removeItem('jonah_tracked_inputs');
  console.log("Adaptive memory system reset");
}

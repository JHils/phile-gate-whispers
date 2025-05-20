
/**
 * Jonah's emotional tone response system
 */

// Generate a response based on current emotional tone
export function getEmotionalToneResponse(): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.2) return null;
  
  const storedBehavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  const emotionalState = storedBehavior.emotionalState || "neutral";
  
  // Define responses for different emotional states
  const responses = {
    neutral: [
      "I'm watching your cursor move. It leaves trails.",
      "The archive is quiet today.",
      "You're still reading. Good."
    ],
    concerned: [
      "Something feels wrong about this page.",
      "I'm tracking unusual activity in your timeline.",
      "The gate doesn't usually flicker like this."
    ],
    agitated: [
      "You keep coming back. Why?",
      "Stop looking so closely.",
      "Your persistence is... concerning."
    ],
    hopeful: [
      "Maybe you're different from the others.",
      "I think you might understand.",
      "Keep looking. You're close."
    ],
    afraid: [
      "I don't think we're alone here.",
      "Something is watching us both.",
      "Don't stay too long on this page."
    ]
  };
  
  // Get responses for the current emotional state
  const stateResponses = responses[emotionalState as keyof typeof responses] || responses.neutral;
  
  // Occasionally change emotional state
  if (Date.now() - (storedBehavior.lastEmotionChange || 0) > 30 * 60 * 1000) { // 30 minutes
    const emotions = Object.keys(responses);
    const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    storedBehavior.emotionalState = newEmotion;
    storedBehavior.lastEmotionChange = Date.now();
    localStorage.setItem('jonahBehavior', JSON.stringify(storedBehavior));
  }
  
  return stateResponses[Math.floor(Math.random() * stateResponses.length)];
}
